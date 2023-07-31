import { Component, OnInit, OnDestroy } from '@angular/core';

import { Conversation } from '../models';
import { ConversationService } from '../conversation.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {
  conversations: Conversation[] = [];
  selectedConversation?: Conversation;

  constructor(
    private conversationService: ConversationService,
    private messageService: MessageService ) { }

  ngOnInit(): void {
    this.getConversations();
  }

  getConversations(): void {
    this.conversationService.getConversations()
        .subscribe(conversations => this.conversations = conversations);
  }

  onSelect(conversation: Conversation): void {
    this.selectedConversation = conversation;
  }

  // TODO: Listen to new messages and update this value
  LastMessageDate(conversation: Conversation): Date | null {
    if (conversation.messages.length > 0) {
      const LastMessage = conversation.messages[conversation.messages.length - 1];
      return LastMessage.created_at;
    }
    return null;
  }

  excludeCurrentUser(users: any[]): any[] {
    return users.filter((user) => !user.is_current_user);
  }
}
