"use client";

import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// ── Countdown ────────────────────────────────────────────────────────────────
const LAUNCH_DATE = new Date("2026-03-25T00:00:00Z");

function useCountdown() {
  const calc = () => {
    const diff = LAUNCH_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ── Flip digit ───────────────────────────────────────────────────────────────
const Digit = memo(function Digit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
        {/* card */}
        <div
          className="w-full h-full rounded-2xl flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={display}
              initial={{ y: -20, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: 20, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
            >
              {display}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* centre divider line */}
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-px h-px"
          style={{ background: "rgba(0,0,0,0.25)" }}
        />
      </div>
      <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-zinc-500">
        {label}
      </span>
    </div>
  );
});

function TimerDisplay({ fadeUp }: { fadeUp: (delay: number) => any }) {
  const countdown = useCountdown();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="mb-16 h-[120px]" />; // Placeholder to prevent layout shift

  return (
    <motion.div {...fadeUp(0.65)} className="mb-16 flex gap-4 sm:gap-6">
      <Digit value={countdown.days} label="Days" />
      <Digit value={countdown.hours} label="Hours" />
      <Digit value={countdown.minutes} label="Minutes" />
      <Digit value={countdown.seconds} label="Seconds" />
    </motion.div>
  );
}


// ── Orb ─────────────────────────────────────────────────────────────────────
function Orb({
  cx, cy, size, color, duration,
}: { cx: string; cy: string; size: string; color: string; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: cx,
        top: cy,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        transform: "translate(-50%,-50%)",
        willChange: "transform, opacity"
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── Social icon ──────────────────────────────────────────────────────────────
function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative p-3 rounded-xl transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(163,19,58,0.15)", border: "1px solid rgba(163,19,58,0.3)" }}
      />
      <span className="relative z-10 block h-5 w-5 text-zinc-400 group-hover:text-white transition-colors duration-300">
        {children}
      </span>
    </Link>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [notified, setNotified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!marketingConsent || !privacyConsent) {
      alert("Please agree to the privacy policy and marketing messages to proceed.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotified(true);
      setEmail("");
    }, 1600);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: "easeOut" },
  } as const);

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden flex flex-col ${inter.className}`}
      style={{ background: "#080810" }}
    >

      {/* ── Noise overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Ambient orbs ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <Orb cx="15%" cy="25%" size="600px" color="rgba(163,19,58,0.35)" duration={8} />
        <Orb cx="85%" cy="70%" size="500px" color="rgba(90,10,35,0.25)" duration={11} />
        <Orb cx="55%" cy="10%" size="400px" color="rgba(163,19,58,0.12)" duration={14} />
        <Orb cx="5%" cy="85%" size="300px" color="rgba(163,19,58,0.10)" duration={9} />
        {/* fine grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Top bar ── */}
      <motion.header
        {...fadeUp(0.1)}
        className="relative z-10 flex items-center justify-center px-6 md:px-12 pt-8"
      >
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/assets/logo1.png" alt="Campwork" className="h-9 w-auto object-contain" />
        </Link>

      </motion.header>

      {/* ── Main content ── */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 sm:px-12 py-20 text-center">

        {/* eyebrow */}
        <motion.div {...fadeUp(0.25)} className="mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase"
            style={{
              background: "rgba(163,19,58,0.12)",
              border: "1px solid rgba(163,19,58,0.3)",
              color: "#e8617c",
            }}
          >
            <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            Student Freelance Marketplace
          </span>
        </motion.div>

        {/* headline */}
        <motion.h1
          {...fadeUp(0.4)}
          className="mb-6 max-w-5xl text-5xl font-[900] leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
          style={{ color: "rgba(255,255,255,0.92)" }}
        >
          Something{" "}
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(135deg, #ff6b8a 0%, #A3133A 50%, #6b0020 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Extraordinary
          </span>
          <br />
          <span style={{ color: "rgba(255,255,255,0.55)" }}>is Coming.</span>
        </motion.h1>

        {/* subheading */}
        <motion.p
          {...fadeUp(0.55)}
          className="mb-14 max-w-xl text-base sm:text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          We&apos;re crafting the ultimate marketplace where campus talent meets real opportunity.{" "}
          Earn, hire, and collaborate — all within your university community.
        </motion.p>

        {/* ── Countdown ── */}
        <TimerDisplay fadeUp={fadeUp} />

        {/* ── Email capture ── */}
        <motion.div {...fadeUp(0.8)} className="w-full max-w-md mb-20">
          <AnimatePresence mode="wait">
            {!notified ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleNotify}
                className="relative flex items-center"
              >
                <div className="relative flex flex-col w-full gap-4">
                  <div className="relative flex items-center">
                    <input
                      id="notify-email"
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-full py-4 pl-6 pr-36 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(16px)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(163,19,58,0.6)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="absolute right-1.5 top-1.5 bottom-1.5 rounded-full px-6 text-sm font-bold text-white transition-all duration-200 disabled:opacity-60 flex items-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, #c4153d 0%, #8a0e28 100%)",
                        boxShadow: "0 4px 24px rgba(163,19,58,0.4)",
                      }}
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Notify Me"}
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 px-2">
                    {/* Marketing Consent */}
                    <div className="flex items-start gap-3">
                      <div className="flex bg-white/5 border border-white/10 rounded-md p-0.5 mt-0.5">
                        <input
                          id="marketing-consent"
                          type="checkbox"
                          required
                          checked={marketingConsent}
                          onChange={(e) => setMarketingConsent(e.target.checked)}
                          className="w-3.5 h-3.5 cursor-pointer accent-[#A3133A] opacity-70 hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <div
                        className="text-[10px] sm:text-xs text-left leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        <label htmlFor="marketing-consent" className="cursor-pointer select-none">
                          I agree to receive marketing messages, updates, and news about Campwork.
                        </label>
                      </div>
                    </div>

                    {/* Privacy Policy Consent */}
                    <div className="flex items-start gap-3">
                      <div className="flex bg-white/5 border border-white/10 rounded-md p-0.5 mt-0.5">
                        <input
                          id="privacy-consent"
                          type="checkbox"
                          required
                          checked={privacyConsent}
                          onChange={(e) => setPrivacyConsent(e.target.checked)}
                          className="w-3.5 h-3.5 cursor-pointer accent-[#A3133A] opacity-70 hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <div
                        className="text-[10px] sm:text-xs text-left leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        <label htmlFor="privacy-consent" className="cursor-pointer select-none">
                          I have read and agree to the
                        </label>{" "}
                        <Link href="/privacy" className="underline hover:text-white transition-colors">Privacy Policy</Link>.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-full py-4 px-8 text-sm font-medium"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  color: "#4ade80",
                }}
              >
                🚀 You&apos;re on the list! We&apos;ll notify you at launch.
              </motion.div>
            )}
          </AnimatePresence>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-3 text-xs"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >

          </motion.p>
        </motion.div>

        {/* ── Feature pills ── */}
        <motion.div {...fadeUp(0.95)} className="flex flex-wrap gap-3 justify-center mb-16">
          {["Earn on Campus", "Hire Student Talent", "Real Gigs · Real Pay", "University Only"].map((f) => (
            <span
              key={f}
              className="px-4 py-2 rounded-full text-xs font-medium tracking-wide"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {f}
            </span>
          ))}
        </motion.div>

        {/* ── Partners ── */}
        <motion.div {...fadeUp(1.0)} className="mb-12 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-12 sm:gap-20 items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
            <Link
              href="https://ag-tech.web.app"
              target="_blank"
              className="group"
            >
              <img
                src="/assets/images/agLogo.png"
                alt="A&G Tech"
                className="h-22 sm:h-22 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </Link>
            <Link
              href="https://ohiocodespace.vercel.app"
              target="_blank"
              className="group"
            >
              <img
                src="/assets/images/ohio.png"
                alt="Ohio Codespace"
                className="h-20 sm:h-20 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </Link>
          </div>
        </motion.div>

        {/* ── Social links ── */}
        <motion.div {...fadeUp(1.1)} className="flex gap-3">
          {/* X / Twitter */}
          <SocialLink href="https://x.com/campworkapp" label="X (Twitter)">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
            </svg>
          </SocialLink>
          {/* Instagram */}
          <SocialLink href="https://www.instagram.com/campwork.official" label="Instagram">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.359-2.614-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </SocialLink>
          {/* Facebook */}
          <SocialLink href="https://www.facebook.com/share/14XE1SvNqDt/" label="Facebook">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </SocialLink>
        </motion.div>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="relative z-10 py-10 px-6 sm:px-12 text-left sm:text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="flex flex-col items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-zinc-600">
            <Link href="/about" className="hover:text-[#A3133A] transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-[#A3133A] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#A3133A] transition-colors">Terms</Link>
          </div>
          <p className="text-[10px] text-zinc-500 tracking-wider">
            © {new Date().getFullYear()} CAMPWORK. ALL RIGHTS RESERVED.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
