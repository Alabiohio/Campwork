"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: "easeOut" },
    } as const);

    return (
        <div className="min-h-screen bg-[#080810] text-zinc-300 font-sans selection:bg-[#A3133A]/30">
            <div className="max-w-3xl mx-auto px-6 py-20 relative">
                {/* Glow */}
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#A3133A]/10 blur-[120px] pointer-events-none rounded-full" />

                <motion.div {...fadeUp(0.1)} className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group mb-8"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-[#A3133A]/10 border border-[#A3133A]/20">
                            <FileText className="h-8 w-8 text-[#A3133A]" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">Terms of Service</h1>
                    </div>
                    <p className="text-zinc-500 font-medium">Last updated: February 19, 2026</p>
                </motion.div>

                <motion.div {...fadeUp(0.2)} className="prose prose-invert max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="leading-relaxed">
                            By accessing or using Campwork, you agree to these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Eligibility</h2>
                        <p className="leading-relaxed">
                            Campwork is exclusively for university students and businesses looking to hire them. You must be at least 18 years old and a current university student to register as a freelancer on our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. User Conduct</h2>
                        <p className="leading-relaxed">
                            Users are expected to maintain professional conduct. Any form of harassment, fraud, or violation of university policies is strictly prohibited.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Payments</h2>
                        <p className="leading-relaxed">
                            Payments are processed through our secure partners. Campwork may charge a platform fee for successful gig completions.
                        </p>
                    </section>

                    <section className="bg-white/5 border border-white/10 rounded-3xl p-8 mt-12">
                        <h2 className="text-2xl font-bold text-white mb-4">Need Clarification?</h2>
                        <p className="leading-relaxed mb-6">
                            If you have any questions about our Terms of Service, we're here to help.
                        </p>
                        <a
                            href="mailto:contact.campwork@gmail.com"
                            className="inline-block px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
                        >
                            Contact Support
                        </a>
                    </section>
                </motion.div>

                <footer className="mt-20 pt-8 border-t border-white/5 text-sm text-zinc-600">
                    © {new Date().getFullYear()} Campwork. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
