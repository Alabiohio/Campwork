"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    GraduationCap,
    Briefcase,
    Calendar,
    Settings,
    LogOut,
    Loader2,
    PlusCircle,
    ChevronRight,
    MapPin,
    PenSquare,
    CheckCircle2,
    Clock
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import type { Profile, Job, Proposal } from "@/types";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [userJobs, setUserJobs] = useState<Job[]>([]);
    const [userProposals, setUserProposals] = useState<(Proposal & { jobs: Job })[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'activity'>('overview');

    useEffect(() => {
        async function fetchProfileData() {
            try {
                setLoading(true);
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    router.push("/auth/login");
                    return;
                }

                // Fetch Profile
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profileError) throw profileError;
                setProfile(profileData);

                // If Client, fetch their jobs
                if (profileData.role === 'client') {
                    const { data: jobsData } = await supabase
                        .from('jobs')
                        .select('*')
                        .eq('client_id', user.id)
                        .order('created_at', { ascending: false });
                    setUserJobs(jobsData || []);
                }

                // If Student, fetch their proposals
                if (profileData.role === 'student') {
                    const { data: proposalsData } = await supabase
                        .from('proposals')
                        .select('*, jobs(*)')
                        .eq('freelancer_id', user.id)
                        .order('created_at', { ascending: false });
                    setUserProposals(proposalsData as any || []);
                }

            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfileData();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
                <Navbar />
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-4 text-zinc-500 font-medium">Loading your profile...</p>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <Navbar />

            <main className="mx-auto max-w-5xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8">

                    {/* Profile Header Card */}
                    <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950">
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 -z-10 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-primary/10 blur-3xl" />

                        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                            <div className="relative">
                                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                                    <User className="h-12 w-12" />
                                </div>
                                <button className="absolute -bottom-2 -right-2 rounded-xl bg-white p-2 shadow-lg dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:text-primary transition-colors">
                                    <PenSquare className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex flex-1 flex-col gap-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                        {profile.full_name}
                                    </h1>
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                                        {profile.role}
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                                    <span className="flex items-center gap-1.5">
                                        <GraduationCap className="h-4 w-4 text-primary" />
                                        {profile.university}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-4 w-4" />
                                        Joined {new Date(profile.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="flex w-full flex-col gap-3 md:w-auto">
                                <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/10">
                                    <Settings className="h-4 w-4" />
                                    Account Settings
                                </button>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-6 py-2.5 text-sm font-bold text-zinc-600 hover:bg-red-50 hover:text-red-600 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-red-900/20 transition-all"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Tabs */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-8 border-b border-zinc-200 dark:border-zinc-800">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'overview' ? 'text-primary' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                Overview
                                {activeTab === 'overview' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                            </button>
                            <button
                                onClick={() => setActiveTab('activity')}
                                className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'activity' ? 'text-primary' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                {profile.role === 'client' ? 'My Posted Gigs' : 'My Applications'}
                                {activeTab === 'activity' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === 'overview' ? (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="grid gap-6 md:grid-cols-3"
                                >
                                    {/* About section */}
                                    <div className="md:col-span-2 flex flex-col gap-6">
                                        <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                                            <h3 className="mb-4 text-lg font-bold">About You</h3>
                                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                {profile.bio || "No biography provided. Tell the community about yourself to get more trust and better results!"}
                                            </p>
                                        </div>

                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                                                <h3 className="mb-4 text-lg font-bold">University</h3>
                                                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                                                    <GraduationCap className="h-5 w-5 text-primary" />
                                                    <span className="font-medium">{profile.university}</span>
                                                </div>
                                            </div>
                                            <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                                                <h3 className="mb-4 text-lg font-bold">Contact Email</h3>
                                                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                                                    <Mail className="h-5 w-5 text-primary" />
                                                    <span className="font-medium underline">Verify in Auth Settings</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats sidebar */}
                                    <div className="flex flex-col gap-6">
                                        <div className="rounded-3xl border border-zinc-200 bg-primary p-6 text-white shadow-xl shadow-primary/20">
                                            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider opacity-80">Quick Stats</h3>
                                            <div className="flex flex-col gap-6">
                                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                                    <span className="text-sm">Rating</span>
                                                    <div className="flex items-center gap-1 font-bold">
                                                        <span>5.0</span>
                                                        <CheckCircle2 className="h-4 w-4" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                                    <span className="text-sm">Response Time</span>
                                                    <span className="font-bold">Fast</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">Trust Level</span>
                                                    <span className="font-bold">Member</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="activity"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col gap-6"
                                >
                                    {profile.role === 'client' ? (
                                        <>
                                            {userJobs.length === 0 ? (
                                                <div className="rounded-3xl border border-dashed border-zinc-200 py-12 text-center dark:border-zinc-800">
                                                    <Briefcase className="mx-auto h-12 w-12 text-zinc-300 mb-4" />
                                                    <p className="text-zinc-500 font-medium">You haven't posted any gigs yet.</p>
                                                    <Link href="/jobs/create" className="mt-4 inline-flex items-center gap-2 font-bold text-primary">
                                                        Post your first gig <PlusCircle className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            ) : (
                                                userJobs.map((job) => (
                                                    <Link key={job.id} href={`/jobs/${job.id}`}>
                                                        <div className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl shadow-black/5 hover:border-primary transition-all dark:border-zinc-800 dark:bg-zinc-950">
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex flex-col gap-2">
                                                                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{job.title}</h4>
                                                                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                                                                        <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {new Date(job.created_at).toLocaleDateString()}</span>
                                                                        <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {job.location || 'Remote'}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col items-end gap-2">
                                                                    <span className="text-lg font-bold text-primary">${job.budget}</span>
                                                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${job.status === 'open' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-primary/10 text-primary'
                                                                        }`}>
                                                                        {job.status}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {userProposals.length === 0 ? (
                                                <div className="rounded-3xl border border-dashed border-zinc-200 py-12 text-center dark:border-zinc-800">
                                                    <Briefcase className="mx-auto h-12 w-12 text-zinc-300 mb-4" />
                                                    <p className="text-zinc-500 font-medium">You haven't submitted any proposals yet.</p>
                                                    <Link href="/jobs" className="mt-4 inline-flex items-center gap-2 font-bold text-primary">
                                                        Find a gig <PlusCircle className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            ) : (
                                                userProposals.map((proposal) => (
                                                    <Link key={proposal.id} href={`/jobs/${proposal.job_id}`}>
                                                        <div className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl shadow-black/5 hover:border-primary transition-all dark:border-zinc-800 dark:bg-zinc-950">
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex flex-col gap-2">
                                                                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{proposal.jobs?.title}</h4>
                                                                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                                                                        <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> Applied on {new Date(proposal.created_at).toLocaleDateString()}</span>
                                                                        <span className="flex items-center gap-1.5"><Briefcase className="h-3 w-3" /> {proposal.jobs?.category}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col items-end gap-2">
                                                                    <span className="text-lg font-bold text-primary">${proposal.bid_amount}</span>
                                                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${proposal.status === 'accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                                                                            proposal.status === 'pending' ? 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800' : 'bg-red-50 text-red-600'
                                                                        }`}>
                                                                        {proposal.status}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))
                                            )}
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
