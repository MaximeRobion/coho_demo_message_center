import { Component, Input } from '@angular/core';
import { Conversation, Message, User } from '../models';

@Component({
  selector: 'app-conversation-chatbox',
  templateUrl: './conversation-chatbox.component.html',
  styleUrls: ['./conversation-chatbox.component.scss']
})
export class ConversationChatboxComponent {
  @Input() conversation?: Conversation;
  @Input() messages: Message[] = [];

  findUserById(userId: number | null): User | undefined {
    if (userId === null) {
      return undefined;
    }
    return this.conversation?.users.find(user => user.id === userId);
  }

    // Method to check if the conversation is one-on-one
    isOneOnOneChat(conversation: Conversation): boolean {
      return conversation.users.length === 2;
    }
}
