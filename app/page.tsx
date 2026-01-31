"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, GraduationCap, ShieldCheck, User as UserIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[60%] w-[50%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-2 sm:px-2 lg:px-2 bg-white/80 backdrop-blur-md dark:bg-black/80 dark:border-zinc-800 sm:px-16">
        <div className="flex items-center gap-2 text-2xl font-black tracking-tighter">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
            C
          </div>
          <span className="text-zinc-900 dark:text-white">Campwork</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/jobs" className="hidden sm:block rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-xl shadow-primary/10">
            Explore Jobs
          </Link>
          {!loading && (
            <>
              {user ? (
                <Link href="/profile" className="flex items-center gap-2 rounded-full border border-zinc-200 p-1 pr-3 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 transition-colors">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {user.user_metadata?.full_name?.split(' ')[0] || 'Profile'}
                  </span>
                </Link>
              ) : (
                <Link href="/auth/login" className="text-sm font-semibold hover:text-primary transition-colors">Login</Link>
              )}
            </>
          )}
        </div>
      </nav>

      <main className="flex flex-1 flex-col items-center justify-center px-8 text-center sm:px-16 lg:pt-32 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="mb-6 inline-block rounded-full bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary">
            Exclusively for University Students 🎓
          </span>
          <h1 className="mb-8 text-6xl font-[900] leading-[1.1] tracking-tight text-zinc-900 dark:text-white sm:text-8xl">
            The marketplace for <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">student talent.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
            Hire fellow students for your next project, or earn money using your skills. Secure payments, verified profiles, and a community that gets it.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/jobs"
              className="group flex h-16 items-center justify-center gap-2 rounded-2xl bg-primary px-10 text-lg font-bold text-white hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20"
            >
              Start Earning
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/jobs/create"
              className="flex h-16 items-center justify-center gap-2 rounded-2xl border-2 border-zinc-200 px-10 text-lg font-bold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900 transition-all"
            >
              Post a Gig
            </Link>
          </div>
        </motion.div>

        {/* Features row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-32 grid w-full max-w-5xl gap-8 md:grid-cols-3"
        >
          <div className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold">Verified Students</h3>
            <p className="text-zinc-500">Only students from accredited universities can join the marketplace.</p>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Briefcase className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold">Safe Payments</h3>
            <p className="text-zinc-500">Payments are held in escrow until the work is completed and approved.</p>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold">Campus Focus</h3>
            <p className="text-zinc-500">Build your portfolio while helping fellow students grow their ideas.</p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
