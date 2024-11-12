import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment.development';
import {News} from '../models/news.entity';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = `${environment.serverBasePath}/news/all`;

  constructor(private http: HttpClient) {}

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }
}
