import { Component, Input } from '@angular/core';
import { Conversation, Message } from '../models';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.scss']
})
export class ConversationDetailComponent {
  @Input() conversation?: Conversation;
  @Input() messages: Message[] = [];

  constructor(private conversationService: ConversationService) { }

  excludeCurrentUser(users: any[]): any[] {
    return users.filter((user) => !user.is_current_user);
  }

  markUnread(): void {
    if (this.conversation) {
      this.conversation.is_unread = true;
      this.conversationService.markUnread(this.conversation).subscribe();
    }
  }
}
