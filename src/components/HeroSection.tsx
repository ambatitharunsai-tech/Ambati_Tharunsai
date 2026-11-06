import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Github,
  Layers,
  Linkedin,
  Mail,
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
  } = usePortfolio();

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

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden bg-[#F5F4F0] dark:bg-[#0D0D0D] border-b border-[#DCDCDC] dark:border-[#333333] transition-colors"
    >
      {/* Main Background: Figma Ink Wash Interactive Grid Pattern with Soft Ivory Spotlight & Silver-Gray Trail */}
      <InteractiveGridPattern
        cellSize={40}
        glowColor={
          theme === 'dark' ? 'rgba(220, 220, 220, 0.22)' : 'rgba(77, 77, 77, 0.14)'
        }
        secondaryGlowColor={
          theme === 'dark' ? 'rgba(184, 184, 184, 0.15)' : 'rgba(133, 133, 133, 0.10)'
        }
        lineColor={
          theme === 'dark' ? 'rgba(184, 184, 184, 0.09)' : 'rgba(77, 77, 77, 0.12)'
        }
        proximity={135}
        fadeDuration={850}
        trailCount={24}
      />

      {/* Main Content Container (Consistent 1260px Grid Alignment) */}
      <div className="relative z-10 max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Developer Identity, Typography, CTAs, Links & Core Capabilities */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="lg:col-span-8 flex flex-col justify-between space-y-7"
          >
            <div className="space-y-6">
              {/* Identity Header */}
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#B8B8B8] dark:border-[#4D4D4D] bg-[#EDECE8] dark:bg-[#252525] shrink-0">
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
                  <div className="w-full h-full flex items-center justify-center font-mono text-sm font-bold bg-[#252525] text-[#EDECE8]">
                    ATS
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="font-mono text-xs font-semibold tracking-wider text-[#4D4D4D] dark:text-[#B8B8B8] uppercase">
                    {data.profile.headline}
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4D4D4D] dark:text-[#B8B8B8] mt-1">
                    <span className="font-mono text-[#858585]">&gt;</span>
                    <span className="font-mono font-semibold text-[#0D0D0D] dark:text-[#F5F4F0]">
                      {displayedRole}
                      <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-[#0D0D0D] dark:bg-[#EDECE8]" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Display Headline & Description */}
              <div className="space-y-4">
                <h1
                  className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#0D0D0D] dark:text-[#F5F4F0] leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  Hi, I'm{' '}
                  <span className="text-[#252525] dark:text-[#EDECE8] underline decoration-[#B8B8B8]/50 dark:decoration-[#4D4D4D] underline-offset-8">
                    {data.profile.fullName}.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed max-w-[62ch]">
                  {data.profile.heroSubheadline}
                </p>
              </div>

              {/* Primary CTA Buttons (Sharp 8px radius, #562f54 button color) */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold bg-[#562f54] text-white hover:bg-[#6b3b68] border border-[#562f54] active:scale-[0.99] rounded-lg transition-all whitespace-nowrap shrink-0"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#562f54] hover:bg-[#6b3b68] border border-[#562f54] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Contact Me
                </a>
              </div>

              {/* Verified GitHub, LinkedIn & Email Bar */}
              <div className="pt-4 border-t border-[#DCDCDC] dark:border-[#333333] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                <a
                  href={data.profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-[#252525] dark:text-[#DCDCDC] hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0] transition-colors"
                >
                  <Github className="w-4 h-4 text-[#4D4D4D] dark:text-[#B8B8B8]" />
                  <span>github.com/ambatitharunsai-tech</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-75" />
                </a>

                {data.profile.linkedinUrl && (
                  <a
                    href={data.profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-[#252525] dark:text-[#DCDCDC] hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#4D4D4D] dark:text-[#B8B8B8]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-75" />
                  </a>
                )}

                {data.profile.email && (
                  <a
                    href={`mailto:${data.profile.email}`}
                    className="inline-flex items-center gap-1.5 font-medium text-[#252525] dark:text-[#DCDCDC] hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#4D4D4D] dark:text-[#B8B8B8]" />
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
                    className="p-3.5 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] hover:border-[#858585] dark:hover:border-[#858585] transition-colors flex flex-col justify-between"
                  >
                    <Icon className="w-4 h-4 text-[#252525] dark:text-[#EDECE8] mb-2" />
                    <div>
                      <p className="font-display text-xs font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                        {pillar.label}
                      </p>
                      <p className="font-mono text-[11px] text-[#4D4D4D] dark:text-[#B8B8B8] mt-0.5 truncate">
                        {pillar.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

