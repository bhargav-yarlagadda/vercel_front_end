"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface ProjectProps {
  project_id: string;
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
    <div className="bg-[#0d0d0d] text-white rounded-lg p-4 w-[420px] border border-neutral-800 shadow-md">
      {/* Whole card clickable */}
      <Link href={`/dashboard/${project_id}`} className="block">
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo circle */}
            <div className="rounded-full bg-white w-9 h-9 flex items-center justify-center">
              <Image src="/next.svg" alt="" width={33} height={33} />
            </div>
            <div>
              <h2 className="font-semibold">{project_name}</h2>
              <p className="text-sm text-gray-400 truncate">{project_url}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
          <span>Last updated on {updated_at}</span>
        </div>
      </Link>

      {/* External links outside main Link */}
      <div className="mt-3 flex items-center justify-between">
        <Link
          href={project_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:underline truncate"
        >
          Visit Project
        </Link>
        <Link
          href={github_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-400 hover:underline"
        >
          <FaGithub /> GitHub
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
