"use clientf"
import React, { useEffect, useRef, useState } from "react";


const DevToDeploy = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startDiv = container.querySelector<HTMLDivElement>(".start");
    const endDiv = container.querySelector<HTMLDivElement>(".end");
    if (!startDiv || !endDiv) return;

    const updatePath = () => {
      const startRect = startDiv.getBoundingClientRect();
      const endRect = endDiv.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const startX = startRect.left + startRect.width / 2 - containerRect.left;
      const startY = startRect.top + startRect.height / 2 - containerRect.top;
      const endX = endRect.left + endRect.width / 2 - containerRect.left;
      const endY = endRect.top + endRect.height / 2 - containerRect.top;

      const curve = `M ${startX} ${startY} C ${
        (startX + endX) / 2
      } ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`;
      setPath(curve);
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, []);

  return (
 <div
        ref={containerRef}
        className="relative flex-1 w-full h-64 rounded-xl p-4 flex items-center justify-center"
      >
        {/* Start and End points */}
        {/* Start point */}
        <div className="absolute start z-10 text-white font-semibold px-3 py-1 bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-lg shadow-md bottom-4 left-4 md:bottom-10 md:left-5 text-xs sm:text-sm md:text-base">
          Development
        </div>

        {/* End point */}
        <div className="absolute end z-10 text-white font-semibold px-3 py-1 bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-lg shadow-md top-4 right-4 md:top-10 md:right-5 text-xs sm:text-sm md:text-base">
          Deployment
        </div>

        {/* Connecting curved line with pulse */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Curved path */}
          <path
            d={path}
            stroke="white"
            strokeWidth="1"
            fill="transparent"
            id="motionPath"
          />

          {/* Glowing pulse circle */}
          <circle r="6" fill="#3B82F6" filter="url(#glow)">
            <animateMotion dur="5s" repeatCount="indefinite">
              <mpath href="#motionPath" />
            </animateMotion>
          </circle>

          {/* Glow filter */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
  )
}

export default DevToDeploy
