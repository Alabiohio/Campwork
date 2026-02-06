"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, User, MessageSquare, PlusCircle, LogOut, LogIn } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import { NotificationBell } from "./NotificationBell";

export function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    return (
        <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md dark:bg-black/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2 sm:px-2 lg:px-2">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/assets/logo1.png" alt="Campwork Logo" className="h-8 w-auto object-contain" />
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/jobs" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                            Find Jobs
                        </Link>
                        {user && (
                            <Link href="/messages" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                                Messages
                            </Link>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {!loading && (
                        <>
                            {user ? (
                                <>
                                    <Link
                                        href="/jobs/create"
                                        className="hidden sm:flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/10"
                                    >
                                        <PlusCircle className="h-4 w-4" />
                                        <span>Post a Job</span>
                                    </Link>
                                    <NotificationBell />
                                    <Link href="/profile" className="rounded-full border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 transition-colors">
                                        <User className="h-5 w-5" />
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="rounded-full border border-zinc-200 p-2 text-zinc-600 hover:bg-red-50 hover:text-red-600 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href="/auth/login"
                                        className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors px-4"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
