import { Component, Input } from '@angular/core';
import { Conversation, Message } from '../models';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.scss']
})
export class ConversationDetailComponent {
  @Input() conversation?: Conversation;
  @Input() messages: Message[] = [];

  excludeCurrentUser(users: any[]): any[] {
    return users.filter((user) => !user.is_current_user);
  }

  markUnread(conversation: Conversation): void {
    // if conversation.is_unread is true, pass it to false, if false, pass it to true
    conversation.is_unread = !conversation.is_unread;
  }
}
