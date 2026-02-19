"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Rocket, Users, Target, Zap, ShoppingBag, Briefcase, GraduationCap, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, delay, ease: "easeOut" },
    } as const);

    return (
        <div className="min-h-screen bg-[#080810] text-zinc-300 font-sans selection:bg-[#A3133A]/30">
            <div className="max-w-5xl mx-auto px-6 py-20 relative">
                {/* Ambient background glow */}
                <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#A3133A]/10 blur-[120px] pointer-events-none rounded-full" />
                <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#6b0020]/10 blur-[120px] pointer-events-none rounded-full" />

                <motion.div {...fadeUp(0.1)} className="mb-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group mb-12"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-8">
                        The University <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b8a] to-[#A3133A]">Work Ecosystem</span>.
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
                        Campwork is a student-centered professional work and marketplace platform designed to help university students gain real-world experience, earn income, and build verifiable portfolios while still in school.
                    </p>
                </motion.div>

                {/* Hero Image Section */}
                <motion.div
                    {...fadeUp(0.2)}
                    className="relative w-full h-[400px] rounded-[40px] overflow-hidden mb-32 border border-white/10"
                >
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000"
                        alt="Students collaborating"
                        className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent" />
                </motion.div>

                {/* Section: The Evolution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 items-center">
                    <motion.div {...fadeUp(0.2)}>
                        <h2 className="text-3xl font-bold text-white mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Bridging the Gap</h2>
                        <div className="space-y-4 text-zinc-400 leading-relaxed">
                            <p>
                                At its core, Campwork exists to bridge the gap between learning and real work. Many students graduate with theoretical knowledge but little hands-on experience applying their skills in real situations.
                            </p>
                            <p>
                                We transform the university environment from a purely academic space into a practical, skill-driven ecosystem. We focus on <strong>action and delivery</strong>, not just profiles or credentials.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        {...fadeUp(0.3)}
                        className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] relative overflow-hidden group min-h-[300px] flex flex-col justify-end"
                    >
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000"
                                alt="Innovation Hub"
                                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700"
                            />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Target className="text-[#ff6b8a]" size={20} />
                                Our Philosophy
                            </h3>
                            <p className="text-zinc-500">
                                We believe university life is the perfect time to experiment, fail safely, and grow professionally. Campwork provides the structure for that growth.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Section: How it Works / Roles */}
                <motion.div {...fadeUp(0.1)} className="mb-32">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">A Platform for Everyone</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: GraduationCap,
                                title: "Student Providers",
                                desc: "Register as a freelancer to offer services, sell products, and build a verifiable portfolio of work done.",
                                color: "from-[#A3133A]/20 to-transparent",
                                iconColor: "text-[#ff6b8a]"
                            },
                            {
                                icon: Users,
                                title: "Student Clients",
                                desc: "Outsource tasks to fellow students, collaborate on projects, and manage your campus commerce needs.",
                                color: "from-blue-500/10 to-transparent",
                                iconColor: "text-blue-400"
                            },
                            {
                                icon: Briefcase,
                                title: "Non-Student Clients",
                                desc: "External businesses, alumni, and startups can browse and hire student talent strictly as employers.",
                                color: "from-emerald-500/10 to-transparent",
                                iconColor: "text-emerald-400"
                            }
                        ].map((role, i) => (
                            <motion.div
                                key={role.title}
                                {...fadeUp(0.2 + i * 0.1)}
                                className={`p-8 rounded-3xl bg-gradient-to-b ${role.color} border border-white/[0.08] flex flex-col items-center text-center hover:border-white/20 transition-colors`}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                                    <role.icon className={role.iconColor} size={32} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3">{role.title}</h4>
                                <p className="text-sm text-zinc-500">{role.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Section: Services + Marketplace with Image Overlap */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-32 items-stretch">
                    <motion.div {...fadeUp(0.2)} className="lg:col-span-3 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-white mb-8">Dual Nature: More Than Just Gigs</h2>
                        <div className="space-y-8 text-zinc-400">
                            <div className="flex gap-6 group">
                                <div className="mt-1 shrink-0 bg-[#A3133A]/10 p-4 rounded-2xl border border-[#A3133A]/20 group-hover:bg-[#A3133A]/20 transition-colors">
                                    <ShoppingBag size={24} className="text-[#ff6b8a]" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2">Campus Marketplace</h4>
                                    <p className="leading-relaxed text-sm sm:text-base">A trusted environment to buy and sell gadgets, books, course materials, and handmade products—scoped specifically to the university ecosystem.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 group">
                                <div className="mt-1 shrink-0 bg-[#A3133A]/10 p-4 rounded-2xl border border-[#A3133A]/20 group-hover:bg-[#A3133A]/20 transition-colors">
                                    <Zap size={24} className="text-[#ff6b8a]" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2">Professional Services</h4>
                                    <p className="leading-relaxed text-sm sm:text-base">Freelance-style tasks from graphic design and coding to tutoring and writing. We facilitate the entire workflow from posting to delivery.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div {...fadeUp(0.4)} className="lg:col-span-2 relative rounded-[32px] overflow-hidden min-h-[400px] border border-white/5">
                        <img
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000"
                            alt="Student Marketplace"
                            className="absolute inset-0 w-full h-full object-cover opacity-40 hover:scale-110 transition-transform duration-[2s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <ShieldCheck className="text-[#ff6b8a] mb-4" size={32} />
                            <h4 className="text-xl font-bold text-white mb-2">A Safer Workspace</h4>
                            <p className="text-xs text-zinc-400 leading-relaxed uppercase tracking-wider font-semibold">
                                Peer-focused • Learning-first • Trusted
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Section: Focus on Execution */}
                <motion.div {...fadeUp(0.1)} className="mb-40 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-12">Different by Design</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#A3133A]/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="relative text-zinc-400 leading-relaxed text-lg">
                                LinkedIn focuses on networking and resumes. <span className="text-white font-bold">Campwork focuses on execution.</span> Credibility on our platform comes from completed jobs, satisfied clients, and real-world transactions—not just polished profiles.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400" alt="Work" className="w-full h-full object-cover opacity-50" />
                            </div>
                            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 mt-8">
                                <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=400" alt="Team" className="w-full h-full object-cover opacity-50" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Final Call to Action */}
                <motion.section {...fadeUp(0.2)} className="relative p-12 md:p-24 rounded-[60px] overflow-hidden text-center mb-20">
                    {/* Background with Image and Gradient Overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
                            alt="Final CTA background"
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#A3133A] via-[#6b0020] to-[#080810]" />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tighter">Participate in <br />the Future.</h2>
                        <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                            By the time you graduate, you should already have a history of real work, real earnings, and real confidence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link
                                href="/"
                                className="w-full sm:w-auto px-12 py-5 rounded-full bg-white text-black font-black hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/40"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/terms"
                                className="w-full sm:w-auto px-12 py-5 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-all backdrop-blur-md"
                            >
                                View Terms
                            </Link>
                        </div>
                    </div>
                </motion.section>

                <footer className="mt-40 pt-16 border-t border-white/5 text-center">
                    <div className="flex justify-center gap-8 mb-12 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                    <p className="text-zinc-600 text-xs font-medium">
                        © {new Date().getFullYear()} Campwork. Engineering the future of student freelance.
                    </p>
                </footer>
            </div>
        </div>
    );
}
