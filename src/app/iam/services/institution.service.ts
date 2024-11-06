import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Institution} from '../model/intitution.models';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private apiUrl = `${environment.serverBasePath}/institutions`;

  constructor(private http: HttpClient) {}

  getAllInstitutions(): Observable<Institution[]> {
    return this.http.get<Institution[]>(`${this.apiUrl}/all`);
  }
}
