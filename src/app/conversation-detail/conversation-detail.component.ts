import { Component, Input } from '@angular/core';
import { Conversation } from '../models';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.css']
})
export class ConversationDetailComponent {
  @Input() conversation?: Conversation;
}
