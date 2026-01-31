"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, SlidersHorizontal, Loader2, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { JobCard } from "@/components/JobCard";
import { supabase } from "@/lib/supabase";
import type { Job } from "@/types";
import Link from "next/link";
import { Footer } from "@/components/Footer";

const CATEGORIES = ["All", "Development", "Design", "Marketing", "Education", "Events"];

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);

    async function fetchJobs() {
        try {
            setLoading(true);
            let query = supabase
                .from('jobs')
                .select('*')
                .order('created_at', { ascending: false });

            if (selectedCategory !== "All") {
                query = query.eq('category', selectedCategory);
            }

            if (searchQuery) {
                query = query.ilike('title', `%${searchQuery}%`);
            }

            const { data, error } = await query;

            if (error) throw error;
            setJobs(data || []);
        } catch (err: any) {
            console.error("Error fetching jobs:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, [selectedCategory]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchJobs();
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <Navbar />

            <main className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-12">

                    {/* Header Section */}
                    <div className="flex flex-col gap-4">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
                        >
                            Find your next <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">campus gig.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
                        >
                            Browse freelance opportunities posted by fellow students. Apply in minutes and get paid securely.
                        </motion.p>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="sticky top-20 z-40 -mx-4 px-4 py-4 bg-zinc-50/80 backdrop-blur-sm dark:bg-black/80">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <form onSubmit={handleSearch} className="relative flex-1">
                                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for jobs (e.g. 'design', 'tutor')..."
                                    className="w-full rounded-full border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm outline-none ring-primary/20 transition-all focus:border-primary focus:ring-4 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-primary/10"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => { setSearchQuery(""); fetchJobs(); }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </form>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                                        className={`flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition-colors ${selectedCategory !== "All"
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
                                            }`}
                                    >
                                        <Filter className="h-4 w-4" />
                                        {selectedCategory === "All" ? "Categories" : selectedCategory}
                                    </button>

                                    <AnimatePresence>
                                        {showCategoryMenu && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() => setShowCategoryMenu(false)}
                                                />
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900 z-50"
                                                >
                                                    {CATEGORIES.map((cat) => (
                                                        <button
                                                            key={cat}
                                                            onClick={() => {
                                                                setSelectedCategory(cat);
                                                                setShowCategoryMenu(false);
                                                            }}
                                                            className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 ${selectedCategory === cat ? "text-primary" : "text-zinc-600 dark:text-zinc-400"
                                                                }`}
                                                        >
                                                            {cat}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <button className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                    <SlidersHorizontal className="h-4 w-4" />
                                    More Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Jobs Listing */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-zinc-500 font-medium">Loading campus gigs...</p>
                        </div>
                    ) : error ? (
                        <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-center dark:border-red-900/30 dark:bg-red-950/20">
                            <p className="text-red-600 dark:text-red-400 font-medium">Failed to load jobs: {error}</p>
                            <button
                                onClick={() => fetchJobs()}
                                className="mt-4 text-sm font-bold text-red-700 underline dark:text-red-300"
                            >
                                Try again
                            </button>
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-zinc-200 py-24 text-center dark:border-zinc-800">
                            <p className="text-zinc-500 font-medium">No jobs found. Be the first to post one!</p>
                            <Link
                                href="/jobs/create"
                                className="mt-4 inline-flex items-center gap-2 font-bold text-primary"
                            >
                                Post a Job <SlidersHorizontal className="h-4 w-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                            {jobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link href={`/jobs/${job.id}`}>
                                        <JobCard job={job} />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                </div>
            </main>
            <Footer />
        </div>
    );
}
