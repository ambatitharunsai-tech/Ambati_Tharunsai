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
      className="py-20 sm:py-24 border-b border-[#DCDCDC] dark:border-[#333333] bg-[#EDECE8] dark:bg-[#252525]"
    >
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <p className="font-mono text-xs font-semibold tracking-wider text-[#4D4D4D] dark:text-[#B8B8B8]">
            04. INNOVATION & TECHNICAL ARCHITECTURE
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D] dark:text-[#F5F4F0]"
            style={{ textWrap: 'balance' }}
          >
            Applied Research, AI Orchestration & Systems Engineering
          </h2>
          <p className="text-sm sm:text-base text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
            A structured examination of core technical problem spaces—detailing the underlying
            engineering challenge, architectural approach, technologies utilized, and real-world
            impact.
          </p>
        </div>

        {/* Interactive Split: Exploration Tracks Selector + Technical Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Numbered Exploration Tracks */}
          <div className="lg:col-span-5 divide-y divide-[#DCDCDC] dark:divide-[#333333] rounded-xl border border-[#DCDCDC] dark:border-[#333333] bg-[#F5F4F0] dark:bg-[#0D0D0D] overflow-hidden flex flex-col justify-between">
            {data.innovations.map((item) => {
              const isSelected = item.id === activeInnovation?.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left px-5 py-4 transition-colors flex items-baseline justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#DCDCDC] dark:bg-[#333333] text-[#0D0D0D] dark:text-[#F5F4F0]'
                      : 'hover:bg-[#EDECE8] dark:hover:bg-[#252525] text-[#4D4D4D] dark:text-[#B8B8B8]'
                  }`}
                >
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="font-mono text-xs font-semibold text-[#252525] dark:text-[#EDECE8] tabular-nums shrink-0">
                      {item.index}.
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-sm sm:text-base font-bold truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#858585] dark:text-[#B8B8B8] truncate mt-0.5">
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
            <div className="lg:col-span-7 bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="border-b border-[#DCDCDC] dark:border-[#333333] pb-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#4D4D4D] dark:text-[#B8B8B8]">
                    <span>TRACK {activeInnovation.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeInnovation.domain}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                    {activeInnovation.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-semibold text-[#858585] dark:text-[#B8B8B8]">
                      THE TECHNICAL PROBLEM
                    </h4>
                    <p className="text-xs sm:text-sm text-[#252525] dark:text-[#DCDCDC] leading-relaxed">
                      {activeInnovation.problem}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-semibold text-[#858585] dark:text-[#B8B8B8]">
                      ENGINEERING APPROACH
                    </h4>
                    <p className="text-xs sm:text-sm text-[#252525] dark:text-[#DCDCDC] leading-relaxed">
                      {activeInnovation.approach}
                    </p>
                  </div>
                </div>

                {/* Real-World Applications */}
                <div className="p-5 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] space-y-2.5">
                  <h4 className="font-mono text-xs font-semibold text-[#0D0D0D] dark:text-[#EDECE8]">
                    REAL-WORLD APPLICATIONS & IMPACT
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#252525] dark:text-[#DCDCDC]">
                    {activeInnovation.applications.map((app) => (
                      <li key={app} className="flex items-start gap-2.5">
                        <span className="font-mono text-[#4D4D4D] dark:text-[#B8B8B8]">·</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies Used */}
              <div className="pt-4 border-t border-[#DCDCDC] dark:border-[#333333] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#858585] dark:text-[#B8B8B8]">TECHNOLOGIES UTILIZED:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeInnovation.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] text-[#252525] dark:text-[#DCDCDC]"
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
