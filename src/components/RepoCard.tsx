"use client";

import Link from "next/link";
import React from "react";
import { FaLock } from "react-icons/fa";

interface RepoProps {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  url: string;
  description: string;
  updated_at: string;
}

const RepoCard: React.FC<RepoProps> = ({
  name,
  full_name,
  private: isPrivate,
  url,
  description,
  updated_at,
}) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col -z-10 justify-between w-full p-4 border border-white/5 rounded-lg bg-white/2 backdrop-blur-sm hover:bg-white/5 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      {/* Top: Name + Lock Icon */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-white font-medium text-sm md:text-base truncate">
          {name}
        </h3>
        {isPrivate && <FaLock color="grey"/>}
      </div>

      {/* Middle: Description */}
      {description && (
        <p className="text-white/50 text-xs md:text-sm line-clamp-2 mb-2">
          {description}
        </p>
      )}

      {/* Bottom: Full name + updated date */}
      <div className="flex items-center justify-between text-white/40 text-[10px] md:text-xs">
        <span className="truncate">{full_name}</span>
        <span>Updated {new Date(updated_at).toLocaleDateString()}</span>
      </div>
    </Link>
  );
};

export default RepoCard;
