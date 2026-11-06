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
    <header className="sticky top-0 z-40 w-full bg-[#F5F4F0]/95 dark:bg-[#0D0D0D]/95 border-b border-[#DCDCDC] dark:border-[#333333] backdrop-blur-sm transition-colors no-print">
      <div className="max-w-[1260px] mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-base sm:text-lg font-bold tracking-tight text-[#0D0D0D] dark:text-[#F5F4F0] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#B8B8B8]"
        >
          <span className="w-7 h-7 rounded-md bg-[#252525] dark:bg-[#252525] border border-[#4D4D4D] dark:border-[#4D4D4D] flex items-center justify-center font-mono text-xs font-bold text-[#F5F4F0] dark:text-[#EDECE8]">
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
                    ? 'text-white bg-[#562f54] border border-[#562f54] font-semibold'
                    : 'text-[#4D4D4D] dark:text-[#B8B8B8] hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0] hover:bg-[#EDECE8] dark:hover:bg-[#252525]/70'
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
            className="p-2 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] text-[#252525] dark:text-[#EDECE8] hover:border-[#562f54] dark:hover:border-[#562f54] transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#562f54]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setStudioOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] text-xs font-medium text-[#252525] dark:text-[#EDECE8] hover:border-[#562f54] dark:hover:border-[#562f54] transition-colors whitespace-nowrap shrink-0"
          >
            <Sliders className="w-3.5 h-3.5 text-[#562f54] dark:text-[#c996c6]" />
            <span>Studio</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold bg-[#562f54] text-white hover:bg-[#6b3b68] border border-[#562f54] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] text-[#252525] dark:text-[#EDECE8] hover:border-[#858585] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DCDCDC] dark:border-[#333333] bg-[#F5F4F0] dark:bg-[#252525] px-4 sm:px-6 py-4 space-y-3">
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
                      ? 'bg-[#562f54] border-[#562f54] text-white font-semibold'
                      : 'border-transparent text-[#4D4D4D] dark:text-[#B8B8B8] hover:bg-[#EDECE8] dark:hover:bg-[#333333]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-[#DCDCDC] dark:border-[#333333] flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setStudioOpen(true);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#EDECE8] dark:bg-[#333333] border border-[#DCDCDC] dark:border-[#4D4D4D] text-xs font-semibold text-[#0D0D0D] dark:text-[#EDECE8]"
            >
              <Sliders className="w-3.5 h-3.5 text-[#562f54] dark:text-[#c996c6]" />
              <span>Studio Editor</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center px-3 py-2.5 text-xs font-semibold bg-[#562f54] text-white hover:bg-[#6b3b68] rounded-lg transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
