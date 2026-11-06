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
      className="relative py-20 sm:py-24 border-b border-[#DCDCDC] dark:border-[#333333] bg-[#F5F4F0] dark:bg-[#0D0D0D]"
    >
      <SubtleSectionGrid cellSize={40} />

      <div className="relative z-10 max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-wider text-[#4D4D4D] dark:text-[#B8B8B8]">
              05. LIVE GITHUB REPOSITORY EXPLORER
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D] dark:text-[#F5F4F0]"
              style={{ textWrap: 'balance' }}
            >
              Open-Source Codebase & Public Repository Activity
            </h2>
            <p className="text-sm sm:text-base text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
              Synchronized directly with{' '}
              <a
                href={data.profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[#0D0D0D] dark:text-[#EDECE8] underline decoration-[#B8B8B8] dark:decoration-[#4D4D4D] underline-offset-4 hover:text-[#252525] dark:hover:text-[#F5F4F0]"
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
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#562f54] border border-[#562f54] text-white hover:bg-[#6b3b68] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-white ${githubLoading ? 'animate-spin' : ''}`} />
              <span>{githubLoading ? 'Syncing GitHub...' : 'Sync GitHub API'}</span>
            </button>

            <a
              href={data.profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#562f54] text-white hover:bg-[#6b3b68] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Open GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* GitHub Profile Summary Widget */}
        <div className="p-6 rounded-xl bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 flex items-center gap-4">
            <img
              src={
                githubProfile?.avatar_url ||
                'https://avatars.githubusercontent.com/u/236998948?v=4'
              }
              alt={data.profile.githubUsername}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-lg border border-[#B8B8B8] dark:border-[#4D4D4D] object-cover shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-[#0D0D0D] dark:text-[#F5F4F0] truncate">
                  {data.profile.fullName}
                </h3>
                <span className="font-mono text-xs text-[#4D4D4D] dark:text-[#B8B8B8]">
                  @{data.profile.githubUsername}
                </span>
              </div>
              <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8] mt-1 line-clamp-2">
                {githubProfile?.bio ||
                  'AI & Web Development Enthusiast | Building projects with Python, Flask, and JavaScript'}
              </p>
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-[#DCDCDC] dark:border-[#333333] pt-4 md:pt-0 md:pl-6">
            <div>
              <p className="font-mono text-xs text-[#858585] dark:text-[#B8B8B8]">PUBLIC REPOS</p>
              <p className="font-display text-2xl font-bold text-[#0D0D0D] dark:text-[#F5F4F0] tabular-nums mt-0.5">
                {githubProfile?.public_repos ?? githubRepos.length}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#858585] dark:text-[#B8B8B8]">LANGUAGES</p>
              <p className="font-display text-2xl font-bold text-[#0D0D0D] dark:text-[#F5F4F0] tabular-nums mt-0.5">
                {uniqueLanguages.length || 5}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#858585] dark:text-[#B8B8B8]">API STATUS</p>
              <p className="font-mono text-xs font-semibold text-[#252525] dark:text-[#EDECE8] mt-2 uppercase">
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
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333]">
            {['All', ...uniqueLanguages].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedLang === lang
                    ? 'bg-[#562f54] text-white font-semibold'
                    : 'text-[#4D4D4D] dark:text-[#B8B8B8] hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-[#858585] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={repoSearch}
              onChange={(e) => setRepoSearch(e.target.value)}
              placeholder="Search repositories..."
              aria-label="Search GitHub repositories"
              className="w-full sm:w-64 pl-9 pr-3.5 py-1.5 text-xs sm:text-sm rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] text-[#0D0D0D] dark:text-[#EDECE8] placeholder:text-[#858585] focus:outline-none focus:border-[#4D4D4D] dark:focus:border-[#B8B8B8]"
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
                className="group p-5 rounded-xl bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] hover:border-[#4D4D4D] dark:hover:border-[#B8B8B8] transition-colors flex flex-col justify-between space-y-4 h-full"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#858585] dark:text-[#B8B8B8]">
                    <span className="text-[#252525] dark:text-[#EDECE8] font-semibold">
                      {repo.language || 'Repository'}
                    </span>
                    <span className="tabular-nums">{formattedDate}</span>
                  </div>

                  <h4 className="font-display text-base font-bold text-[#0D0D0D] dark:text-[#F5F4F0] group-hover:text-[#252525] dark:group-hover:text-[#EDECE8] transition-colors flex items-center justify-between gap-1">
                    <span className="truncate">{repo.name}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100" />
                  </h4>

                  <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed line-clamp-3">
                    {repo.description ||
                      `Public software engineering repository (${repo.name}) maintained by Ambati Tharun Sai.`}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DCDCDC] dark:border-[#333333] flex items-center justify-between text-xs font-mono text-[#858585] dark:text-[#B8B8B8] tabular-nums">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#252525] dark:text-[#EDECE8]" />
                      {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                  <span className="text-[#0D0D0D] dark:text-[#EDECE8] font-semibold">Repo ↗</span>
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
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#562f54] border border-[#562f54] text-white hover:bg-[#6b3b68] transition-colors"
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
