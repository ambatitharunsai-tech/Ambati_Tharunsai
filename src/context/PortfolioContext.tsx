import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  DEFAULT_PORTFOLIO_DATA,
  VERIFIED_GITHUB_FALLBACK_REPOS,
} from '../data/defaultPortfolioData';
import { GitHubRepoSummary, PortfolioData } from '../types/portfolio';

interface GitHubProfileStats {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  html_url: string;
}

interface PortfolioContextValue {
  data: PortfolioData;
  updateData: (updater: (prev: PortfolioData) => PortfolioData) => void;
  resetToDefaults: () => void;
  exportJson: () => string;
  importJson: (rawJson: string) => { ok: boolean; error?: string };
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  zenMode: boolean;
  setZenMode: React.Dispatch<React.SetStateAction<boolean>>;
  studioOpen: boolean;
  setStudioOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resumeModalOpen: boolean;
  setResumeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProjectId: string | null;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<string | null>>;
  githubRepos: GitHubRepoSummary[];
  githubProfile: GitHubProfileStats | null;
  githubLoading: boolean;
  githubStatus: 'live' | 'cached' | 'fallback';
  refreshGitHub: () => Promise<void>;
}

const STORAGE_KEY = 'ambati_tharun_sai_portfolio_v1';
const GITHUB_CACHE_KEY = 'ambati_tharun_sai_github_cache_v1';
const THEME_KEY = 'ambati_tharun_sai_theme_v1';

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PORTFOLIO_DATA,
          ...parsed,
          profile: {
            ...DEFAULT_PORTFOLIO_DATA.profile,
            ...(parsed.profile || {}),
          },
        };
      }
    } catch {
      // Fallback to verified defaults if localStorage is unavailable
    }
    return DEFAULT_PORTFOLIO_DATA;
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore
    }
    return 'dark';
  });

  const [zenMode, setZenMode] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [githubRepos, setGithubRepos] = useState<GitHubRepoSummary[]>(
    VERIFIED_GITHUB_FALLBACK_REPOS
  );
  const [githubProfile, setGithubProfile] = useState<GitHubProfileStats | null>({
    public_repos: 17,
    followers: 0,
    following: 0,
    avatar_url: 'https://avatars.githubusercontent.com/u/236998948?v=4',
    bio: 'AI & Web Development Enthusiast | Building projects with Python, Flask, and JavaScript',
    location: 'Narasaraopet, Andhra Pradesh, India',
    html_url: 'https://github.com/ambatitharunsai-tech',
  });
  const [githubLoading, setGithubLoading] = useState<boolean>(false);
  const [githubStatus, setGithubStatus] = useState<'live' | 'cached' | 'fallback'>('fallback');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore quota errors
    }
  }, [data]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const updateData = (updater: (prev: PortfolioData) => PortfolioData) => {
    setData((prev) => updater(prev));
  };

  const resetToDefaults = () => {
    setData(DEFAULT_PORTFOLIO_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const exportJson = () => {
    return JSON.stringify(data, null, 2);
  };

  const importJson = (rawJson: string): { ok: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(rawJson);
      if (!parsed || typeof parsed !== 'object' || !parsed.profile) {
        return { ok: false, error: 'Invalid JSON schema: missing profile object.' };
      }
      setData({
        ...DEFAULT_PORTFOLIO_DATA,
        ...parsed,
        profile: {
          ...DEFAULT_PORTFOLIO_DATA.profile,
          ...parsed.profile,
        },
      });
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Unable to parse JSON content.',
      };
    }
  };

  const refreshGitHub = async () => {
    const username = data.profile.githubUsername || 'ambatitharunsai-tech';
    setGithubLoading(true);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
      ]);

      if (userRes.ok && reposRes.ok) {
        const userJson = await userRes.json();
        const reposJson = await reposRes.json();
        if (Array.isArray(reposJson)) {
          const mapped: GitHubRepoSummary[] = reposJson.map((r: Record<string, unknown>) => ({
            id: Number(r.id),
            name: String(r.name || ''),
            full_name: String(r.full_name || ''),
            html_url: String(r.html_url || ''),
            description: r.description ? String(r.description) : null,
            language: r.language ? String(r.language) : null,
            stargazers_count: Number(r.stargazers_count || 0),
            forks_count: Number(r.forks_count || 0),
            updated_at: String(r.updated_at || new Date().toISOString()),
            homepage: r.homepage ? String(r.homepage) : null,
            topics: Array.isArray(r.topics) ? (r.topics as string[]) : [],
          }));
          const profileObj: GitHubProfileStats = {
            public_repos: Number(userJson.public_repos ?? mapped.length),
            followers: Number(userJson.followers ?? 0),
            following: Number(userJson.following ?? 0),
            avatar_url: String(
              userJson.avatar_url || 'https://avatars.githubusercontent.com/u/236998948?v=4'
            ),
            bio: userJson.bio ? String(userJson.bio) : null,
            location: userJson.location ? String(userJson.location) : null,
            html_url: String(userJson.html_url || `https://github.com/${username}`),
          };
          setGithubRepos(mapped);
          setGithubProfile(profileObj);
          setGithubStatus('live');
          try {
            localStorage.setItem(
              GITHUB_CACHE_KEY,
              JSON.stringify({
                timestamp: Date.now(),
                repos: mapped,
                profile: profileObj,
              })
            );
          } catch {
            // ignore
          }
          setGithubLoading(false);
          return;
        }
      }
      throw new Error('GitHub API rate limit or non-200 status');
    } catch {
      try {
        const cachedRaw = localStorage.getItem(GITHUB_CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (Array.isArray(cached.repos) && cached.repos.length > 0) {
            setGithubRepos(cached.repos);
            if (cached.profile) setGithubProfile(cached.profile);
            setGithubStatus('cached');
            setGithubLoading(false);
            return;
          }
        }
      } catch {
        // ignore
      }
      setGithubRepos(VERIFIED_GITHUB_FALLBACK_REPOS);
      setGithubStatus('fallback');
      setGithubLoading(false);
    }
  };

  useEffect(() => {
    refreshGitHub();
  }, [data.profile.githubUsername]);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetToDefaults,
        exportJson,
        importJson,
        theme,
        toggleTheme,
        zenMode,
        setZenMode,
        studioOpen,
        setStudioOpen,
        resumeModalOpen,
        setResumeModalOpen,
        selectedProjectId,
        setSelectedProjectId,
        githubRepos,
        githubProfile,
        githubLoading,
        githubStatus,
        refreshGitHub,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextValue => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used inside a PortfolioProvider');
  }
  return ctx;
};
