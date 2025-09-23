"use client";

import { useProjects } from "@/context/ProjectContext";
import React, { useEffect, useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  url: string;
}

interface AddProjectDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProjectDropdown: React.FC<AddProjectDropdownProps> = ({ onClose }) => {
  const { setProjects } = useProjects();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const perPage = 20;

  // Fetch GitHub repos
  const fetchRepos = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/github/user/repositories?page=${pageNumber}&per_page=${perPage}`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();

      if (!data.repos || data.repos.length < perPage) setHasMore(false);

      setRepos((prev) => [
        ...prev,
        ...data.repos.filter(
          (repo: Repo) => !prev.some((r) => r.id === repo.id)
        ),
      ]);
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasMore) fetchRepos(page);
  }, [fetchRepos, page, hasMore]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    observer.current.observe(observerRef.current);

    return () => observer.current?.disconnect();
  }, [loading, hasMore]);

  // Handle project creation
  const handleCreateProject = async (repo: Repo) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/create`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: repo.name,
            repoUrl: repo.url,
            buildCommands: ["npm install", "npm run build"],
            outputDir: "out",
          }),
        }
      );
      const data = await res.json();
      const {project:createdProject} = data 
      if (!res.ok) throw new Error(data.error || "Failed to create project");

      toast.success("Project created successfully!"); // ✅ Toast here
      setProjects((prev) => [
        ...prev,
        {
          id: createdProject.id,
          name: createdProject.name,
          repoUrl: createdProject.repoUrl,
          updatedAt: createdProject.updatedAt,
        },
      ]);

      onClose();
    } catch (err: any) {
      toast.error(err.message); // ❌ Error toast
    }
  };

  // Lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed w-full h-screen inset-0 z-[100] flex items-start justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose} // Close modal if user clicks outside
    >
      <div
        className="relative w-full max-w-md mt-24 bg-black backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white/10"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">
            Select a GitHub Repo
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-96 overflow-y-auto">
          {repos.map((repo) => (
            <button
              key={repo.id}
              className="w-full text-left px-6 py-3 border-b border-white/10 hover:bg-white/5 transition"
              onClick={() => handleCreateProject(repo)}
            >
              {repo.name}
            </button>
          ))}

          {loading && (
            <p className="text-white/50 text-center py-2">Loading...</p>
          )}
          {!hasMore && repos.length > 0 && (
            <p className="text-white/30 text-center py-2">
              No more repositories
            </p>
          )}

          <div ref={observerRef} />
        </div>
      </div>
    </div>
  );
};

export default AddProjectDropdown;
