import { Component, OnInit } from '@angular/core';

import { Conversation, Property } from '../models';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {
  conversations: Conversation[] = [];
  selectedConversation?: Conversation;

  constructor(
    private conversationService: ConversationService ) { }

  ngOnInit(): void {
    this.getConversations();
  }

  getConversations(): void {
    this.conversationService.getConversations()
        .subscribe(conversations => {
          this.conversations = conversations
          console.log('Conversations:', conversations);
        });
  }

  onSelect(conversation: Conversation): void {
    this.selectedConversation = conversation;
    if (conversation.is_unread) {
      this.selectedConversation.is_unread = false;
      this.conversationService.markUnread(this.selectedConversation).subscribe();
    }
  }

  LastMessageDate(conversation: Conversation): Date {
    if (conversation.messages.length > 0) {
      return conversation.messages[conversation.messages.length - 1].created_at;
    } else {
      return conversation.created_at;
    }
  }

  excludeCurrentUser(users: any[]): any[] {
    return users.filter((user) => !user.is_current_user);
  }
}
