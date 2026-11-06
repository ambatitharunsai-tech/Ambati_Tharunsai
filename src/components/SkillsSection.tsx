import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...data.skillGroups.map((g) => g.category)];

  const filteredGroups = data.skillGroups
    .filter((group) => activeCategory === 'All' || group.category === activeCategory)
    .map((group) => ({
      ...group,
      skills: group.skills.filter((s) =>
        s.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ),
    }))
    .filter((group) => group.skills.length > 0);

  const totalSkillsCount = data.skillGroups.reduce((acc, g) => acc + g.skills.length, 0);

  return (
    <section
      id="skills"
      className="py-20 sm:py-24 px-6 border-b border-slate-200 dark:border-slate-800/80 bg-[#F8FAFC] dark:bg-[#0B1325]"
    >
      <div className="max-w-[1360px] mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-wider text-blue-600 dark:text-cyan-400">
              02. TECHNICAL SKILLS & STACK ARCHITECTURE
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
              style={{ textWrap: 'balance' }}
            >
              Categorized Engineering Capabilities Across 8 Technical Domains
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Organized by functional architectural layer—representing hands-on technologies used to
              build, test, and deploy software systems.
            </p>
          </div>

          {/* Search & Count */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter skills (e.g. FastAPI, Groq)..."
                aria-label="Search technical skills"
                className="w-full sm:w-64 pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400"
              />
            </div>
            <div className="font-mono text-xs text-slate-500 dark:text-slate-400 tabular-nums px-2">
              {totalSkillsCount} Verified Technologies
            </div>
          </div>
        </div>

        {/* Interactive Category Segmented Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-200/70 dark:bg-[#060B16] border border-slate-200 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Categorized Skills Grid (Zero fake percentage bars, Zero pill clutter) */}
        {filteredGroups.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 space-y-2">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              No skills matched "{searchQuery}"
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
            >
              Reset skill filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGroups.map((group, index) => (
              <div
                key={group.id}
                className="bg-white dark:bg-[#060B16] border border-slate-200 dark:border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <span className="font-mono text-xs font-semibold text-blue-600 dark:text-cyan-400 tabular-nums">
                      0{index + 1}
                    </span>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                      {group.skills.length} items
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white pt-1">
                    {group.category}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {group.description}
                  </p>
                </div>

                {/* Clean Structured Typography List */}
                <ul className="divide-y divide-slate-100 dark:divide-slate-800/60 border-t border-slate-100 dark:border-slate-800/60 pt-1">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="py-2 flex items-center justify-between text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      <span>{skill}</span>
                      <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                        Verified
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
