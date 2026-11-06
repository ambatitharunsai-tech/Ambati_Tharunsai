import React, { useState } from 'react';
import { ArrowUpRight, GitFork, Github, RefreshCw, Search, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { SubtleSectionGrid } from './ui/interactive-grid-pattern';

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
      className="relative py-20 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#050814]"
    >
      <SubtleSectionGrid cellSize={40} />

      <div className="relative z-10 max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-wider text-[#3B82F6] dark:text-[#06B6D4]">
              05. LIVE GITHUB REPOSITORY EXPLORER
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC]"
              style={{ textWrap: 'balance' }}
            >
              Open-Source Codebase & Public Repository Activity
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
              Synchronized directly with{' '}
              <a
                href={data.profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[#3B82F6] dark:text-[#06B6D4] hover:underline"
              >
                github.com/{data.profile.githubUsername}
              </a>
              —displaying verified public repositories, primary languages, stars, and forks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={refreshGitHub}
              disabled={githubLoading}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#3B82F6] dark:hover:border-[#06B6D4] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${githubLoading ? 'animate-spin' : ''}`} />
              <span>{githubLoading ? 'Syncing GitHub...' : 'Sync GitHub API'}</span>
            </button>

            <a
              href={data.profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#3B82F6] hover:bg-blue-500 text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Open GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* GitHub Profile Summary Widget */}
        <div className="p-6 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800/90 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 flex items-center gap-4">
            <img
              src={
                githubProfile?.avatar_url ||
                'https://avatars.githubusercontent.com/u/236998948?v=4'
              }
              alt={data.profile.githubUsername}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-lg border border-slate-200 dark:border-slate-700 object-cover shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-[#F8FAFC] truncate">
                  {data.profile.fullName}
                </h3>
                <span className="font-mono text-xs text-[#3B82F6] dark:text-[#06B6D4]">
                  @{data.profile.githubUsername}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-[#94A3B8] mt-1 line-clamp-2">
                {githubProfile?.bio ||
                  'AI & Web Development Enthusiast | Building projects with Python, Flask, and JavaScript'}
              </p>
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-slate-200/80 dark:border-slate-800/80 pt-4 md:pt-0 md:pl-6">
            <div>
              <p className="font-mono text-xs text-slate-500 dark:text-[#94A3B8]">PUBLIC REPOS</p>
              <p className="font-display text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tabular-nums mt-0.5">
                {githubProfile?.public_repos ?? githubRepos.length}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-slate-500 dark:text-[#94A3B8]">LANGUAGES</p>
              <p className="font-display text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tabular-nums mt-0.5">
                {uniqueLanguages.length || 5}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-slate-500 dark:text-[#94A3B8]">API STATUS</p>
              <p className="font-mono text-xs font-semibold text-[#3B82F6] dark:text-[#06B6D4] mt-2 uppercase">
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
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800">
            {['All', ...uniqueLanguages].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedLang === lang
                    ? 'bg-[#3B82F6] text-white font-semibold'
                    : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F8FAFC]'
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
              className="w-full sm:w-64 pl-9 pr-3.5 py-1.5 text-xs sm:text-sm rounded-lg bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6] dark:focus:border-[#06B6D4]"
            />
          </div>
        </div>

        {/* Equal-Height Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {visibleRepos.map((repo, idx) => {
            const formattedDate = repo.updated_at ? repo.updated_at.slice(0, 10) : '';
            return (
              <motion.a
                key={repo.id || repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: idx * 0.03, ease: 'easeOut' }}
                className="group p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800/90 hover:border-[#3B82F6] dark:hover:border-[#06B6D4] transition-colors flex flex-col justify-between space-y-4 h-full"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
                    <span className="text-[#3B82F6] dark:text-[#06B6D4] font-semibold">
                      {repo.language || 'Repository'}
                    </span>
                    <span className="tabular-nums">{formattedDate}</span>
                  </div>

                  <h4 className="font-display text-base font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-[#3B82F6] dark:group-hover:text-[#06B6D4] transition-colors flex items-center justify-between gap-1">
                    <span className="truncate">{repo.name}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100" />
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed line-clamp-3">
                    {repo.description ||
                      `Public software engineering repository (${repo.name}) maintained by Ambati Tharun Sai.`}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-[#94A3B8] tabular-nums">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#3B82F6] dark:text-[#06B6D4]" />
                      {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                  <span className="text-[#3B82F6] dark:text-[#06B6D4]">Repo ↗</span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {filteredRepos.length > 8 && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setShowAllRepos((prev) => !prev)}
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#3B82F6] dark:hover:border-[#06B6D4] transition-colors"
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
