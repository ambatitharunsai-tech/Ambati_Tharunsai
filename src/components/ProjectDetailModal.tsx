import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, Globe, Layers, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
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

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 overflow-y-auto"
          onClick={() => setSelectedProjectId(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-4xl my-auto bg-[#F5F4F0] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header */}
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#DCDCDC] dark:border-[#333333] bg-[#EDECE8] dark:bg-[#0D0D0D]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#858585] dark:text-[#B8B8B8]">
                <span className="text-[#252525] dark:text-[#EDECE8] font-semibold">
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
                className="p-1.5 rounded-lg text-[#4D4D4D] hover:text-[#0D0D0D] dark:text-[#B8B8B8] dark:hover:text-[#F5F4F0] hover:bg-[#DCDCDC] dark:hover:bg-[#333333] transition-colors"
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
                    className="font-display text-2xl sm:text-3xl font-bold text-[#0D0D0D] dark:text-[#F5F4F0]"
                  >
                    {project.title}
                  </h2>
                  <p className="text-sm sm:text-base font-medium text-[#4D4D4D] dark:text-[#B8B8B8]">
                    {project.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#562f54] text-white hover:bg-[#6b3b68] border border-[#562f54] transition-colors"
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
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#562f54] border border-[#562f54] text-white hover:bg-[#6b3b68] transition-colors"
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
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#562f54] text-white hover:bg-[#6b3b68] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Live Platform</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Visual Preview or Live Website Embed */}
              {project.liveUrl && (
                <div className="rounded-lg border border-[#DCDCDC] dark:border-[#333333] bg-[#EDECE8] dark:bg-[#0D0D0D] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#DCDCDC] dark:border-[#333333] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#252525] dark:text-[#DCDCDC]">
                      <Globe className="w-4 h-4 text-emerald-500" />
                      <span>{project.liveUrl}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowLiveIframe((prev) => !prev)}
                        className="px-3 py-1 text-xs font-semibold rounded-md bg-[#562f54] text-white hover:bg-[#6b3b68] transition-colors"
                      >
                        {showLiveIframe
                          ? 'Hide Interactive Preview'
                          : 'Load Live Interactive Preview'}
                      </button>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-xs font-semibold rounded-md bg-[#562f54] border border-[#562f54] text-white hover:bg-[#6b3b68] transition-colors"
                      >
                        New Tab ↗
                      </a>
                    </div>
                  </div>

                  {showLiveIframe ? (
                    <div className="w-full h-96 bg-[#F5F4F0]">
                      <iframe
                        src={project.liveUrl}
                        title={`${project.title} Live Preview`}
                        className="w-full h-full border-0"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-[#0D0D0D] dark:text-[#F5F4F0]">
                          Verified Production Deployment on Render
                        </p>
                        <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8]">
                          Click "Load Live Interactive Preview" to inspect the deployed application
                          directly inside this viewport or launch it in a new browser tab.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {project.previewImage && !showLiveIframe && (
                <div className="rounded-lg overflow-hidden border border-[#DCDCDC] dark:border-[#333333] bg-[#0D0D0D] max-h-72">
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
                <div className="p-5 rounded-lg bg-[#EDECE8] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] space-y-2">
                  <h3 className="font-mono text-xs font-semibold text-[#252525] dark:text-[#EDECE8]">
                    PROBLEM ADDRESSED
                  </h3>
                  <p className="text-sm text-[#252525] dark:text-[#DCDCDC] leading-relaxed">
                    {project.problemSolved}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#EDECE8] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] space-y-2">
                  <h3 className="font-mono text-xs font-semibold text-[#252525] dark:text-[#EDECE8]">
                    SYSTEM & DATA ARCHITECTURE
                  </h3>
                  <p className="text-sm text-[#252525] dark:text-[#DCDCDC] leading-relaxed">
                    {project.architectureOverview}
                  </p>
                </div>
              </div>

              {/* Complete Feature Specification */}
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                  Core Engineering Features & Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <div
                      key={feature}
                      className="p-3.5 rounded-lg bg-[#EDECE8] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] flex items-start gap-3 text-xs sm:text-sm text-[#252525] dark:text-[#DCDCDC]"
                    >
                      <span className="font-mono text-xs font-semibold text-[#4D4D4D] dark:text-[#B8B8B8] tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack */}
              <div className="pt-4 border-t border-[#DCDCDC] dark:border-[#333333] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-[#858585] block">TECHNOLOGY STACK</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-[#EDECE8] dark:bg-[#333333] border border-[#DCDCDC] dark:border-[#4D4D4D] text-[#252525] dark:text-[#DCDCDC]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#4D4D4D] dark:text-[#B8B8B8]">
                  <Layers className="w-4 h-4 text-[#252525] dark:text-[#EDECE8]" />
                  <span>{project.status}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
