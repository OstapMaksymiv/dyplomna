"use client";
import { User } from "@/types/types";
import { createContext, useState, useEffect } from "react";
type AuthContextType = {
  currentUser: User | null;
  updateUser: (data: { user: User | null; token: string }) => void;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  updateUser: () => {},
});
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const updateUser = (data: { user: User | null; token: string }) => {
    setCurrentUser(data.user);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
    } else {
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
