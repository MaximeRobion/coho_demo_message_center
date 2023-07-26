import { Component, Input } from '@angular/core';
import { Conversation, Message } from '../models';

@Component({
  selector: 'app-conversation-chatbox',
  templateUrl: './conversation-chatbox.component.html',
  styleUrls: ['./conversation-chatbox.component.css']
})
export class ConversationChatboxComponent {
  @Input() conversation?: Conversation;
  @Input() messages: Message[] = [];
}
