import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
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
  conversations$: Observable<Conversation[]> = this.conversationService.getConversations();
  filteredConversations: Conversation[] = [];
  selectedConversation?: Conversation;
  properties: Property[] = [];
  propertiesForm = new FormControl('');

  constructor(
    private conversationService: ConversationService ) { }

  ngOnInit(): void {
    this.getProperties();
    console.log('Properties Init:', this.properties);
    console.log('Conversations Init:', this.conversations$);
    console.log('Filtered Conversations Init:', this.filteredConversations);
    console.log('Selected Conversations Init:', this.filteredConversations);
  }

  getConversations(): void {
    this.conversationService.getConversations()
    // .subscribe((conversations) => {
    //   this.conversations = conversations;
      console.log('Conversations assigned in the component:', this.conversations$);
      console.log('Filtered conversations:', this.filteredConversations);
      console.log('Selected conversation:', this.selectedConversation);
    // });
  }

  getProperties(): void {
    this.conversationService.getProperties()
    .subscribe(properties => {
          this.properties = properties
          console.log('Properties assigned in the component:', properties);
    });
  }

  onConversationSelect(conversation: Conversation ): void {
    this.selectedConversation = conversation;
    console.log('Selected Conversation:', this.selectedConversation);
    if (conversation.is_unread) {
      this.selectedConversation.is_unread = false;
      this.conversationService.markRead(this.selectedConversation).subscribe();
    }
  }

  onPropertyFilter(selectedProperties: string | null): void {
    if (selectedProperties === null || selectedProperties.toString().trim() === '') {
      this.filteredConversations = []
      console.log('No properties selected, emptying filtered conversations', this.filteredConversations);
    }
    else {
      const propertyAddresses = selectedProperties.toString().split(',');
      console.log('Property Addresses for filter:', propertyAddresses);
      this.conversationService.getConversationsFilteredOnProperty(propertyAddresses)
      .subscribe((conversations) => {
        this.filteredConversations = conversations;
        console.log('Conversations Filtered:', this.filteredConversations)
      });
    }
  }

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
