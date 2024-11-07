import {Component, OnInit} from '@angular/core';
import {Game} from '../../models/game.entity';
import {GamesService} from '../../services/games.service';
import {Router} from '@angular/router';
import {MatCard, MatCardContent, MatCardImage, MatCardModule} from '@angular/material/card';
import {CommonModule, NgForOf} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardImage,
    NgForOf,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatIcon,
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit{
  games: Game[] = [];
  favoriteGames: Game[] = [];

  constructor(private gameService: GamesService, private router: Router) {}

  ngOnInit(): void {
    this.gameService.getAllGames().subscribe(
      (data) => this.games = data,
      (error) => console.error('Error fetching games', error)
    );

    this.gameService.getFavoriteGames().subscribe(
      (data) => this.favoriteGames = data,
      (error) => console.error('Error fetching favorite games', error)
    );
  }

  goToGameDetail(gameId: number): void {
    this.router.navigate(['/games', gameId]);
  }

  toggleFavorite(gameId: number): void {
    const gameIsFavorite = this.favoriteGames.some(favorite => favorite.id === gameId);
    if (gameIsFavorite) {
      this.gameService.removeFromFavorites(gameId).subscribe(
        () => {
          // Eliminar juego de la lista de favoritos
          this.favoriteGames = this.favoriteGames.filter(favorite => favorite.id !== gameId);
        },
        (error) => console.error('Error removing favorite game', error)
      );
    } else {
      this.gameService.markAsFavorite(gameId).subscribe(
        (favGame) => {
          // Agregar juego a la lista de favoritos
          this.favoriteGames.push(favGame);
        },
        (error) => console.error('Error marking game as favorite', error)
      );
    }
  }

  isFavorite(gameId: number): boolean {
    return this.favoriteGames.some(favorite => favorite.id === gameId);
  }
}
