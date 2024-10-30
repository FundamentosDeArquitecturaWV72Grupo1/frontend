import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {BaseService} from "../../shared/services/base.service";
import {Teacher} from "../models/teacher.entity";

@Injectable({
  providedIn: 'root'
})
export class TeachersApiService extends BaseService<Teacher>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/teachers';
  }

}
