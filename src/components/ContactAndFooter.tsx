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
import { SubtleSectionGrid } from './ui/interactive-grid-pattern';

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
        className="relative py-20 sm:py-24 border-b border-[#DCDCDC] dark:border-[#333333] bg-[#EDECE8] dark:bg-[#252525] no-print"
      >
        <SubtleSectionGrid cellSize={40} />

        <div className="relative z-10 max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Direct Verified Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <p className="font-mono text-xs font-semibold tracking-wider text-[#4D4D4D] dark:text-[#B8B8B8]">
                08. CONTACT & COLLABORATION
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D] dark:text-[#F5F4F0]"
                style={{ textWrap: 'balance' }}
              >
                Have an Idea or Opportunity? Let's Connect.
              </h2>
              <p className="text-sm sm:text-base text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
                Open to software engineering roles, full-stack & AI internships, freelance
                projects, and hackathon collaborations.
              </p>
            </div>

            {/* Verified Contact Details Widget */}
            <div className="p-6 rounded-xl bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] space-y-4">
              <div className="flex items-start gap-3.5">
                <Github className="w-4 h-4 text-[#252525] dark:text-[#EDECE8] shrink-0 mt-1" />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-[#858585]">GITHUB PROFILE</p>
                  <a
                    href={data.profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-[#0D0D0D] dark:text-[#F5F4F0] hover:underline inline-flex items-center gap-1 break-all"
                  >
                    <span>{data.profile.githubUrl}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-[#DCDCDC] dark:border-[#252525]">
                <Linkedin className="w-4 h-4 text-[#252525] dark:text-[#EDECE8] shrink-0 mt-1" />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-[#858585]">LINKEDIN PROFILE</p>
                  {data.profile.linkedinUrl ? (
                    <a
                      href={data.profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-[#0D0D0D] dark:text-[#F5F4F0] hover:underline inline-flex items-center gap-1 break-all"
                    >
                      <span>{data.profile.linkedinUrl}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStudioOpen(true)}
                      className="text-xs font-medium text-[#0D0D0D] dark:text-[#EDECE8] hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Add LinkedIn URL in Studio Editor</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-[#DCDCDC] dark:border-[#252525]">
                <Mail className="w-4 h-4 text-[#252525] dark:text-[#EDECE8] shrink-0 mt-1" />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-[#858585]">PROFESSIONAL EMAIL</p>
                  {data.profile.email ? (
                    <a
                      href={`mailto:${data.profile.email}`}
                      className="text-xs sm:text-sm font-semibold text-[#0D0D0D] dark:text-[#F5F4F0] hover:underline break-all"
                    >
                      {data.profile.email}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStudioOpen(true)}
                      className="text-xs font-medium text-[#0D0D0D] dark:text-[#EDECE8] hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Set Verified Email in Studio Editor</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-[#DCDCDC] dark:border-[#252525]">
                <MapPin className="w-4 h-4 text-[#252525] dark:text-[#EDECE8] shrink-0 mt-1" />
                <div>
                  <p className="font-mono text-[11px] text-[#858585]">LOCATION</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#0D0D0D] dark:text-[#F5F4F0]">
                    {data.profile.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Backend-Connected Contact Form Widget */}
          <div className="lg:col-span-7 bg-[#F5F4F0] dark:bg-[#0D0D0D] border border-[#DCDCDC] dark:border-[#333333] rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between gap-2 border-b border-[#DCDCDC] dark:border-[#333333] pb-4">
              <h3 className="font-display text-xl font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
                Send a Message
              </h3>
              <span className="font-mono text-[11px] text-[#4D4D4D] dark:text-[#B8B8B8]">
                POST /api/contact
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-[#252525] dark:text-[#DCDCDC] mb-1.5"
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
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] text-[#0D0D0D] dark:text-[#EDECE8] placeholder:text-[#858585] focus:outline-none focus:border-[#4D4D4D] dark:focus:border-[#B8B8B8] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-[#252525] dark:text-[#DCDCDC] mb-1.5"
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
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] text-[#0D0D0D] dark:text-[#EDECE8] placeholder:text-[#858585] focus:outline-none focus:border-[#4D4D4D] dark:focus:border-[#B8B8B8] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold text-[#252525] dark:text-[#DCDCDC] mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Internship Opportunity / Project Collaboration / Inquiry"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] text-[#0D0D0D] dark:text-[#EDECE8] placeholder:text-[#858585] focus:outline-none focus:border-[#4D4D4D] dark:focus:border-[#B8B8B8] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-[#252525] dark:text-[#DCDCDC] mb-1.5"
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
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#DCDCDC] dark:border-[#333333] text-[#0D0D0D] dark:text-[#EDECE8] placeholder:text-[#858585] focus:outline-none focus:border-[#4D4D4D] dark:focus:border-[#B8B8B8] transition-colors"
                />
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="p-3.5 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#4D4D4D] text-xs font-medium text-[#0D0D0D] dark:text-[#F5F4F0]"
                >
                  {errorMsg}
                </div>
              )}

              {latestReceipt && (
                <div
                  role="status"
                  className="p-4 rounded-lg bg-[#EDECE8] dark:bg-[#252525] border border-[#4D4D4D] text-xs text-[#0D0D0D] dark:text-[#EDECE8] space-y-2"
                >
                  <div className="flex items-center justify-between gap-2 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0D0D0D] dark:text-[#EDECE8] shrink-0" />
                      <span>Submission Recorded on Server</span>
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#DCDCDC] dark:bg-[#333333]">
                      Receipt #{latestReceipt.receiptId}
                    </span>
                  </div>
                  <p className="text-[#4D4D4D] dark:text-[#B8B8B8] leading-relaxed">
                    Thank you, {latestReceipt.name}. Your message has been persisted by the backend
                    server ({new Date(latestReceipt.receivedAt).toLocaleTimeString()}).
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#562f54] text-white hover:bg-[#6b3b68] disabled:opacity-60 transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
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
                    className="px-3 py-1.5 rounded-lg bg-[#562f54] text-white text-xs font-semibold hover:bg-[#6b3b68] transition-colors"
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
      <footer className="py-10 bg-[#F5F4F0] dark:bg-[#0D0D0D] border-t border-[#DCDCDC] dark:border-[#333333] no-print">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="font-display text-base font-bold text-[#0D0D0D] dark:text-[#F5F4F0]">
              {data.profile.fullName}
            </p>
            <p className="text-xs text-[#4D4D4D] dark:text-[#B8B8B8]">
              {data.profile.headline} · {data.profile.location}
            </p>
            <p className="font-mono text-xs text-[#858585] pt-1">
              © {currentYear} {data.profile.fullName}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-[#4D4D4D] dark:text-[#B8B8B8]">
            <a
              href={data.profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0] transition-colors"
            >
              GitHub
            </a>

            {data.profile.linkedinUrl && (
              <a
                href={data.profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0] transition-colors"
              >
                LinkedIn
              </a>
            )}

            {data.profile.email && (
              <a
                href={`mailto:${data.profile.email}`}
                className="hover:text-[#0D0D0D] dark:hover:text-[#F5F4F0] transition-colors"
              >
                Email
              </a>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#562f54] border border-[#562f54] text-white hover:bg-[#6b3b68] transition-colors"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
