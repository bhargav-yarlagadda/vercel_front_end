"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-[#F5EFE6] font-sans">
      {/* Left Section - GitHub Login */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full h-full rounded-2xl flex justify-center items-center bg-black">
          <Link
            className="bg-white rounded-md p-2 text-black flex items-center gap-2.5"
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github/login`}
          >
            Login With GitHub <FaGithub size={24} />
          </Link>
        </div>
      </div>

      {/* Right Section - Info / Visual */}
      <div className="flex-1 bg-black text-white flex items-center justify-center p-8 relative overflow-hidden shadow-lg">
        <div className="z-10 text-center">
          <div className="flex justify-center mb-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 10L30 30H10L20 10Z" fill="white" />
              <path d="M20 15L25 25H15L20 15Z" fill="black" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-2">Loom</h1>
          <p className="text-sm mb-4">Welcome to Loom</p>
          <p className="text-xs">
            Loom helps developers to build organized and well coded dashboards
            full of beautiful and rich modules. Join us and start building your
            application today.
          </p>
          <p className="text-xs mt-4">
            More than 17k people joined us, it’s your turn
          </p>

          <div className="mt-6 bg-gray-800 p-6 rounded-xl text-center">
            <p className="text-sm font-medium">
              Get your right job and right place apply now
            </p>
            <p className="text-xs mt-2">
              Be among the first founders to start run a business.
            </p>
            <div className="flex justify-center mt-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Image
                    key={i}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                    alt={`user${i + 1}`}
                    width={24}
                    height={24}
                    className="rounded-full -ml-2 border-2 border-white"
                  />
                ))}
              <span className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white -ml-2">
                +2
              </span>
            </div>
          </div>
        </div>

        {/* Diagonal Line Effect */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-transparent via-gray-700 to-transparent opacity-50 transform rotate-12"></div>
      </div>
    </div>
  );
};

export default Page;
