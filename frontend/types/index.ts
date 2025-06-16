export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: User[];
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  created_by_id: string;
  created_by: User;
  created_at: string;
  participants: User[];
}

export interface Balance {
  userId: string;
  amount: number;
  type: 'owed' | 'owing';
} 