/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactAndFooter } from './components/ContactAndFooter';
import { CredentialsSection } from './components/CredentialsSection';
import { GitHubSection } from './components/GitHubSection';
import { HeroSection } from './components/HeroSection';
import { InnovationSection } from './components/InnovationSection';
import { Navbar } from './components/Navbar';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeSection } from './components/ResumeSection';
import { SkillsSection } from './components/SkillsSection';
import { StudioEditorModal } from './components/StudioEditorModal';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

const VALID_ANCHORS = new Set([
  '',
  '#',
  '#top',
  '#about',
  '#skills',
  '#projects',
  '#innovation',
  '#github',
  '#credentials',
  '#resume',
  '#contact',
]);

const PortfolioShell: React.FC = () => {
  const { data, setSelectedProjectId } = usePortfolio();
  const [notFoundRoute, setNotFoundRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkHashRoute = () => {
      const hash = window.location.hash;
      if (!hash || VALID_ANCHORS.has(hash)) {
        setNotFoundRoute(null);
        return;
      }
      if (hash.startsWith('#project/')) {
        const projId = hash.replace('#project/', '');
        const found = data.projects.some((p) => p.id === projId);
        if (found) {
          setSelectedProjectId(projId);
          setNotFoundRoute(null);
          return;
        }
      }
      if (hash.startsWith('#/')) {
        setNotFoundRoute(hash);
      } else {
        setNotFoundRoute(null);
      }
    };

    checkHashRoute();
    window.addEventListener('hashchange', checkHashRoute);
    return () => window.removeEventListener('hashchange', checkHashRoute);
  }, [data.projects, setSelectedProjectId]);

  if (notFoundRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#050814] text-slate-900 dark:text-[#F8FAFC]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-xl bg-white dark:bg-[#0B1124] border border-slate-200/80 dark:border-slate-800/80 text-center space-y-4">
            <p className="font-mono text-xs font-semibold text-[#3B82F6] dark:text-[#06B6D4]">
              ERROR 404 · ROUTE NOT FOUND
            </p>
            <h1 className="font-display text-2xl font-bold">Page Not Found</h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
              The route <code className="font-mono text-[#3B82F6]">{notFoundRoute}</code> does not
              exist on Ambati Tharun Sai's portfolio.
            </p>
            <button
              type="button"
              onClick={() => {
                window.location.hash = '#top';
                setNotFoundRoute(null);
              }}
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#3B82F6] hover:bg-blue-500 text-white transition-colors"
            >
              Return to Portfolio Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#050814] text-slate-900 dark:text-[#F8FAFC] transition-colors">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <InnovationSection />
        <GitHubSection />
        <CredentialsSection />
        <ResumeSection />
        <ContactAndFooter />
      </main>
      <ProjectDetailModal />
      <StudioEditorModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioShell />
    </PortfolioProvider>
  );
}
