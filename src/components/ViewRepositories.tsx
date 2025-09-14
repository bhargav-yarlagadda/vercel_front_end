"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import RepoCard from "./RepoCard";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  url: string;
  description: string;
  updated_at: string;
}

const LoadingRepos = () => (
  <div className="flex flex-col items-center justify-center py-6">
    <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
    <p className="text-white text-center text-sm">Fetching your repositories...</p>
  </div>
);

const ViewRepositories = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const perPage = 20;

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

      setRepos((prev) => {
        // Prevent duplicates by filtering out existing repo IDs
        const newRepos = data.repos.filter(
          (repo: Repo) => !prev.some((r) => r.id === repo.id)
        );
        return [...prev, ...newRepos];
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasMore) fetchRepos(page);
  }, [fetchRepos, page, hasMore]);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    if (observer.current) observer.current.disconnect(); // disconnect previous observer

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

  return (
    <div className="flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
      {repos.map((repo) => (
        <RepoCard key={repo.id} {...repo} />
      ))}

      {loading && <LoadingRepos />}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div ref={observerRef} />

      {!hasMore && repos.length > 0 && (
        <p className="text-white/50 text-center mt-2">No more repositories</p>
      )}
    </div>
  );
};

export default ViewRepositories;
