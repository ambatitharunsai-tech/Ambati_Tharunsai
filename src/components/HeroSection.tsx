import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Download,
  Github,
  Linkedin,
  Maximize2,
  Minimize2,
  Moon,
  Sliders,
  Sun,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CameraPreset, FinishPreset, NeuralCoreScene } from './NeuralCoreScene';

export const HeroSection: React.FC = () => {
  const {
    data,
    theme,
    toggleTheme,
    zenMode,
    setZenMode,
    setStudioOpen,
    setResumeModalOpen,
    setSelectedProjectId,
  } = usePortfolio();

  // 3D Scene Interactive Controls
  const [exploded, setExploded] = useState<number>(0.15);
  const [finish, setFinish] = useState<FinishPreset>('cobalt');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('isometric');
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(0);

  // Typing animation state for roles
  const roles = data.profile.typingRoles.length
    ? data.profile.typingRoles
    : ['Software Developer', 'AI/ML Enthusiast', 'Full-Stack Developer', 'Problem Solver'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = roles[roleIndex % roles.length];
    const speed = isDeleting ? 40 : 80;

    const timer = window.setTimeout(() => {
      if (!isDeleting && displayedRole.length < currentFullRole.length) {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length + 1));
      } else if (!isDeleting && displayedRole.length === currentFullRole.length) {
        window.setTimeout(() => setIsDeleting(true), 1400);
      } else if (isDeleting && displayedRole.length > 0) {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length - 1));
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex, roles]);

  // Keyboard shortcut 'H' to toggle Zen 3D / Dock visibility when not typing in an input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'h' || e.key === 'H') {
        setDockCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectSatelliteNode = (nodeIdx: number) => {
    setActiveNodeIndex(nodeIdx);
  };

  const activeProject =
    activeNodeIndex !== null ? data.projects[activeNodeIndex % data.projects.length] : null;

  return (
    <section
      id="top"
      className="relative w-full min-h-[calc(100vh-61px)] lg:h-[calc(100vh-61px)] overflow-hidden bg-[#F1F5F9] dark:bg-[#060B16] border-b border-slate-200 dark:border-slate-800/80"
    >
      {/* Full-Viewport 3D WebGL Canvas Stage */}
      <div className="absolute inset-0 z-0">
        <NeuralCoreScene
          theme={theme}
          exploded={exploded}
          finish={finish}
          cameraPreset={cameraPreset}
          activeNodeIndex={activeNodeIndex}
          onSelectNode={handleSelectSatelliteNode}
        />
      </div>

      {/* Top-Left / Top-Right Workspace Utility Strip (Solid/RGBA surfaces, zero backdrop-filter over WebGL) */}
      <div className="relative z-20 max-w-[1360px] mx-auto px-6 pt-5 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-white/95 dark:bg-[#0B1325]/95 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 shadow-xs">
          <span className="font-semibold text-slate-900 dark:text-white">
            {data.profile.location}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-blue-600 dark:text-cyan-400 font-medium">
            {data.profile.availabilityStatus}
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-[#0B1325]/95 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-cyan-400 transition-colors whitespace-nowrap shrink-0"
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-[#0B1325]/95 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>Studio Editor</span>
          </button>

          <button
            type="button"
            onClick={() => setZenMode((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-blue-600 text-white text-xs font-medium hover:bg-slate-800 dark:hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
          >
            {zenMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Zen 3D</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Zen 3D View</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Hero Editorial Split Overlay (Hidden in Zen 3D Mode so 100% of viewport is unobstructed) */}
      {!zenMode && (
        <div className="relative z-10 max-w-[1360px] mx-auto px-6 pt-8 pb-32 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-none">
          {/* Left Editorial Identity Column */}
          <div className="lg:col-span-6 pointer-events-auto bg-white/95 dark:bg-[#060B16]/92 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-lg">
            {/* Portrait & Identity Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0">
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
                <div className="w-full h-full flex items-center justify-center font-display text-lg font-bold text-blue-600 dark:text-cyan-400">
                  ATS
                </div>
              </div>

              <div className="min-w-0">
                <p className="font-mono text-xs font-semibold tracking-wider text-blue-600 dark:text-cyan-400">
                  AMBATI THARUN SAI
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  <span>Computer Science Student</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-900 dark:text-slate-200 font-medium">
                    {displayedRole}
                    <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-blue-600 dark:bg-cyan-400" />
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Display Headline */}
            <h1
              className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-4"
              style={{ textWrap: 'balance' }}
            >
              {data.profile.heroHeadline}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-[62ch]">
              {data.profile.heroSubheadline} Passionate about building practical software,
              AI-powered applications, intelligent automation systems, and scalable full-stack
              architectures.
            </p>

            {/* Primary Hero CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
              >
                Explore My Work
              </a>

              <button
                type="button"
                onClick={() => setResumeModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-[#111C33] hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
              >
                Contact Me
              </a>
            </div>

            {/* Direct Verified Social & Profile Links (Clean unboxed metadata style) */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-4">
                <a
                  href={data.profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>github.com/ambatitharunsai-tech</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {data.profile.linkedinUrl ? (
                  <a
                    href={data.profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStudioOpen(true)}
                    className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>Add LinkedIn URL</span>
                  </button>
                )}
              </div>

              {activeProject && (
                <button
                  type="button"
                  onClick={() => setSelectedProjectId(activeProject.id)}
                  className="font-mono text-xs text-blue-600 dark:text-cyan-400 hover:underline text-left"
                >
                  Orbital Node #{(activeNodeIndex ?? 0) + 1}: {activeProject.title} →
                </button>
              )}
            </div>
          </div>

          {/* Right Column remains open so the 3D Neural Core is unobstructed */}
          <div className="hidden lg:block lg:col-span-6 pointer-events-none" />
        </div>
      )}

      {/* Unified Collapsible Bottom 3D Control Dock (<= 15% viewport footprint, solid/rgba surface) */}
      <div
        className="fixed lg:absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-[94vw] max-w-[920px] pointer-events-auto transition-transform duration-200"
        style={{
          transform: dockCollapsed ? 'translate(-50%, calc(100% - 34px))' : 'translate(-50%, 0)',
        }}
      >
        {/* Collapse / Expand Handle */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setDockCollapsed((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-t-lg bg-white/95 dark:bg-[#0B1325]/95 border border-b-0 border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            {dockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Show 3D Core Controls (H)</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Hide 3D Dock (H)</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Body */}
        <div className="bg-white/95 dark:bg-[#0B1325]/95 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 shadow-xl flex flex-wrap items-center justify-between gap-4">
          {/* Exploded Assembly Slider */}
          <div className="flex items-center gap-3 min-w-[200px] flex-1">
            <label
              htmlFor="exploded-slider"
              className="font-mono text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap shrink-0"
            >
              Explode Core: <span className="tabular-nums">{Math.round(exploded * 100)}%</span>
            </label>
            <input
              id="exploded-slider"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={exploded}
              onChange={(e) => setExploded(parseFloat(e.target.value))}
              className="w-full accent-blue-600 dark:accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Material Finish Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-[#060B16] border border-slate-200 dark:border-slate-800/80">
            {(
              [
                { id: 'cobalt', label: 'Cobalt Alloy' },
                { id: 'cryo', label: 'Cryo Cyan' },
                { id: 'obsidian', label: 'Obsidian' },
              ] as { id: FinishPreset; label: string }[]
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFinish(item.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  finish === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Camera Preset Selector */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-[#060B16] border border-slate-200 dark:border-slate-800/80">
            {(
              [
                { id: 'isometric', label: 'Isometric' },
                { id: 'macro', label: 'Core Macro' },
                { id: 'top', label: 'Telemetry Top' },
                { id: 'horizon', label: 'Side Profile' },
              ] as { id: CameraPreset; label: string }[]
            ).map((cam) => (
              <button
                key={cam.id}
                type="button"
                onClick={() => setCameraPreset(cam.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  cameraPreset === cam.id
                    ? 'bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cam.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
