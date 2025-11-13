// Core Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Member extends User {}

export interface Group {
  id: string;
  name: string;
  description: string;
  created_at: string;
  created_by: string;
  members: Member[];
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paid_by: string;
  group_id: string;
  created_at: string;
  created_by: string;
}

export interface Settlement {
  id: string;
  from_user: string;
  to_user: string;
  amount: number;
  group_id: string;
  created_at: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Payment {
  id: string;
  settlement_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  completed_at?: string;
}

export interface Transaction {
  id: string;
  type: 'expense' | 'settlement' | 'payment';
  amount: number;
  description: string;
  created_at: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  related_id: string;
}

export interface Report {
  id: string;
  type: 'expense' | 'settlement' | 'payment';
  start_date: string;
  end_date: string;
  created_at: string;
  data: any; // This would be more specific based on the report type
}

// User Settings and Profile
export interface Settings {
  theme: 'light' | 'dark';
  currency: string;
  language: string;
  notifications: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
}

export interface Profile extends User {
  settings: Settings;
  created_at: string;
  updated_at: string;
}

// UI Component Types
export interface Button {
  type: 'expense' | 'settlement' | 'payment' | 'group';
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size: 'sm' | 'md' | 'lg';
  content: string;
  icon?: string;
  action: string;
  disabled: boolean;
  loading: boolean;
}

export interface Input {
  type: 'expense' | 'settlement' | 'payment' | 'group';
  variant: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' | 'file' | 'range' | 'hidden';
  size: 'sm' | 'md' | 'lg';
  placeholder: string;
  value: string;
  error?: string;
  disabled: boolean;
  required: boolean;
  readOnly: boolean;
  autoFocus: boolean;
}

export interface Modal {
  type: 'expense' | 'settlement' | 'payment' | 'group';
  title: string;
  content: any; // This would be more specific based on the modal type
  size: 'sm' | 'md' | 'lg' | 'xl';
  centered: boolean;
  backdrop: 'static' | 'dynamic';
  keyboard: boolean;
  show: boolean;
}

// Action Types
export interface Add {
  type: 'expense' | 'settlement' | 'payment' | 'group';
  data: any; // This would be more specific based on the add type
}

export interface Edit {
  type: 'expense' | 'settlement' | 'payment' | 'group';
  id: string;
  data: any; // This would be more specific based on the edit type
}

export interface Delete {
  type: 'expense' | 'settlement' | 'payment' | 'group';
  id: string;
  confirmation_required: boolean;
}

// Utility Types
export interface Sort {
  field: string;
  direction: 'asc' | 'desc';
}

export interface Filter {
  type: string;
  value: any;
}

export interface Error {
  code: string;
  message: string;
  details?: any;
}

export interface Success {
  message: string;
  details?: any;
}

export interface Loading {
  message: string;
  progress?: number;
} 