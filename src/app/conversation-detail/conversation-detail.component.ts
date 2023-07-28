import { Component, Input } from '@angular/core';
import { Conversation } from '../models';
import { Message } from '../models';

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
  }
