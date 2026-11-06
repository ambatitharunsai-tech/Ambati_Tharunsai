import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const InnovationSection: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedId, setSelectedId] = useState<string>(data.innovations[0]?.id || 'inn-1');

  const activeInnovation =
    data.innovations.find((item) => item.id === selectedId) || data.innovations[0];

  return (
    <section
      id="innovation"
      className="py-20 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-[#F8FAFC] dark:bg-[#0B1124]"
    >
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <p className="font-mono text-xs font-semibold tracking-wider text-[#3B82F6] dark:text-[#06B6D4]">
            04. INNOVATION & TECHNICAL ARCHITECTURE
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC]"
            style={{ textWrap: 'balance' }}
          >
            Applied Research, AI Orchestration & Systems Engineering
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
            A structured examination of core technical problem spaces—detailing the underlying
            engineering challenge, architectural approach, technologies utilized, and real-world
            impact.
          </p>
        </div>

        {/* Interactive Split: Exploration Tracks Selector + Technical Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Numbered Exploration Tracks */}
          <div className="lg:col-span-5 divide-y divide-slate-200/80 dark:divide-slate-800/80 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#050814] overflow-hidden flex flex-col justify-between">
            {data.innovations.map((item) => {
              const isSelected = item.id === activeInnovation?.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left px-5 py-4 transition-colors flex items-baseline justify-between gap-4 ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-[#101A30] text-[#3B82F6] dark:text-[#06B6D4]'
                      : 'hover:bg-slate-50 dark:hover:bg-[#0B1124] text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="font-mono text-xs font-semibold text-[#3B82F6] dark:text-[#06B6D4] tabular-nums shrink-0">
                      {item.index}.
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-sm sm:text-base font-bold truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-[#94A3B8] truncate mt-0.5">
                        {item.domain}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs shrink-0">→</span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Technical Dossier */}
          {activeInnovation && (
            <div className="lg:col-span-7 bg-white dark:bg-[#050814] border border-slate-200/90 dark:border-slate-800/90 rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#3B82F6] dark:text-[#06B6D4]">
                    <span>TRACK {activeInnovation.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeInnovation.domain}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                    {activeInnovation.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-semibold text-slate-500 dark:text-[#94A3B8]">
                      THE TECHNICAL PROBLEM
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeInnovation.problem}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-semibold text-slate-500 dark:text-[#94A3B8]">
                      ENGINEERING APPROACH
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeInnovation.approach}
                    </p>
                  </div>
                </div>

                {/* Real-World Applications */}
                <div className="p-5 rounded-lg bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200/80 dark:border-slate-800 space-y-2.5">
                  <h4 className="font-mono text-xs font-semibold text-[#3B82F6] dark:text-[#06B6D4]">
                    REAL-WORLD APPLICATIONS & IMPACT
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {activeInnovation.applications.map((app) => (
                      <li key={app} className="flex items-start gap-2.5">
                        <span className="font-mono text-[#3B82F6] dark:text-[#06B6D4]">·</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies Used */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="text-slate-500 dark:text-[#94A3B8]">TECHNOLOGIES UTILIZED:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeInnovation.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#101A30] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
