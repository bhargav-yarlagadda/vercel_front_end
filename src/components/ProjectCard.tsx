"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface ProjectProps {
  project_id:string,
  project_name: string;
  project_url: string;
  github_url: string;
  updated_at: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  project_id,
  project_name,
  project_url,
  github_url,
  updated_at,

}) => {
  return (
    <Link
    href={`/dashboard/${project_id}`}
    className="bg-[#0d0d0d] text-white rounded-lg p-4 w-[420px] border border-neutral-800 shadow-md">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo circle */}
          <div className="rounded-full bg-white w-9 h-9 flex items-center justify-center ">
            <Image src='/next.svg' alt="" width={33} height={33} />
          </div>
          <div>
            <h2 className="font-semibold">{project_name}</h2>
            <Link
              href={project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:underline"
            >
              {project_url}
            </Link>
          </div>
        </div>

        {/* Status Icon */}
        
      </div>

      {/* GitHub link */}
      <div className="mt-3 flex items-center gap-2 text-gray-300">
        <FaGithub />
        <Link
          href={github_url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate hover:underline"
        >
          {github_url}
        </Link>
      </div>

      {/* Commit message */}

      {/* Footer */}
      <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
        <span className="flex gap-2 items-center">Last updated on {updated_at} </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
