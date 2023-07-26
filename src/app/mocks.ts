import { Conversation, User, Message } from './models';

export const USERS: User[] = [
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

export const MESSAGES: Message[] = [
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
];

export const CONVERSATIONS: Conversation[] = [
    {
      id: 1,
      subject: 'Viewing Unit 1',
      address: '123 Main St, London',
      users: [USERS[0], USERS[1]],
      messages: [MESSAGES[0], MESSAGES[1], MESSAGES[2], MESSAGES[3], MESSAGES[4], MESSAGES[5], MESSAGES[6]],
      is_unread: true,
    },
    {
      id: 2,
      subject: 'Cleaning',
      address: 'Calle Covarrubias 26, Madrid',
      users: [USERS[0], USERS[2]],
      messages: [],
      is_unread: false,
    },
    {
      id: 3,
      subject: 'Moving in',
      address: '53 rue de la Fraternité, Fontenay-sous-bois',
      users: [USERS[0], USERS[1], USERS[2]],
      messages: [],
      is_unread: false,
    },
    {
      id: 4,
      subject: 'Viewing Unit 2',
      address: '123 Main St',
      users: [USERS[0], USERS[1]],
      messages: [],
      is_unread: false,
    },
];
