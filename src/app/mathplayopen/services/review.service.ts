import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  //CORS
  // private apiUrl = 'http://localhost:9090/api/v1/reviews/all';
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';


  constructor(private http: HttpClient) {}

  getComments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

