import React, { useState } from 'react';
import { Sliders } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { TimelineEntry } from '../types/portfolio';

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
      className="py-20 sm:py-24 px-6 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#060B16]"
    >
      <div className="max-w-[1360px] mx-auto space-y-16">
        {/* Top Split: Editorial Bio & Complete Development Lifecycle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Introduction & Philosophy */}
          <div className="lg:col-span-6 space-y-5">
            <p className="font-mono text-xs font-semibold tracking-wider text-blue-600 dark:text-cyan-400">
              01. ABOUT & ENGINEERING PHILOSOPHY
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
              style={{ textWrap: 'balance' }}
            >
              Transforming Ideas into Functional Software & Intelligent Systems
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-[68ch]">
              {data.profile.introParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <p>
                I enjoy working across the complete software development lifecycle—from identifying
                a concrete real-world problem and designing a clean system architecture to
                full-stack implementation, rigorous validation, and cloud deployment.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span>Location: {data.profile.location}</span>
              <span aria-hidden="true">·</span>
              <span>Focus: Full-Stack & AI/ML Engineering</span>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setStudioOpen(true)}
                className="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-cyan-400 hover:underline"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Edit Bio & Timeline</span>
              </button>
            </div>
          </div>

          {/* Right Column: Complete Development Lifecycle */}
          <div className="lg:col-span-6 bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                  End-to-End Engineering Lifecycle
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Systematic execution from problem formulation to production deployment
                </p>
              </div>
              <span className="font-mono text-xs text-blue-600 dark:text-cyan-400">4 STAGES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.lifecycleStages.map((stage) => (
                <div
                  key={stage.step}
                  className="space-y-2 pb-4 border-b border-slate-200/70 dark:border-slate-800/70 last:border-b-0 sm:nth-last-2:border-b-0"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs font-semibold text-blue-600 dark:text-cyan-400">
                      {stage.step}.
                    </span>
                    <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {stage.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Engineering Passions (9 Focus Areas) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Core Technical Passions & Focus Areas
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Nine interconnected disciplines driving my academic and software projects
              </p>
            </div>
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400 tabular-nums">
              {data.aboutPassions.length} Disciplines
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.aboutPassions.map((passion, idx) => (
              <div
                key={passion.title}
                className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800/90 space-y-2"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                    {passion.title}
                  </h4>
                  <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {passion.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Editable Technical & Academic Journey Timeline */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Technical Journey & Milestones Timeline
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Verified milestones across education, engineering builds, and hackathons
              </p>
            </div>

            {/* Interactive Segmented Filter Controls */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setTimelineFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    timelineFilter === cat
                      ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800/80 border-t border-b border-slate-200 dark:border-slate-800/80">
            {filteredTimeline.map((entry) => (
              <div
                key={entry.id}
                className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
              >
                <div className="md:col-span-3 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="text-blue-600 dark:text-cyan-400 font-semibold">
                    {entry.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{entry.period}</span>
                </div>

                <div className="md:col-span-4">
                  <h4 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                    {entry.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {entry.organization}
                  </p>
                </div>

                <div className="md:col-span-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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
