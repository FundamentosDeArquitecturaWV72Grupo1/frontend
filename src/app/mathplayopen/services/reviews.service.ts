import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Review} from '../models/review.entity';
import {CreateReview} from '../models/create-review.entity';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = `${environment.serverBasePath}/reviews`;
  constructor(private http: HttpClient) {}

  getReviewsByGameId(gameId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/game/${gameId}`);
  }
  createReview(review: CreateReview): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/create`, review);
  }
}
