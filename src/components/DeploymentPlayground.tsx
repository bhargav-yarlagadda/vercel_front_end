interface Props {
  deployment: any;
}

export default function DeploymentPlayground({ deployment }: Props) {
  if (!deployment)
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a deployment
      </div>
    );

  return (
    <div className="p-6 h-full flex flex-col gap-6 bg-[#0d0d0d] text-white rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold truncate">{deployment.commitHash || "No commit"}</h2>
          <div className="flex gap-4 text-gray-400 text-sm">
            <span>Branch: <strong className="text-white">{deployment.branch}</strong></span>
            <span>Created: {new Date(deployment.createdAt).toLocaleString()}</span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-200">
          {deployment.status}
        </span>
      </div>

      {/* Deployment URL */}
      {deployment.url && (
        <div>
          <h3 className="text-sm text-gray-400 mb-1">Deployment URL</h3>
          <a
            href={deployment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:underline break-all"
          >
            {deployment.url}
          </a>
        </div>
      )}

      {/* Logs */}
      {deployment.logs && (
        <div className="flex-1">
          <h3 className="text-sm text-gray-400 mb-1">Logs</h3>
          <pre className="bg-[#1a1a1a] p-4 rounded-lg text-gray-200 overflow-auto h-64 whitespace-pre-wrap font-mono text-sm">
            {deployment.logs}
          </pre>
        </div>
      )}
    </div>
  );
}
