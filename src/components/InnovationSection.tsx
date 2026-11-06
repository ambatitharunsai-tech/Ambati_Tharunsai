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
      className="py-20 sm:py-24 px-6 border-b border-slate-200 dark:border-slate-800/80 bg-[#F8FAFC] dark:bg-[#0B1325]"
    >
      <div className="max-w-[1360px] mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <p className="font-mono text-xs font-semibold tracking-wider text-blue-600 dark:text-cyan-400">
            04. INNOVATION & TECHNICAL EXPLORATION
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
            style={{ textWrap: 'balance' }}
          >
            Applied Research, AI Orchestration & Systems Engineering
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A structured examination of eight core technical problem spaces I actively explore—detailing
            the underlying engineering challenge, my implementation approach, technologies utilized,
            and practical real-world applications.
          </p>
        </div>

        {/* Interactive Split: 8 Exploration Tracks Selector + Deep Technical Specification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 8 Numbered Exploration Tracks */}
          <div className="lg:col-span-5 divide-y divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#060B16] overflow-hidden">
            {data.innovations.map((item) => {
              const isSelected = item.id === activeInnovation?.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left px-5 py-4 transition-colors flex items-baseline justify-between gap-4 ${
                    isSelected
                      ? 'bg-blue-50/90 dark:bg-[#111C33] text-blue-700 dark:text-cyan-300'
                      : 'hover:bg-slate-50 dark:hover:bg-[#0B1325]/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="font-mono text-xs font-semibold text-blue-600 dark:text-cyan-400 tabular-nums shrink-0">
                      {item.index}.
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-sm sm:text-base font-semibold truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.domain}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs shrink-0">→</span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Technical Dossier for Selected Track */}
          {activeInnovation && (
            <div className="lg:col-span-7 bg-white dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-cyan-400">
                  <span>TRACK {activeInnovation.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeInnovation.domain}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                  {activeInnovation.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                    THE TECHNICAL PROBLEM
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeInnovation.problem}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                    MY ENGINEERING APPROACH
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeInnovation.approach}
                  </p>
                </div>
              </div>

              {/* Potential Real-World Applications */}
              <div className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="font-mono text-xs font-semibold text-blue-600 dark:text-cyan-400">
                  REAL-WORLD APPLICATIONS & IMPACT
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  {activeInnovation.applications.map((app) => (
                    <li key={app} className="flex items-start gap-2.5">
                      <span className="font-mono text-blue-600 dark:text-cyan-400">·</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Used */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="text-slate-400">TECHNOLOGIES UTILIZED:</span>
                <span className="text-slate-800 dark:text-slate-200">
                  {activeInnovation.technologies.join(' · ')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
