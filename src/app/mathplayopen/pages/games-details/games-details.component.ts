import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
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
import {ScoresService} from '../../services/scores.service';
import {interval, Observable, Subscription} from 'rxjs';
import {GameScore} from '../../models/score.entity';

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
export class GamesDetailsComponent implements OnInit, OnDestroy{
  game: Game | null = null;
  safeEmbedCode: SafeHtml | null = null
  @ViewChild(ReviewListComponent) reviewListComponent!: ReviewListComponent;
  @Output() scoreUpdated = new EventEmitter<void>();

  score: number = 0;
  private scoreSubscription: Subscription | null = null;
  private elapsedTime: number = 0;

  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private scoreService: ScoresService
  ) { }

  ngOnInit(): void {
    const gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGameById(gameId).subscribe(
      (data) => {
        if (data) {
          this.game = data;
          this.safeEmbedCode = this.sanitizer.bypassSecurityTrustHtml(data.embedCode);
          this.startScoring();
        }
      },
      (error) => console.error('Error fetching game details', error)
    );
  }

  goBack(): void {
    this.updateScore();
    this.scoreUpdated.emit();
    this.router.navigate(['/games']);
  }
  reloadReviews(): void {
    this.reviewListComponent.loadReviews();
  }

  startScoring(): void {
    // Cada 10 segundos se incrementa el puntaje
    this.scoreSubscription = interval(10000).subscribe(() => {
      this.elapsedTime += 10; // Incrementar el tiempo transcurrido
      if (this.elapsedTime <= 120) { // Si han pasado menos de 2 minutos
        this.score += 5;
      } else {
        this.score += 10;
      }
    });
  }

  updateScore(): void {
    this.scoreService.getCurrentScore().subscribe(
      (currentScoreData: GameScore) => {
        const newTotalScore = currentScoreData.score + this.score;
        this.scoreService.updateScore(newTotalScore).subscribe(
          () => {
            console.log('Score updated successfully');
          },
          (error) => console.error('Error updating score', error)
        );
      },
      (error) => console.error('Error fetching current score', error)
    );
  }

  ngOnDestroy(): void {
    if (this.scoreSubscription) {
      this.scoreSubscription.unsubscribe(); // Limpiar la suscripción al salir del componente
    }
  }

}
