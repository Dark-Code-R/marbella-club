export type UserRole = 'admin' | 'public';

export interface User {
  id: number;
  email: string;
  password: string; // In a real app, this would be a hash
  role: UserRole;
}

// NOTE: This is a mock database. Do not use in production.
export const users: User[] = [
  { id: 1, email: 'admin@marbella.com', password: 'admin', role: 'admin' },
  { id: 2, email: 'cliente1@email.com', password: 'password', role: 'public' },
  { id: 3, email: 'cliente2@email.com', password: 'password', role: 'public' },
];
