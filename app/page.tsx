"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, GraduationCap, ShieldCheck, User as UserIcon, Moon, Sun, Monitor } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Footer } from "@/components/Footer";
import { useTheme } from "next-themes";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getThemeIcon = () => {
    if (!mounted) return <Monitor className="h-5 w-5" />;
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[60%] w-[50%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-6 transition-all duration-300 sm:px-16 ${scrolled
        ? "bg-white/80 backdrop-blur-md dark:bg-black/80 h-16"
        : "bg-transparent h-20"
        }`}>
        <div className="flex items-center gap-2 text-2xl font-black tracking-tighter">
          <Link href="/" className="flex items-center gap-2">
            <img src="/assets/logo1.png" alt="Campwork Logo" className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'}`} />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          {mounted && (
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className={`p-2 rounded-full transition-all duration-300 ${scrolled
                  ? "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  : "bg-white/10 lg:bg-transparent text-white lg:text-zinc-700 lg:dark:text-zinc-300 hover:bg-white/20 lg:hover:bg-zinc-100/50"
                  }`}
              >
                {getThemeIcon()}
              </button>

              {themeMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setThemeMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-40 rounded-xl shadow-lg overflow-hidden z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <button
                      onClick={() => {
                        setTheme("light");
                        setThemeMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${theme === "light"
                        ? "bg-primary/10 text-primary font-semibold"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        }`}
                    >
                      <Sun className="h-4 w-4" />
                      Light
                    </button>
                    <button
                      onClick={() => {
                        setTheme("dark");
                        setThemeMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${theme === "dark"
                        ? "bg-primary/10 text-primary font-semibold"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        }`}
                    >
                      <Moon className="h-4 w-4" />
                      Dark
                    </button>
                    <button
                      onClick={() => {
                        setTheme("system");
                        setThemeMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${theme === "system"
                        ? "bg-primary/10 text-primary font-semibold"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        }`}
                    >
                      <Monitor className="h-4 w-4" />
                      System
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          <Link href="/jobs" className={`hidden sm:block rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-xl shadow-primary/10 ${!scrolled && 'lg:bg-white lg:text-primary lg:hover:bg-zinc-100'}`}>
            Explore Jobs
          </Link>
          {!loading && (
            <>
              {user ? (
                <Link href="/profile" className={`flex items-center gap-2 rounded-full border p-1 pr-3 transition-colors ${scrolled
                  ? "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  : "border-white/30 hover:bg-white/10 text-white lg:border-zinc-200 lg:text-zinc-700 lg:hover:bg-zinc-50 lg:dark:text-zinc-300"
                  }`}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold">
                    {user.user_metadata?.full_name?.split(' ')[0] || 'Profile'}
                  </span>
                </Link>
              ) : (
                <Link href="/auth/login" className={`text-sm font-semibold transition-colors ${scrolled ? 'text-zinc-700 hover:text-primary' : 'text-white lg:text-zinc-700 lg:hover:text-primary dark:text-white'}`}>Login</Link>
              )}
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center lg:pt-20 pt-24 pb-20 overflow-hidden">
        {/* Background Image Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 lg:left-1/2"
        >
          <div className="absolute inset-0 overflow-hidden lg:rotate-10 lg:scale-105">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=1600&fit=crop&q=80"
              alt="Students collaborating"
              className="w-full h-full object-cover lg:[mask-image:linear-gradient(to_right,transparent,black_20%)]"
            />
            {/* Mobile Overlay: Darkens the image to make text readable */}
            <div className="absolute inset-0 bg-black/60 lg:hidden" />
          </div>
        </motion.div>

        <div className="relative w-full max-w-7xl mx-auto px-8 sm:px-16 z-10">
          <div className="grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <span className="mb-6 inline-block rounded-full bg-primary/10 lg:bg-primary/5 px-4 py-1.5 text-sm font-bold text-white lg:text-primary">
                Exclusively for University Students 🎓
              </span>
              <h1 className="mb-8 text-5xl font-[900] leading-[1.1] tracking-tight text-white lg:text-zinc-900 lg:dark:text-white lg:text-7xl">
                The marketplace for <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">student talent.</span>
              </h1>
              <p className="mb-10 text-lg font-medium leading-relaxed text-zinc-100 lg:text-zinc-600 lg:dark:text-zinc-400 lg:text-xl max-w-xl">
                Hire fellow students for your next project, or earn money using your skills. Secure payments, verified profiles, and a community that gets it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/jobs"
                  className="group flex h-16 items-center justify-center gap-2 rounded-2xl bg-primary px-10 text-lg font-bold text-white hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20"
                >
                  Start Earning
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/jobs/create"
                  className="flex h-16 items-center justify-center gap-2 rounded-2xl border-2 border-white/30 lg:border-zinc-200 px-10 text-lg font-bold text-white lg:text-zinc-900 hover:bg-white/10 lg:dark:border-zinc-800 lg:dark:text-white lg:hover:bg-zinc-50 lg:dark:hover:bg-zinc-900 transition-all"
                >
                  Post a Gig
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-8 sm:px-16 py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-[900] tracking-tight text-zinc-900 dark:text-white mb-4">
              Why Choose Campwork?
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Built by students, for students. Everything you need to succeed in one place.
            </p>
          </div>

          <div className="grid w-full gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center gap-4 p-8 text-center bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-shadow">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">Verified Students</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Only students from accredited universities can join the marketplace.</p>
            </div>
            <div className="flex flex-col items-center gap-4 p-8 text-center bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-shadow">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">Safe Payments</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Payments are held in escrow until the work is completed and approved.</p>
            </div>
            <div className="flex flex-col items-center gap-4 p-8 text-center bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-shadow">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">Campus Focus</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Build your portfolio while helping fellow students grow their ideas.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="w-full px-8 sm:px-16 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-[900] tracking-tight text-zinc-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Getting started is simple. Here's how to begin your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* For Students Looking to Earn */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Sign up with your university email and showcase your skills and experience.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Browse & Apply</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Find gigs that match your skills and submit proposals to clients.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Get Paid</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Complete the work, get approved, and receive secure payment.</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=800&fit=crop&q=80"
                  alt="Student working on laptop"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* For Clients */}
          <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
            {/* Image */}
            <div className="relative order-2 md:order-1">
              <div className="overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=800&fit=crop&q=80"
                  alt="Team collaboration"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="space-y-8 order-1 md:order-2">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Post Your Gig</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Describe your project and set your budget in minutes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Review Proposals</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Get proposals from talented students and choose the best fit.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Collaborate & Approve</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Work together and approve the final deliverable.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="w-full px-8 sm:px-16 py-24 bg-primary text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >

        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-8 sm:px-16 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-[900] tracking-tight text-zinc-900 dark:text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Join thousands of students already earning and hiring on Campwork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="group flex h-16 items-center justify-center gap-2 rounded-2xl bg-primary px-10 text-lg font-bold text-white hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20"
            >
              Sign Up Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/jobs"
              className="flex h-16 items-center justify-center gap-2 rounded-2xl border-2 border-zinc-200 px-10 text-lg font-bold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900 transition-all"
            >
              Explore Jobs
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
