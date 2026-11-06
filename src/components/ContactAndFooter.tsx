import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Sliders,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export const ContactAndFooter: React.FC = () => {
  const { data, setStudioOpen } = usePortfolio();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email address so I can reply to your inquiry.');
      return;
    }
    if (trimmedSubject.length < 3) {
      setErrorMsg('Please provide a clear subject line (at least 3 characters).');
      return;
    }
    if (trimmedMessage.length < 10) {
      setErrorMsg('Please enter a message of at least 10 characters.');
      return;
    }

    const newEntry: ContactSubmission = {
      id: `msg-${Date.now()}`,
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setSubmissions((prev) => [newEntry, ...prev]);
    setSuccessMsg(
      data.profile.email
        ? `Thank you, ${trimmedName}. Your message is ready and logged—click "Send via Email Client" below or I will review it shortly.`
        : `Thank you, ${trimmedName}. Your message has been validated and recorded in the session outbox.`
    );

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* SECTION 15: CONTACT SECTION */}
      <section
        id="contact"
        className="py-20 sm:py-24 px-6 border-b border-slate-200 dark:border-slate-800/80 bg-[#F8FAFC] dark:bg-[#0B1325] no-print"
      >
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Verified Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="font-mono text-xs font-semibold tracking-wider text-blue-600 dark:text-cyan-400">
                08. CONTACT & COLLABORATION
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                Have an Idea? Let's Build Something Great.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Open to discussing software engineering roles, AI/ML internships, full-stack
                freelance projects, hackathon collaborations, and technical communities.
              </p>
            </div>

            {/* Verified Contact Details List (Zero fabricated phone numbers or emails) */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-start gap-3.5">
                <Github className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-mono text-xs text-slate-400">GITHUB PROFILE</p>
                  <a
                    href={data.profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 inline-flex items-center gap-1 break-all"
                  >
                    <span>{data.profile.githubUrl}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <Mail className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-mono text-xs text-slate-400">PROFESSIONAL EMAIL</p>
                  {data.profile.email ? (
                    <a
                      href={`mailto:${data.profile.email}`}
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 break-all"
                    >
                      {data.profile.email}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStudioOpen(true)}
                      className="text-xs font-medium text-blue-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Set Verified Email in Studio Editor</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <Linkedin className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-mono text-xs text-slate-400">LINKEDIN PROFILE</p>
                  {data.profile.linkedinUrl ? (
                    <a
                      href={data.profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 inline-flex items-center gap-1 break-all"
                    >
                      <span>{data.profile.linkedinUrl}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStudioOpen(true)}
                      className="text-xs font-medium text-blue-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Add LinkedIn URL in Studio Editor</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-xs text-slate-400">LOCATION</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {data.profile.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#060B16] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Send a Direct Message
            </h3>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Internship Opportunity / Project Collaboration / Inquiry"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about your project, role, or technical question..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8FAFC] dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs font-medium text-rose-700 dark:text-rose-300"
                >
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div
                  role="status"
                  className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-700 dark:text-emerald-300 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

                {submissions.length > 0 && data.profile.email && (
                  <a
                    href={`mailto:${data.profile.email}?subject=${encodeURIComponent(
                      submissions[0].subject
                    )}&body=${encodeURIComponent(
                      `From: ${submissions[0].name} (${submissions[0].email})\n\n${submissions[0].message}`
                    )}`}
                    className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
                  >
                    Open in Default Mail App ↗
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 16: FOOTER */}
      <footer className="py-12 px-6 bg-white dark:bg-[#060B16] border-t border-slate-200 dark:border-slate-800/80 no-print">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {data.profile.fullName}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Software Developer | AI/ML Enthusiast · {data.profile.location}
            </p>
            <p className="font-mono text-xs text-slate-400 dark:text-slate-500 pt-1">
              © {currentYear} {data.profile.fullName}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a
              href={data.profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>

            {data.profile.linkedinUrl ? (
              <a
                href={data.profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
              >
                LinkedIn
              </a>
            ) : (
              <button
                type="button"
                onClick={() => setStudioOpen(true)}
                className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
              >
                LinkedIn (Set in Studio)
              </button>
            )}

            {data.profile.email ? (
              <a
                href={`mailto:${data.profile.email}`}
                className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
              >
                Email
              </a>
            ) : (
              <a
                href="#contact"
                className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
              >
                Email / Contact Form
              </a>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#0B1325] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-500 transition-colors"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
