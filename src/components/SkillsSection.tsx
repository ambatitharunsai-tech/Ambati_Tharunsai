import React, { useState } from 'react';
import {
  BrainCircuit,
  Code2,
  Database,
  Search,
  Server,
  Smartphone,
  Wrench,
} from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Frontend: Code2,
  Backend: Server,
  Mobile: Smartphone,
  Databases: Database,
  AI: BrainCircuit,
  Tools: Wrench,
};

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
      className="py-20 sm:py-24 border-b border-[#DCDCDC] dark:border-[#333333] bg-[#EDECE8] dark:bg-[#252525]"
    >
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-wider text-[#4D4D4D] dark:text-[#B8B8B8]">
              02. TECHNICAL SKILLS & STACK ARCHITECTURE
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D] dark:text-[#F5F4F0]"
              style={{ textWrap: 'balance' }}
            >
              Core Engineering Stack Across Frontend, Backend, Mobile, Databases, AI & Tools
            </h2>
            <p className="text-sm sm:text-base text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
              Organized by architectural layer—representing hands-on technologies used to design,
              develop, containerize, and deploy production software.
            </p>
          </div>

          {/* Search & Count */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#858585] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter skills (e.g. FastAPI, React, Groq)..."
                aria-label="Search technical skills"
                className="w-full sm:w-64 pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] text-[#0D0D0D] dark:text-[#EDECE8] placeholder:text-[#858585] focus:outline-none focus:border-[#4D4D4D] dark:focus:border-[#B8B8B8]"
              />
            </div>
            <div className="font-mono text-xs text-[#4D4D4D] dark:text-[#B8B8B8] tabular-nums px-2">
              {totalSkillsCount} Technologies
            </div>
          </div>
        </div>

        {/* Interactive Category Segmented Bar */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#562f54] text-white font-semibold'
                  : 'text-[#4D4D4D] dark:text-[#B8B8B8] hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Categorized Skills Grid (Equal-Height Dashboard Widgets) */}
        {filteredGroups.length === 0 ? (
          <div className="p-10 text-center rounded-xl bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] space-y-2">
            <p className="text-sm font-medium text-[#0D0D0D] dark:text-[#F5F4F0]">
              No skills matched "{searchQuery}"
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="px-3 py-1.5 rounded-lg bg-[#562f54] text-white text-xs font-semibold hover:bg-[#6b3b68] transition-colors"
            >
              Reset skill filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group, index) => {
              const Icon = CATEGORY_ICONS[group.category] || Code2;
              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
                  className="bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] hover:border-[#858585] dark:hover:border-[#858585] rounded-xl p-6 flex flex-col justify-between space-y-5 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#DCDCDC] dark:border-[#333333] pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-md bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#252525] dark:text-[#EDECE8]" />
                        </div>
                        <h3 className="font-display text-base font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                          {group.category}
                        </h3>
                      </div>
                      <span className="font-mono text-[11px] text-[#858585] dark:text-[#B8B8B8] tabular-nums">
                        0{index + 1} · {group.skills.length} items
                      </span>
                    </div>

                    <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  {/* Structured Skill Items List */}
                  <ul className="divide-y divide-[#DCDCDC]/80 dark:divide-[#252525] border-t border-[#DCDCDC]/80 dark:border-[#252525] pt-1">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="py-2 flex items-center justify-between text-xs sm:text-sm font-medium text-[#252525] dark:text-[#DCDCDC]"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-xs bg-[#252525] dark:bg-[#EDECE8]" />
                          <span>{skill}</span>
                        </div>
                        <span className="font-mono text-[11px] text-[#858585]">
                          Production
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
