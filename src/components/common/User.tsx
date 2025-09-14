"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiPlus, FiLogOut, FiTriangle ,FiSettings} from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { useAuth } from "@/hooks/useAuth";

interface UserProps {
  login: string;
  avatarUrl: string;
  name?: string;
  email?: string;
}

export const UserMenu: React.FC<UserProps> = ({
  login,
  avatarUrl,
  name,
  email,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setUser } = useAuth();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-20 inline-block" ref={dropdownRef}>
      {/* Avatar */}
      <Image
        src={avatarUrl}
        alt={`${login} avatar`}
        width={36}
        height={36}
        className="rounded-full cursor-pointer border"
        onClick={() => setOpen((prev) => !prev)}
      />

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-72 rounded-xl shadow-lg border border-gray-700 bg-white dark:bg-[#111] text-sm transition-all duration-200 origin-top-right ${
          open
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* User Info */}
        <div className="px-4 py-3 border-b border-gray-700">
          <p className="font-medium">{name || login}</p>
          {email && <p className="text-gray-500 truncate">{email}</p>}
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <MenuLink href="/dashboard" label="Dashboard" icon={<MdOutlineDashboard />} />
          <MenuLink href="/account" label="Account Settings"icon={<FiSettings/>} />
          <MenuLink href="/team/create" label="Create Team" icon={<FiPlus />} />
        </div>

        <div className="py-2 border-t border-gray-700">
          <MenuLink href="/" label="Home Page" icon={<FiTriangle />} />
          <MenuItem
            label="Log Out"
            callback={async () => {
              const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL!;
              const resp = await fetch(backendurl + "/auth/github/logout", {
                credentials: "include",
              });
              if (resp.ok) setUser(null);
            }}
            icon={<FiLogOut />}
          />
        </div>

        {/* CTA Button */}
        <div className="p-3 border-t border-gray-700">
          <button className="w-full py-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 font-medium">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
};

interface MenuItemProps {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  callback?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  shortcut,
  callback,
}) => (
  <div
    onClick={callback}
    className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
  >
    <span>{label}</span>
    <div className="flex items-center gap-2 text-gray-500 text-xs">
      {shortcut && <span>{shortcut}</span>}
      {icon}
    </div>
  </div>
);

// ✅ Reusable MenuLink component for Next.js links
interface MenuLinkProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  shortcut?: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({ label, href, icon, shortcut }) => (
  <Link
    href={href}
    className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
  >
    <span>{label}</span>
    <div className="flex items-center gap-2 text-gray-500 text-xs">
      {shortcut && <span>{shortcut}</span>}
      {icon}
    </div>
  </Link>
);
