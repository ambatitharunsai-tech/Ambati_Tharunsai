import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
  Sliders,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactReceipt {
  receiptId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
}

export const ContactAndFooter: React.FC = () => {
  const { data, setStudioOpen } = usePortfolio();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [latestReceipt, setLatestReceipt] = useState<ContactReceipt | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLatestReceipt(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim() || 'Portfolio Inquiry';
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
    if (trimmedMessage.length < 10) {
      setErrorMsg('Please enter a message of at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Server rejected contact submission.');
      }

      setLatestReceipt({
        receiptId: String(payload.receiptId),
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
        receivedAt: String(payload.receivedAt || new Date().toISOString()),
      });

      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Unable to reach the contact backend. You can also email ambatitharunsai@gmail.com directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="py-20 sm:py-24 px-6 border-b border-slate-200 dark:border-slate-800/80 bg-[#F8FAFC] dark:bg-[#080D1E] no-print"
      >
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Verified Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="font-mono text-xs font-semibold tracking-wider text-blue-600 dark:text-indigo-400">
                08. CONTACT & COLLABORATION
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                Have an Idea or Opportunity? Let's Connect.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Open to software engineering roles, full-stack & AI internships, freelance
                projects, and hackathon collaborations.
              </p>
            </div>

            {/* Verified Contact Details Card */}
            <div className="p-6 rounded-2xl bg-white/90 dark:bg-[#050814]/90 backdrop-blur-md border border-slate-200 dark:border-indigo-500/20 space-y-4">
              <div className="flex items-start gap-3.5">
                <Github className="w-5 h-5 text-blue-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-mono text-xs text-slate-400">GITHUB PROFILE</p>
                  <a
                    href={data.profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-indigo-400 inline-flex items-center gap-1 break-all"
                  >
                    <span>{data.profile.githubUrl}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <Linkedin className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-mono text-xs text-slate-400">LINKEDIN PROFILE</p>
                  {data.profile.linkedinUrl ? (
                    <a
                      href={data.profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-indigo-400 inline-flex items-center gap-1 break-all"
                    >
                      <span>{data.profile.linkedinUrl}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStudioOpen(true)}
                      className="text-xs font-medium text-blue-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Add LinkedIn URL in Studio Editor</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <Mail className="w-5 h-5 text-blue-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-mono text-xs text-slate-400">PROFESSIONAL EMAIL</p>
                  {data.profile.email ? (
                    <a
                      href={`mailto:${data.profile.email}`}
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-indigo-400 break-all"
                    >
                      {data.profile.email}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStudioOpen(true)}
                      className="text-xs font-medium text-blue-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Set Verified Email in Studio Editor</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-xs text-slate-400">LOCATION</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {data.profile.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Backend-Connected Contact Form */}
          <div className="lg:col-span-7 bg-white/90 dark:bg-[#050814]/90 backdrop-blur-md border border-slate-200 dark:border-indigo-500/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Send a Message
              </h3>
              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                POST /api/contact · Verified Backend
              </span>
            </div>

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
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-violet-400"
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
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-violet-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Internship Opportunity / Project Collaboration / Inquiry"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-violet-400"
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
                  placeholder="Share details about your project, role, or technical inquiry..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F8FAFC] dark:bg-[#0B1124] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-violet-400"
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

              {latestReceipt && (
                <div
                  role="status"
                  className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-800 dark:text-emerald-200 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Submission Recorded on Server</span>
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-500/15">
                      Receipt #{latestReceipt.receiptId}
                    </span>
                  </div>
                  <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
                    Thank you, {latestReceipt.name}. Your message has been persisted by the backend
                    server ({new Date(latestReceipt.receivedAt).toLocaleTimeString()}). You can also
                    dispatch an instant copy via your email client below.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 disabled:opacity-60 text-white transition-all cursor-pointer shadow-md shadow-indigo-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting to Server...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {latestReceipt && data.profile.email && (
                  <a
                    href={`mailto:${data.profile.email}?subject=${encodeURIComponent(
                      latestReceipt.subject
                    )}&body=${encodeURIComponent(
                      `From: ${latestReceipt.name} (${latestReceipt.email})\nReceipt: ${latestReceipt.receiptId}\n\n${latestReceipt.message}`
                    )}`}
                    className="text-xs font-semibold text-blue-600 dark:text-indigo-400 hover:underline"
                  >
                    Open in Default Mail App ↗
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-white dark:bg-[#050814] border-t border-slate-200 dark:border-slate-800/80 no-print">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {data.profile.fullName}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {data.profile.headline} · {data.profile.location}
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
              className="hover:text-blue-600 dark:hover:text-indigo-400 transition-colors"
            >
              GitHub
            </a>

            {data.profile.linkedinUrl && (
              <a
                href={data.profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-indigo-400 transition-colors"
              >
                LinkedIn
              </a>
            )}

            {data.profile.email && (
              <a
                href={`mailto:${data.profile.email}`}
                className="hover:text-blue-600 dark:hover:text-indigo-400 transition-colors"
              >
                Email
              </a>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#0B1124] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-500 transition-colors"
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
