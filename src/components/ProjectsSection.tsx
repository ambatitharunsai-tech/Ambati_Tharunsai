import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github, Layers, Search } from 'lucide-react';
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
      className="relative py-20 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#050814]"
    >
      <SubtleSectionGrid cellSize={40} />

      <div className="relative z-10 max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-wider text-[#3B82F6] dark:text-[#06B6D4]">
              03. FEATURED PROJECTS & SYSTEM ARCHITECTURE
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC]"
              style={{ textWrap: 'balance' }}
            >
              Production Web Apps, AI Platforms & Smart Technology Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
              Explore flagship projects including EduNexus AI, Safe Drinking Water Web, Ireagation
              System, CourseCraft AI, and Hema AI—complete with source code and live cloud demos.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tech stack..."
              aria-label="Search featured projects"
              className="w-full sm:w-72 pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6] dark:focus:border-[#06B6D4]"
            />
          </div>
        </div>

        {/* Filter Bar: Domain Category & Project Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* Domain Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#3B82F6] text-white font-semibold'
                    : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F8FAFC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-xs text-slate-400 mr-1">Status:</span>
            {statuses.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 border ${
                  selectedStatus === st
                    ? 'bg-[#101A30] border-[#06B6D4]/50 text-[#06B6D4] font-semibold'
                    : 'border-transparent text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F8FAFC]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Equal-Height Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-10 text-center rounded-xl bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800 space-y-3">
            <p className="text-sm font-medium text-slate-800 dark:text-[#F8FAFC]">
              No projects match your current filter selection.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedStatus('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#3B82F6] dark:text-[#06B6D4] hover:underline"
            >
              Reset project filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {filteredProjects.map((project, index) => {
              const hasValidImage = project.previewImage && !failedImages[project.id];

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                  className="group bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800/90 hover:border-[#3B82F6]/60 dark:hover:border-[#06B6D4]/60 rounded-xl overflow-hidden flex flex-col justify-between transition-colors h-full"
                >
                  <div>
                    {/* Consistent 16:9 Aspect Visual Header */}
                    <div
                      onClick={() => setSelectedProjectId(project.id)}
                      className="relative h-52 w-full overflow-hidden bg-[#050814] cursor-pointer border-b border-slate-200/80 dark:border-slate-800/80"
                    >
                      {hasValidImage ? (
                        <img
                          src={project.previewImage}
                          alt={`${project.title} technical architecture visualization`}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                          }
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#050814] p-6 flex flex-col justify-between">
                          <div className="flex items-center justify-between text-xs font-mono text-[#06B6D4]">
                            <span>SYS_ARCH // 0{index + 1}</span>
                            <span>{project.status.toUpperCase()}</span>
                          </div>
                          <div className="space-y-1.5">
                            <Layers className="w-7 h-7 text-[#3B82F6] mb-1.5" />
                            <p className="font-display text-lg font-bold text-[#F8FAFC]">
                              {project.title}
                            </p>
                            <p className="font-mono text-xs text-[#94A3B8]">
                              {project.highlightMetric || project.category}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Bottom Metadata Bar */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050814] via-[#050814]/75 to-transparent px-5 py-2.5 flex items-center justify-between text-[11px] font-mono text-slate-200">
                        <span>{project.category}</span>
                        <span className="text-[#06B6D4] font-semibold">{project.status}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 dark:text-[#94A3B8]">
                          <span>{project.highlightMetric || project.category}</span>
                          {project.updatedAt && (
                            <span className="tabular-nums">Updated {project.updatedAt}</span>
                          )}
                        </div>
                        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-[#3B82F6] dark:group-hover:text-[#06B6D4] transition-colors">
                          <button
                            type="button"
                            onClick={() => setSelectedProjectId(project.id)}
                            className="text-left focus:outline-none"
                          >
                            {project.title}
                          </button>
                        </h3>
                        <p className="text-xs font-medium text-slate-500 dark:text-[#94A3B8]">
                          {project.subtitle}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                        {project.description}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          Key Capabilities:
                        </p>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-[#94A3B8]">
                          {project.features.slice(0, 4).map((feat) => (
                            <li key={feat} className="flex items-start gap-2">
                              <span className="text-[#3B82F6] dark:text-[#06B6D4] font-mono">
                                ·
                              </span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Aligned Tech Badges & Action Buttons */}
                  <div className="px-6 py-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#050814]/60 space-y-3.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-[#101A30] border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B82F6] dark:text-[#06B6D4] hover:underline"
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
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#101A30] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#3B82F6] dark:hover:border-[#06B6D4] transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3B82F6] hover:bg-blue-500 text-white font-semibold transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
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
    </section>
  );
};
