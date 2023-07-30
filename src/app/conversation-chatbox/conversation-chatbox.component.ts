import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Conversation, Message, User } from '../models';
import { ConversationService } from '../conversation.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-conversation-chatbox',
  templateUrl: './conversation-chatbox.component.html',
  styleUrls: ['./conversation-chatbox.component.scss']
})
export class ConversationChatboxComponent implements OnInit, OnChanges{
  @Input() conversation!: Conversation;

  messages: Message[] = [];
  messageForm!: FormGroup;


  constructor(
    private conversationService: ConversationService,
    private formBuilder: FormBuilder) {
      this.messageForm = this.formBuilder.group({
        content: ['', Validators.required],
      });
     }

  ngOnInit(): void {
    if (this.conversation) {
      this.messages = this.conversation.messages; // Preload messages from local data
      this.getMessages(); // Fetch and update latest messages from the server
    }
  }

  findUserById(userId: number | null): User | undefined {
    if (userId === null) {
      return undefined;
    }
    return this.conversation?.users.find(user => user.id === userId);
  }

  isOneOnOneChat(conversation: Conversation): boolean {
    return conversation.users.length === 2;
  }

  add(conversation: Conversation): void {
    if (this.messageForm.invalid) {
      return;
    }

    const content = this.messageForm.get('content')?.value.trim();
    if (!content) {
      return;
    }

    const user_id = conversation.users.find(user => user.is_current_user)?.id || null;

    this.conversationService
      .addMessage(conversation.id, user_id, content)
      .subscribe(message => {
        this.messages.push(message);

      });

    this.messageForm.reset();
    }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversation']) {
      this.getMessages();
    }
  }

  // Get the messages of the current conversation

  getMessages(): void {
    this.conversationService.getMessages(this.conversation.id)
      .subscribe(messages => {
        this.messages = messages;
      });
  }
}
