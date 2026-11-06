import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  Github,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { InteractiveGridPattern } from './ui/interactive-grid-pattern';

export const HeroSection: React.FC = () => {
  const {
    data,
    theme,
    setResumeModalOpen,
    setSelectedProjectId,
  } = usePortfolio();

  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);

  // Typing animation state for roles
  const roles = data.profile.typingRoles.length
    ? data.profile.typingRoles
    : [
        'Full-Stack Developer',
        'AI Enthusiast',
        'Software Developer',
        'Machine Learning & NLP Builder',
      ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = roles[roleIndex % roles.length];
    const speed = isDeleting ? 35 : 70;

    const timer = window.setTimeout(() => {
      if (!isDeleting && displayedRole.length < currentFullRole.length) {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length + 1));
      } else if (!isDeleting && displayedRole.length === currentFullRole.length) {
        window.setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayedRole.length > 0) {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length - 1));
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex, roles]);

  const projects = data.projects;
  const activeProject = projects.length
    ? projects[activeProjectIndex % projects.length]
    : null;

  const cycleProject = (delta: number) => {
    if (!projects.length) return;
    setActiveProjectIndex((prev) => (prev + delta + projects.length) % projects.length);
  };

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden bg-[#F8FAFC] dark:bg-[#050814] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      {/* Main Background: Exact shadcn.io Interactive Grid Pattern with Pointer Proximity & 24 Trail Cells */}
      <InteractiveGridPattern
        cellSize={40}
        glowColor={
          theme === 'dark' ? 'rgba(6, 182, 212, 0.28)' : 'rgba(59, 130, 246, 0.20)'
        }
        secondaryGlowColor={
          theme === 'dark' ? 'rgba(59, 130, 246, 0.20)' : 'rgba(6, 182, 212, 0.14)'
        }
        lineColor={
          theme === 'dark' ? 'rgba(56, 189, 248, 0.09)' : 'rgba(148, 163, 184, 0.20)'
        }
        proximity={135}
        fadeDuration={850}
        trailCount={24}
      />

      {/* Main Content Container (Consistent 1260px Grid Alignment) */}
      <div className="relative z-10 max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Top Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-between gap-3 mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800/90 text-xs text-slate-600 dark:text-[#94A3B8]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="inline-flex items-center gap-1 font-medium text-slate-900 dark:text-[#F8FAFC]">
              <MapPin className="w-3.5 h-3.5 text-[#3B82F6] dark:text-[#06B6D4]" />
              {data.profile.location}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
              |
            </span>
            <span className="font-mono text-[11px] text-[#3B82F6] dark:text-[#06B6D4] font-medium">
              {data.profile.availabilityStatus}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-500 dark:text-[#94A3B8]">
            <span>INTERACTIVE GRID</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
            <span>MOVE CURSOR TO ILLUMINATE CELLS</span>
          </div>
        </motion.div>

        {/* Hero 12-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Developer Identity, Typography, CTAs, Links & Core Capabilities */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col justify-between space-y-7"
          >
            <div className="space-y-6">
              {/* Identity Header */}
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700/90 bg-white dark:bg-[#0B1124] shrink-0">
                  {data.profile.portraitUrl ? (
                    <img
                      src={data.profile.portraitUrl}
                      alt={data.profile.fullName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full flex items-center justify-center font-mono text-sm font-bold bg-[#101A30] text-[#06B6D4]">
                    ATS
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="font-mono text-xs font-semibold tracking-wider text-[#3B82F6] dark:text-[#06B6D4] uppercase">
                    {data.profile.headline}
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] mt-1">
                    <span className="font-mono text-slate-400 dark:text-slate-500">&gt;</span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-[#F8FAFC]">
                      {displayedRole}
                      <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-[#06B6D4]" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Display Headline & Description */}
              <div className="space-y-4">
                <h1
                  className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC] leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  Hi, I'm{' '}
                  <span className="text-[#3B82F6] dark:text-[#06B6D4]">
                    {data.profile.fullName}.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed max-w-[58ch]">
                  {data.profile.heroSubheadline}
                </p>
              </div>

              {/* Primary CTA Buttons (Sharp 8px radius, consistent padding) */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#3B82F6] hover:bg-blue-500 active:scale-[0.99] rounded-lg transition-all whitespace-nowrap shrink-0"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setResumeModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-[#F8FAFC] bg-white dark:bg-[#0B1124] hover:bg-slate-100 dark:hover:bg-[#101A30] border border-slate-200/90 dark:border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4 text-[#3B82F6] dark:text-[#06B6D4]" />
                  <span>Download Resume</span>
                </button>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-[#94A3B8] hover:text-[#3B82F6] dark:hover:text-[#06B6D4] border border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Contact Me
                </a>
              </div>

              {/* Verified GitHub, LinkedIn & Email Bar */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                <a
                  href={data.profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200 hover:text-[#3B82F6] dark:hover:text-[#06B6D4] transition-colors"
                >
                  <Github className="w-4 h-4 text-[#3B82F6] dark:text-[#06B6D4]" />
                  <span>github.com/ambatitharunsai-tech</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-75" />
                </a>

                {data.profile.linkedinUrl && (
                  <a
                    href={data.profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200 hover:text-[#3B82F6] dark:hover:text-[#06B6D4] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#8B5CF6]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-75" />
                  </a>
                )}

                {data.profile.email && (
                  <a
                    href={`mailto:${data.profile.email}`}
                    className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200 hover:text-[#3B82F6] dark:hover:text-[#06B6D4] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#3B82F6] dark:text-[#06B6D4]" />
                    <span>{data.profile.email}</span>
                  </a>
                )}
              </div>
            </div>

            {/* 4 Equal-Height Engineering Domain Widgets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                {
                  icon: Sparkles,
                  label: 'AI & NLP',
                  sub: 'LLM · Ollama · Groq',
                },
                {
                  icon: Code2,
                  label: 'Full-Stack',
                  sub: 'React · FastAPI · Flask',
                },
                {
                  icon: Layers,
                  label: 'Mobile & IoT',
                  sub: 'Flutter · Dart',
                },
                {
                  icon: Terminal,
                  label: 'Cloud & Data',
                  sub: 'Supabase · Render',
                },
              ].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.label}
                    className="p-3.5 rounded-lg bg-white dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800/90 hover:border-[#3B82F6]/50 dark:hover:border-[#06B6D4]/50 transition-colors flex flex-col justify-between"
                  >
                    <Icon className="w-4 h-4 text-[#3B82F6] dark:text-[#06B6D4] mb-2" />
                    <div>
                      <p className="font-display text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">
                        {pillar.label}
                      </p>
                      <p className="font-mono text-[11px] text-slate-500 dark:text-[#94A3B8] mt-0.5 truncate">
                        {pillar.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Sharp Software-Dashboard Project Preview Panel */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col"
          >
            {activeProject && (
              <div className="flex-1 rounded-xl bg-white dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800/90 hover:border-[#3B82F6]/40 dark:hover:border-[#06B6D4]/40 transition-colors overflow-hidden flex flex-col justify-between">
                <div>
                  {/* Widget Top Header */}
                  <div className="px-5 py-3 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3 bg-slate-50 dark:bg-[#101A30]/70">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#3B82F6] dark:text-[#06B6D4]">
                      <Cpu className="w-4 h-4" />
                      <span>
                        PROJECT PREVIEW // 0{activeProjectIndex + 1} OF 0{projects.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => cycleProject(-1)}
                        aria-label="Previous project"
                        className="p-1.5 rounded-md bg-white dark:bg-[#0B1124] border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:border-[#3B82F6] dark:hover:border-[#06B6D4] transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => cycleProject(1)}
                        aria-label="Next project"
                        className="p-1.5 rounded-md bg-white dark:bg-[#0B1124] border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:border-[#3B82F6] dark:hover:border-[#06B6D4] transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Selector Tabs */}
                  <div className="px-5 py-2 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-100/60 dark:bg-[#050814]/60">
                    {projects.slice(0, 5).map((proj, idx) => {
                      const isSelected = idx === activeProjectIndex;
                      return (
                        <button
                          key={proj.id}
                          type="button"
                          onClick={() => setActiveProjectIndex(idx)}
                          className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-colors whitespace-nowrap shrink-0 border ${
                            isSelected
                              ? 'bg-[#3B82F6] text-white border-[#3B82F6] font-semibold'
                              : 'bg-transparent border-transparent text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F8FAFC] hover:bg-slate-200/60 dark:hover:bg-[#101A30]'
                          }`}
                        >
                          0{idx + 1}. {proj.title}
                        </button>
                      );
                    })}
                  </div>

                  {/* Consistent 16:9 / Fixed-Height Visual Preview Area */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#050814] border-b border-slate-200/80 dark:border-slate-800/80">
                    {activeProject.previewImage ? (
                      <img
                        src={activeProject.previewImage}
                        alt={activeProject.title}
                        className="w-full h-full object-cover opacity-90"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col justify-between p-5 bg-[#050814] text-[#F8FAFC]">
                        <div className="flex items-center justify-between font-mono text-[11px] text-[#06B6D4]">
                          <span>SYSTEM ARCHITECTURE</span>
                          <span>{activeProject.category}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2.5 my-auto">
                          {activeProject.features.slice(0, 3).map((feat: string, i: number) => (
                            <div
                              key={i}
                              className="p-2.5 rounded-lg bg-[#0B1124] border border-slate-800 text-[11px] font-mono text-slate-200 leading-snug"
                            >
                              <span className="block text-[#06B6D4] font-bold mb-1">
                                MODULE 0{i + 1}
                              </span>
                              <span className="line-clamp-2">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Crisp Status Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-[#050814]/90 text-[#06B6D4] border border-slate-800">
                        {activeProject.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-[#050814]/90 text-emerald-400 border border-slate-800">
                        {activeProject.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Details Body */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                        {activeProject.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] mt-1 leading-relaxed line-clamp-2">
                        {activeProject.description}
                      </p>
                    </div>

                    {/* Key Capabilities Grid */}
                    <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#101A30]/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8]">
                          Core Capabilities
                        </p>
                        {activeProject.highlightMetric && (
                          <span className="font-mono text-[11px] text-[#3B82F6] dark:text-[#06B6D4] font-medium">
                            {activeProject.highlightMetric}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {activeProject.features.slice(0, 4).map((feat: string, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200"
                          >
                            <span className="font-mono text-[11px] font-bold text-[#3B82F6] dark:text-[#06B6D4] shrink-0">
                              0{idx + 1}.
                            </span>
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Widget Footer */}
                <div className="px-5 py-3.5 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-[#050814]/50 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {activeProject.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-white dark:bg-[#101A30] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    {activeProject.liveUrl && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}

                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300 hover:text-[#3B82F6] dark:hover:text-[#06B6D4]"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedProjectId(activeProject.id)}
                      className="inline-flex items-center gap-1 font-semibold text-[#3B82F6] dark:text-[#06B6D4] hover:underline"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
