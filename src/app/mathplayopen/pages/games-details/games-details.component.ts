import {Component, OnInit, ViewChild} from '@angular/core';
import {Game} from '../../models/game.entity';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {GamesService} from '../../services/games.service';
import {MatCard, MatCardContent, MatCardModule, MatCardTitle} from '@angular/material/card';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {BrowserModule, DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ReviewListComponent} from '../review-list/review-list.component';
import {CreateReviewComponent} from '../create-review/create-review.component';

@Component({
  selector: 'app-games-details',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    RouterLink,
    ReviewListComponent,
    CreateReviewComponent,
  ],
  templateUrl: './games-details.component.html',
  styleUrl: './games-details.component.css'
})
export class GamesDetailsComponent implements OnInit{
  game: Game | null = null;
  safeEmbedCode: SafeHtml | null = null
  @ViewChild(ReviewListComponent) reviewListComponent!: ReviewListComponent;

  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGameById(gameId).subscribe(
      (data) => {
        if (data) {
          this.game = data;
          this.safeEmbedCode = this.sanitizer.bypassSecurityTrustHtml(data.embedCode);
        }
      },
      (error) => console.error('Error fetching game details', error)
    );
  }

  goBack(): void {
    this.router.navigate(['/games']);
  }

  reloadReviews(): void {
    this.reviewListComponent.loadReviews();
  }
}
