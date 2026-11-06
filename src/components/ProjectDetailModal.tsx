import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, Globe, Layers, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ProjectDetailModal: React.FC = () => {
  const { data, selectedProjectId, setSelectedProjectId } = usePortfolio();
  const [showLiveIframe, setShowLiveIframe] = useState(false);

  const project = data.projects.find((p) => p.id === selectedProjectId) || null;

  useEffect(() => {
    setShowLiveIframe(false);
  }, [selectedProjectId]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProjectId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, setSelectedProjectId]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 overflow-y-auto"
      onClick={() => setSelectedProjectId(null)}
    >
      <div
        className="relative w-full max-w-4xl my-auto bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#060B16]">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-blue-600 dark:text-cyan-400 font-semibold">
              {project.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>Status: {project.status}</span>
            {project.updatedAt && (
              <>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">Updated {project.updatedAt}</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setSelectedProjectId(null)}
            aria-label="Close project details modal"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Title & Action Links */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-2">
              <h2
                id="project-modal-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
              >
                {project.title}
              </h2>
              <p className="text-sm sm:text-base font-medium text-blue-600 dark:text-cyan-400">
                {project.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}

              {project.secondaryGithubUrl && (
                <a
                  href={project.secondaryGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-500 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Frontend Repo</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Live Platform</span>
                </a>
              )}
            </div>
          </div>

          {/* Visual Preview or Live Website Embed */}
          {project.liveUrl && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#060B16] overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  <span>{project.liveUrl}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLiveIframe((prev) => !prev)}
                    className="px-3 py-1 text-xs font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                  >
                    {showLiveIframe ? 'Hide Interactive Preview' : 'Load Live Interactive Preview'}
                  </button>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs font-medium rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-500 transition-colors"
                  >
                    New Tab ↗
                  </a>
                </div>
              </div>

              {showLiveIframe ? (
                <div className="w-full h-96 bg-white">
                  <iframe
                    src={project.liveUrl}
                    title={`${project.title} Live Preview`}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Verified Production Deployment on Render
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Click "Load Live Interactive Preview" to inspect the deployed application
                      directly inside this viewport or launch it in a new browser tab.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {project.previewImage && !showLiveIframe && (
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 max-h-72">
              <img
                src={project.previewImage}
                alt={`${project.title} system architecture preview`}
                referrerPolicy="no-referrer"
                className="w-full h-72 object-cover"
              />
            </div>
          )}

          {/* Problem Statement & Architectural Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-mono text-xs font-semibold text-blue-600 dark:text-cyan-400">
                PROBLEM ADDRESSED
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.problemSolved}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-mono text-xs font-semibold text-blue-600 dark:text-cyan-400">
                SYSTEM & DATA ARCHITECTURE
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.architectureOverview}
              </p>
            </div>
          </div>

          {/* Complete Feature Specification */}
          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Core Engineering Features & Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <div
                  key={feature}
                  className="p-3.5 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                >
                  <span className="font-mono text-xs font-semibold text-blue-600 dark:text-cyan-400 tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs text-slate-400 block">TECHNOLOGY STACK</span>
              <div className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200">
                {project.technologies.join(' · ')}
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <Layers className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span>{project.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
