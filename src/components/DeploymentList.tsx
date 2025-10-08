interface Deployment {
  id: string;
  commitHash: string;
  branch: string;
  status: string;
  createdAt: string;
}

interface Props {
  deployments: Deployment[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function DeploymentList({ deployments, selectedId, onSelect }: Props) {
  if (deployments.length === 0) {
    return <p className="text-gray-500 p-2">No deployments found.</p>;
  }

  return (
    <div className="h-full overflow-y-auto p-2 flex flex-col gap-2">
      {deployments.map(dep => {
        // monochrome status color (optional subtle variations)
        const statusColor =
          dep.status === "Success"
            ? "text-green-500"
            : dep.status === "Failed"
            ? "text-red-500"
            : "text-gray-400";

        return (
          <div
            key={dep.id}
            onClick={() => onSelect(dep.id)}
            className={`cursor-pointer p-3 rounded-lg border
              transition-all duration-150
              ${dep.id === selectedId
                ? "border-white bg-gray-800 shadow-md"
                : "border-gray-700 bg-gray-900 hover:bg-gray-800"}
            `}
          >
            <div className="flex justify-between items-center">
              <p className="font-medium text-white truncate">{dep.commitHash || "No commit"}</p>
              <p className={`text-sm font-medium ${statusColor}`}>{dep.status}</p>
            </div>
            <div className="mt-1 flex justify-between items-center text-gray-400 text-sm">
              <span className="truncate">{dep.branch}</span>
              <span>{new Date(dep.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
