"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import AddProject from "./AddProject";

const DashBoardNavbar = () => {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full py-2 sticky top-0 px-2 md:px-5 bg-[#091714] border-y border-white/10 flex items-center justify-between backdrop-blur-md">
      {/* Left: Logo + Username */}
      <div className="flex gap-2 flex-1 items-center min-w-0">
        <Image src={"/vercel.svg"} alt="" width={22} height={24} />
        <span className="text-white/75 font-mono text-sm md:text-base truncate">
          @{user?.username}&apos;s playground
        </span>
      </div>

      {/* Center: Search */}
      <div className="flex  flex-1 md:flex-[1.5] items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 hover:border-white/20 transition-colors min-w-0 w-full max-w-md sm:max-w-lg md:max-w-xl">
        <FaSearch />
        <input
          ref={inputRef}
          className="bg-transparent  focus:outline-none text-white placeholder-white/40 text-sm w-full"
          placeholder="Search Deployed Projects"
          type="text"
        />
        <div className="hidden sm:flex items-center gap-1">
          <kbd className="text-[10px] text-white/70 px-1.5 py-0.5 bg-white/5 border border-white/20 rounded-md">
            ⌘
          </kbd>
          <span className="text-white/50 text-[10px]">+</span>
          <kbd className="text-[10px] text-white/70 px-1.5 py-0.5 bg-white/5 border border-white/20 rounded-md">
            K
          </kbd>
        </div>
      </div>

      {/* Right: Add Project */}
      <div className="flex-1 justify-end flex items-center gap-2">
        {isModalOpen ? (
          <AddProject  isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false)}} />
        ) : (
          <button
          onClick={()=>{
            setIsModalOpen(true)
          }}
          className="flex cursor-pointer bg-white/90 text-black p-1 py-2 md:p-2 items-center justify-center gap-1 md:gap-2 rounded-md min-w-[40px] sm:min-w-[auto]">
            <FaPlus />
            <span className="md:text-[16px] text-xs">Add Project</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DashBoardNavbar;
