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
    messages: Message[];
    is_unread: boolean;
}

export interface Message {
  id: number;
  conversation_id: number;
  user_id: number;
  content: string;
  created_at: Date;
}
