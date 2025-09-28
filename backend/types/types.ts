export interface User {
  id: string;
  email: string;
  password: string;
  transactions: Transaction[]; // відношення
  categories: Category[];
  budgets: Budget[];
}

export interface Transaction {
  id: string;
  amount: number;
  type: string; // у Prisma schema це просто String, не enum
  date: Date; // Prisma DateTime, але з MongoDB — буде ISO string
  note?: string;
  userId: string;
  categoryId: string;
  user?: User;         // опційно: для включення
  category?: Category; // опційно
}

export interface Category {
  id: string;
  name: string;
  type: string; // також просто String у Prisma
  userId: string;
  user?: User;
  transactions?: Transaction[];
  budgets?: Budget[];
}

export interface Budget {
  id: string;
  limit: number;
  current: number;
  userId: string;
  categoryId: string;
  user?: User;
  category?: Category;
}
