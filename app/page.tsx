"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import Link from "next/link";

// Simple component for visual flair
const Particle = ({ delay, index }: { delay: number; index: number }) => {
  // deterministic pseudo-random position based on index to avoid SSR/client mismatch
  const left = `${((index * 37.13) % 100).toFixed(6)}%`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: [0, 1, 0], y: -100 }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut" }}
      className="absolute h-2 w-2 rounded-full bg-primary/30 blur-sm"
      style={{ left }}
    />
  );
};

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setNotified(true);
      setEmail("");
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-zinc-950" />
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.2} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center"
      >
        {/* Logo or Brand Name */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/logo1.png"
              alt="Campwork"
              className="h-12 w-auto object-contain"
            />
          </Link>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-6 max-w-4xl text-5xl font-[900] tracking-tight sm:text-7xl lg:text-8xl bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent"
        >
          Something <span className="text-primary">Extraordinary</span> is Coming.
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12 max-w-2xl text-lg text-zinc-400 sm:text-xl leading-relaxed"
        >
          We are crafting the ultimate marketplace for student talent.
          Get ready to earn, hire, and collaborate like never before.
          <br className="hidden sm:block" />
          The future of campus work arrives soon.
        </motion.p>

        {/* Notify Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-md"
        >
          {!notified ? (
            <form onSubmit={handleNotify} className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="Enter your university email"
                className="w-full rounded-full border border-zinc-800 bg-white/5 px-6 py-4 text-white placeholder:text-zinc-500 backdrop-blur-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 rounded-full bg-primary px-6 font-bold text-white hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Notify Me"}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-full bg-green-500/10 border border-green-500/20 px-8 py-4 text-green-400 font-medium backdrop-blur-md"
            >
              Thanks! You'll be the first to know when we launch. 🚀
            </motion.div>
          )}
        </motion.div>

        {/* Socials / Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 flex gap-8 items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
        >
          {/* Replace/Add links as needed */}
          <Link href="https://x.com/campworkapp" className="p-3 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors" aria-label="X (Twitter)">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
            </svg>
          </Link>
          <Link href="https://www.instagram.com/campwork.official" className="p-3 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors" aria-label="Instagram">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.359-2.614-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </Link>
          <Link href="https://www.facebook.com/share/14XE1SvNqDt/" className="p-3 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors" aria-label="Facebook">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-sm text-zinc-600"
        >
          © {new Date().getFullYear()} Campwork. All rights reserved.
        </motion.div>
      </motion.div>
    </div>
  );
}
