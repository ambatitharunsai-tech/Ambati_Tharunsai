import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sliders, Sun, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const NAV_LINKS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'innovation', label: 'Architecture', href: '#innovation' },
  { id: 'github', label: 'GitHub', href: '#github' },
  { id: 'credentials', label: 'Credentials', href: '#credentials' },
  { id: 'resume', label: 'Resume', href: '#resume' },
];

export const Navbar: React.FC = () => {
  const { data, theme, toggleTheme, setStudioOpen } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('top');

  useEffect(() => {
    const sectionIds = ['top', ...NAV_LINKS.map((l) => l.id), 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      let current = 'top';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8FAFC]/95 dark:bg-[#050814]/95 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors no-print">
      <div className="max-w-[1260px] mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
        >
          <span className="w-7 h-7 rounded-md bg-[#0B1124] dark:bg-[#101A30] border border-slate-300 dark:border-slate-700/80 flex items-center justify-center font-mono text-xs font-bold text-[#3B82F6] dark:text-[#06B6D4]">
            ATS
          </span>
          <span>{data.profile.fullName}</span>
        </a>

        {/* Desktop Navigation Links with Active Section Indicator */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 text-xs font-medium"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#3B82F6] dark:text-[#06B6D4] bg-slate-100 dark:bg-[#101A30] font-semibold'
                    : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F8FAFC] hover:bg-slate-100/60 dark:hover:bg-[#0B1124]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-lg bg-white dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#3B82F6] dark:hover:border-[#06B6D4]/60 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#3B82F6]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setStudioOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-[#3B82F6] dark:hover:border-[#06B6D4]/60 transition-colors whitespace-nowrap shrink-0"
          >
            <Sliders className="w-3.5 h-3.5 text-[#3B82F6] dark:text-[#06B6D4]" />
            <span>Studio</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-white bg-[#3B82F6] hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-lg bg-white dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#3B82F6] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1124] px-4 sm:px-6 py-4 space-y-3">
          <nav className="grid grid-cols-2 gap-1.5 text-xs font-medium">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg border transition-colors ${
                    isActive
                      ? 'bg-slate-100 dark:bg-[#101A30] border-[#3B82F6]/40 dark:border-[#06B6D4]/40 text-[#3B82F6] dark:text-[#06B6D4] font-semibold'
                      : 'border-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#101A30]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setStudioOpen(true);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-100 dark:bg-[#101A30] border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <Sliders className="w-3.5 h-3.5 text-[#3B82F6] dark:text-[#06B6D4]" />
              <span>Studio Editor</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center px-3 py-2.5 text-xs font-semibold text-white bg-[#3B82F6] hover:bg-blue-500 rounded-lg transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
