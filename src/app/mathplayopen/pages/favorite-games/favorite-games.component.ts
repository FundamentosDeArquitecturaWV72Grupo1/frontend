import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {GamesService} from '../../services/games.service';
import {Router} from '@angular/router';
import {Game} from '../../models/game.entity';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-favorite-games',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardImage,
    CommonModule,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './favorite-games.component.html',
  styleUrl: './favorite-games.component.css'
})
export class FavoriteGamesComponent implements OnInit{
  favoriteGames: Game[] = []; // Define el tipo según tu modelo FavoriteGame

  constructor(private gameService: GamesService, private router: Router) {}

  ngOnInit(): void {
    this.gameService.getFavoriteGames().subscribe(
      (data) => this.favoriteGames = data,
      (error) => console.error('Error fetching favorite games', error)
    );
   console.log(this.favoriteGames)
  }

  goToGameDetail(gameId: number): void {
    this.router.navigate(['/games', gameId]);
  }

  removeFromFavorites(gameId: number): void {
    this.gameService.removeFromFavorites(gameId).subscribe(
      () => {
        this.favoriteGames = this.favoriteGames.filter(fav => fav.id !== gameId);
      },
      (error) => console.error('Error removing game from favorites', error)
    );
  }
}
