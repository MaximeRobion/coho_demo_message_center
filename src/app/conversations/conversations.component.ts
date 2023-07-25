import { Component } from '@angular/core';
import { Conversation } from '../models';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent {
  conversations: Conversation[] = [];

  selectedConversation?: Conversation;
  onSelect(conversation: Conversation): void {
    this.selectedConversation = conversation;
  }

  constructor(private conversationService: ConversationService) { }

  getConversations(): void {
    this.conversationService.getConversations()
        .subscribe(conversations => this.conversations = conversations);
  }

  ngOnInit(): void {
    this.getConversations();
  }
}
