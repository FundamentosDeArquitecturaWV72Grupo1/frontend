import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../../environments/environment.development';
import {Observable, tap, throwError} from 'rxjs';
import {StudentRegistration} from '../model/student.models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = `${environment.serverBasePath}/students`;
  constructor(private http: HttpClient) {}

  registerStudent(studentData: StudentRegistration): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('StudentService - Using token:', token ? 'Token present' : 'No token');

    if (!token) {
      return throwError(() => new Error('No authentication token available'));
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };

    console.log('StudentService - Request headers:', httpOptions.headers.keys());
    console.log('Authorization Header:', httpOptions.headers.get('Authorization'));

    return this.http.post(`${this.apiUrl}/register`, studentData, httpOptions).pipe(
      tap({
        next: (response) => console.log('Student registration successful:', response),
        error: (error) => console.error('Student registration failed:', error)
      })
    );
  }
}
