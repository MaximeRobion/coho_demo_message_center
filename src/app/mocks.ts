import { Conversation, User } from './models';

export const USERS: User[] = [
    {
        id:1,
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

export const CONVERSATIONS: Conversation[] = [
    {
      id: 1,
      subject: 'Viewing Unit 1',
      address: '123 Main St, London',
      users: [USERS[0], USERS[1]],
    },
    {
      id: 2,
      subject: 'Cleaning',
      address: 'Calle Covarrubias 26, Madrid',
      users: [USERS[0], USERS[2]],
    },
    {
      id: 3,
      subject: 'Moving in',
      address: '53 rue de la Fraternité, Fontenay-sous-bois',
      users: [USERS[0], USERS[1], USERS[2]],
    },
    {
      id: 4,
      subject: 'Viewing Unit 2',
      address: '123 Main St',
      users: [USERS[0], USERS[1]],
    },
];
