import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Conversation, Message, User } from '../models';
import { ConversationService } from '../conversation.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-conversation-chatbox',
  templateUrl: './conversation-chatbox.component.html',
  styleUrls: ['./conversation-chatbox.component.scss']
})
export class ConversationChatboxComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() conversation!: Conversation;
  @ViewChild('chatbox') chatbox!: ElementRef;

  messages: Message[] = [];
  messageForm!: FormGroup;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  constructor(
    private conversationService: ConversationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder) {
      this.messageForm = this.formBuilder.group({
        content: ['', Validators.required],
      });
    }

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

    this.messageService
      .addMessage(conversation.id, user_id, content)
      .subscribe(message => {
        this.messages.push(message);
      });

    this.messageForm.reset();
    }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversation']) {
      this.messages = [];
      this.messages = this.conversation.messages;
      this.getMessages();
    }
  }

  getMessages(): void {
    this.messageService.getMessages(this.conversation.id)
      .subscribe(messages => {
        this.messages = messages;
      });
  }
}
