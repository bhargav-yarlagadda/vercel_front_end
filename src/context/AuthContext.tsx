"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// --------------------
// Types
// --------------------
export type User = {
  login: string;
  avatar_url: string;
  name?: string;
  email?: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

// --------------------
// Create Context
// --------------------
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github/me`,
          { credentials: "include" } // sends cookies
        );

        if (!res.ok) {
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data?.user || null);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};