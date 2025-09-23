"use client";

import Loading from "@/components/common/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  repoUrl: string;
  updatedAt: string;
  [key: string]: any;
}

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const { user, loading } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid project ID.");
      setFetching(false);
      return;
    }

    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (!user) return;

    const fetchProject = async () => {
      setFetching(true);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;
      try {
        const res = await fetch(`${backendUrl}/projects/owner?projectId=${id}`, {
          credentials: "include",
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `Failed to fetch project: ${res.status}`);
        }
        const data: Project = await res.json();
        setProject(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch project.");
      } finally {
        setFetching(false);
      }
    };

    fetchProject();
  }, [id, user, loading, router]);

  if (loading || fetching) return <Loading />;

  if (error)
    return (
      <div className="p-4 min-h-[70vh] bg-[#0d0d0e] text-white">
        <p className="text-red-500">{error}</p>
      </div>
    );

  if (!project)
    return (
      <div className="p-4 min-h-[70vh] bg-[#0d0d0e] text-white">
        <p>No project found.</p>
      </div>
    );

  return (
  <div>
    
  </div>
  );
};

export default Page;
