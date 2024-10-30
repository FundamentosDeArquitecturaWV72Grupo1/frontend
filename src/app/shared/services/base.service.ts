import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {environment} from '../../../environments/environment';



export class BaseService<T> {
  basePath: string = `${environment.serverBasePath}`;
  resourceEndpoint: string = '';

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    ),
  };

  constructor(protected _http: HttpClient) {}

  protected resourcePath() {
    return `${this.basePath}${this.resourceEndpoint}`
  }

  getOne(id: number): Observable<any>{
    return this._http.get<T>(`${this.resourcePath()}/${id}`, this.httpOptions);
  }

  getAll(): Observable<any>{
    return this._http.get<T>(this.resourcePath(), this.httpOptions);
  }

  post(item: any): Observable<any>{
    return this._http.post<T>(this.resourcePath(), item, this.httpOptions);
  }

  update(id: any, item: any) {
    return this._http.put<T>(`${this.resourcePath()}/${id}`, item, this.httpOptions);
  }

  delete(id: any) {
    return this._http.delete<T>(`${this.resourcePath()}/${id}`, this.httpOptions);
  }

  deleteAll(url: string) {
    return this._http.delete<T>(`${this.resourcePath()}/${url}`, this.httpOptions);
  }
}
