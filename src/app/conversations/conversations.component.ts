import { Component, OnInit } from '@angular/core';
import {FormControl } from '@angular/forms';
import { Conversation, Property } from '../models';
import { ConversationService } from '../conversation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {
  conversations: Conversation[] = [];
  selectedConversation?: Conversation;
  properties: Property[] = [];
  propertiesForm = new FormControl('');

  constructor(
    private conversationService: ConversationService ) { }

  ngOnInit(): void {
    this.getConversations();
    this.getProperties();
  }

  getConversations(): void {
    this.conversationService.getConversations().subscribe((conversations) => {
      this.conversations = conversations;
      console.log('Conversations:', conversations);
    });
  }

  getProperties(): void {
    this.conversationService.getProperties().subscribe(properties => {
          this.properties = properties
          console.log('Properties:', properties);
    });
  }

  onConversationSelect(conversation: Conversation): void {
    this.selectedConversation = conversation;
    if (conversation.is_unread) {
      this.selectedConversation.is_unread = false;
      this.conversationService.markUnread(this.selectedConversation).subscribe();
    }
  }

  onPropertyFilter(selectedProperties: string | null): void {
    if (selectedProperties === null || selectedProperties.toString().trim() === '') {
      this.getConversations();
      console.log('No properties selected, getting all conversations');
    } else {
      const propertyAddresses = selectedProperties.toString().split(',');
      this.conversationService
        .getConversationsFilteredOnProperty(propertyAddresses)
        .subscribe((conversations) => {
          this.conversations = conversations;
        });
    }
  }

  //TODO Updates date when new message is pushed into a conversation
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
