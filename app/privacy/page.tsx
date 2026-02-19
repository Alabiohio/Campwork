"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Mail, Server, Smartphone, Globe } from "lucide-react";

export default function PrivacyPage() {
    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay, ease: "easeOut" },
    } as const);

    const sections = [
        {
            icon: Eye,
            title: "1. Information We Collect",
            content: "We collect information you provide directly to us when you create an account, fill out a form, or communicate with us. This includes your name, email address, account credentials, and any professional data provided for your freelancer or client profile."
        },
        {
            icon: Mail,
            title: "2. Marketing Communications",
            content: "As per our strict compliance global anti-spam regulations, we only send marketing messages to users who have explicitly opted in via our 'unmarked by default' checkboxes. You can withdraw your consent at any time via the 'Unsubscribe' link in our emails."
        },
        {
            icon: Lock,
            title: "3. How We Protect Your Data",
            content: "We use top-tier encryption and security protocols (including SSL/TLS) to safeguard your personal information. Your data is stored securely on protected servers with restricted access to authorized personnel only."
        },
        {
            icon: Server,
            title: "4. Data Sharing & Third Parties",
            content: "We do not sell your personal data. We only share information with trusted service providers necessary for our operations. These partners are contractually obligated to protect your data."
        },
        {
            icon: Smartphone,
            title: "5. Mobile & Device Data",
            content: "We may collect technical data about the device you use to access Campwork, including IP addresses, browser types, and operating systems, to improve user experience and maintain platform security."
        },
        {
            icon: Globe,
            title: "6. Your Global Rights",
            content: "Regardless of your location, we provide you with the right to access, correct, or delete your personal data. You may also object to processing or request data portability through our support channels."
        }
    ];

    return (
        <div className="min-h-screen bg-[#080810] text-zinc-300 font-sans selection:bg-[#A3133A]/30 overflow-x-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#A3133A]/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#610a20]/15 blur-[150px] rounded-full" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
                />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-24 relative z-10">
                {/* Header */}
                <motion.div {...fadeUp(0.1)} className="mb-20">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-all group mb-12 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>

                    <div className="flex flex-col gap-6">
                        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-tight">
                            Privacy <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b8a] to-[#A3133A]">Policy.</span>
                        </h1>
                        <p className="text-zinc-500 text-lg font-medium">Last updated: February 19, 2026</p>
                    </div>
                </motion.div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 gap-8 mb-24">
                    {sections.map((section, i) => (
                        <motion.section
                            key={section.title}
                            {...fadeUp(0.2 + i * 0.1)}
                            className="group p-8 rounded-[32px] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500"
                        >
                            <div className="flex items-start gap-6">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-[#A3133A]/20 group-hover:border-[#A3133A]/30 transition-all duration-500">
                                    <section.icon className="h-6 w-6 text-[#A3133A]" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-white mb-4 group-hover:text-[#ff6b8a] transition-colors">{section.title}</h2>
                                    <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    {...fadeUp(0.8)}
                    className="relative p-12 rounded-[40px] overflow-hidden bg-white/[0.02] border border-white/[0.05] text-center"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#A3133A]/10 blur-[100px] pointer-events-none" />
                    <h2 className="text-2xl font-bold text-white mb-6">Need more clarity?</h2>
                    <p className="text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed">
                        Our legal team is committed to transparency. If you have any specific concerns about your data residency or processing, reach out.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="mailto:contact.campwork@gmail.com"
                            className="px-10 py-4 rounded-full bg-white text-black font-extrabold hover:bg-zinc-200 transition-all hover:scale-105"
                        >
                            Email Privacy Team
                        </a>
                        <Link
                            href="/terms"
                            className="px-10 py-4 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
                        >
                            View Terms
                        </Link>
                    </div>
                </motion.div>

                <footer className="mt-24 pt-8 border-t border-white/5 text-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600">
                        © 2026 CAMPWORK. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
}
