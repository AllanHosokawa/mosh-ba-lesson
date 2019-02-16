import { BadRequestError } from './../common/error/bad-request-error';
import { AppError } from './../common/error/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotFoundError } from '../common/error/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url)
      .pipe(
        map(response => response as Array<Object>),
        catchError(this.handleError));
  }

  create(resource){
    return this.http.post(this.url, JSON.stringify(resource))
      .pipe(
        map(response => response['id']),
        catchError(this.handleError));
  }

  update(resource){
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
      .pipe(catchError(this.handleError));
  }

  delete(id: number){
    return this.http.delete(this.url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response){
    if (error.status === 400)
      return throwError(new BadRequestError(error));

    if (error.status === 404)
      return throwError(new NotFoundError());

    return throwError(new AppError(error));
  }
}
