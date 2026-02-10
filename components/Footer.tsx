"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

const partners = [
    "Ohio codespace",
    "A&G Tech",
    "Ghosty Labs Technology",
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
                            <Image
                                src="/assets/logo1.png"
                                alt="Campwork Logo"
                                width={144}
                                height={2}
                                className="h-32 w-auto object-contain"
                                priority
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                            The premier marketplace for university students to find gigs, build portfolios, and earn while they learn.
                        </p>
                        <div className="flex items-center gap-4">
                            {/* X (formerly Twitter) */}
                            <a
                                href="https://x.com/campworkapp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 transition-colors hover:text-black dark:hover:text-white"
                                aria-label="X (Twitter)"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
                                </svg>
                            </a>
                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/share/14XE1SvNqDt/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 transition-colors hover:text-[#1877F2]"
                                aria-label="Facebook"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/campwork.official?igsh=NDV0bnd2YnppeTRy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 transition-colors hover:text-[#E4405F]"
                                aria-label="Instagram"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.359-2.614-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                </svg>
                            </a>
                            {/* Discord */}
                            <a
                                href="https://discord.gg/mXBWRxKY"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 transition-colors hover:text-[#5865F2]"
                                aria-label="Discord"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 0-1.872-.892.077.077 0 0 0-.088.013 10.213 10.213 0 0 1-.375.292.074.074 0 0 0-.015.123 16.699 16.699 0 0 0 12.09 0 .074.074 0 0 0-.015-.123 7.664 7.664 0 0 1-.375-.292.077.077 0 0 0-.088-.013 12.89 12.89 0 0 0-1.872.892.076.076 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.054-3.03.08.08 0 0 0 .031-.057c.49-5.173-.851-9.66-3.722-13.66a.062.062 0 0 0-.031-.028zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z" />
                                </svg>
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
                        <a
                            href="mailto:contact.campwork@gmail.com?body=I%20want%20to%20support%20the%20development"
                            className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-primary"
                        >
                            <Mail className="h-4 w-4" />
                            contact.campwork@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

