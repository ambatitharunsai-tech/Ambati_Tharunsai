import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github, Layers, Search } from 'lucide-react';
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
    'Concept',
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
      className="py-20 sm:py-24 px-6 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#060B16]"
    >
      <div className="max-w-[1360px] mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-wider text-blue-600 dark:text-cyan-400">
              03. FEATURED ENGINEERING WORK & CASE STUDIES
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
              style={{ textWrap: 'balance' }}
            >
              Practical Software, AI Systems & Real-World Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Every project distinguishes its verified status—spanning live cloud deployments on
              Render, full-stack GitHub repositories, functional prototypes, and smart-agriculture
              architectural concepts.
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
              className="w-full sm:w-72 pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Filter Bar: Domain Category & Project Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          {/* Domain Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs font-semibold'
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
                    ? 'bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 font-semibold'
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
          <div className="p-12 text-center rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 space-y-3">
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
              className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
            >
              Reset project filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => {
              const hasValidImage = project.previewImage && !failedImages[project.id];

              return (
                <article
                  key={project.id}
                  className="group bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800/90 hover:border-blue-500/60 dark:hover:border-cyan-400/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-colors"
                >
                  <div>
                    {/* Visual Preview Header (Generated Architectural Visual or Live Web Frame Preview) */}
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
                        /* Resilient Technical Blueprint Fallback */
                        <div className="w-full h-full bg-gradient-to-br from-[#060B16] via-[#0F1E3A] to-[#0B1325] p-6 flex flex-col justify-between">
                          <div className="flex items-center justify-between text-xs font-mono text-cyan-400/80">
                            <span>SYS_ARCH // 0{index + 1}</span>
                            <span>{project.status.toUpperCase()}</span>
                          </div>
                          <div className="space-y-1">
                            <Layers className="w-8 h-8 text-blue-400 mb-2" />
                            <p className="font-display text-lg font-bold text-white">
                              {project.title}
                            </p>
                            <p className="font-mono text-xs text-slate-400">
                              {project.highlightMetric || project.category}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Measured Scrim Overlay at Bottom of Media */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-6 py-3 flex items-center justify-between text-xs font-mono text-slate-200">
                        <span>{project.category}</span>
                        <span className="text-cyan-300 font-semibold">{project.status}</span>
                      </div>
                    </div>

                    {/* Card Body (Zero-Pill Unboxed Metadata Discipline) */}
                    <div className="p-6 sm:p-7 space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                          <span>{project.highlightMetric || project.category}</span>
                          {project.updatedAt && (
                            <span className="tabular-nums">Updated {project.updatedAt}</span>
                          )}
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
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
                          Key Capabilities:
                        </p>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                          {project.features.slice(0, 4).map((feat) => (
                            <li key={feat} className="flex items-start gap-2">
                              <span className="text-blue-600 dark:text-cyan-400 font-mono">·</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Unboxed Tech Stack & Direct Action Links */}
                  <div className="px-6 sm:px-7 py-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-[#060B16]/50 space-y-3">
                    {/* Unboxed Tech Stack with Middot Separators */}
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
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
                      >
                        <span>Inspect Architecture & Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-4 text-xs font-medium">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
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
                            className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
