"use client";

import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic import of DevToDeploy
const DevToDeploy = dynamic(() => import("../DevToDeploy"), {
  ssr: false, // ensures it only renders on the client,else it will throw Tree mismatch issues
});

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-[50vh] bg-[#0f1313] border-t border-gray-800 px-6 py-10 md:px-24 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
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
      <DevToDeploy />
    </footer>
  );
};

export default Footer;
