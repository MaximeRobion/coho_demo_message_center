import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationChatboxComponent } from './conversation-chatbox.component';

describe('ConversationChatboxComponent', () => {
  let component: ConversationChatboxComponent;
  let fixture: ComponentFixture<ConversationChatboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConversationChatboxComponent]
    });
    fixture = TestBed.createComponent(ConversationChatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
