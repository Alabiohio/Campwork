"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

// Simple component for visual flair
const Particle = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: [0, 1, 0], y: -100 }}
    transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut" }}
    className="absolute h-2 w-2 rounded-full bg-primary/30 blur-sm"
    style={{ left: `${Math.random() * 100}%` }}
  />
);

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
          <Particle key={i} delay={i * 0.2} />
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
          <Link href="#" className="p-3 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" className="p-3 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="#" className="p-3 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
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
