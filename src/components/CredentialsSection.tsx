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
      className="py-20 sm:py-24 px-6 border-b border-slate-200 dark:border-slate-800/80 bg-[#F8FAFC] dark:bg-[#0B1325]"
    >
      <div className="max-w-[1360px] mx-auto space-y-20">
        {/* 1. EDUCATION & EXPERIENCE SPLIT */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="font-mono text-xs font-semibold tracking-wider text-blue-600 dark:text-cyan-400">
                06. EDUCATION, EXPERIENCE & COMMUNITY INVOLVEMENT
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                Academic Foundation & Engineering Involvement
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setStudioOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:border-blue-500 transition-colors self-start sm:self-auto"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Update Academic & Experience Records</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Education Dossier (Section 11) */}
            <div className="lg:col-span-6 bg-white dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    Education Profile
                  </h3>
                </div>
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  Computer Science Student
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200/80 dark:border-slate-800">
                  <span className="font-mono text-[11px] text-slate-400 block">DEGREE</span>
                  <span className="font-semibold text-slate-900 dark:text-white mt-0.5 block">
                    {data.education.degree}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200/80 dark:border-slate-800">
                  <span className="font-mono text-[11px] text-slate-400 block">BRANCH</span>
                  <span className="font-semibold text-slate-900 dark:text-white mt-0.5 block">
                    {data.education.branch}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200/80 dark:border-slate-800">
                  <span className="font-mono text-[11px] text-slate-400 block">
                    COLLEGE / UNIVERSITY
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white mt-0.5 block">
                    {data.education.institution}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200/80 dark:border-slate-800">
                  <span className="font-mono text-[11px] text-slate-400 block">
                    TIMELINE & CGPA
                  </span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white mt-0.5 block tabular-nums">
                    {data.education.startYear} – {data.education.graduationYear} · CGPA:{' '}
                    {data.education.cgpa}
                  </span>
                </div>
              </div>

              {/* Relevant Coursework */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                  RELEVANT COMPUTER SCIENCE COURSEWORK
                </h4>
                <div className="text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
                  {data.education.coursework.join(' · ')}
                </div>
              </div>

              {/* Academic Highlights */}
              {data.education.academicAchievements.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                    ACADEMIC HIGHLIGHTS
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {data.education.academicAchievements.map((ach) => (
                      <li key={ach} className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-cyan-400 font-mono">·</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Experience & Involvement (Section 12) */}
            <div className="lg:col-span-6 bg-white dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    Experience & Technical Involvement
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setStudioOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Supports verified records for Internships, Freelance work, Technical volunteering,
                College activities, Team collaborations, Leadership, Technical communities, and
                Open-source contributions.
              </p>

              <div className="space-y-4">
                {data.experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-blue-600 dark:text-cyan-400 font-semibold">
                        {exp.type}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 tabular-nums">
                        {exp.period}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                        {exp.role}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {exp.organization}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span>{exp.technologies.join(' · ')}</span>
                      {exp.verificationLink && (
                        <a
                          href={exp.verificationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 dark:text-cyan-400 hover:underline"
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

        {/* 2. HACKATHONS & PARTICIPATION (Section 8 — HacXLerate 2026) AND ACHIEVEMENTS (Section 9) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Hackathons & Events */}
          <div className="lg:col-span-6 bg-white dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  Hackathons & Technical Events
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStudioOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Edit Event / Upload Cert</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.hackathons.map((hack) => (
                <div
                  key={hack.id}
                  className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-blue-600 dark:text-cyan-400 font-semibold">
                      {hack.organizer}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 tabular-nums">
                      {hack.date}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {hack.eventName}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {hack.participationDetails}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                    <div className="p-3 rounded-lg bg-white dark:bg-[#060B16] border border-slate-200/80 dark:border-slate-800">
                      <span className="font-mono text-[11px] text-slate-400 block">
                        TEAM INFORMATION
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 mt-0.5 block">
                        {hack.teamInfo}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-[#060B16] border border-slate-200/80 dark:border-slate-800">
                      <span className="font-mono text-[11px] text-slate-400 block">
                        PROJECT DEVELOPED
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 mt-0.5 block">
                        {hack.projectDeveloped}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-mono text-slate-600 dark:text-slate-300">
                      Outcome: {hack.outcome}
                    </span>
                    {hack.certificateUrl ? (
                      <a
                        href={hack.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
                      >
                        View Event Certificate ↗
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setStudioOpen(true)}
                        className="text-blue-600 dark:text-cyan-400 hover:underline"
                      >
                        + Upload Certificate / Photos
                      </button>
                    )}
                  </div>

                  {hack.eventPhotos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {hack.eventPhotos.map((photoUrl, idx) => (
                        <img
                          key={idx}
                          src={photoUrl}
                          alt={`${hack.eventName} photo ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="h-20 w-full object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Verified Achievements & Technical Milestones (Section 9) */}
          <div className="lg:col-span-6 bg-white dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  Verified Achievements & Milestones
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStudioOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
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
                    className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-blue-600 dark:text-cyan-400 font-semibold">
                        {ach.category}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 tabular-nums">
                        {ach.date}
                      </span>
                    </div>

                    <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      {ach.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400">{ach.organization}</p>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {ach.description}
                    </p>

                    {ach.verificationUrl && (
                      <div className="pt-2">
                        <a
                          href={ach.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
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

        {/* 3. CERTIFICATIONS & LICENSES GALLERY (Section 10) */}
        <div className="bg-white dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  Certifications & Licenses Gallery
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Filterable gallery of verified course completions, technical workshops, and
                credentials. Zero imaginary certificates are displayed.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setStudioOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Verified Certificate</span>
            </button>
          </div>

          {/* 8 Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800">
            {certCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCertFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  certFilter === cat
                    ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredCerts.length === 0 ? (
            <div className="p-10 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
              <FileCheck className="w-8 h-8 text-blue-600 dark:text-cyan-400 mx-auto" />
              <div className="space-y-1 max-w-lg mx-auto">
                <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  {certFilter === 'All'
                    ? 'Ready for Verified Certificate Uploads'
                    : `No Verified Certificates in "${certFilter}" Yet`}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  In accordance with strict portfolio authenticity, no placeholder or unverified
                  certificates are generated. Use the Studio Editor to add your completed
                  certificates with credential IDs, verification links, and image previews.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStudioOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 transition-colors"
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
                  className="rounded-xl bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {cert.previewUrl && (
                      <div className="h-44 w-full bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
                        <img
                          src={cert.previewUrl}
                          alt={cert.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                        <span className="text-blue-600 dark:text-cyan-400 font-semibold">
                          {cert.category}
                        </span>
                        <span className="tabular-nums">{cert.issueDate}</span>
                      </div>
                      <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{cert.issuer}</p>
                      {cert.credentialId && (
                        <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                          Credential ID: {cert.credentialId}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-5 py-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-slate-400">
                      Skill: {cert.relatedSkill}
                    </span>
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-cyan-400 font-semibold hover:underline"
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
