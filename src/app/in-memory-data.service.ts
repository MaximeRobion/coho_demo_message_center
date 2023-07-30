import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Conversation, User, Message } from './models';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 1,
        fullname: "Maxime Robion",
        email: 'max.robion@hey.com',
        description: 'Frontend Developer',
        photo: '../assets/pp_maxime.jpg',
        is_current_user: true,
      },
      {
        id: 2,
        fullname: 'Milan Walters',
        email: 'milan.walters@gmail.com',
        description: 'Male, Mid 20s, youth worker. "I can really pull a rabbit out of a hat”',
        photo: '../assets/pp_milan.jpg',
        is_current_user: false,
      },
      {
        id: 3,
        fullname: 'Charlotte Johnson',
        email: 'c.johnson@gmail.com',
        description: 'Introvert... but willing to discuss cats at length.',
        photo: '../assets/pp_charlotte.jpg',
        is_current_user: false,
      }
    ];
    const messages = [
      {
        id: 1,
        conversation_id:1,
        user_id: null,
        content: 'Zachery (zach*****@gmail.com) was invited to a viewing',
        created_at: new Date('2023-07-25 10:00:00'),
      },
      {
        id: 2,
        conversation_id:1,
        user_id: 1,
        content: 'Hey, how are you?',
        created_at: new Date('2023-07-25 10:30:00'),
      },
      {
        id: 2,
        conversation_id:1,
        user_id: 2,
        content: 'Hey, fine!',
        created_at: new Date('2023-07-25 12:30:00'),
      },
      {
        id: 3,
        conversation_id:1,
        user_id: 1,
        content: 'What time for the viewing?',
        created_at: new Date('2023-07-25 14:30:00'),
      },
      {
        id: 4,
        conversation_id:1,
        user_id: 2,
        content: '16h is fine for me!',
        created_at: new Date('2023-07-25 15:30:00'),
      },
      {
        id: 5,
        conversation_id:1,
        user_id: null,
        content: 'Date proposed: 16 July 2023 at 4:00 PM',
        created_at: new Date('2023-07-25 15:35:00'),
      },
      {
        id: 6,
        conversation_id:1,
        user_id: null,
        content: 'Date accepted: 16 July 2023 at 4:00 PM',
        created_at: new Date('2023-07-25 15:36:00'),
      },
      {
        id: 6,
        conversation_id:3,
        user_id: 3,
        content: 'Hey! I am interested in your flat. When can I visit it?',
        created_at: new Date('2023-07-27 09:36:00'),
      },
      {
        id: 7,
        conversation_id:3,
        user_id: 1,
        content: 'What would be the best for you? I am free this afternoon or tomorrow morning.',
        created_at: new Date('2023-07-27 09:40:00'),
      },
    ];
    const conversations = [
      {
        id: 1,
        subject: 'Viewing Unit 1',
        address: '123 Main St, London',
        users: [users[0], users[1]],
        messages: [messages[0], messages[1], messages[2], messages[3], messages[4], messages[5], messages[6]],
        is_unread: true,
      },
      {
        id: 2,
        subject: 'Cleaning',
        address: 'Calle Covarrubias 26, Madrid',
        users: [users[0], users[2]],
        messages: [],
        is_unread: false,
      },
      {
        id: 3,
        subject: 'Moving in',
        address: '53 rue de la Fraternité, Fontenay-sous-bois',
        users: [users[0], users[1], users[2]],
        messages: [messages[7], messages[8]],
        is_unread: false,
      },
      {
        id: 4,
        subject: 'Viewing Unit 2',
        address: '123 Main St',
        users: [users[0], users[1]],
        messages: [],
        is_unread: false,
      },
    ];

    return {users, messages, conversations};
  }

  genId<T extends User | Conversation | Message>(table: T[]): number {
    return table.length > 0 ? Math.max(...table.map(t => t.id)) + 1 : 1;
  }

  constructor() { }
}
