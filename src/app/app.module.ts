import { Component, NgModule } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// HTTP Requests
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatLineModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ConversationDetailComponent } from './conversation-detail/conversation-detail.component';
import { ConversationChatboxComponent } from './conversation-chatbox/conversation-chatbox.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ConversationsComponent,
    ConversationDetailComponent,
    ConversationChatboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NgFor,
    MatListModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatLineModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
