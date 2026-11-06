import React, { useRef } from 'react';
import { Download, Eye, FileText, Printer, Upload, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ResumeSection: React.FC = () => {
  const { data, updateData, resumeModalOpen, setResumeModalOpen } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      updateData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          resumePdfDataUrl: result,
          resumeFileName: file.name,
        },
      }));
      setResumeModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadResume = () => {
    if (data.profile.resumePdfDataUrl) {
      const link = document.createElement('a');
      link.href = data.profile.resumePdfDataUrl;
      link.download = data.profile.resumeFileName || 'Ambati_Tharun_Sai_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setResumeModalOpen(true);
    }
  };

  return (
    <>
      <section
        id="resume"
        className="py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#050814] no-print"
      >
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <p className="font-mono text-xs font-semibold tracking-wider text-[#3B82F6] dark:text-[#06B6D4]">
                07. VERIFIED RESUME & CURRICULUM VITAE
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                ATS-Friendly Software Engineer & AI Developer Resume
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed max-w-2xl">
                Structured in a clean, recruiter-ready software developer format—synced directly
                with verified skills, projects, GitHub links, and academic credentials.
              </p>
              {data.profile.resumePdfDataUrl && (
                <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                  Uploaded PDF Active: {data.profile.resumeFileName}
                </p>
              )}
            </div>

            <div className="lg:col-span-5 flex flex-wrap items-center lg:justify-end gap-3">
              <button
                type="button"
                onClick={() => setResumeModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#3B82F6] hover:bg-blue-500 text-white transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Resume</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-white dark:bg-[#101A30] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-[#F8FAFC] transition-colors"
              >
                <Download className="w-4 h-4 text-[#3B82F6] dark:text-[#06B6D4]" />
                <span>Download Resume</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleResumeUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#3B82F6] dark:hover:border-[#06B6D4] transition-colors"
              >
                <Upload className="w-4 h-4 text-[#3B82F6] dark:text-[#06B6D4]" />
                <span>Upload PDF</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Resume Preview & Print Modal */}
      {resumeModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume Preview"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 overflow-y-auto"
          onClick={() => setResumeModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl my-auto bg-white dark:bg-[#0B1124] border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#050814] no-print">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
                <FileText className="w-4 h-4 text-[#3B82F6] dark:text-[#06B6D4]" />
                <span>{data.profile.fullName} — Official Developer Resume</span>
              </div>

              <div className="flex items-center gap-2">
                {data.profile.resumePdfDataUrl && (
                  <a
                    href={data.profile.resumePdfDataUrl}
                    download={data.profile.resumeFileName || 'Ambati_Tharun_Sai_Resume.pdf'}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#3B82F6] text-white hover:bg-blue-500 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Uploaded PDF</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#3B82F6] text-white hover:bg-blue-500 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save as PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setResumeModalOpen(false)}
                  aria-label="Close resume preview"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Sheet Content */}
            <div className="p-6 sm:p-10 overflow-y-auto bg-white text-slate-900 space-y-6">
              {data.profile.resumePdfDataUrl ? (
                <div className="space-y-4">
                  <div className="w-full h-[68vh] border border-slate-200 rounded-lg overflow-hidden">
                    <iframe
                      src={data.profile.resumePdfDataUrl}
                      title="Uploaded Resume PDF"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              ) : null}

              {/* Formatted ATS-Friendly Software Engineer Resume */}
              <div className="max-w-3xl mx-auto space-y-5 text-slate-900">
                <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 uppercase">
                      {data.profile.fullName}
                    </h2>
                    <p className="text-xs font-semibold text-blue-700 mt-0.5">
                      {data.profile.headline}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-slate-700 space-y-0.5 sm:text-right">
                    <p>{data.profile.location}</p>
                    <p>GitHub: github.com/{data.profile.githubUsername}</p>
                    {data.profile.email && <p>Email: {data.profile.email}</p>}
                    {data.profile.phone && <p>Phone: {data.profile.phone}</p>}
                    {data.profile.linkedinUrl && <p>LinkedIn: {data.profile.linkedinUrl}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                    Professional Summary
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-700">
                    {data.profile.introParagraphs.join(' ')}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                    Education
                  </h3>
                  <div className="flex flex-wrap items-baseline justify-between text-xs">
                    <div>
                      <span className="font-bold">{data.education.degree}</span> —{' '}
                      <span>{data.education.branch}</span>
                      <p className="text-slate-600">{data.education.institution}</p>
                    </div>
                    <div className="font-mono text-slate-700 tabular-nums">
                      {data.education.startYear} – {data.education.graduationYear} | CGPA:{' '}
                      {data.education.cgpa}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    <span className="font-semibold">Coursework:</span>{' '}
                    {data.education.coursework.join(', ')}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    {data.skillGroups.map((group) => (
                      <div key={group.id}>
                        <span className="font-semibold text-slate-900">{group.category}: </span>
                        <span className="text-slate-700">{group.skills.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                    Key Software & AI Projects
                  </h3>
                  <div className="space-y-3">
                    {data.projects.slice(0, 5).map((proj) => (
                      <div key={proj.id} className="space-y-0.5 text-xs">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-bold text-slate-900">
                            {proj.title} — <span className="font-normal">{proj.subtitle}</span>
                          </span>
                          <span className="font-mono text-[11px] text-slate-600">
                            [{proj.status}]
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-blue-700">
                          Tech Stack: {proj.technologies.join(', ')}
                        </p>
                        <p className="text-slate-700 leading-relaxed">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                    Hackathons & Technical Achievements
                  </h3>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                    {data.hackathons.map((h) => (
                      <li key={h.id}>
                        <span className="font-semibold">{h.eventName}</span> ({h.date}) —{' '}
                        {h.outcome}
                      </li>
                    ))}
                    {data.achievements
                      .filter((a) => a.verified)
                      .map((a) => (
                        <li key={a.id}>
                          <span className="font-semibold">{a.title}:</span> {a.description}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
