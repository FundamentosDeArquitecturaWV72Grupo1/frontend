import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {Game} from '../models/game.entity';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private apiUrl = `${environment.serverBasePath}/games/all`;
  private baseUrl = `${environment.serverBasePath}/games`;
  private favoritesUrl = `${environment.serverBasePath}/games/student/favorite-game`;

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl).pipe(
      map(games => games.map(game => ({
        ...game,
        embedCode: this.cleanEmbedCode(game.embedCode)
      })))
    );
  }

  private cleanEmbedCode(embedCode: string): string {
    return embedCode.replace(/\\/g, '');
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/${id}`);
  }

  /*Favorites*/
  markAsFavorite(gameId: number): Observable<Game> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Game>(`${this.favoritesUrl}/${gameId}`, {}, { headers: headers });
  }
  removeFromFavorites(gameId: number): Observable<void> {
    return this.http.delete<void>(`${this.favoritesUrl}/${gameId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
  getFavoriteGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.favoritesUrl}/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}
