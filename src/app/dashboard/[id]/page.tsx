"use client";

import Loading from "@/components/common/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DeploymentList from "@/components/DeploymentList";
import DeploymentPlayground from "@/components/DeploymentPlayground";
import CreateDeploymentModal from "@/components/CreateDeploymentModal";

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

  // ✅ Add these missing states
  const [deployments, setDeployments] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const selectedDeployment = deployments.find(d => d.id === selectedId);


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
        const res = await fetch(
          `${backendUrl}/projects/owner?projectId=${id}`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(
            errData.message || `Failed to fetch project: ${res.status}`
          );
        }
        const data: Project = await res.json();
        setProject(data);

        // ✅ Fetch deployments for this project
        const depRes = await fetch(`${backendUrl}/deployments/${id}`, {
          credentials: "include",
        });
        const depData = await depRes.json();
        setDeployments(depData.deployments || []);
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
    <div className="flex min-h-[400px]">
      {/* Left side: Deployment list */}
      <div className="w-1/4 border-r border-gray-200 flex flex-col">
        <button
          onClick={() => setModalOpen(true)}
          className="m-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create Deployment
        </button>
        <DeploymentList
          deployments={deployments}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {/* Right side: Playground */}
      <div className="w-3/4">
        <DeploymentPlayground deployment={selectedDeployment} />
      </div>

      {/* Modal */}
      <CreateDeploymentModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  projectId={project.id} // <-- missing in your code
  onDeploymentCreated={() => {
    // refresh deployments after modal creates one
; 
  }}
/>

    </div>
  );
};

export default Page;
