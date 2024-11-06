import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2/everything?q=educacion&apiKey=01db9066d51f41b9bb700599b2611e38';

  constructor(private http: HttpClient) {}

  getNews(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.articles)
    );
  }
}
