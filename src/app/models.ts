export interface User {
  id: number;
  fullname: string;
  email: string;
  description: string;
  photo: string;
  is_current_user: boolean;
}

export interface Conversation {
    id: number;
    subject: string;
    address: string;
    users: User[];
}

export interface Notification {
  id: number;
  conversation: Conversation;
  content: string;
  created_at: Date;
}

export interface Message {
  id: number;
  conversation: Conversation;
  user_id: number;
  content: string;
  created_at: Date;
}
