import { Component, Input } from '@angular/core';
import { Conversation } from '../models';
import { MESSAGES, NOTIFICATIONS } from '../mocks';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.css']
})
export class ConversationDetailComponent {
  @Input() conversation?: Conversation;
  MESSAGES = MESSAGES;
  NOTIFICATIONS = NOTIFICATIONS;
}
