"use client";

export default function Hero() {
  return (
    <div className="min-h-[70vh] w-[100%] mx-auto bg-[#0d0d0d] text-white flex items-center justify-center relative overflow-hidden ">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Radial Glow */}

      {/* Content Card */}
      <div className="relative border z-10 border-white/10 bg-black/70 backdrop-blur-md rounded-xl md:w-3/4 w-full md:max-w-4xl p-12 ">
        <h1 className="text-5xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
          Build and deploy on the Cloud.
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
          <span className="font-kode-mono font-bold">Lume</span> provides the developer tools and cloud infrastructure to build,
          scale, and secure a faster, more personalized web.
        </p>

        {/* Call to Action */}
        <div className="mt-8 flex flex-col sm:flex-row sm:gap-4 gap-3 w-full max-w-md mx-auto sm:mx-0">
          <button className="w-full cursor-pointer sm:w-auto px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition">
            Start Deploying
          </button>
          <button className="w-full cursor-pointer sm:w-auto px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition">
            Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
