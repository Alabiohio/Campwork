"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const partners = [
    "Ohio codespace",
    "Ghosty Labs Technology",
    "A&G Tech",
    "ENG240 devs"
];

export function Footer() {
    return (
        <footer className="border-t border-zinc-100 bg-white pt-24 pb-12 dark:border-zinc-900 dark:bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                    {/* Logo and Brand */}
                    <div className="flex flex-col gap-6 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-black dark:text-white">
                            <img src="/assets/logo1.png" alt="Campwork Logo" className="h-14 w-auto object-contain" />
                        </Link>
                        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                            The premier marketplace for university students to find gigs, build portfolios, and earn while they learn.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-zinc-400 transition-colors hover:text-primary">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-zinc-400 transition-colors hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-zinc-400 transition-colors hover:text-primary">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Platform</h4>
                        <ul className="flex flex-col gap-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            <li><Link href="/jobs" className="transition-colors hover:text-primary">Browse Jobs</Link></li>
                            <li><Link href="/jobs/create" className="transition-colors hover:text-primary">Post a Gig</Link></li>
                            <li><Link href="/auth/signup" className="transition-colors hover:text-primary">Join as Student</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Company</h4>
                        <ul className="flex flex-col gap-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            <li><Link href="/about" className="transition-colors hover:text-primary">About Us</Link></li>
                            <li><Link href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="transition-colors hover:text-primary">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Partners */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Partners</h4>
                        <ul className="flex flex-col gap-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            {partners.map((partner) => (
                                <li key={partner} className="transition-colors hover:text-primary">
                                    {partner}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-20 flex flex-col items-center justify-between border-t border-zinc-100 pt-12 dark:border-zinc-900 sm:flex-row">
                    <p className="text-sm font-medium text-zinc-500">
                        © 2026 Campwork.
                    </p>
                    <div className="mt-4 flex items-center gap-6 sm:mt-0">
                        <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-500">
                            <Mail className="h-4 w-4" />
                            hello@campwork.store
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
