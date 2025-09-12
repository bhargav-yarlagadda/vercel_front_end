"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startDiv = container.querySelector<HTMLDivElement>(".start");
    const endDiv = container.querySelector<HTMLDivElement>(".end");
    if (!startDiv || !endDiv) return;

    const updatePath = () => {
      const startRect = startDiv.getBoundingClientRect();
      const endRect = endDiv.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const startX = startRect.left + startRect.width / 2 - containerRect.left;
      const startY = startRect.top + startRect.height / 2 - containerRect.top;
      const endX = endRect.left + endRect.width / 2 - containerRect.left;
      const endY = endRect.top + endRect.height / 2 - containerRect.top;

      const curve = `M ${startX} ${startY} C ${
        (startX + endX) / 2
      } ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`;
      setPath(curve);
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, []);

  return (
    <footer className="absolute bottom-0 w-full bg-[#0f1313] border-t border-gray-800 px-6 py-10 md:px-24 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
      {/* Left Side */}
      <div className="flex flex-1 flex-col gap-4 w-full md:w-auto items-center md:items-start text-center md:text-left">
        <span className="font-kode-mono text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-extrabold text-gray-600 leading-none">
          Lume
        </span>
        <p className="flex flex-wrap justify-center md:justify-start items-center gap-2 font-kode-mono text-gray-400 text-sm sm:text-base">
          <span>made with</span>
          <FaHeart color="red" />
          <span>
            by{" "}
            <Link
              className="underline hover:text-white transition"
              href="https://github.com/bhargav-yarlagadda"
              target="_blank"
            >
              bhargav
            </Link>.
          </span>
        </p>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Deploying ideas seamlessly, one commit at a time.
        </p>
      </div>

      {/* Right Side – Visual Concept */}
      <div
        ref={containerRef}
        className="relative flex-1 w-full h-64 rounded-xl p-4 flex items-center justify-center"
      >
        {/* Start and End points */}
        {/* Start point */}
        <div className="absolute start z-10 text-white font-semibold px-3 py-1 bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-lg shadow-md bottom-4 left-4 md:bottom-10 md:left-5 text-xs sm:text-sm md:text-base">
          Development
        </div>

        {/* End point */}
        <div className="absolute end z-10 text-white font-semibold px-3 py-1 bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-lg shadow-md top-4 right-4 md:top-10 md:right-5 text-xs sm:text-sm md:text-base">
          Deployment
        </div>

        {/* Connecting curved line with pulse */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Curved path */}
          <path
            d={path}
            stroke="white"
            strokeWidth="1"
            fill="transparent"
            id="motionPath"
          />

          {/* Glowing pulse circle */}
          <circle r="6" fill="#3B82F6" filter="url(#glow)">
            <animateMotion dur="5s" repeatCount="indefinite">
              <mpath href="#motionPath" />
            </animateMotion>
          </circle>

          {/* Glow filter */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
