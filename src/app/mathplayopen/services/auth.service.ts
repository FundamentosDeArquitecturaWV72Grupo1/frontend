/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { catchError, tap } from 'rxjs/operators';
import {User} from "../models/user.entity";
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService extends BaseService<User> {
  constructor(http: HttpClient) {
    super(http);
    this.basePath = environment.serverBasePath;
  }

  signUp(username: string, password: string, role: string) {
    const user = {
      "username": username,
      "password": password,
      "roles": [role]
    };
    return this.http.post(this.buildPath() + '/sign-up', user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  signIn(username: string, password: string) {
    const user = {
      "username": username,
      "password": password
    };
    return this.http.post(this.buildPath() + '/sign-in', user, this.httpOptions)
      .pipe(catchError(this.handleError))
      .pipe(tap((response: any) => {
        this.newToken(response["token"]);
      }))
  }

}

 */
