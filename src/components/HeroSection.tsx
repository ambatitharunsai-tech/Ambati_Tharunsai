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
  Moon,
  Sliders,
  Sparkles,
  Sun,
  Terminal,
} from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { InteractiveGridPattern } from './ui/interactive-grid-pattern';

export const HeroSection: React.FC = () => {
  const {
    data,
    theme,
    toggleTheme,
    setStudioOpen,
    setResumeModalOpen,
    setSelectedProjectId,
  } = usePortfolio();

  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);

  // Typing animation state for roles
  const roles = data.profile.typingRoles.length
    ? data.profile.typingRoles
    : ['Full-Stack Developer', 'AI Enthusiast', 'Software Developer', 'Machine Learning & NLP Builder'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = roles[roleIndex % roles.length];
    const speed = isDeleting ? 35 : 75;

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
      className="relative w-full overflow-hidden bg-[#F8FAFC] dark:bg-[#050814] border-b border-slate-200 dark:border-slate-800/80 transition-colors"
    >
      {/* Ambient Blue & Violet Gradient Orbs (Pointer-events-none) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-36 -left-36 w-[520px] h-[520px] rounded-full bg-blue-600/12 dark:bg-blue-600/20 blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-[520px] h-[520px] rounded-full bg-violet-600/12 dark:bg-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-[460px] h-[460px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl" />
      </div>

      {/* shadcn/ui Interactive Grid Pattern Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden [mask-image:radial-gradient(760px_circle_at_center,white,transparent)]">
        <InteractiveGridPattern
          width={44}
          height={44}
          squares={[38, 24]}
          className="inset-x-0 inset-y-[-10%] h-[120%] skew-y-3"
        />
      </div>

      {/* Top Utility Bar: Location, Availability, Theme Switcher, and Studio Editor */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-6 pt-5 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-white/90 dark:bg-[#0B1124]/90 backdrop-blur-md border border-slate-200/90 dark:border-indigo-500/25 text-xs text-slate-600 dark:text-slate-300 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-900 dark:text-white">
            {data.profile.location}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-blue-600 dark:text-indigo-400 font-medium">
            {data.profile.availabilityStatus}
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-[#0B1124]/90 backdrop-blur-md border border-slate-200 dark:border-indigo-500/25 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-violet-400 transition-colors whitespace-nowrap shrink-0"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Light Theme</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-600" />
                <span>Dark Theme</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setStudioOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-[#0B1124]/90 backdrop-blur-md border border-slate-200 dark:border-indigo-500/25 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-violet-400 transition-colors whitespace-nowrap shrink-0"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600 dark:text-violet-400" />
            <span>Studio Editor</span>
          </button>
        </div>
      </div>

      {/* Main Hero Split Layout */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-6 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pointer-events-none">
        {/* Left Column: Developer Identity, Large Introduction, Animated Role, CTAs & Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="lg:col-span-6 space-y-6 pointer-events-auto"
        >
          {/* Profile Image & Role Pill */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-500/40 dark:border-indigo-500/50 bg-white dark:bg-[#0B1124] shadow-md shrink-0">
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
              <div className="w-full h-full flex items-center justify-center font-display text-lg font-bold bg-gradient-to-br from-blue-600 to-violet-600 text-white">
                ATS
              </div>
            </div>

            <div className="min-w-0">
              <p className="font-mono text-xs font-semibold tracking-wider text-blue-600 dark:text-indigo-400 uppercase">
                {data.profile.headline}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                <span>Role:</span>
                <span className="font-mono font-semibold bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  {displayedRole}
                  <span className="inline-block w-1.5 h-4 ml-0.5 align-middle bg-indigo-500" />
                </span>
              </div>
            </div>
          </div>

          {/* Large Introduction & Short Professional Description */}
          <div className="space-y-4">
            <h1
              className="font-display text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                {data.profile.fullName}.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-[60ch]">
              {data.profile.heroSubheadline}
            </p>
          </div>

          {/* Primary Action Buttons: View Projects & Download Resume */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl transition-all whitespace-nowrap shrink-0 shadow-md shadow-indigo-500/20"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white/90 dark:bg-[#0B1124]/90 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-[#131D38] border border-slate-200 dark:border-indigo-500/30 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-2xs"
            >
              <Download className="w-4 h-4 text-blue-600 dark:text-indigo-400" />
              <span>Download Resume</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0"
            >
              Contact Me
            </a>
          </div>

          {/* Verified GitHub, LinkedIn & Email Links */}
          <div className="pt-4 border-t border-slate-200/90 dark:border-slate-800/90 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs text-slate-600 dark:text-slate-400">
            <a
              href={data.profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Github className="w-4 h-4 text-blue-600 dark:text-indigo-400" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {data.profile.linkedinUrl && (
              <a
                href={data.profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {data.profile.email && (
              <a
                href={`mailto:${data.profile.email}`}
                className="inline-flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-600 dark:text-indigo-400" />
                <span>{data.profile.email}</span>
              </a>
            )}
          </div>

          {/* Core Engineering Domains Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              {
                icon: Sparkles,
                label: 'AI & NLP Systems',
                sub: 'LLM · Ollama · Groq',
              },
              {
                icon: Code2,
                label: 'Full-Stack Web',
                sub: 'React · FastAPI · Flask',
              },
              {
                icon: Layers,
                label: 'Mobile Apps',
                sub: 'Flutter · Dart · IoT',
              },
              {
                icon: Terminal,
                label: 'Cloud & Databases',
                sub: 'Supabase · Docker · Render',
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.label}
                  className="p-3 rounded-xl bg-white/85 dark:bg-[#0B1124]/80 backdrop-blur-md border border-slate-200/80 dark:border-indigo-500/20 hover:border-blue-500/40 dark:hover:border-violet-400/40 transition-colors"
                >
                  <Icon className="w-4 h-4 text-blue-600 dark:text-indigo-400 mb-1.5" />
                  <p className="font-display text-xs font-bold text-slate-900 dark:text-white">
                    {pillar.label}
                  </p>
                  <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {pillar.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Interactive Glassmorphic Project & Architecture Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-6 pointer-events-auto"
        >
          {activeProject && (
            <div className="rounded-2xl bg-white/90 dark:bg-[#0B1124]/85 backdrop-blur-xl border border-slate-200 dark:border-indigo-500/25 shadow-2xl overflow-hidden">
              {/* Top Window Header & Project Switcher */}
              <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800/90 flex flex-wrap items-center justify-between gap-3 bg-slate-50/90 dark:bg-[#070C1B]/90">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-600 dark:text-indigo-400">
                  <Cpu className="w-4 h-4" />
                  <span>
                    FEATURED SYSTEM 0{activeProjectIndex + 1} / 0{projects.length}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => cycleProject(-1)}
                    aria-label="Previous project"
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-500 dark:hover:border-violet-400 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => cycleProject(1)}
                    aria-label="Next project"
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-500 dark:hover:border-violet-400 transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quick Project Selector Tabs */}
              <div className="px-5 py-2.5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-100/50 dark:bg-[#050814]/60">
                {projects.slice(0, 5).map((proj, idx) => {
                  const isSelected = idx === activeProjectIndex;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => setActiveProjectIndex(idx)}
                      className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-all whitespace-nowrap shrink-0 ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      0{idx + 1}. {proj.title}
                    </button>
                  );
                })}
              </div>

              {/* Project Visual or Architectural Diagram Preview */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                {activeProject.previewImage ? (
                  <img
                    src={activeProject.previewImage}
                    alt={activeProject.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#0B1124] via-[#131B38] to-[#050814] text-white">
                    <div className="flex items-center justify-between font-mono text-xs text-indigo-400">
                      <span>ARCHITECTURE PIPELINE</span>
                      <span>{activeProject.category}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5 my-auto">
                      {activeProject.features.slice(0, 3).map((feat: string, i: number) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg bg-white/5 border border-indigo-500/20 text-[11px] font-mono text-slate-200 leading-snug"
                        >
                          <span className="block text-indigo-400 font-bold mb-1">
                            MODULE 0{i + 1}
                          </span>
                          <span className="line-clamp-2">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Overlay Category & Status */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-950/85 text-indigo-300 border border-indigo-500/30">
                    {activeProject.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-950/85 text-emerald-300 border border-emerald-500/30">
                    {activeProject.status}
                  </span>
                </div>
              </div>

              {/* Spotlight Details & Architecture Summary */}
              <div className="p-5 sm:p-6 space-y-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {activeProject.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                {/* System Architecture & Key Capabilities */}
                <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-[#050814]/90 border border-slate-200/80 dark:border-slate-800/90 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Key Capabilities
                    </p>
                    {activeProject.highlightMetric && (
                      <span className="font-mono text-[11px] text-blue-600 dark:text-indigo-400 font-medium">
                        {activeProject.highlightMetric}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {activeProject.features.slice(0, 4).map((feat: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                      >
                        <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-indigo-400 shrink-0">
                          0{idx + 1}.
                        </span>
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack & Action Links */}
                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {activeProject.technologies.slice(0, 5).join(' · ')}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs">
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
                        className="inline-flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-indigo-400"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedProjectId(activeProject.id)}
                      className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-indigo-400 hover:underline"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
