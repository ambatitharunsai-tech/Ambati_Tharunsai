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
      className="relative py-20 sm:py-24 border-b border-[#DCDCDC] dark:border-[#333333] bg-[#F5F4F0] dark:bg-[#0D0D0D]"
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
              <p className="font-mono text-xs font-semibold tracking-wider text-[#4D4D4D] dark:text-[#B8B8B8]">
                01. ABOUT & ENGINEERING PHILOSOPHY
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D] dark:text-[#F5F4F0]"
                style={{ textWrap: 'balance' }}
              >
                Transforming Ideas into Functional Software & Intelligent Systems
              </h2>

              <div className="space-y-3.5 text-sm sm:text-base text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed max-w-[65ch]">
                {data.profile.introParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCDCDC] dark:border-[#333333] flex flex-wrap items-center gap-4 text-xs text-[#858585] dark:text-[#B8B8B8]">
              <span>Location: {data.profile.location}</span>
              <span aria-hidden="true">·</span>
              <span>Focus: Full-Stack & AI/ML Engineering</span>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setStudioOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#562f54] text-white font-semibold hover:bg-[#6b3b68] transition-colors"
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
            className="lg:col-span-6 bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-6"
          >
            <div className="flex items-center justify-between border-b border-[#DCDCDC] dark:border-[#333333] pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                  End-to-End Engineering Lifecycle
                </h3>
                <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8] mt-0.5">
                  Systematic execution from problem formulation to production deployment
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold bg-[#F5F4F0] dark:bg-[#333333] border border-[#DCDCDC] dark:border-[#4D4D4D] text-[#252525] dark:text-[#EDECE8]">
                4 STAGES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.lifecycleStages.map((stage) => (
                <div
                  key={stage.step}
                  className="p-4 rounded-lg bg-[#F5F4F0] dark:bg-[#0D0D0D]/60 border border-[#DCDCDC] dark:border-[#333333] space-y-1.5 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#4D4D4D] dark:text-[#B8B8B8]">
                        STAGE {stage.step}
                      </span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                      {stage.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Core Engineering Focus Areas (Equal-Height Cards) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#DCDCDC] dark:border-[#333333] pb-4">
            <div>
              <h3 className="font-display text-xl font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                Core Technical Passions & Focus Areas
              </h3>
              <p className="text-xs sm:text-sm text-[#4D4D4D] dark:text-[#B8B8B8] mt-1">
                Key engineering disciplines driving my academic and software projects
              </p>
            </div>
            <span className="font-mono text-xs text-[#858585] dark:text-[#B8B8B8] tabular-nums">
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
                className="p-5 rounded-xl bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] hover:border-[#858585] dark:hover:border-[#858585] transition-colors flex flex-col justify-between space-y-2.5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-display text-base font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                    {passion.title}
                  </h4>
                  <span className="font-mono text-xs text-[#858585] dark:text-[#B8B8B8] tabular-nums">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
                  {passion.summary}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Editable Technical & Academic Journey Timeline */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DCDCDC] dark:border-[#333333] pb-4">
            <div>
              <h3 className="font-display text-xl font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                Technical Journey & Milestones Timeline
              </h3>
              <p className="text-xs sm:text-sm text-[#4D4D4D] dark:text-[#B8B8B8] mt-1">
                Verified milestones across education, engineering builds, and hackathons
              </p>
            </div>

            {/* Interactive Segmented Filter Controls */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setTimelineFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    timelineFilter === cat
                      ? 'bg-[#562f54] text-white font-semibold'
                      : 'text-[#4D4D4D] dark:text-[#B8B8B8] hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#DCDCDC] dark:border-[#333333] bg-[#EDECE8] dark:bg-[#252525] divide-y divide-[#DCDCDC] dark:divide-[#333333] overflow-hidden">
            {filteredTimeline.map((entry) => (
              <div
                key={entry.id}
                className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline hover:bg-[#F5F4F0] dark:hover:bg-[#333333]/60 transition-colors"
              >
                <div className="md:col-span-3 flex items-center gap-2 text-xs font-mono text-[#858585] dark:text-[#B8B8B8]">
                  <span className="text-[#252525] dark:text-[#EDECE8] font-semibold">
                    {entry.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{entry.period}</span>
                </div>

                <div className="md:col-span-4">
                  <h4 className="font-display text-sm sm:text-base font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                    {entry.title}
                  </h4>
                  <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8] mt-0.5">
                    {entry.organization}
                  </p>
                </div>

                <div className="md:col-span-5 text-xs sm:text-sm text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
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
