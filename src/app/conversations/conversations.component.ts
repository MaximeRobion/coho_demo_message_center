import { Component } from '@angular/core';
import { Conversation } from '../models';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent {
  conversations: Conversation[] = [];
  selectedConversation?: Conversation;

  constructor(private conversationService: ConversationService) { }

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

  // Get the date of the last message
  // TODO: Listen to new messages and update this value

  LastMessage(conversation: Conversation): string {
    if (conversation.messages.length > 0) {
      const LastMessage = conversation.messages[conversation.messages.length - 1];
      return LastMessage.content;
    }
    return "";
  }

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
