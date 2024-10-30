import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2/everything?q=educacion&apiKey=MyApiKey';

  constructor(private http: HttpClient) {}

  getNews(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.articles)
    );
  }
}
