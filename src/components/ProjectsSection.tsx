import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github, Globe, Layers, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCategory, ProjectStatus } from '../types/portfolio';
import { SubtleSectionGrid } from './ui/interactive-grid-pattern';

export const ProjectsSection: React.FC = () => {
  const { data, setSelectedProjectId } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | ProjectStatus>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories: ('All' | ProjectCategory)[] = [
    'All',
    'AI & LLM Systems',
    'Full-Stack & Web',
    'Mobile & IoT',
    'Social Impact',
  ];

  const statuses: ('All' | ProjectStatus)[] = [
    'All',
    'Live Production',
    'Completed',
    'Prototype',
  ];

  // Verified Live Deployments for the dedicated "Live Projects & Website Links" showcase
  const liveDeployedProjects = data.projects.filter((p) => Boolean(p.liveUrl));

  const filteredProjects = data.projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.technologies.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-24 border-b border-[#DCDCDC] dark:border-[#333333] bg-[#F5F4F0] dark:bg-[#0D0D0D]"
    >
      <SubtleSectionGrid cellSize={40} />

      <div className="relative z-10 max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* PART 1: DEDICATED "LIVE PROJECTS & WEBSITE LINKS" SECTION */}
        {liveDeployedProjects.length > 0 && (
          <div id="live-projects" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DCDCDC] dark:border-[#333333] pb-5">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>LIVE CLOUD DEPLOYMENTS · RENDER PRODUCTION</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D] dark:text-[#F5F4F0]"
                  style={{ textWrap: 'balance' }}
                >
                  Live Projects & Website Links
                </h2>
                <p className="text-sm sm:text-base text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
                  Verified production web applications deployed on Render—featuring direct access to
                  the live websites alongside their open-source GitHub repositories.
                </p>
              </div>

              <div className="font-mono text-xs text-[#858585] dark:text-[#B8B8B8] tabular-nums">
                {liveDeployedProjects.length} Active Cloud Websites
              </div>
            </div>

            {/* 3-Column Equal-Height Live Websites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {liveDeployedProjects.map((liveProj, idx) => {
                const cleanHostname = liveProj.liveUrl
                  ? liveProj.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
                  : '';

                return (
                  <motion.article
                    key={`live-${liveProj.id}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.35, delay: idx * 0.05, ease: 'easeOut' }}
                    className="group rounded-xl bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] hover:border-[#4D4D4D] dark:hover:border-[#B8B8B8] p-5 sm:p-6 flex flex-col justify-between space-y-5 transition-all hover:-translate-y-0.5"
                  >
                    <div className="space-y-4">
                      {/* Top Bar: Live Indicator + Category */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>LIVE</span>
                        </span>
                        <span className="font-mono text-[11px] text-[#4D4D4D] dark:text-[#B8B8B8]">
                          {liveProj.category}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="space-y-1">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#0D0D0D] dark:text-[#F5F4F0] group-hover:text-[#3B82F6] dark:group-hover:text-[#06B6D4] transition-colors">
                          {liveProj.title}
                        </h3>
                        <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8] line-clamp-2 leading-relaxed">
                          {liveProj.description}
                        </p>
                      </div>

                      {/* Clickable Live Domain Bar */}
                      {liveProj.liveUrl && (
                        <a
                          href={liveProj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] text-xs font-mono text-[#3B82F6] dark:text-[#06B6D4] hover:border-[#3B82F6] dark:hover:border-[#06B6D4] transition-colors"
                        >
                          <span className="inline-flex items-center gap-2 truncate">
                            <Globe className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                            <span className="truncate">{cleanHostname}</span>
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      )}
                    </div>

                    {/* Side-by-Side GitHub & Live Website Buttons */}
                    <div className="pt-3 border-t border-[#DCDCDC] dark:border-[#333333] grid grid-cols-2 gap-2.5">
                      {liveProj.githubUrl && (
                        <a
                          href={liveProj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#562f54] border border-[#562f54] text-xs font-semibold text-white hover:bg-[#6b3b68] transition-colors whitespace-nowrap"
                        >
                          <Github className="w-3.5 h-3.5 shrink-0" />
                          <span>GitHub</span>
                        </a>
                      )}

                      {liveProj.liveUrl && (
                        <a
                          href={liveProj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#562f54] text-white hover:bg-[#6b3b68] text-xs font-semibold transition-colors whitespace-nowrap"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        )}

        {/* PART 2: ALL FEATURED ENGINEERING PROJECTS & ARCHITECTURE CASE STUDIES */}
        <div className="space-y-10">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="font-mono text-xs font-semibold tracking-wider text-[#4D4D4D] dark:text-[#B8B8B8]">
                03. FEATURED PROJECTS & SYSTEM ARCHITECTURE
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D] dark:text-[#F5F4F0]"
                style={{ textWrap: 'balance' }}
              >
                Production Web Apps, AI Platforms & Smart Technology Solutions
              </h2>
              <p className="text-sm sm:text-base text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
                Explore flagship systems including EduNexus AI, Safe Drinking Water Web, Ireagation
                System, CourseCraft AI, and Hema AI—complete with verified repositories and live
                deployments.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#858585] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or tech stack..."
                aria-label="Search featured projects"
                className="w-full sm:w-72 pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] text-[#0D0D0D] dark:text-[#EDECE8] placeholder:text-[#858585] focus:outline-none focus:border-[#4D4D4D] dark:focus:border-[#B8B8B8]"
              />
            </div>
          </div>

          {/* Filter Bar: Domain Category & Project Status */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#DCDCDC] dark:border-[#333333]">
            {/* Domain Tabs */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#562f54] text-white font-semibold'
                      : 'text-[#4D4D4D] dark:text-[#B8B8B8] hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-xs text-[#858585] mr-1">Status:</span>
              {statuses.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 border ${
                    selectedStatus === st
                      ? 'bg-[#562f54] text-white border-[#562f54] font-semibold'
                      : 'border-transparent text-[#4D4D4D] dark:text-[#B8B8B8] hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Equal-Height Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="p-10 text-center rounded-xl bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] space-y-3">
              <p className="text-sm font-medium text-[#0D0D0D] dark:text-[#F5F4F0]">
                No projects match your current filter selection.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                  setSearchQuery('');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#562f54] text-white text-xs font-semibold hover:bg-[#6b3b68] transition-colors"
              >
                Reset project filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {filteredProjects.map((project, index) => {
                const hasValidImage = project.previewImage && !failedImages[project.id];
                const isLive = Boolean(project.liveUrl);

                return (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                    className="group bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] hover:border-[#4D4D4D] dark:hover:border-[#858585] rounded-xl overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-0.5 h-full"
                  >
                    <div>
                      {/* Consistent Visual Header */}
                      <div
                        onClick={() => setSelectedProjectId(project.id)}
                        className="relative h-52 w-full overflow-hidden bg-[#0D0D0D] cursor-pointer border-b border-[#DCDCDC] dark:border-[#333333]"
                      >
                        {hasValidImage ? (
                          <img
                            src={project.previewImage}
                            alt={`${project.title} technical architecture visualization`}
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                            }
                            className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-200"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#0D0D0D] p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-xs font-mono text-[#B8B8B8]">
                              <span>SYS_ARCH // 0{index + 1}</span>
                              <span>{project.status.toUpperCase()}</span>
                            </div>
                            <div className="space-y-1.5">
                              <Layers className="w-7 h-7 text-[#EDECE8] mb-1.5" />
                              <p className="font-display text-lg font-bold text-[#F5F4F0]">
                                {project.title}
                              </p>
                              <p className="font-mono text-xs text-[#B8B8B8]">
                                {project.highlightMetric || project.category}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Top-Right Live Indicator Pill if Live URL exists */}
                        {isLive && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#0D0D0D]/90 border border-emerald-500/40 inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Live Website</span>
                          </div>
                        )}

                        {/* Bottom Metadata Bar */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent px-5 py-2.5 flex items-center justify-between text-[11px] font-mono text-[#DCDCDC]">
                          <span>{project.category}</span>
                          <span className="text-[#06B6D4] font-semibold">{project.status}</span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#4D4D4D] dark:text-[#B8B8B8]">
                            <span>{project.highlightMetric || project.category}</span>
                            {project.updatedAt && (
                              <span className="tabular-nums">Updated {project.updatedAt}</span>
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-display text-xl font-bold text-[#0D0D0D] dark:text-[#F5F4F0] group-hover:text-[#3B82F6] dark:group-hover:text-[#06B6D4] transition-colors">
                              <button
                                type="button"
                                onClick={() => setSelectedProjectId(project.id)}
                                className="text-left focus:outline-none"
                              >
                                {project.title}
                              </button>
                            </h3>
                            {isLive && (
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 shrink-0">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span>Live</span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-medium text-[#4D4D4D] dark:text-[#B8B8B8]">
                            {project.subtitle}
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
                          {project.description}
                        </p>

                        <div className="space-y-1.5 pt-1">
                          <p className="text-xs font-semibold text-[#0D0D0D] dark:text-[#EDECE8]">
                            Key Capabilities:
                          </p>
                          <ul className="space-y-1 text-xs text-[#4D4D4D] dark:text-[#B8B8B8]">
                            {project.features.slice(0, 4).map((feat) => (
                              <li key={feat} className="flex items-start gap-2">
                                <span className="text-[#252525] dark:text-[#EDECE8] font-mono">
                                  ·
                                </span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Aligned Tech Badges & Side-by-Side GitHub / Live Demo Buttons */}
                    <div className="px-6 py-4 border-t border-[#DCDCDC] dark:border-[#333333] bg-[#F5F4F0] dark:bg-[#0D0D0D]/60 space-y-3.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] text-[#252525] dark:text-[#DCDCDC]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => setSelectedProjectId(project.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#562f54] text-white text-xs font-semibold hover:bg-[#6b3b68] transition-colors"
                        >
                          <span>Inspect Architecture</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-2.5 text-xs font-medium">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#562f54] border border-[#562f54] text-white font-semibold hover:bg-[#6b3b68] transition-colors whitespace-nowrap"
                            >
                              <Github className="w-3.5 h-3.5 shrink-0" />
                              <span>GitHub</span>
                            </a>
                          )}

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#562f54] text-white hover:bg-[#6b3b68] font-semibold transition-colors whitespace-nowrap"
                            >
                              <span>Live Demo</span>
                              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
