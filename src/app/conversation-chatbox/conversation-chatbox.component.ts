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

  // Preload messages from local data, then fetch and update latest messages from the server
  ngOnInit(): void {
    if (this.conversation) {
      this.messages = this.conversation.messages;
      this.getMessages();
    }
  }

  findUserById(userId: number | null): User | undefined {
    if (userId === null) {
      return undefined;
    }
    return this.conversation?.users.find(user => user.id === userId);
  }

  // Used to determine if the current conversation is a one-on-one chat
  isOneOnOneChat(conversation: Conversation): boolean {
    return conversation.users.length === 2;
  }

  // Add a message to the current conversation
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

  // OnChanges, clean the message array, load from association and then get the messages from the server
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversation']) {
      this.messages = [];
      this.messages = this.conversation.messages;
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
