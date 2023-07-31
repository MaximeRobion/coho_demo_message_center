import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Conversation, Message, User } from './models';
import { CONVERSATIONS } from './mocks';


@Injectable({
  providedIn: 'root'
})

export class ConversationService {
  constructor(private http: HttpClient) { }

  private conversationsUrl = 'api/conversations';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.conversationsUrl)
    .pipe(
      tap(_ => console.log('fetched conversations')),
      catchError(this.handleError<Conversation[]>('getConversations', []))
    );
  }

  // markUnread: Get the conversation with the given id and set is_unread to true if it was false

  markUnread(conversation: Conversation): Observable<any> {
    return this.http.put(this.conversationsUrl, conversation, this.httpOptions)
    .pipe(
      tap(_ => console.log(`updated conversation ${conversation.id}: conversation is unread? ${conversation.is_unread}`)),
      catchError(this.handleError<Conversation>(`markUnread conversation id=${conversation.id}`))
    );
  }

  markRead(conversation: Conversation): Observable<any> {
    return this.http.put(this.conversationsUrl, conversation, this.httpOptions)
    .pipe(
      tap(_ => console.log(`updated conversation ${conversation.id}: conversation is unread? ${conversation.is_unread}`)),
      catchError(this.handleError<Conversation>(`markRead conversation id=${conversation.id}`))
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
