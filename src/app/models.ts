export interface Property {
  id: number;
  address: string;
  zipcode: string;
  city: string;
  country: string;
}

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
    users: User[];
    is_unread: boolean;
    property: Property;
    messages: Message[];
    created_at: Date;
}

export interface Message {
  id: number;
  user: User | null;
  content: string;
  created_at: Date;
}
