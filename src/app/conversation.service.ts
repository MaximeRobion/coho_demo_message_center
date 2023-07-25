import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Conversation } from './models';
import { CONVERSATIONS } from './mocks';

@Injectable({
  providedIn: 'root'
})

export class ConversationService {
  constructor() { }

  getConversations(): Observable<Conversation[]> {
    const conversations = of(CONVERSATIONS);
    return conversations;
  }
}
