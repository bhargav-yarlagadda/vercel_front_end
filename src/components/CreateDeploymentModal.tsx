"use client";

import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  onDeploymentCreated?: () => void;
}

export default function CreateDeploymentModal({
  isOpen,
  onClose,
  projectId,
  onDeploymentCreated,
}: Props) {
  const [branch, setBranch] = useState("");

  const [branches, setBranches] = useState<string[]>([]);
  const [buildCommandInput, setBuildCommandInput] = useState("");
  const [buildCommands, setBuildCommands] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!; // Base URL from env

  // Fetch branches from backend when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const fetchBranches = async () => {
      try {
        const res = await fetch(
          `${backendUrl}/github/user/branches/${projectId}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch branches");
        }

        setBranches(data.branches || []);
        if (data.branches && data.branches.length > 0) {
          setBranch(data.branches[0]); // default to first branch
        }
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || "Failed to fetch branches");
      }
    };

    fetchBranches();
  }, [isOpen, projectId, backendUrl]);

  const handleAddCommand = () => {
    const trimmed = buildCommandInput.trim();
    if (trimmed && !buildCommands.includes(trimmed)) {
      setBuildCommands([...buildCommands, trimmed]);
      setBuildCommandInput("");
    }
  };

  const handleRemoveCommand = (cmd: string) => {
    setBuildCommands(buildCommands.filter((c) => c !== cmd));
  };

  const handleSubmit = async () => {
    if (!branch) {
      toast.error("Branch is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${backendUrl}/deployments/create?projectId=${projectId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            branch,
            buildCommands,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.error || "Failed to create deployment");
      }

      toast.success("Deployment created successfully!");
      setBuildCommands([]);
      setBuildCommandInput("");
      onClose();
      onDeploymentCreated?.();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-center items-center bg-transparent bg-opacity-60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-[#0d0d0e] w-96 rounded-lg shadow-2xl border border-[#222] p-6"
            >
              <h2 className="text-white font-bold text-2xl mb-6">
                Create Deployment
              </h2>

              <div className="flex flex-col gap-4">
                {/* Branch Dropdown */}
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="bg-[#1a1a1a] text-white placeholder-gray-500 border border-[#333] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                {/* Build Commands */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {buildCommands.map((cmd) => (
                      <motion.div
                        key={cmd}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded-full text-sm shadow-sm"
                      >
                        {cmd}
                        <button
                          className="w-4 h-4 cursor-pointer hover:text-gray-400"
                          onClick={() => handleRemoveCommand(cmd)}
                        >
                          <AiOutlineClose />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add build command"
                      value={buildCommandInput}
                      onChange={(e) => setBuildCommandInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddCommand()}
                      className="flex-1 bg-[#1a1a1a] text-white placeholder-gray-500 border border-[#333] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <button
                      onClick={handleAddCommand}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-md text-white font-semibold transition-all"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-md font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-md font-semibold transition-all disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
