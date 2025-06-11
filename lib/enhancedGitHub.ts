import { portfolioConfig } from '@/config/portfolio.config';
import { ProjectData, GitHubRepo } from '@/types/github';
import { cacheManager } from './cache';
import { GitHubService } from './github';

export class EnhancedGitHubService extends GitHubService {
  private config = portfolioConfig;

  async getPortfolioProjects(): Promise<ProjectData[]> {
    const cacheKey = 'github_projects';

    // Check cache first
    if (!cacheManager.isExpired(cacheKey)) {
      const cached = cacheManager.get<ProjectData[]>(cacheKey);
      if (cached) {
        console.log('Returning cached projects');
        return cached;
      }
    }

    try {
      const projects = await this.fetchFreshProjects();

      // Cache the results
      cacheManager.set(cacheKey, projects, this.config.projects.cacheDuration);

      return projects;
    } catch (error) {
      console.error('Failed to fetch from GitHub:', error);

      // Fallback to static projects if enabled
      if (this.config.projects.fallbackToStatic) {
        console.log('Falling back to static projects');
        return this.config.projects.staticProjects || [];
      }

      throw error;
    }
  }

  private async fetchFreshProjects(): Promise<ProjectData[]> {
    const repos = await this.getRepositories();
    const projects: ProjectData[] = [];

    // Filter repos based on config
    const filteredRepos = repos.filter((repo) => {
      if (this.config.github.excludeRepos?.includes(repo.name)) return false;
      if (!this.config.github.includeForked && repo.fork) return false;
      return true;
    });

    // Limit number of repos
    const limitedRepos = filteredRepos.slice(0, this.config.github.maxRepos);

    for (const repo of limitedRepos) {
      if (!repo.description) continue;

      const languages = await this.getRepositoryLanguages(repo);
      const project: ProjectData = {
        id: repo.id.toString(),
        title: this.formatTitle(repo.name),
        des: repo.description,
        category: this.formatCategory(languages, repo.topics),
        repo: repo.html_url,
        link: repo.homepage || repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: Object.keys(languages)[0] || repo.language || 'Unknown',
        lastUpdated: repo.updated_at,
        featured: this.isFeaturedProject(repo)
      };

      projects.push(project);
    }

    return this.sortProjects(projects);
  }

  protected isFeaturedProject(repo: GitHubRepo): boolean {
    // Check if explicitly featured in config
    if (this.config.github.featuredRepos?.includes(repo.name)) {
      return true;
    }

    // Original featured logic
    const featuredKeywords = ['portfolio', 'webapp', 'fullstack', 'important'];
    const hasKeyword = featuredKeywords.some(
      (keyword) =>
        repo.name.toLowerCase().includes(keyword) ||
        repo.description?.toLowerCase().includes(keyword) ||
        repo.topics.includes(keyword)
    );

    return hasKeyword || repo.stargazers_count > 5;
  }

  private sortProjects(projects: ProjectData[]): ProjectData[] {
    const sortMethod = this.config.display.defaultSort || 'featured';

    return projects.sort((a, b) => {
      switch (sortMethod) {
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.stars || 0) - (a.stars || 0);

        case 'stars':
          return (b.stars || 0) - (a.stars || 0);

        case 'updated':
          return (
            new Date(b.lastUpdated || 0).getTime() -
            new Date(a.lastUpdated || 0).getTime()
          );

        case 'name':
          return a.title.localeCompare(b.title);

        default:
          return 0;
      }
    });
  }

  // Method to force refresh cache
  async refreshProjects(): Promise<ProjectData[]> {
    cacheManager.clear('github_projects');
    return this.getPortfolioProjects();
  }
}