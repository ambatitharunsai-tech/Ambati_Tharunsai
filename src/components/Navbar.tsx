import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar: React.FC = () => {
  const { data, zenMode } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (zenMode) {
    return null;
  }

  const navLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Innovation', href: '#innovation' },
    { label: 'GitHub', href: '#github' },
    { label: 'Credentials', href: '#credentials' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8FAFC]/95 dark:bg-[#060B16]/95 border-b border-slate-200 dark:border-slate-800/80 transition-colors no-print">
      <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-500"
        >
          {data.profile.fullName}
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-blue-600 dark:hover:border-cyan-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            Contact Me
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B1325] px-6 py-4 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-slate-700 dark:text-slate-200">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
            >
              About & Journey
            </a>
            <a
              href="#resume"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
            >
              Resume
            </a>
          </nav>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
