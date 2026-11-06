import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github, Layers, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCategory, ProjectStatus } from '../types/portfolio';

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
      className="py-20 sm:py-24 px-6 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#050814]"
    >
      <div className="max-w-[1360px] mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-wider text-blue-600 dark:text-indigo-400">
              03. FEATURED PROJECTS & SYSTEM ARCHITECTURE
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
              style={{ textWrap: 'balance' }}
            >
              Production Web Apps, AI Platforms & Smart Technology Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
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
              className="w-full sm:w-72 pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200 dark:border-indigo-500/25 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-violet-400"
            />
          </div>
        </div>

        {/* Filter Bar: Domain Category & Project Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          {/* Domain Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-[#0B1124] border border-slate-200 dark:border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedStatus === st
                    ? 'bg-slate-900 dark:bg-indigo-500 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              No projects match your current filter selection.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedStatus('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-blue-600 dark:text-indigo-400 hover:underline"
            >
              Reset project filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => {
              const hasValidImage = project.previewImage && !failedImages[project.id];

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="group bg-[#F8FAFC]/90 dark:bg-[#0B1124]/85 backdrop-blur-md border border-slate-200 dark:border-indigo-500/20 hover:border-blue-500/60 dark:hover:border-violet-400/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-sm hover:shadow-xl"
                >
                  <div>
                    {/* Visual Preview Header */}
                    <div
                      onClick={() => setSelectedProjectId(project.id)}
                      className="relative h-52 w-full overflow-hidden bg-slate-900 cursor-pointer border-b border-slate-200 dark:border-slate-800"
                    >
                      {hasValidImage ? (
                        <img
                          src={project.previewImage}
                          alt={`${project.title} technical architecture visualization`}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                          }
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#050814] via-[#121C3D] to-[#1D1238] p-6 flex flex-col justify-between">
                          <div className="flex items-center justify-between text-xs font-mono text-indigo-300">
                            <span>SYS_ARCH // 0{index + 1}</span>
                            <span>{project.status.toUpperCase()}</span>
                          </div>
                          <div className="space-y-1">
                            <Layers className="w-8 h-8 text-indigo-400 mb-2" />
                            <p className="font-display text-lg font-bold text-white">
                              {project.title}
                            </p>
                            <p className="font-mono text-xs text-slate-300">
                              {project.highlightMetric || project.category}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Scrim Overlay at Bottom of Media */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-6 py-3 flex items-center justify-between text-xs font-mono text-slate-200">
                        <span>{project.category}</span>
                        <span className="text-indigo-300 font-semibold">{project.status}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7 space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                          <span>{project.highlightMetric || project.category}</span>
                          {project.updatedAt && (
                            <span className="tabular-nums">Updated {project.updatedAt}</span>
                          )}
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-indigo-400 transition-colors">
                          <button
                            type="button"
                            onClick={() => setSelectedProjectId(project.id)}
                            className="text-left focus:outline-none"
                          >
                            {project.title}
                          </button>
                        </h3>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {project.subtitle}
                        </p>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          Key Highlights:
                        </p>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                          {project.features.slice(0, 4).map((feat) => (
                            <li key={feat} className="flex items-start gap-2">
                              <span className="text-blue-600 dark:text-indigo-400 font-mono">·</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Technology Badges & Action Buttons */}
                  <div className="px-6 sm:px-7 py-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-[#050814]/60 space-y-3">
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 leading-relaxed">
                      {project.technologies.map((tech, i) => (
                        <React.Fragment key={tech}>
                          <span className="text-slate-700 dark:text-slate-300">{tech}</span>
                          {i < project.technologies.length - 1 && (
                            <span className="mx-1.5 text-slate-400" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-indigo-400 hover:underline"
                      >
                        <span>Inspect Architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-3 text-xs font-medium">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#0B1124] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-indigo-400 transition-colors"
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
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:from-blue-500 hover:to-violet-500 transition-all shadow-2xs"
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
