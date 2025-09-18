"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  name: string;
  repoUrl?: string;
  updatedAt: string;
}

const DashboardPlaygound = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const getUserProjects = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;
    setLoading(true);

    try {
      const resp = await fetch(`${backendUrl}/projects`, {
        credentials: "include",
      });
      if (!resp.ok) throw new Error(`Failed to fetch projects: ${resp.status}`);
      const data = await resp.json();

      // Only extract essential fields
      const projectArray: Project[] = (data.projects || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        repoUrl: p.repoUrl,
        updatedAt: p.updatedAt,
      }));

      setProjects(projectArray);
    } catch (error: any) {
      console.error("Error fetching projects:", error.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProjects();
  }, []);

  return (
    <div className="w-full flex flex-col overflow-y-auto h-full p-2">
      <div className="h-fit py-2">
        <span className="font-thin text-xl">Projects</span>
      </div>

      <div className="flex flex-wrap gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project_id={project.id}
              project_name={project.name}
              project_url={project.repoUrl || "#"}
              github_url={project.repoUrl || "#"}
              updated_at={new Date(project.updatedAt).toLocaleDateString()}
            />
          ))
        ) : !loading ? (
          <p className="text-gray-400 mt-4">No projects found</p>
        ) : null}
      </div>
    </div>
  );
};

export default DashboardPlaygound;
