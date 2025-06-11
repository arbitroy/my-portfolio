export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  languages_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  visibility: string;
  fork: boolean;
}

export interface ProjectData {
  id: string;
  title: string;
  des: string;
  category: string;
  repo: string;
  link: string;
  stars?: number;
  forks?: number;
  language?: string;
  lastUpdated?: string;
  featured?: boolean;
}
