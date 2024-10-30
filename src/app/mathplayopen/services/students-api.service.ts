import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {BaseService} from "../../shared/services/base.service";
import {Student} from "../models/student.entity";

@Injectable({
  providedIn: 'root'
})
export class StudentsApiService extends BaseService<Student>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/students';
  }

  getByUserId(userId: string) {
    return this._http.get<Student>(`${this.resourcePath()}?user_id=${userId}`);
  }
}
