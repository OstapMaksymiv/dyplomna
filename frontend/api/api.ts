import { Transaction, User } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"; // заміни, якщо інша адреса

// ✅ Хелпер для fetch-запитів
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store", // особливо для SSR у Next.js
  });

  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    
    throw new Error(error.message || "Request failed");
  }

  return res.json();
}

// 🔐 Аутентифікація
export const authApi = {
  register: (email: string, password: string ) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }),

  login: (email: string, password: string ) =>
    request<{ user: User | null; token: string; }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};

// 💸 Транзакції
export const transactionApi = {
  getAll: (token: string | null) =>
  request<Transaction[]>(`/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  }),

  create: (data: any, token: string) =>
    request("/transactions", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// 🏷️ Категорії
export const categoryApi = {
  getAll: (token: string) =>
    request("/categories", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  create: (data: any, token: string) =>
    request("/categories", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// 💰 Бюджети
export const budgetApi = {
  getAll: (token: string) =>
    request("/budgets", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  create: (data: any, token: string) =>
    request("/budgets", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),
};
