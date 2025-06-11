import { useState } from 'react';
import { EnhancedGitHubService } from '@/lib/enhancedGitHub';
import { ProjectData } from '@/types/github';

interface ProjectsHeaderProps {
  onRefresh?: (projects: ProjectData[]) => void;
  showRefresh?: boolean;
}

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
  onRefresh,
  showRefresh = true
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;

    setIsRefreshing(true);
    try {
      const service = new EnhancedGitHubService();
      const freshProjects = await service.refreshProjects();
      onRefresh(freshProjects);
    } catch (error) {
      console.error('Failed to refresh projects:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <p className="text-gray-400 text-sm">
          Automatically synced from GitHub
        </p>
      </div>

      {showRefresh && (
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 rounded-lg text-white text-sm transition-colors"
        >
          <svg
            className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      )}
    </div>
  );
};
