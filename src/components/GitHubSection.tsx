import React, { useState } from 'react';
import { ArrowUpRight, GitFork, Github, RefreshCw, Search, Star } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const GitHubSection: React.FC = () => {
  const { data, githubRepos, githubProfile, githubLoading, githubStatus, refreshGitHub } =
    usePortfolio();
  const [selectedLang, setSelectedLang] = useState<string>('All');
  const [repoSearch, setRepoSearch] = useState<string>('');
  const [showAllRepos, setShowAllRepos] = useState<boolean>(false);

  const uniqueLanguages = Array.from(
    new Set(githubRepos.map((r) => r.language).filter((l): l is string => Boolean(l)))
  );

  const filteredRepos = githubRepos.filter((repo) => {
    const matchesLang = selectedLang === 'All' || repo.language === selectedLang;
    const q = repoSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      repo.name.toLowerCase().includes(q) ||
      (repo.description && repo.description.toLowerCase().includes(q));
    return matchesLang && matchesSearch;
  });

  const visibleRepos = showAllRepos ? filteredRepos : filteredRepos.slice(0, 8);

  return (
    <section
      id="github"
      className="py-20 sm:py-24 px-6 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#060B16]"
    >
      <div className="max-w-[1360px] mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-wider text-blue-600 dark:text-cyan-400">
              05. LIVE GITHUB REPOSITORY EXPLORER
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
              style={{ textWrap: 'balance' }}
            >
              Open-Source Codebase & Public Repository Activity
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Synchronized directly with{' '}
              <a
                href={data.profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-blue-600 dark:text-cyan-400 hover:underline"
              >
                github.com/{data.profile.githubUsername}
              </a>
              —displaying verified public repositories, primary languages, and recent commits with
              rate-limit resilience.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={refreshGitHub}
              disabled={githubLoading}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-500 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${githubLoading ? 'animate-spin' : ''}`} />
              <span>{githubLoading ? 'Syncing GitHub...' : 'Sync GitHub API'}</span>
            </button>

            <a
              href={data.profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-blue-600 text-white hover:bg-slate-800 dark:hover:bg-blue-500 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Open GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* GitHub Profile Summary Bar */}
        <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 flex items-center gap-4">
            <img
              src={
                githubProfile?.avatar_url ||
                'https://avatars.githubusercontent.com/u/236998948?v=4'
              }
              alt={data.profile.githubUsername}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-xl border border-slate-200 dark:border-slate-700 object-cover shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white truncate">
                  {data.profile.fullName}
                </h3>
                <span className="font-mono text-xs text-blue-600 dark:text-cyan-400">
                  @{data.profile.githubUsername}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                {githubProfile?.bio ||
                  'AI & Web Development Enthusiast | Building projects with Python, Flask, and JavaScript'}
              </p>
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
            <div>
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">PUBLIC REPOS</p>
              <p className="font-display text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">
                {githubProfile?.public_repos ?? githubRepos.length}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">LANGUAGES</p>
              <p className="font-display text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">
                {uniqueLanguages.length || 5}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">DATA SOURCE</p>
              <p className="font-mono text-xs font-semibold text-blue-600 dark:text-cyan-400 mt-2 uppercase">
                {githubStatus === 'live'
                  ? 'Live GitHub REST API'
                  : githubStatus === 'cached'
                    ? 'Cached API Snapshot'
                    : 'Verified Repo Snapshot'}
              </p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800">
            {['All', ...uniqueLanguages].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedLang === lang
                    ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={repoSearch}
              onChange={(e) => setRepoSearch(e.target.value)}
              placeholder="Search repositories..."
              aria-label="Search GitHub repositories"
              className="w-full sm:w-64 pl-9 pr-3.5 py-1.5 text-xs sm:text-sm rounded-lg bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleRepos.map((repo) => {
            const formattedDate = repo.updated_at ? repo.updated_at.slice(0, 10) : '';
            return (
              <a
                key={repo.id || repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-cyan-400 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="text-blue-600 dark:text-cyan-400 font-semibold">
                      {repo.language || 'Repository'}
                    </span>
                    <span className="tabular-nums">{formattedDate}</span>
                  </div>

                  <h4 className="font-display text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors flex items-center justify-between gap-1">
                    <span className="truncate">{repo.name}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100" />
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {repo.description ||
                      `Public software engineering repository (${repo.name}) maintained by Ambati Tharun Sai.`}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                  <span>GitHub ↗</span>
                </div>
              </a>
            );
          })}
        </div>

        {filteredRepos.length > 8 && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setShowAllRepos((prev) => !prev)}
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-500 transition-colors"
            >
              {showAllRepos
                ? 'Show Fewer Repositories'
                : `View All ${filteredRepos.length} Public Repositories`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
