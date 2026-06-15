import React from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from './SectionReveal';

const HomePage = () => {
    return (
        <div className="flex flex-col space-y-24 pb-12">

            {/* 1. HERO - Strong & Sharpened */}
            <section className="relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="absolute inset-0 bg-slate-50 opacity-50"></div>
                <div className="relative px-6 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24 text-center md:text-left flex flex-col md:flex-row items-center md:justify-between">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 tracking-tight leading-tight mb-6">
                            Empowering Organizational <br className="hidden md:block" /> Performance Excellence
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl font-light">
                            We architect structured execution systems, align KRAs to strategy, and build capability frameworks that transform operational performance into measurable business results.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                to="/services"
                                className="bg-blue-900 text-white text-center font-bold tracking-wide py-4 px-10 rounded-lg shadow-md hover:bg-blue-800 transition-all duration-300 w-full sm:w-auto"
                            >
                                Explore Programs
                            </Link>
                            <Link
                                to="/contact"
                                className="bg-white text-blue-900 text-center font-bold tracking-wide py-4 px-10 rounded-lg shadow-sm border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 w-full sm:w-auto"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. OUR CORE CAPABILITIES (Strategic Pillars) */}
            <section className="px-4 md:px-0">
                <SectionReveal className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Core Capabilities</h2>
                    <div className="w-16 h-1 bg-blue-900 mx-auto mt-4"></div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <SectionReveal className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col items-center text-center h-full">
                        <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-6 shrink-0 border border-blue-100">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Strategic Alignment</h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            We establish a clear Line of Sight between individual KRAs and corporate objectives, ensuring every function contributes directly to strategic outcomes.
                        </p>
                    </SectionReveal>

                    <SectionReveal delay={0.1} className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col items-center text-center h-full">
                        <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-6 shrink-0 border border-blue-100">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Execution Discipline</h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            We implement structured KPI tracking, baseline governance, and risk control frameworks that eliminate operational ambiguity.
                        </p>
                    </SectionReveal>

                    <SectionReveal delay={0.2} className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col items-center text-center h-full">
                        <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-6 shrink-0 border border-blue-100">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Capability Architecture</h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            We identify competence gaps, map role dependencies, and create structured development roadmaps for sustainable institutional growth.
                        </p>
                    </SectionReveal>
                </div>
            </section>

            {/* 3. TRANSITIONAL SECTION */}
            <SectionReveal className="bg-blue-900 text-white rounded-2xl p-8 md:p-12 lg:p-20 text-center shadow-lg mx-4 md:mx-0 border border-blue-800">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">Why Organizations Engage Us</h2>
                <p className="text-lg md:text-xl text-blue-100 leading-relaxed font-light max-w-4xl mx-auto">
                    Organizations partner with PHTech Consultants when internal systems become misaligned with strategic intent. Whether addressing fragmented supply chains, capability gaps, or performance drift, we intervene with structured analysis and execution discipline.
                </p>
            </SectionReveal>

            {/* 4. CORPORATE OVERVIEW (Tighter definition) */}
            <section className="pt-8 px-4 md:px-0">
                <SectionReveal className="text-center mb-16 max-w-4xl mx-auto">
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 block">Firm Overview</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
                        PHTech Consultants
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                        PHTech Consultants is a specialized management and technical advisory firm operating at the intersection of strategy, structure, and execution. We serve manufacturing, service, telecom, PSU, and academic institutions across India.
                    </p>
                </SectionReveal>

                {/* 5. MISSION & PHILOSOPHY (Sharper) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20 px-4 md:px-0">
                    <SectionReveal delay={0.1} className="bg-slate-50 p-8 md:p-10 border border-slate-200 rounded-2xl flex flex-col h-full">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-200">Our Mission</h3>
                        <p className="text-slate-700 leading-relaxed font-medium">
                            To engineer measurable customer satisfaction through disciplined processes, structured capability development, and uncompromised service quality.
                        </p>
                    </SectionReveal>

                    <SectionReveal delay={0.2} className="bg-slate-50 p-8 md:p-10 border border-slate-200 rounded-2xl flex flex-col h-full">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-200">Our Philosophy</h3>
                        <p className="text-slate-700 leading-relaxed font-medium">
                            Technology and process frameworks must enable execution — not burden it. We design systems that simplify complexity and accelerate performance.
                        </p>
                    </SectionReveal>
                </div>

                {/* 6. OPERATING PRINCIPLES & 7. ASSOCIATIONS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">

                    {/* Principles */}
                    <SectionReveal delay={0.3} className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-8 md:p-14 shadow-sm">
                        <h3 className="text-3xl font-extrabold text-slate-900 mb-10 tracking-tight">Our Operating Principles</h3>

                        <div className="space-y-8">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="hidden sm:flex w-12 h-12 bg-blue-50 text-blue-900 rounded items-center justify-center shrink-0 font-bold text-lg">01</div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">Sector-Specific Expertise</h4>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        Consultants aligned to your industry vertical ensure contextual accuracy — not generic advice.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="hidden sm:flex w-12 h-12 bg-blue-50 text-blue-900 rounded items-center justify-center shrink-0 font-bold text-lg">02</div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">Executive Accountability</h4>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        A designated senior consultant serves as single-point ownership for performance outcomes.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="hidden sm:flex w-12 h-12 bg-blue-50 text-blue-900 rounded items-center justify-center shrink-0 font-bold text-lg">03</div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">Structured Intervention</h4>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        Every engagement begins with diagnosis, followed by measurable execution milestones.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>

                    {/* Associations (Added precise context line) */}
                    <SectionReveal delay={0.4} className="bg-slate-900 text-white rounded-2xl p-8 md:p-10 flex flex-col justify-center shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z" /></svg>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-4">Key Associations</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-8 pr-4">
                                We collaborate with nationally recognized institutions and global organizations to extend structured capability development across sectors.
                            </p>

                            <ul className="space-y-6">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-blue-400 mr-4 shrink-0"></span>
                                    <div>
                                        <span className="block text-white font-bold tracking-wide">NIESBUD</span>
                                        <span className="text-sm text-slate-400 font-medium">Registered Training Partner</span>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-blue-400 mr-4 shrink-0"></span>
                                    <div>
                                        <span className="block text-white font-bold tracking-wide">CNCR</span>
                                        <span className="text-sm text-slate-400 font-medium">Authorized Representative</span>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-blue-400 mr-4 shrink-0"></span>
                                    <div>
                                        <span className="block text-white font-bold tracking-wide">Sollogics</span>
                                        <span className="text-sm text-slate-400 font-medium">Strategic Technology Partner</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </SectionReveal>

                </div>
            </section>

        </div>
    );
};

export default HomePage;
