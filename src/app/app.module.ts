import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ConversationDetailComponent } from './conversation-detail/conversation-detail.component';
import { ConversationChatboxComponent } from './conversation-chatbox/conversation-chatbox.component';

@NgModule({
  declarations: [
    AppComponent,
    ConversationsComponent,
    ConversationDetailComponent,
    ConversationChatboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // <-- import the FormsModule before binding with [(ngModel)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
