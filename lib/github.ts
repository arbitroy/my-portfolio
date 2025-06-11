import { useGitHubProjects } from '@/hooks/useGitHubProjects';
import { GitHubRepo, ProjectData } from '@/types/github';

export class GitHubService {
  private baseUrl = 'https://api.github.com';
  private username = 'arbitroy'; // Your GitHub username
  private token?: string;

  constructor(token?: string) {
    this.token = token; // Optional: for higher rate limits
  }

  private async fetchWithAuth(url: string) {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json'
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return response.json();
  }

  async getRepositories(): Promise<GitHubRepo[]> {
    const repos = await this.fetchWithAuth(
      `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=100`
    );

    // Filter out forks and archived repos
    return repos.filter(
      (repo: GitHubRepo) =>
        !repo.archived && !repo.disabled && repo.visibility === 'public'
    );
  }

  async getRepositoryLanguages(
    repo: GitHubRepo
  ): Promise<Record<string, number>> {
    return this.fetchWithAuth(repo.languages_url);
  }

  async getPortfolioProjects(): Promise<ProjectData[]> {
    const repos = await this.getRepositories();
    const projects: ProjectData[] = [];

    for (const repo of repos) {
      // Skip if no description
      if (!repo.description) continue;

      // Get languages for this repo
      const languages = await this.getRepositoryLanguages(repo);
      const mainLanguage =
        Object.keys(languages)[0] || repo.language || 'Unknown';

      // Convert to your project format
      const project: ProjectData = {
        id: repo.id.toString(),
        title: this.formatTitle(repo.name),
        des: repo.description,
        category: this.formatCategory(languages, repo.topics),
        repo: repo.html_url,
        link: repo.homepage || repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: mainLanguage,
        lastUpdated: repo.updated_at,
        featured: this.isFeaturedProject(repo)
      };

      projects.push(project);
    }

    // Sort by stars/last updated/featured status
    return projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.stars || 0) - (a.stars || 0);
    });
  }

  private formatTitle(repoName: string): string {
    return repoName
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private formatCategory(
    languages: Record<string, number>,
    topics: string[]
  ): string {
    const primaryLanguages = Object.keys(languages).slice(0, 3);
    const techs = [...primaryLanguages, ...topics].slice(0, 5);
    return techs.join(' - ').toLowerCase();
  }

  private isFeaturedProject(repo: GitHubRepo): boolean {
    // Define criteria for featured projects
    const featuredKeywords = ['portfolio', 'webapp', 'fullstack', 'important'];
    const hasKeyword = featuredKeywords.some(
      (keyword) =>
        repo.name.toLowerCase().includes(keyword) ||
        repo.description?.toLowerCase().includes(keyword) ||
        repo.topics.includes(keyword)
    );

    return hasKeyword || repo.stargazers_count > 5;
  }
}
