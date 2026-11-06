import React from 'react';
import { Download, Eye, FileText, Printer, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ResumeSection: React.FC = () => {
  const { data, resumeModalOpen, setResumeModalOpen } = usePortfolio();

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
        className="py-20 border-b border-[#DCDCDC] dark:border-[#333333] bg-[#F5F4F0] dark:bg-[#0D0D0D] no-print"
      >
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <p className="font-mono text-xs font-semibold tracking-wider text-[#4D4D4D] dark:text-[#B8B8B8]">
                07. VERIFIED RESUME & CURRICULUM VITAE
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                ATS-Friendly Software Engineer & AI Developer Resume
              </h2>
              <p className="text-sm sm:text-base text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed max-w-2xl">
                Structured in a clean, recruiter-ready software developer format—synced directly
                with verified skills, projects, GitHub links, and academic credentials.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap items-center lg:justify-end gap-3">
              <button
                type="button"
                onClick={() => setResumeModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#562f54] text-white hover:bg-[#6b3b68] transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Resume</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#562f54] text-white hover:bg-[#6b3b68] border border-[#562f54] transition-colors"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Download Resume</span>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 overflow-y-auto"
          onClick={() => setResumeModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl my-auto bg-[#F5F4F0] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-[#DCDCDC] dark:border-[#333333] bg-[#EDECE8] dark:bg-[#0D0D0D] no-print">
              <div className="flex items-center gap-2 text-xs font-mono text-[#252525] dark:text-[#DCDCDC]">
                <FileText className="w-4 h-4 text-[#4D4D4D] dark:text-[#B8B8B8]" />
                <span>{data.profile.fullName} — Official Developer Resume</span>
              </div>

              <div className="flex items-center gap-2">
                {data.profile.resumePdfDataUrl && (
                  <a
                    href={data.profile.resumePdfDataUrl}
                    download={data.profile.resumeFileName || 'Ambati_Tharun_Sai_Resume.pdf'}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#562f54] text-white hover:bg-[#6b3b68] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Uploaded PDF</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#562f54] text-white hover:bg-[#6b3b68] transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save as PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setResumeModalOpen(false)}
                  aria-label="Close resume preview"
                  className="p-1.5 rounded-lg text-[#4D4D4D] hover:text-[#0D0D0D] dark:text-[#B8B8B8] dark:hover:text-[#F5F4F0]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Sheet Content */}
            <div className="p-6 sm:p-10 overflow-y-auto bg-[#F5F4F0] text-[#0D0D0D] space-y-6">
              {data.profile.resumePdfDataUrl ? (
                <div className="space-y-4">
                  <div className="w-full h-[68vh] border border-[#DCDCDC] rounded-lg overflow-hidden">
                    <iframe
                      src={data.profile.resumePdfDataUrl}
                      title="Uploaded Resume PDF"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              ) : null}

              {/* Formatted ATS-Friendly Software Engineer Resume */}
              <div className="max-w-3xl mx-auto space-y-5 text-[#0D0D0D]">
                <div className="border-b-2 border-[#0D0D0D] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-[#0D0D0D] uppercase">
                      {data.profile.fullName}
                    </h2>
                    <p className="text-xs font-semibold text-[#252525] mt-0.5">
                      {data.profile.headline}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-[#333333] space-y-0.5 sm:text-right">
                    <p>{data.profile.location}</p>
                    <p>GitHub: github.com/{data.profile.githubUsername}</p>
                    {data.profile.email && <p>Email: {data.profile.email}</p>}
                    {data.profile.phone && <p>Phone: {data.profile.phone}</p>}
                    {data.profile.linkedinUrl && <p>LinkedIn: {data.profile.linkedinUrl}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0D0D0D] border-b border-[#B8B8B8] pb-1">
                    Professional Summary
                  </h3>
                  <p className="text-xs leading-relaxed text-[#252525]">
                    {data.profile.introParagraphs.join(' ')}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0D0D0D] border-b border-[#B8B8B8] pb-1">
                    Education
                  </h3>
                  <div className="flex flex-wrap items-baseline justify-between text-xs">
                    <div>
                      <span className="font-bold">{data.education.degree}</span> —{' '}
                      <span>{data.education.branch}</span>
                      <p className="text-[#4D4D4D]">{data.education.institution}</p>
                    </div>
                    <div className="font-mono text-[#252525] tabular-nums">
                      {data.education.startYear} – {data.education.graduationYear} | CGPA:{' '}
                      {data.education.cgpa}
                    </div>
                  </div>
                  <p className="text-[11px] text-[#4D4D4D]">
                    <span className="font-semibold">Coursework:</span>{' '}
                    {data.education.coursework.join(', ')}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0D0D0D] border-b border-[#B8B8B8] pb-1">
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    {data.skillGroups.map((group) => (
                      <div key={group.id}>
                        <span className="font-semibold text-[#0D0D0D]">{group.category}: </span>
                        <span className="text-[#252525]">{group.skills.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0D0D0D] border-b border-[#B8B8B8] pb-1">
                    Key Software & AI Projects
                  </h3>
                  <div className="space-y-3">
                    {data.projects.slice(0, 5).map((proj) => (
                      <div key={proj.id} className="space-y-0.5 text-xs">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-bold text-[#0D0D0D]">
                            {proj.title} — <span className="font-normal">{proj.subtitle}</span>
                          </span>
                          <span className="font-mono text-[11px] text-[#4D4D4D]">
                            [{proj.status}]
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-[#333333] font-semibold">
                          Tech Stack: {proj.technologies.join(', ')}
                        </p>
                        {proj.liveUrl && (
                          <p className="text-[11px] font-mono text-[#252525]">
                            Live Website: {proj.liveUrl}
                          </p>
                        )}
                        <p className="text-[#252525] leading-relaxed">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0D0D0D] border-b border-[#B8B8B8] pb-1">
                    Hackathons & Technical Achievements
                  </h3>
                  <ul className="list-disc list-inside text-xs text-[#252525] space-y-1">
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
