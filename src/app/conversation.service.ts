import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { Conversation } from './models';
import { CONVERSATIONS } from './mocks';

@Injectable({
  providedIn: 'root'
})

export class ConversationService {
  constructor() { }
  private selectedConversationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public selectedConversation$: Observable<any> = this.selectedConversationSubject.asObservable();

  setSelectedConversation(conversation: any): void {
    this.selectedConversationSubject.next(conversation);
  }

  clearSelectedConversation(): void {
    this.selectedConversationSubject.next(null);
  }

  getConversations(): Observable<Conversation[]> {
    const conversations = of(CONVERSATIONS);
    return conversations;
  }
}
