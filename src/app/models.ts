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
