import React, { useState } from 'react';
import { Sliders } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { TimelineEntry } from '../types/portfolio';
import { SubtleSectionGrid } from './ui/interactive-grid-pattern';

export const AboutSection: React.FC = () => {
  const { data, setStudioOpen } = usePortfolio();
  const [timelineFilter, setTimelineFilter] = useState<string>('All');

  const categories: ('All' | TimelineEntry['category'])[] = [
    'All',
    'Education',
    'Technical Journey',
    'Projects',
    'Hackathons',
    'Certifications',
    'Milestones',
  ];

  const filteredTimeline =
    timelineFilter === 'All'
      ? data.timeline
      : data.timeline.filter((item) => item.category === timelineFilter);

  return (
    <section
      id="about"
      className="relative py-20 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#050814]"
    >
      <SubtleSectionGrid cellSize={40} />

      <div className="relative z-10 max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Split: Editorial Bio & Complete Development Lifecycle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Introduction & Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <p className="font-mono text-xs font-semibold tracking-wider text-[#3B82F6] dark:text-[#06B6D4]">
                01. ABOUT & ENGINEERING PHILOSOPHY
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC]"
                style={{ textWrap: 'balance' }}
              >
                Transforming Ideas into Functional Software & Intelligent Systems
              </h2>

              <div className="space-y-3.5 text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed max-w-[65ch]">
                {data.profile.introParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-[#94A3B8]">
              <span>Location: {data.profile.location}</span>
              <span aria-hidden="true">·</span>
              <span>Focus: Full-Stack & AI/ML Engineering</span>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setStudioOpen(true)}
                className="inline-flex items-center gap-1 font-semibold text-[#3B82F6] dark:text-[#06B6D4] hover:underline"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Edit Bio & Timeline</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Complete Development Lifecycle Widget */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.05, ease: 'easeOut' }}
            className="lg:col-span-6 bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800/90 rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-[#F8FAFC]">
                  End-to-End Engineering Lifecycle
                </h3>
                <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">
                  Systematic execution from problem formulation to production deployment
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold bg-white dark:bg-[#101A30] border border-slate-200 dark:border-slate-800 text-[#3B82F6] dark:text-[#06B6D4]">
                4 STAGES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.lifecycleStages.map((stage) => (
                <div
                  key={stage.step}
                  className="p-4 rounded-lg bg-white dark:bg-[#101A30]/70 border border-slate-200/80 dark:border-slate-800/80 space-y-1.5 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#3B82F6] dark:text-[#06B6D4]">
                        STAGE {stage.step}
                      </span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                      {stage.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Core Engineering Focus Areas (Equal-Height Cards) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                Core Technical Passions & Focus Areas
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-[#94A3B8] mt-1">
                Key engineering disciplines driving my academic and software projects
              </p>
            </div>
            <span className="font-mono text-xs text-slate-500 dark:text-[#94A3B8] tabular-nums">
              {data.aboutPassions.length} Disciplines
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.aboutPassions.map((passion, idx) => (
              <motion.div
                key={passion.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: 'easeOut' }}
                className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800/90 hover:border-[#3B82F6]/50 dark:hover:border-[#06B6D4]/50 transition-colors flex flex-col justify-between space-y-2.5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-display text-base font-bold text-slate-900 dark:text-[#F8FAFC]">
                    {passion.title}
                  </h4>
                  <span className="font-mono text-xs text-[#3B82F6] dark:text-[#06B6D4] tabular-nums">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  {passion.summary}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Editable Technical & Academic Journey Timeline */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                Technical Journey & Milestones Timeline
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-[#94A3B8] mt-1">
                Verified milestones across education, engineering builds, and hackathons
              </p>
            </div>

            {/* Interactive Segmented Filter Controls */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setTimelineFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    timelineFilter === cat
                      ? 'bg-[#3B82F6] text-white font-semibold'
                      : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F8FAFC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-[#F8FAFC] dark:bg-[#0B1124] divide-y divide-slate-200/80 dark:divide-slate-800/80 overflow-hidden">
            {filteredTimeline.map((entry) => (
              <div
                key={entry.id}
                className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline hover:bg-white dark:hover:bg-[#101A30]/50 transition-colors"
              >
                <div className="md:col-span-3 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
                  <span className="text-[#3B82F6] dark:text-[#06B6D4] font-semibold">
                    {entry.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{entry.period}</span>
                </div>

                <div className="md:col-span-4">
                  <h4 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-[#F8FAFC]">
                    {entry.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">
                    {entry.organization}
                  </p>
                </div>

                <div className="md:col-span-5 text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  {entry.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
