import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Conversation, Message } from '../models';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-conversation-chatbox',
  templateUrl: './conversation-chatbox.component.html',
  styleUrls: ['./conversation-chatbox.component.scss']
})
export class ConversationChatboxComponent implements OnInit, AfterViewChecked {
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
    private formBuilder: FormBuilder) {
      this.messageForm = this.formBuilder.group({
        content: ['', Validators.required],
      });
    }

  ngOnInit(): void {
    this.conversationService.getConversation(this.conversation.id).subscribe((conversation) => {
      this.conversation = conversation;
    });
  }

  isOneOnOneChat(conversation: Conversation): boolean {
    return conversation.users.length === 2;
  }

  add(): void {
    if (this.messageForm.invalid) {
      return;
    }

    const newMessage: Message = {
      id: this.conversation.messages.length + 1,
      user: this.conversation.users.find(u => u.is_current_user) || null,
      content: this.messageForm.value.content,
      created_at: new Date()
    };

    this.conversation.messages.push(newMessage);
    console.log('New message:', newMessage);
    this.conversationService.addMessageToConversation(this.conversation).subscribe();
    this.messageForm.reset();
  }
}
