import { ProjectData } from '@/types/github';

export interface PortfolioConfig {
  github: {
    username: string;
    excludeRepos?: string[];
    includeForked?: boolean;
    featuredRepos?: string[];
    maxRepos?: number;
  };
  projects: {
    autoUpdate?: boolean;
    cacheDuration?: number; // in minutes
    fallbackToStatic?: boolean;
    staticProjects?: ProjectData[];
  };
  display: {
    showStats?: boolean;
    showLanguages?: boolean;
    showLastUpdated?: boolean;
    defaultSort?: 'stars' | 'updated' | 'name' | 'featured';
  };
}

export const portfolioConfig: PortfolioConfig = {
  github: {
    username: 'arbitroy',
    excludeRepos: [
      'arbitroy', // Usually your username repo
      'dotfiles',
      'private-notes'
    ],
    includeForked: false,
    featuredRepos: ['myusiki', 'lunar_explorer', 'FashionFushion', 'Play4Good'],
    maxRepos: 50
  },
  projects: {
    autoUpdate: true,
    cacheDuration: 60, // Cache for 1 hour
    fallbackToStatic: true,
    staticProjects: [
      {
        id: '1',
        title: 'Myusiki Foundation Platform',
        des: 'A platform for creatives to be nurtured, network and promote their works',
        category: 'javascript - react',
        repo: 'https://github.com/arbitroy/myusiki',
        link: 'https://myusiki.org/'
      },
      {
        id: '2',
        title: 'Hungrima store management system',
        des: 'This an automation of the previous ledgerbook method to an efficient and increasing productivity',
        category: 'java - javaFx - materialFx - sqlite',
        repo: 'https://github.com/arbitroy/HUNGRIMA-STORE',
        link: 'https://github.com/arbitroy/HUNGRIMA-STORE'
      },
      {
        id: '3',
        title: 'FashionFushion',
        des: 'An ecommerce platform for tailors',
        category: 'react Native - pesapal - firebase - expressjs',
        repo: 'https://github.com/arbitroy/FashionFushion',
        link: 'https://expo.dev/accounts/austine_ndauwa/projects/fashion-fushion/builds/dd669812-81aa-4647-bb62-59bbf7bac522'
      },
      {
        id: '4',
        title: 'Lunar Explorer',
        des: 'The Lunar Explorer👾👩‍🚀 is an educational game that teaches👩‍🏫 players about moon phases through interactive puzzles. Players solve sliding puzzles to reveal images of different moon🌑🌒🌓🌛 phases and learn corresponding lunar facts.✨',
        category: 'java-javafx',
        repo: 'https://github.com/arbitroy/lunar_explorer',
        link: 'https://github.com/arbitroy/lunar_explorer'
      },
      {
        id: '5',
        title: 'Play4Good',
        des: 'Play4Good is an innovative platform that gamifies charitable giving and social impact. It allows users to support various causes through donations while engaging in friendly competition and team-based activities.',
        category: 'typescript - nextjs',
        repo: 'https://github.com/arbitroy/Play4Good',
        link: 'https://github.com/arbitroy/Play4Good'
      },
      {
        id: '6',
        title: 'Whatsapp_parser',
        des: "A lifesaver that automatically scoops up your daily confessions from WhatsApp, like \"Today, I sold my soul pushing spreadsheets and pretending to care about Steve's new 'game-changing' idea.\" It's your personal log of corporate servitude, perfect for remembering exactly how much of your sanity you've sacrificed for the company's bottom line—one chat at a time!",
        category: 'go',
        repo: 'https://github.com/arbitroy/whatsapp_parser',
        link: 'https://github.com/arbitroy/whatsapp_parserhttps://mapsapp.vercel.app'
      },
      {
        id: '7',
        title: 'Tabata timer',
        des: 'The Tabata Timer is a simple, customizable workout timer built using React, Vite, and Ele,ctron. It allows users to time their high-intensity interval training (HIIT) exercises, particularly suited for Tabata-style workouts.',
        category: 'electron - vite - react',
        repo: 'https://github.com/arbitroy/Tabata-timer',
        link: 'https://github.com/arbitroy/Tabata-timer'
      }
    ]
  },
  display: {
    showStats: true,
    showLanguages: true,
    showLastUpdated: true,
    defaultSort: 'featured'
  }
};
