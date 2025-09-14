"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const cardsContent = [
  { title: "Portfolio Site", desc: "Your personal website deployed instantly.", status: "Live", color: "text-green-400" },
  { title: "Marketing Landing", desc: "Promote your app or product with a static page.", status: "Building", color: "text-yellow-400" },
  { title: "Blog", desc: "Share updates, articles, or announcements.", status: "Error", color: "text-red-400" },
  { title: "Docs", desc: "Technical documentation for your projects.", status: "Draft", color: "text-white/50" },
];

// 4 positions in a square 2x2
const positions = [
  { top: 0, left: 0 },
  { top: 0, left: 50 },
  { top: 50, left: 50 },
  { top: 50, left: 0 },
];

const LoginPage = () => {
  // only 4 cards
  const [order, setOrder] = useState([0, 1, 2, 3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder(prev => {
        const newOrder = [...prev];
        const last = newOrder.pop()!; // anticlockwise: move last to first
        newOrder.unshift(last);
        return newOrder;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex  items-center justify-center px-4 md:px-20 pb-10 text-white">
      <div className="flex flex-col md:flex-row w-full  bg-black rounded-xl overflow-hidden">
        {/* Left side */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-24 bg-black">
          <div className="relative w-full max-w-sm py-24 bg-black bg-opacity-90 border border-white/10 rounded-2xl p-8 flex flex-col items-center shadow-lg backdrop-blur-md z-10">
            <div className="mb-6 flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10L30 30H10L20 10Z" fill="white" />
                <path d="M20 15L25 25H15L20 15Z" fill="black" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4"><span className="font-kode-mono">Lume</span> Deploy</h1>
            <p className="text-sm text-white/70 text-center mb-6">Deploy your projects instantly. Sign in with GitHub to get started.</p>
            <Link
              className="bg-white p-2 items-center font-mono font-semibold justify-center gap-3 flex text-black rounded-md px-2"
              href={process.env.NEXT_PUBLIC_BACKEND_URL!+"/auth/github/login"}
            >
              Sign In With Github <FaGithub size={30}/>
            </Link>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 flex items-center p-2 justify-center  relative">
          <div className="relative w-full max-w-[400px] h-[400px]">
            {order.map((cardIdx, posIndex) => {
              const card = cardsContent[cardIdx];
              const pos = positions[posIndex];

              return (
                <motion.div
                  key={cardIdx}
                  initial={{ top: `${pos.top}%`, left: `${pos.left}%`, opacity: 0 }}
                  animate={{ top: `${pos.top}%`, left: `${pos.left}%`, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute w-[48%] h-[48%]"
                >
                  <div className="w-full h-full bg-white/5 border border-white/20 rounded-2xl shadow-lg backdrop-blur-xl flex flex-col justify-between p-4">
                    <h3 className="text-white font-semibold text-sm">{card.title}</h3>
                    <p className="text-white/50 text-xs">{card.desc}</p>
                    <span className={`${card.color} font-semibold text-sm`}>{card.status}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
