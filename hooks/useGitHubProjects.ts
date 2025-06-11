import { useState, useEffect } from 'react';
import { GitHubService } from '@/lib/github';
import { ProjectData } from '@/types/github';
import { EnhancedGitHubService } from '@/lib/enhancedGitHub';

export function useGitHubProjects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  const refreshProjects = async () => {
    try {
      setLoading(true);
      const githubService = new EnhancedGitHubService();
      const projectData = await githubService.refreshProjects();
      setProjects(projectData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const githubService = new EnhancedGitHubService();
        const projectData = await githubService.getPortfolioProjects();
        setProjects(projectData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch projects'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error, refreshProjects };
}
