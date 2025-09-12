"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "./User";

export default function Navbar() {
  const { user, loading } = useAuth();

  console.log(user);
  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/vercel.svg" alt="logo" width={24} height={24} />
        <span className="font-kode-mono text-xl font-bold">Lume</span>
      </Link>

      {loading ? (
        <div
          className="w-[36] h-[36] rounded-full shadow-xl"
          style={{
            background: "linear-gradient(135deg, #00f5d4, #9b5de5, #ff006e)",
          }}
        />
      ) : user ? (
        <UserMenu
          login={user.login}
          name={user.name}
          avatar_url={user.avatar_url}
          email={user.email}
        />
      ) : (
        <Link
          href={process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/github/login"}
          className="bg-white text-black rounded-md py-2 px-4"
        >
          Log in
        </Link>
      )}
    </nav>
  );
}
