import React from "react";
import ViewRepositories from "./ViewRepositories";

const DashboardConsole = () => {
  return (
    <div
    style={{scrollbarWidth:'none'}}
    className="grid min-h-[75vh] max-h-[90vh] overflow-y-scroll  px-4 grid-cols-1 md:grid-cols-4 gap-4">
      {/* Left Column: 1/3 width */}
      <div className="col-span-1 border border-white/20 my-6 rounded-md p-2">
        <ViewRepositories />
      </div>

      {/* Right Column: 2/3 width */}
      <div className="col-span-3 p-2">
        {/* Other dashboard content goes here */}
      </div>
    </div>
  );
};

export default DashboardConsole;
