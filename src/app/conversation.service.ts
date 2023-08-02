import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';

import { Conversation, Property } from './models';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class ConversationService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${environment.apiURL}/conversations`)
    .pipe(
      tap(_ => console.log('fetched conversations')),
      catchError(this.handleError<Conversation[]>('getConversations', []))
    );
  }

  getConversation(id: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${environment.apiURL}/conversations/${id}`)
    .pipe(
      tap(_ => console.log(`fetched conversation id=${id}`)),
      catchError(this.handleError<Conversation>(`getConversation id=${id}`))
    );
  }

  getConversationsFilteredOnProperty(propertyAddresses: string[]): Observable<Conversation[]> {
    return this.getConversations().pipe(
      map((conversations: Conversation[]) =>
      conversations.filter((conversation: Conversation) => propertyAddresses.includes(conversation.property.address))
      ),
      tap(_ => console.log(`fetched conversations with property addresses ${propertyAddresses}`)),
    );
  }

  markUnread(conversation: Conversation): Observable<any> {
    return this.http.put(`${environment.apiURL}/conversations`, conversation, this.httpOptions)
    .pipe(
      tap(_ => console.log(`updated conversation ${conversation.id}: conversation is unread? ${conversation.is_unread}`)),
      catchError(this.handleError<Conversation>(`markUnread conversation id=${conversation.id}`))
    );
  }

  markRead(conversation: Conversation): Observable<any> {
    return this.http.put(`${environment.apiURL}/conversations`, conversation, this.httpOptions)
    .pipe(
      tap(_ => console.log(`updated conversation ${conversation.id}: conversation is unread? ${conversation.is_unread}`)),
      catchError(this.handleError<Conversation>(`markRead conversation id=${conversation.id}`))
    );
  }

  addMessageToConversation(conversation: Conversation): Observable<any> {
    return this.http.put(`${environment.apiURL}/conversations`, conversation, this.httpOptions)
    .pipe(
      tap(_ => console.log(`added message to conversation ${conversation.id}: ${conversation.messages} `)),
      catchError(this.handleError<Conversation>(`addMessageToConversation conversation id=${conversation.id}`))
    );
  }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${environment.apiURL}/properties`)
    .pipe(
      tap(_ => console.log('fetched properties')),
      catchError(this.handleError<Property[]>('getProperties', []))
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
