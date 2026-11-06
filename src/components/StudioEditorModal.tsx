import React, { useState } from 'react';
import { Check, Copy, Download, Plus, RotateCcw, Trash2, Upload, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  AchievementEntry,
  CertificateCategory,
  CertificateEntry,
  ExperienceEntry,
  ProjectCategory,
  ProjectStatus,
} from '../types/portfolio';

type StudioTab =
  | 'profile'
  | 'education'
  | 'projects'
  | 'hackathons'
  | 'certificates'
  | 'achievements'
  | 'json';

export const StudioEditorModal: React.FC = () => {
  const {
    data,
    updateData,
    resetToDefaults,
    exportJson,
    importJson,
    studioOpen,
    setStudioOpen,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<StudioTab>('profile');
  const [jsonInput, setJsonInput] = useState<string>('');
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // New Certificate Form State
  const [certName, setCertName] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certCredId, setCertCredId] = useState('');
  const [certUrl, setCertUrl] = useState('');
  const [certSkill, setCertSkill] = useState('');
  const [certCategory, setCertCategory] = useState<CertificateCategory>('Programming');
  const [certPreviewUrl, setCertPreviewUrl] = useState('');

  // New Achievement Form State
  const [achTitle, setAchTitle] = useState('');
  const [achOrg, setAchOrg] = useState('');
  const [achDate, setAchDate] = useState('');
  const [achCategory, setAchCategory] = useState<AchievementEntry['category']>('Technical Milestone');
  const [achDesc, setAchDesc] = useState('');
  const [achUrl, setAchUrl] = useState('');

  // New Experience Form State
  const [expRole, setExpRole] = useState('');
  const [expOrg, setExpOrg] = useState('');
  const [expPeriod, setExpPeriod] = useState('');
  const [expType, setExpType] = useState<ExperienceEntry['type']>('Internship');
  const [expDesc, setExpDesc] = useState('');
  const [expTech, setExpTech] = useState('');

  // New Project Form State
  const [projTitle, setProjTitle] = useState('');
  const [projSubtitle, setProjSubtitle] = useState('');
  const [projCategory, setProjCategory] = useState<ProjectCategory>('AI & LLM Systems');
  const [projStatus, setProjStatus] = useState<ProjectStatus>('Completed');
  const [projDesc, setProjDesc] = useState('');
  const [projProblem, setProjProblem] = useState('');
  const [projTech, setProjTech] = useState('');
  const [projGithub, setProjGithub] = useState('');
  const [projLive, setProjLive] = useState('');

  if (!studioOpen) return null;

  const notify = (msg: string) => {
    setStatusNotice(msg);
    window.setTimeout(() => setStatusNotice(null), 3500);
  };

  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onLoaded: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLoaded(reader.result);
        notify(`Loaded image: ${file.name}`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName.trim() || !certIssuer.trim()) return;
    const newCert: CertificateEntry = {
      id: `cert-${Date.now()}`,
      name: certName.trim(),
      issuer: certIssuer.trim(),
      issueDate: certDate.trim() || '2026',
      credentialId: certCredId.trim() || undefined,
      verificationUrl: certUrl.trim() || undefined,
      relatedSkill: certSkill.trim() || certCategory,
      category: certCategory,
      previewUrl: certPreviewUrl.trim() || undefined,
    };
    updateData((prev) => ({
      ...prev,
      certificates: [newCert, ...prev.certificates],
    }));
    setCertName('');
    setCertIssuer('');
    setCertDate('');
    setCertCredId('');
    setCertUrl('');
    setCertSkill('');
    setCertPreviewUrl('');
    notify('Added verified certificate to gallery.');
  };

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achTitle.trim() || !achDesc.trim()) return;
    const newAch: AchievementEntry = {
      id: `ach-${Date.now()}`,
      title: achTitle.trim(),
      organization: achOrg.trim() || 'Verified Record',
      date: achDate.trim() || '2026',
      category: achCategory,
      description: achDesc.trim(),
      verificationUrl: achUrl.trim() || undefined,
      verified: true,
    };
    updateData((prev) => ({
      ...prev,
      achievements: [newAch, ...prev.achievements],
    }));
    setAchTitle('');
    setAchOrg('');
    setAchDate('');
    setAchDesc('');
    setAchUrl('');
    notify('Added verified achievement.');
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expRole.trim() || !expOrg.trim()) return;
    const newExp: ExperienceEntry = {
      id: `exp-${Date.now()}`,
      type: expType,
      role: expRole.trim(),
      organization: expOrg.trim(),
      period: expPeriod.trim() || '2026',
      description: expDesc.trim(),
      technologies: expTech
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };
    updateData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }));
    setExpRole('');
    setExpOrg('');
    setExpPeriod('');
    setExpDesc('');
    setExpTech('');
    notify('Added verified experience entry.');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim() || !projDesc.trim()) return;
    updateData((prev) => ({
      ...prev,
      projects: [
        {
          id: `proj-${Date.now()}`,
          title: projTitle.trim(),
          subtitle: projSubtitle.trim() || projCategory,
          category: projCategory,
          status: projStatus,
          description: projDesc.trim(),
          problemSolved: projProblem.trim() || projDesc.trim(),
          architectureOverview: 'Custom full-stack implementation.',
          features: ['Modular system design and verified implementation'],
          technologies: projTech
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          githubUrl: projGithub.trim() || prev.profile.githubUrl,
          liveUrl: projLive.trim() || undefined,
          updatedAt: new Date().toISOString().slice(0, 10),
        },
        ...prev.projects,
      ],
    }));
    setProjTitle('');
    setProjSubtitle('');
    setProjDesc('');
    setProjProblem('');
    setProjTech('');
    setProjGithub('');
    setProjLive('');
    notify('Added new project to portfolio.');
  };

  const handleDownloadJson = () => {
    const raw = exportJson();
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ambati-tharun-sai-portfolio-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    notify('Downloaded portfolio-data.json backup.');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Studio Content Manager"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 overflow-y-auto no-print"
      onClick={() => setStudioOpen(false)}
    >
      <div
        className="relative w-full max-w-5xl my-auto bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#060B16]">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Portfolio Studio & Verified Content Manager
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Changes save automatically to browser storage and can be exported as JSON anytime.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setStudioOpen(false)}
            aria-label="Close Studio Editor"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#060B16]/60 flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: 'profile', label: '1. Profile & Contact' },
              { id: 'education', label: '2. Education' },
              { id: 'projects', label: '3. Projects' },
              { id: 'hackathons', label: '4. HacXLerate & Events' },
              { id: 'certificates', label: '5. Certificates' },
              { id: 'achievements', label: '6. Achievements & Exp' },
              { id: 'json', label: '7. JSON Backup / Reset' },
            ] as { id: StudioTab; label: string }[]
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === t.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {statusNotice && (
          <div className="px-6 py-2 bg-emerald-600 text-white text-xs font-medium flex items-center justify-between">
            <span>{statusNotice}</span>
          </div>
        )}

        {/* Tab Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* TAB 1: PROFILE & CONTACT */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={data.profile.fullName}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        profile: { ...prev.profile, fullName: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Availability Status (Editable)
                  </label>
                  <input
                    type="text"
                    value={data.profile.availabilityStatus}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        profile: { ...prev.profile, availabilityStatus: e.target.value },
                      }))
                    }
                    placeholder="e.g. Open to Software & AI Internships"
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Professional Email
                  </label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        profile: { ...prev.profile, email: e.target.value },
                      }))
                    }
                    placeholder="Enter your verified email address"
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={data.profile.phone}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        profile: { ...prev.profile, phone: e.target.value },
                      }))
                    }
                    placeholder="Optional phone number"
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={data.profile.linkedinUrl}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        profile: { ...prev.profile, linkedinUrl: e.target.value },
                      }))
                    }
                    placeholder="https://www.linkedin.com/in/..."
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    value={data.profile.githubUrl}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        profile: { ...prev.profile, githubUrl: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Portrait Image URL or Upload
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={data.profile.portraitUrl}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          profile: { ...prev.profile, portraitUrl: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                    <label className="px-3 py-2 rounded-lg bg-slate-900 dark:bg-blue-600 text-white text-xs font-semibold cursor-pointer shrink-0">
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageFileUpload(e, (url) =>
                            updateData((prev) => ({
                              ...prev,
                              profile: { ...prev.profile, portraitUrl: url },
                            }))
                          )
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        profile: { ...prev.profile, location: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={data.education.degree}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        education: { ...prev.education, degree: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Branch / Specialization
                  </label>
                  <input
                    type="text"
                    value={data.education.branch}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        education: { ...prev.education, branch: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    College / University Name
                  </label>
                  <input
                    type="text"
                    value={data.education.institution}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        education: { ...prev.education, institution: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Verified CGPA
                  </label>
                  <input
                    type="text"
                    value={data.education.cgpa}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        education: { ...prev.education, cgpa: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Start Year
                  </label>
                  <input
                    type="text"
                    value={data.education.startYear}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        education: { ...prev.education, startYear: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Expected Graduation Year
                  </label>
                  <input
                    type="text"
                    value={data.education.graduationYear}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        education: { ...prev.education, graduationYear: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Relevant Coursework (Comma-separated)
                </label>
                <input
                  type="text"
                  value={data.education.coursework.join(', ')}
                  onChange={(e) =>
                    updateData((prev) => ({
                      ...prev,
                      education: {
                        ...prev.education,
                        coursework: e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      },
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <form
                onSubmit={handleAddProject}
                className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 space-y-4"
              >
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  Add New Verified Project
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    placeholder="Project Name *"
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={projSubtitle}
                    onChange={(e) => setProjSubtitle(e.target.value)}
                    placeholder="Short Subtitle"
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                  <select
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value as ProjectCategory)}
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="AI & LLM Systems">AI & LLM Systems</option>
                    <option value="Full-Stack & Web">Full-Stack & Web</option>
                    <option value="Mobile & IoT">Mobile & IoT</option>
                    <option value="Social Impact">Social Impact</option>
                  </select>
                  <select
                    value={projStatus}
                    onChange={(e) => setProjStatus(e.target.value as ProjectStatus)}
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Live Production">Live Production</option>
                    <option value="Completed">Completed</option>
                    <option value="Prototype">Prototype</option>
                    <option value="Concept">Concept</option>
                    <option value="Work in Progress">Work in Progress</option>
                  </select>
                  <input
                    type="text"
                    value={projTech}
                    onChange={(e) => setProjTech(e.target.value)}
                    placeholder="Technologies (comma-separated, e.g. Python, FastAPI)"
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="url"
                    value={projGithub}
                    onChange={(e) => setProjGithub(e.target.value)}
                    placeholder="GitHub Repo URL"
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <textarea
                  rows={2}
                  required
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  placeholder="Project Description *"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </form>

              <div className="space-y-3">
                <h4 className="font-mono text-xs text-slate-400">EXISTING FEATURED PROJECTS</h4>
                {data.projects.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{p.title}</p>
                      <p className="text-xs text-slate-500">{p.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={p.status}
                        onChange={(e) =>
                          updateData((prev) => ({
                            ...prev,
                            projects: prev.projects.map((item) =>
                              item.id === p.id
                                ? { ...item, status: e.target.value as ProjectStatus }
                                : item
                            ),
                          }))
                        }
                        className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                      >
                        <option value="Live Production">Live Production</option>
                        <option value="Completed">Completed</option>
                        <option value="Prototype">Prototype</option>
                        <option value="Concept">Concept</option>
                        <option value="Work in Progress">Work in Progress</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: HACKATHONS (HacXLerate 2026) */}
          {activeTab === 'hackathons' && (
            <div className="space-y-6">
              {data.hackathons.map((hack) => (
                <div
                  key={hack.id}
                  className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 space-y-4"
                >
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    {hack.eventName}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Team Information
                      </label>
                      <input
                        type="text"
                        value={hack.teamInfo}
                        onChange={(e) =>
                          updateData((prev) => ({
                            ...prev,
                            hackathons: prev.hackathons.map((h) =>
                              h.id === hack.id ? { ...h, teamInfo: e.target.value } : h
                            ),
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Project Developed
                      </label>
                      <input
                        type="text"
                        value={hack.projectDeveloped}
                        onChange={(e) =>
                          updateData((prev) => ({
                            ...prev,
                            hackathons: prev.hackathons.map((h) =>
                              h.id === hack.id ? { ...h, projectDeveloped: e.target.value } : h
                            ),
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Verified Outcome
                      </label>
                      <input
                        type="text"
                        value={hack.outcome}
                        onChange={(e) =>
                          updateData((prev) => ({
                            ...prev,
                            hackathons: prev.hackathons.map((h) =>
                              h.id === hack.id ? { ...h, outcome: e.target.value } : h
                            ),
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Upload Certificate / Event Photo
                      </label>
                      <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Event Photo / Certificate</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageFileUpload(e, (url) =>
                              updateData((prev) => ({
                                ...prev,
                                hackathons: prev.hackathons.map((h) =>
                                  h.id === hack.id
                                    ? {
                                        ...h,
                                        certificateUrl: url,
                                        eventPhotos: [...h.eventPhotos, url],
                                      }
                                    : h
                                ),
                              }))
                            )
                          }
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Participation Details
                    </label>
                    <textarea
                      rows={2}
                      value={hack.participationDetails}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          hackathons: prev.hackathons.map((h) =>
                            h.id === hack.id ? { ...h, participationDetails: e.target.value } : h
                          ),
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <form
                onSubmit={handleAddCertificate}
                className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 space-y-4"
              >
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  Add Verified Certificate
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={certName}
                    onChange={(e) => setCertName(e.target.value)}
                    placeholder="Certificate Name *"
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    required
                    value={certIssuer}
                    onChange={(e) => setCertIssuer(e.target.value)}
                    placeholder="Issuing Organization *"
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                  <select
                    value={certCategory}
                    onChange={(e) => setCertCategory(e.target.value as CertificateCategory)}
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Cloud and Databases">Cloud and Databases</option>
                    <option value="Hackathons">Hackathons</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="text"
                    value={certDate}
                    onChange={(e) => setCertDate(e.target.value)}
                    placeholder="Issue Date (e.g. Oct 2026)"
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={certCredId}
                    onChange={(e) => setCertCredId(e.target.value)}
                    placeholder="Credential ID (optional)"
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="url"
                    value={certUrl}
                    onChange={(e) => setCertUrl(e.target.value)}
                    placeholder="Verification URL (optional)"
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={certSkill}
                    onChange={(e) => setCertSkill(e.target.value)}
                    placeholder="Related Skill (e.g. Python, GenAI)"
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                  <div className="flex items-center gap-2">
                    <label className="px-3 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold cursor-pointer">
                      Upload Certificate Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, (url) => setCertPreviewUrl(url))}
                        className="hidden"
                      />
                    </label>
                    {certPreviewUrl && (
                      <span className="text-xs text-emerald-500 font-mono">Image attached</span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certificate</span>
                </button>
              </form>

              {data.certificates.length > 0 && (
                <div className="space-y-2">
                  {data.certificates.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{c.name}</p>
                        <p className="text-xs text-slate-500">
                          {c.issuer} · {c.category}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          updateData((prev) => ({
                            ...prev,
                            certificates: prev.certificates.filter((item) => item.id !== c.id),
                          }))
                        }
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: ACHIEVEMENTS & EXPERIENCE */}
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add Achievement */}
              <form
                onSubmit={handleAddAchievement}
                className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  Add Verified Achievement
                </h3>
                <input
                  type="text"
                  required
                  value={achTitle}
                  onChange={(e) => setAchTitle(e.target.value)}
                  placeholder="Achievement Title *"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  value={achOrg}
                  onChange={(e) => setAchOrg(e.target.value)}
                  placeholder="Issuing Organization"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <select
                  value={achCategory}
                  onChange={(e) =>
                    setAchCategory(e.target.value as AchievementEntry['category'])
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Academic">Academic</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Coding Competition">Coding Competition</option>
                  <option value="Project Recognition">Project Recognition</option>
                  <option value="Technical Milestone">Technical Milestone</option>
                  <option value="Certification">Certification</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Community">Community</option>
                </select>
                <textarea
                  rows={2}
                  required
                  value={achDesc}
                  onChange={(e) => setAchDesc(e.target.value)}
                  placeholder="Supporting Description *"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="url"
                  value={achUrl}
                  onChange={(e) => setAchUrl(e.target.value)}
                  placeholder="Verification Link (optional)"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save Achievement</span>
                </button>
              </form>

              {/* Add Experience */}
              <form
                onSubmit={handleAddExperience}
                className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  Add Experience / Involvement
                </h3>
                <select
                  value={expType}
                  onChange={(e) => setExpType(e.target.value as ExperienceEntry['type'])}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Technical Volunteering">Technical Volunteering</option>
                  <option value="College Activity">College Activity</option>
                  <option value="Team Collaboration">Team Collaboration</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Technical Community">Technical Community</option>
                  <option value="Open-Source Contribution">Open-Source Contribution</option>
                </select>
                <input
                  type="text"
                  required
                  value={expRole}
                  onChange={(e) => setExpRole(e.target.value)}
                  placeholder="Role / Title *"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  required
                  value={expOrg}
                  onChange={(e) => setExpOrg(e.target.value)}
                  placeholder="Organization / Community *"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  value={expPeriod}
                  onChange={(e) => setExpPeriod(e.target.value)}
                  placeholder="Duration / Period (e.g. Summer 2026)"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  value={expTech}
                  onChange={(e) => setExpTech(e.target.value)}
                  placeholder="Technologies (comma-separated)"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <textarea
                  rows={2}
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                  placeholder="Responsibilities & Impact"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save Experience</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 7: JSON EXPORT / IMPORT & RESET */}
          {activeTab === 'json' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Export or Reset Portfolio Data
                  </h3>
                  <p className="text-xs text-slate-500">
                    Download your structured content as a portable JSON file or restore default
                    verified settings.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(exportJson());
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied JSON' : 'Copy JSON'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadJson}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetToDefaults();
                      notify('Restored verified default portfolio data.');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Import Portfolio JSON Snapshot
                </label>
                <textarea
                  rows={6}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste exported portfolio JSON here..."
                  className="w-full p-3 font-mono text-xs rounded-lg bg-[#F8FAFC] dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    const res = importJson(jsonInput);
                    if (res.ok) {
                      setJsonInput('');
                      notify('Successfully imported portfolio JSON configuration.');
                    } else {
                      notify(res.error || 'Invalid JSON');
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                >
                  Apply Imported JSON
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
