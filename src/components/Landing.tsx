"use client";

import React from "react";

const Landing = () => {
  return (
    <div className="w-full  min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center text-white font-sans p-4 ">
      {/* Top Row */}
      <div className="grid text-wrapgrid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1200px] mb-6">
        {/* Left Card */}
        <div className="bg-black border border-white rounded-lg p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex text-wrap  items-start gap-2 text-sm">
              <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center">📂</div>
              <div>
                <div className="font-medium text-white">Connect Repo</div>
                <div className="text-white text-xs">
                  Link your GitHub, GitLab, or Bitbucket repo and deploy in seconds
                </div>
              </div>
            </div>

            <div className="flex text-wrap items-start gap-2 text-sm">
              <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center">⚡</div>
              <div>
                <div className="font-medium text-white">Instant Deploy</div>
                <div className="text-white text-xs">
                  Every push triggers a deployment, and preview URLs are generated automatically
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black text-wrap border border-white rounded p-2 text-white text-xs flex items-center gap-2">
            <span>+/</span>
            <span>/= Slash commands. Deploy, rollback, and manage projects quickly from CLI.</span>
          </div>
        </div>

        {/* Middle Card */}
        <div className="bg-black border text-wrap border-white rounded-lg p-4 flex flex-col gap-2">
          <div className="text-white text-xs">Project Previews</div>
          <div className="bg-black border border-white rounded p-2 text-white text-xs">
            View live previews of your branches before merging. Share with teammates or clients instantly.
          </div>
          <div className="text-white text-xs">Preview URLs make collaboration seamless.</div>
        </div>

        {/* Right Card */}
        <div className="bg-black text-wrap border border-white rounded-lg p-4 flex flex-col gap-2">
          <div className="text-white text-xs">Activity Feed. Stay up-to-date on deployments and changes.</div>
          <div className="bg-black border border-white rounded p-2 text-white text-xs flex flex-col gap-1">
            <div>project-alpha... Deployed • Main</div>
            <div>project-beta... Deploying • Feature-branch</div>
            <div>project-gamma... Failed • Main</div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1200px]">
        {/* Left Bottom Card */}
        <div className="bg-black border text-wrap border-white rounded-lg p-4 flex flex-col gap-2">
          <div className="font-medium text-xs text-white">Tasks</div>
          <div className="flex flex-col gap-2">
            <div className="bg-black border border-white rounded p-1 text-white text-xs">Add custom domain support</div>
            <div className="bg-black border border-white rounded p-1 text-white text-xs">Enable automatic rollbacks</div>
          </div>
          <div className="text-white text-xs">Manage deployment tasks and stay organized.</div>
        </div>

        {/* Middle Bottom Card */}
        <div className="bg-black border text-wrap border-white rounded-lg p-4 flex flex-col gap-2">
          <span className="text-xs  text-clip  text-wrap text-white font-mono border border-white rounded md:p-2">
            {`git clone https://github.com/user/project.git
cd project
vercel deploy --prod
`}
          </span>
          <div className="text-white text-xs">CLI Deployments. Push your code and deploy in seconds.</div>
        </div>

        {/* Right Bottom Card */}
        <div className="bg-black border border-white rounded-lg p-4 flex flex-col gap-2">
          <div className="text-white text-xs">
            Alice 2:30PM: The preview URL looks good for the new landing page!
          </div>
          <div className="text-white text-xs">Team Collaboration. Share deployments and gather feedback instantly.</div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
