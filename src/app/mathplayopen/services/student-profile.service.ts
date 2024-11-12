import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InstitutionDto, StudentDto, UserDto} from '../models/student-profile.entity';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {
  private apiUrl = `${environment.serverBasePath}/students`;

  constructor(private http: HttpClient) {}

  getCurrentUser (): Observable<UserDto> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<UserDto>(`${this.apiUrl}/current`, httpOptions);
  }

  getStudentById(id: number): Observable<StudentDto> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<StudentDto>(`${this.apiUrl}/${id}`, httpOptions);
  }

  getInstitutionById(id: number): Observable<InstitutionDto> {
    return this.http.get<InstitutionDto>(`${environment.serverBasePath}/institutions/${id}`);
  }
}
