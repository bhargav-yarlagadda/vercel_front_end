"use client";
import { useEffect, useState } from "react";

type User = {
  login: string;
  avatar_url: string;
  name?: string;
  email?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL! + "/auth/github/me",
          { credentials: "include" } // 👈 sends cookies
        );
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log(err)
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
