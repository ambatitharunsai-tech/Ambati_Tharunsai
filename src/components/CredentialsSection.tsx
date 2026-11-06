import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Download,
  Eye,
  FileCode2,
  FileImage,
  FileText,
  FolderOpen,
  LayoutGrid,
  Trophy,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  CertificateCategory,
  CertificateEntry,
  CertificateFileFormat,
} from '../types/portfolio';
import {
  downloadCertificateInFormat,
  getCertificatePreviewDataUrl,
} from '../utils/certificateFiles';

const ALL_FORMATS: ('All Formats' | CertificateFileFormat)[] = [
  'All Formats',
  'PDF',
  'PNG',
  'JPG',
  'SVG',
  'WEBP',
];

const EXPORT_FORMATS: CertificateFileFormat[] = ['PDF', 'PNG', 'JPG', 'SVG', 'WEBP'];

export const CredentialsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [certFilter, setCertFilter] = useState<'All' | CertificateCategory>('All');
  const [formatFilter, setFormatFilter] = useState<'All Formats' | CertificateFileFormat>(
    'All Formats'
  );
  const [viewMode, setViewMode] = useState<'grid' | 'folders'>('grid');
  const [activeCertificate, setActiveCertificate] = useState<CertificateEntry | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  const certCategories: ('All' | CertificateCategory)[] = [
    'All',
    'Artificial Intelligence',
    'Machine Learning',
    'Web Development',
    'Programming',
    'Cloud and Databases',
    'Hackathons',
    'Workshops',
  ];

  const filteredCerts = useMemo(() => {
    return data.certificates.filter((c) => {
      const matchesCategory = certFilter === 'All' || c.category === certFilter;
      const matchesFormat =
        formatFilter === 'All Formats' || (c.fileFormat || 'PDF') === formatFilter;
      return matchesCategory && matchesFormat;
    });
  }, [data.certificates, certFilter, formatFilter]);

  const folderGroups = useMemo(() => {
    const groups: Record<string, CertificateEntry[]> = {};
    for (const cert of filteredCerts) {
      const folder = cert.folderPath || 'certificates/general';
      if (!groups[folder]) {
        groups[folder] = [];
      }
      groups[folder].push(cert);
    }
    return Object.entries(groups);
  }, [filteredCerts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeCertificate) {
        setActiveCertificate(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCertificate]);

  const handleOpenCert = (cert: CertificateEntry) => {
    setZoomLevel(1);
    setActiveCertificate(cert);
  };

  const handleDownload = async (cert: CertificateEntry, format: CertificateFileFormat) => {
    const key = `${cert.id}-${format}`;
    setDownloadingFormat(key);
    try {
      await downloadCertificateInFormat(cert, format, data.profile.fullName);
    } finally {
      setDownloadingFormat(null);
    }
  };

  const getFormatIcon = (format?: CertificateFileFormat) => {
    if (format === 'PDF') return <FileText className="w-3.5 h-3.5" />;
    if (format === 'SVG') return <FileCode2 className="w-3.5 h-3.5" />;
    return <FileImage className="w-3.5 h-3.5" />;
  };

  return (
    <section
      id="credentials"
      className="py-20 sm:py-24 border-b border-[#DCDCDC] dark:border-[#333333] bg-[#EDECE8] dark:bg-[#252525]"
    >
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. EDUCATION & EXPERIENCE SPLIT */}
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="font-mono text-xs font-semibold tracking-wider text-[#4D4D4D] dark:text-[#B8B8B8]">
              06. EDUCATION, EXPERIENCE & TECHNICAL CREDENTIALS
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D] dark:text-[#F5F4F0]"
              style={{ textWrap: 'balance' }}
            >
              Academic Foundation & Engineering Involvement
            </h2>
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
                      DEPARTMENT & LOCATION
                    </span>
                    <span className="font-semibold text-[#0D0D0D] dark:text-[#F5F4F0] mt-0.5 block">
                      {data.education.institution}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333]">
                    <span className="font-mono text-[11px] text-[#858585] block">
                      ACADEMIC TIMELINE
                    </span>
                    <span className="font-mono font-semibold text-[#0D0D0D] dark:text-[#F5F4F0] mt-0.5 block tabular-nums">
                      {data.education.startYear} – {data.education.graduationYear} ·{' '}
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
                  <span className="font-mono text-xs text-[#858585] dark:text-[#B8B8B8]">
                    Software & Open-Source
                  </span>
                </div>

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
                            <span>View Profile</span>
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
              <span className="font-mono text-xs text-[#858585] dark:text-[#B8B8B8]">
                Verified Sprints
              </span>
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
                        TRACK & FOCUS
                      </span>
                      <span className="text-[#252525] dark:text-[#DCDCDC] mt-0.5 block">
                        {hack.teamInfo}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333]">
                      <span className="font-mono text-[11px] text-[#858585] block">
                        PROTOTYPE FOCUS
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
              <span className="font-mono text-xs text-[#858585] dark:text-[#B8B8B8] tabular-nums">
                {data.achievements.filter((a) => a.verified).length} Records
              </span>
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

        {/* 3. MULTI-FORMAT CERTIFICATIONS & FILE STRUCTURE REPOSITORY */}
        <div className="bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#DCDCDC] dark:border-[#333333] pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#252525] dark:text-[#EDECE8]" />
                <h3 className="font-display text-xl font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                  Certifications & Licenses Repository (PDF · PNG · JPG · SVG · WebP)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4D4D4D] dark:text-[#B8B8B8]">
                Inspect and download technical certificates across all file formats and category
                directory structures.
              </p>
            </div>

            {/* View Mode Toggle: Grid Cards vs File Structure Explorer */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'grid'
                    ? 'bg-[#562f54] text-white'
                    : 'text-[#4D4D4D] dark:text-[#B8B8B8] hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Gallery Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('folders')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'folders'
                    ? 'bg-[#562f54] text-white'
                    : 'text-[#4D4D4D] dark:text-[#B8B8B8] hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0]'
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>File Structure</span>
              </button>
            </div>
          </div>

          {/* Filter Bar: Domain Category + File Format */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
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

            {/* File Format Filters (PDF, PNG, JPG, SVG, WEBP) */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333]">
              {ALL_FORMATS.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormatFilter(fmt)}
                  className={`px-2.5 py-1.5 font-mono text-[11px] font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    formatFilter === fmt
                      ? 'bg-[#562f54] text-white font-semibold'
                      : 'text-[#4D4D4D] dark:text-[#B8B8B8] hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0]'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {filteredCerts.length === 0 ? (
            <div className="p-8 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] text-center space-y-3">
              <p className="text-sm font-semibold text-[#0D0D0D] dark:text-[#F5F4F0]">
                No certificates match the selected category and file format filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCertFilter('All');
                  setFormatFilter('All Formats');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#562f54] text-white hover:bg-[#6b3b68] transition-colors"
              >
                Reset Certificate Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCerts.map((cert) => {
                const previewSrc = getCertificatePreviewDataUrl(cert, data.profile.fullName);
                const nativeFormat: CertificateFileFormat = cert.fileFormat || 'PDF';
                return (
                  <div
                    key={cert.id}
                    className="rounded-xl bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] hover:border-[#858585] dark:hover:border-[#858585] transition-colors overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Visual Certificate Preview Thumbnail */}
                      <div
                        onClick={() => handleOpenCert(cert)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') handleOpenCert(cert);
                        }}
                        className="relative h-48 w-full bg-[#0D0D0D] border-b border-[#DCDCDC] dark:border-[#333333] overflow-hidden cursor-pointer group"
                      >
                        <img
                          src={previewSrc}
                          alt={cert.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#562f54] text-white text-xs font-semibold">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect Certificate</span>
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#858585] dark:text-[#B8B8B8]">
                          <span className="text-[#252525] dark:text-[#EDECE8] font-semibold">
                            {cert.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[#0D0D0D] dark:text-[#F5F4F0] font-semibold">
                            {getFormatIcon(nativeFormat)}
                            <span>{nativeFormat}</span>
                            {cert.fileSize ? <span>· {cert.fileSize}</span> : null}
                          </span>
                        </div>

                        <h4 className="font-display text-base font-bold text-[#0D0D0D] dark:text-[#F5F4F0] leading-snug">
                          {cert.name}
                        </h4>

                        <p className="text-xs text-[#4D4D4D] dark:text-[#DCDCDC]">{cert.issuer}</p>

                        {cert.description && (
                          <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed line-clamp-2">
                            {cert.description}
                          </p>
                        )}

                        <div className="pt-1 space-y-1 font-mono text-[11px] text-[#858585] dark:text-[#B8B8B8]">
                          {cert.credentialId && (
                            <p className="tabular-nums">
                              ID: {cert.credentialId} · Issued {cert.issueDate}
                            </p>
                          )}
                          {cert.folderPath && cert.fileName && (
                            <p className="truncate text-[#4D4D4D] dark:text-[#B8B8B8]">
                              /{cert.folderPath}/{cert.fileName}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Action Bar */}
                    <div className="px-5 py-3.5 border-t border-[#DCDCDC] dark:border-[#333333] bg-[#F5F4F0]/60 dark:bg-[#0D0D0D]/40 flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenCert(cert)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#562f54] hover:bg-[#6b3b68] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleDownload(cert, nativeFormat)}
                          disabled={downloadingFormat === `${cert.id}-${nativeFormat}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#562f54] hover:bg-[#6b3b68] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{nativeFormat}</span>
                        </button>

                        {nativeFormat !== 'PDF' && (
                          <button
                            type="button"
                            onClick={() => handleDownload(cert, 'PDF')}
                            disabled={downloadingFormat === `${cert.id}-PDF`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#562f54] hover:bg-[#6b3b68] text-white text-xs font-mono font-semibold transition-colors whitespace-nowrap shrink-0"
                            title="Download as PDF"
                          >
                            <span>PDF</span>
                          </button>
                        )}

                        {nativeFormat !== 'PNG' && (
                          <button
                            type="button"
                            onClick={() => handleDownload(cert, 'PNG')}
                            disabled={downloadingFormat === `${cert.id}-PNG`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#562f54] hover:bg-[#6b3b68] text-white text-xs font-mono font-semibold transition-colors whitespace-nowrap shrink-0"
                            title="Download as PNG"
                          >
                            <span>PNG</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Folder / Directory Tree Structure View */
            <div className="space-y-4">
              {folderGroups.map(([folderPath, certs]) => (
                <div
                  key={folderPath}
                  className="rounded-xl bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] overflow-hidden"
                >
                  <div className="px-5 py-3 bg-[#F5F4F0] dark:bg-[#0D0D0D] border-b border-[#DCDCDC] dark:border-[#333333] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                      <FolderOpen className="w-4 h-4 text-[#562f54] dark:text-[#c996c6]" />
                      <span>/{folderPath}/</span>
                    </div>
                    <span className="font-mono text-xs text-[#858585] dark:text-[#B8B8B8] tabular-nums">
                      {certs.length} {certs.length === 1 ? 'file' : 'files'}
                    </span>
                  </div>

                  <div className="divide-y divide-[#DCDCDC] dark:divide-[#333333]">
                    {certs.map((cert) => {
                      const nativeFormat: CertificateFileFormat = cert.fileFormat || 'PDF';
                      return (
                        <div
                          key={cert.id}
                          className="p-4 sm:px-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F5F4F0]/60 dark:hover:bg-[#333333]/50 transition-colors"
                        >
                          <div className="space-y-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                              <span className="inline-flex items-center gap-1 font-semibold text-[#0D0D0D] dark:text-[#F5F4F0]">
                                {getFormatIcon(nativeFormat)}
                                <span>{cert.fileName || `${cert.id}.${nativeFormat.toLowerCase()}`}</span>
                              </span>
                              <span aria-hidden="true" className="text-[#858585]">
                                ·
                              </span>
                              <span className="text-[#4D4D4D] dark:text-[#B8B8B8]">
                                {nativeFormat}
                              </span>
                              {cert.fileSize && (
                                <>
                                  <span aria-hidden="true" className="text-[#858585]">
                                    ·
                                  </span>
                                  <span className="text-[#858585] tabular-nums">{cert.fileSize}</span>
                                </>
                              )}
                            </div>

                            <p className="font-display text-sm font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                              {cert.name}
                            </p>
                            <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8]">
                              {cert.issuer} · {cert.relatedSkill}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleOpenCert(cert)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#562f54] hover:bg-[#6b3b68] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Preview</span>
                            </button>

                            {EXPORT_FORMATS.map((fmt) => (
                              <button
                                key={fmt}
                                type="button"
                                onClick={() => handleDownload(cert, fmt)}
                                disabled={downloadingFormat === `${cert.id}-${fmt}`}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#562f54] hover:bg-[#6b3b68] text-white text-[11px] font-mono font-semibold transition-colors whitespace-nowrap shrink-0"
                                title={`Download as ${fmt}`}
                              >
                                <Download className="w-3 h-3" />
                                <span>{fmt}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Certificate Preview & Multi-Format Export Modal */}
      {activeCertificate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeCertificate.name}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 overflow-y-auto"
          onClick={() => setActiveCertificate(null)}
        >
          <div
            className="relative w-full max-w-5xl my-auto bg-[#F5F4F0] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-[#DCDCDC] dark:border-[#333333] bg-[#EDECE8] dark:bg-[#0D0D0D]">
              <div className="min-w-0">
                <p className="font-mono text-[11px] text-[#858585] dark:text-[#B8B8B8] truncate">
                  /{activeCertificate.folderPath || 'certificates'}/
                  {activeCertificate.fileName || `${activeCertificate.id}.pdf`}
                </p>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#0D0D0D] dark:text-[#F5F4F0] truncate">
                  {activeCertificate.name}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.75, Number((z - 0.25).toFixed(2))))}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#562f54] hover:bg-[#6b3b68] text-white text-xs font-mono font-semibold transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-xs text-[#252525] dark:text-[#EDECE8] tabular-nums px-1">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2, Number((z + 0.25).toFixed(2))))}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#562f54] hover:bg-[#6b3b68] text-white text-xs font-mono font-semibold transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCertificate(null)}
                  aria-label="Close certificate viewer"
                  className="p-1.5 rounded-lg text-[#4D4D4D] hover:text-[#0D0D0D] dark:text-[#B8B8B8] dark:hover:text-[#F5F4F0]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Certificate Canvas Preview Area */}
            <div className="flex-1 overflow-auto p-6 bg-[#0D0D0D] flex items-center justify-center">
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                }}
                className="transition-transform duration-150 max-w-full"
              >
                <img
                  src={getCertificatePreviewDataUrl(activeCertificate, data.profile.fullName)}
                  alt={activeCertificate.name}
                  referrerPolicy="no-referrer"
                  className="w-full max-w-4xl h-auto rounded-lg border border-[#333333] shadow-xl"
                />
              </div>
            </div>

            {/* Modal Footer: Metadata + Multi-Format Download Bar (PDF, PNG, JPG, SVG, WEBP) */}
            <div className="px-6 py-4 border-t border-[#DCDCDC] dark:border-[#333333] bg-[#EDECE8] dark:bg-[#0D0D0D] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <p className="font-semibold text-[#0D0D0D] dark:text-[#F5F4F0]">
                  {activeCertificate.issuer} · Issued {activeCertificate.issueDate}
                  {activeCertificate.credentialId
                    ? ` · Credential ID: ${activeCertificate.credentialId}`
                    : ''}
                </p>
                <p className="font-mono text-[#4D4D4D] dark:text-[#B8B8B8]">
                  Skills: {activeCertificate.relatedSkill}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-[#4D4D4D] dark:text-[#B8B8B8] mr-1">
                  Download Format:
                </span>
                {EXPORT_FORMATS.map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => handleDownload(activeCertificate, fmt)}
                    disabled={downloadingFormat === `${activeCertificate.id}-${fmt}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#562f54] hover:bg-[#6b3b68] text-white text-xs font-mono font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{fmt}</span>
                  </button>
                ))}

                {activeCertificate.verificationUrl && (
                  <a
                    href={activeCertificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#562f54] hover:bg-[#6b3b68] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Verify Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
