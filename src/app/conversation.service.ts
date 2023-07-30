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
  private messagesUrl = 'api/messages';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private selectedConversationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public selectedConversation$: Observable<any> = this.selectedConversationSubject.asObservable();

  setSelectedConversation(conversation: any): void {
    this.selectedConversationSubject.next(conversation);
  }

  clearSelectedConversation(): void {
    this.selectedConversationSubject.next(null);
  }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.conversationsUrl)
    .pipe(
      tap(_ => console.log('fetched conversations')),
      catchError(this.handleError<Conversation[]>('getConversations', []))
    );
  }

  getMessages(conversationId: number): Observable<Message[]> {
    const url = `${this.messagesUrl}/?conversation_id=${conversationId}`;
    return this.http.get<Message[]>(url)
    .pipe(
      tap(_ => console.log(`fetched messages for conversation ${conversationId}: ${JSON.stringify(_)}`)),
      catchError(this.handleError<Message[]>(`getMessages conversation_id=${conversationId}`, []))
    );
  }

  addMessage(conversationId: number, userId: number | null, content: string): Observable<Message> {
    const created_at = new Date();
    const message: Omit<Message, 'id'> = { conversation_id: conversationId, user_id: userId, content, created_at };

    return this.http.post<Message>(this.messagesUrl, message, this.httpOptions)
    .pipe(
      tap((newMessage: Message) => console.log(`added message "${newMessage.content}" (id:${newMessage.id}, created_at: ${newMessage.created_at}) to conversation ${newMessage.conversation_id}`)),
      catchError(this.handleError<Message>('addMessage'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);

    };
  }

}
