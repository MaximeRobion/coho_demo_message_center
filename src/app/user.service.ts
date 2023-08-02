import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, switchMap, retry } from 'rxjs/operators';

import { User } from './models';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiURL}/users`)
    .pipe(
      tap(_ => console.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  getCurrentUser(): Observable<User> {
    return this.getUsers()
    .pipe(
      map(users => users.find(user => user.is_current_user)),
      switchMap(current_user => {
        if (!current_user) {
          throwError(() => new Error('Current user not found'));
        }

        const url = `${environment.apiURL}/users/${current_user?.id}`;
        return this.http.get<User>(url).pipe(
          tap(_ => console.log('fetched current user')),
          catchError(this.handleError<User>('getCurrentUser'))
        );
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);

    };
  }
}

