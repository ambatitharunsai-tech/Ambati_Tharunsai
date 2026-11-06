import React, { useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  FileCheck,
  Plus,
  Sliders,
  Trophy,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CertificateCategory } from '../types/portfolio';

export const CredentialsSection: React.FC = () => {
  const { data, setStudioOpen } = usePortfolio();
  const [certFilter, setCertFilter] = useState<'All' | CertificateCategory>('All');

  const certCategories: ('All' | CertificateCategory)[] = [
    'All',
    'Programming',
    'Artificial Intelligence',
    'Machine Learning',
    'Web Development',
    'Cloud and Databases',
    'Hackathons',
    'Workshops',
    'Other',
  ];

  const filteredCerts =
    certFilter === 'All'
      ? data.certificates
      : data.certificates.filter((c) => c.category === certFilter);

  return (
    <section
      id="credentials"
      className="py-20 sm:py-24 border-b border-[#DCDCDC] dark:border-[#333333] bg-[#EDECE8] dark:bg-[#252525]"
    >
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. EDUCATION & EXPERIENCE SPLIT */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="font-mono text-xs font-semibold tracking-wider text-[#4D4D4D] dark:text-[#B8B8B8]">
                06. EDUCATION, EXPERIENCE & TECHNICAL EVENTS
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D] dark:text-[#F5F4F0]"
                style={{ textWrap: 'balance' }}
              >
                Academic Foundation & Engineering Involvement
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setStudioOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#562f54] border border-[#562f54] text-xs font-semibold text-white hover:bg-[#6b3b68] transition-colors self-start sm:self-auto"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Update Academic & Experience Records</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Education Dossier */}
            <div className="lg:col-span-6 bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#DCDCDC] dark:border-[#333333] pb-4">
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-[#252525] dark:text-[#EDECE8]" />
                    <h3 className="font-display text-lg font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                      Education Profile
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-[#858585] dark:text-[#B8B8B8]">
                    Computer Science Student
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333]">
                    <span className="font-mono text-[11px] text-[#858585] block">DEGREE</span>
                    <span className="font-semibold text-[#0D0D0D] dark:text-[#F5F4F0] mt-0.5 block">
                      {data.education.degree}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333]">
                    <span className="font-mono text-[11px] text-[#858585] block">BRANCH</span>
                    <span className="font-semibold text-[#0D0D0D] dark:text-[#F5F4F0] mt-0.5 block">
                      {data.education.branch}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333]">
                    <span className="font-mono text-[11px] text-[#858585] block">
                      COLLEGE / UNIVERSITY
                    </span>
                    <span className="font-semibold text-[#0D0D0D] dark:text-[#F5F4F0] mt-0.5 block">
                      {data.education.institution}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333]">
                    <span className="font-mono text-[11px] text-[#858585] block">
                      TIMELINE & CGPA
                    </span>
                    <span className="font-mono font-semibold text-[#0D0D0D] dark:text-[#F5F4F0] mt-0.5 block tabular-nums">
                      {data.education.startYear} – {data.education.graduationYear} · CGPA:{' '}
                      {data.education.cgpa}
                    </span>
                  </div>
                </div>

                {/* Relevant Coursework */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-semibold text-[#858585] dark:text-[#B8B8B8]">
                    RELEVANT COMPUTER SCIENCE COURSEWORK
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {data.education.coursework.map((cw) => (
                      <span
                        key={cw}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] text-[#252525] dark:text-[#DCDCDC]"
                      >
                        {cw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Academic Highlights */}
              {data.education.academicAchievements.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-[#DCDCDC] dark:border-[#333333]">
                  <h4 className="font-mono text-xs font-semibold text-[#858585] dark:text-[#B8B8B8]">
                    ACADEMIC HIGHLIGHTS
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#4D4D4D] dark:text-[#B8B8B8]">
                    {data.education.academicAchievements.map((ach) => (
                      <li key={ach} className="flex items-start gap-2">
                        <span className="text-[#252525] dark:text-[#EDECE8] font-mono">·</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Experience & Involvement */}
            <div className="lg:col-span-6 bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#DCDCDC] dark:border-[#333333] pb-4">
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4 text-[#252525] dark:text-[#EDECE8]" />
                    <h3 className="font-display text-lg font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                      Experience & Technical Involvement
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStudioOpen(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#562f54] text-xs font-semibold text-white hover:bg-[#6b3b68] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Experience</span>
                  </button>
                </div>

                <p className="text-xs text-[#858585] dark:text-[#B8B8B8]">
                  Supports verified records for Internships, Freelance work, Technical volunteering,
                  College activities, Team collaborations, and Open-source contributions.
                </p>

                <div className="space-y-4">
                  {data.experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-5 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <span className="text-[#252525] dark:text-[#EDECE8] font-semibold">
                          {exp.type}
                        </span>
                        <span className="text-[#858585] dark:text-[#B8B8B8] tabular-nums">
                          {exp.period}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-display text-base font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                          {exp.role}
                        </h4>
                        <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8]">
                          {exp.organization}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="pt-2 border-t border-[#DCDCDC] dark:border-[#333333] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#858585] dark:text-[#B8B8B8]">
                        <span>{exp.technologies.join(' · ')}</span>
                        {exp.verificationLink && (
                          <a
                            href={exp.verificationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#0D0D0D] dark:text-[#EDECE8] hover:underline"
                          >
                            <span>Verify</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. HACKATHONS AND VERIFIED ACHIEVEMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Hackathons & Events */}
          <div className="lg:col-span-6 bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] rounded-xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between border-b border-[#DCDCDC] dark:border-[#333333] pb-4">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#252525] dark:text-[#EDECE8]" />
                <h3 className="font-display text-lg font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                  Hackathons & Technical Events
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStudioOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#562f54] text-xs font-semibold text-white hover:bg-[#6b3b68] transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Edit Event</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.hackathons.map((hack) => (
                <div
                  key={hack.id}
                  className="p-5 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-[#252525] dark:text-[#EDECE8] font-semibold">
                      {hack.organizer}
                    </span>
                    <span className="text-[#858585] dark:text-[#B8B8B8] tabular-nums">
                      {hack.date}
                    </span>
                  </div>

                  <h4 className="font-display text-base sm:text-lg font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                    {hack.eventName}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
                    {hack.participationDetails}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                    <div className="p-3 rounded-lg bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333]">
                      <span className="font-mono text-[11px] text-[#858585] block">
                        TEAM INFORMATION
                      </span>
                      <span className="text-[#252525] dark:text-[#DCDCDC] mt-0.5 block">
                        {hack.teamInfo}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333]">
                      <span className="font-mono text-[11px] text-[#858585] block">
                        PROJECT DEVELOPED
                      </span>
                      <span className="text-[#252525] dark:text-[#DCDCDC] mt-0.5 block">
                        {hack.projectDeveloped}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#DCDCDC] dark:border-[#333333] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-mono text-[#4D4D4D] dark:text-[#B8B8B8]">
                      Outcome: {hack.outcome}
                    </span>
                    {hack.certificateUrl ? (
                      <a
                        href={hack.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#0D0D0D] dark:text-[#EDECE8] hover:underline"
                      >
                        View Event Certificate ↗
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setStudioOpen(true)}
                        className="text-[#0D0D0D] dark:text-[#EDECE8] hover:underline"
                      >
                        + Upload Certificate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Achievements & Technical Milestones */}
          <div className="lg:col-span-6 bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] rounded-xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between border-b border-[#DCDCDC] dark:border-[#333333] pb-4">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-4 h-4 text-[#252525] dark:text-[#EDECE8]" />
                <h3 className="font-display text-lg font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                  Verified Achievements & Milestones
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStudioOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#562f54] text-xs font-semibold text-white hover:bg-[#6b3b68] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Achievement</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.achievements
                .filter((a) => a.verified)
                .map((ach) => (
                  <div
                    key={ach.id}
                    className="p-5 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-[#252525] dark:text-[#EDECE8] font-semibold">
                        {ach.category}
                      </span>
                      <span className="text-[#858585] dark:text-[#B8B8B8] tabular-nums">
                        {ach.date}
                      </span>
                    </div>

                    <h4 className="font-display text-base font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                      {ach.title}
                    </h4>

                    <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8]">{ach.organization}</p>

                    <p className="text-xs sm:text-sm text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
                      {ach.description}
                    </p>

                    {ach.verificationUrl && (
                      <div className="pt-1">
                        <a
                          href={ach.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D0D0D] dark:text-[#EDECE8] hover:underline"
                        >
                          <span>Verify Supporting Record</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* 3. CERTIFICATIONS & LICENSES GALLERY */}
        <div className="bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DCDCDC] dark:border-[#333333] pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#252525] dark:text-[#EDECE8]" />
                <h3 className="font-display text-xl font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                  Certifications & Licenses Gallery
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4D4D4D] dark:text-[#B8B8B8]">
                Filterable gallery of verified course completions, technical workshops, and
                credentials. Zero unverified certificates are displayed.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setStudioOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#562f54] text-white hover:bg-[#6b3b68] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Verified Certificate</span>
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333]">
            {certCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCertFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  certFilter === cat
                    ? 'bg-[#562f54] text-white font-semibold'
                    : 'text-[#4D4D4D] dark:text-[#B8B8B8] hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredCerts.length === 0 ? (
            <div className="p-8 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-dashed border-[#B8B8B8] dark:border-[#4D4D4D] text-center space-y-3">
              <FileCheck className="w-7 h-7 text-[#562f54] dark:text-[#c996c6] mx-auto" />
              <div className="space-y-1 max-w-lg mx-auto">
                <h4 className="font-display text-base font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                  {certFilter === 'All'
                    ? 'Ready for Verified Certificate Uploads'
                    : `No Verified Certificates in "${certFilter}" Yet`}
                </h4>
                <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
                  Only authentic, verified certificates are displayed. Use the Studio Editor to add
                  completed certificates with credential IDs and verification links.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStudioOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#562f54] text-white hover:bg-[#6b3b68] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Open Studio Certificate Manager</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-xl bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {cert.previewUrl && (
                      <div className="h-44 w-full bg-[#0D0D0D] border-b border-[#DCDCDC] dark:border-[#333333] overflow-hidden">
                        <img
                          src={cert.previewUrl}
                          alt={cert.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#858585] dark:text-[#B8B8B8]">
                        <span className="text-[#252525] dark:text-[#EDECE8] font-semibold">
                          {cert.category}
                        </span>
                        <span className="tabular-nums">{cert.issueDate}</span>
                      </div>
                      <h4 className="font-display text-base font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-[#4D4D4D] dark:text-[#DCDCDC]">{cert.issuer}</p>
                      {cert.credentialId && (
                        <p className="font-mono text-xs text-[#858585] dark:text-[#B8B8B8]">
                          ID: {cert.credentialId}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-5 py-3 border-t border-[#DCDCDC] dark:border-[#333333] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#858585] dark:text-[#B8B8B8]">
                      Skill: {cert.relatedSkill}
                    </span>
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0D0D0D] dark:text-[#EDECE8] font-semibold hover:underline"
                      >
                        Verify ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
