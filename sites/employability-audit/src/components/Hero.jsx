import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Icon from './Icon';

const rotatingWords = ['recruiters do.', 'the panel does.', 'HR does.', 'it costs you.'];

const scoreAreas = [
    { label: 'Knowledge', color: 'bg-sky-500' },
    { label: 'Communication', color: 'bg-violet-500' },
    { label: 'Technical depth', color: 'bg-emerald-500' },
    { label: 'Resilience', color: 'bg-amber-400' },
    { label: 'Presence & EQ', color: 'bg-rose-500' }
];

// Illustrative scores for the sample card; they shuffle to make the report feel alive.
const sampleScores = [
    [82, 54, 67, 71, 48],
    [64, 78, 52, 59, 73],
    [91, 61, 74, 45, 66]
];

const floatingChips = [
    { label: 'AI interview', icon: 'camera', className: '-top-6 right-6', delay: 0 },
    { label: 'Group discussion', icon: 'group', className: '-bottom-6 left-6', delay: 1.2 },
    { label: 'Panel round', icon: 'panel', className: '-bottom-6 right-6', delay: 2.4 }
];

const Hero = () => {
    const reduceMotion = useReducedMotion();
    const [wordIndex, setWordIndex] = useState(0);
    const [scoreSet, setScoreSet] = useState(0);

    useEffect(() => {
        if (reduceMotion) return undefined;
        const wordTimer = setInterval(() => setWordIndex((idx) => (idx + 1) % rotatingWords.length), 2600);
        const scoreTimer = setInterval(() => setScoreSet((idx) => (idx + 1) % sampleScores.length), 3800);
        return () => {
            clearInterval(wordTimer);
            clearInterval(scoreTimer);
        };
    }, [reduceMotion]);

    const scores = sampleScores[scoreSet];
    const overall = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);

    return (
        <section id="top" className="relative overflow-hidden bg-grid pt-32 pb-20 md:pt-40 md:pb-28">
            {/* Drifting colour blobs */}
            <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-sky-300/40 blur-3xl animate-blob" />
            <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-amber-200/50 blur-3xl animate-blob [animation-delay:-5s]" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl animate-blob [animation-delay:-9s]" />

            <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8">
                <div>
                    <motion.span
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-900/10 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-900 shadow-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                        Employability Audit · Registrations open
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-[4.1rem]"
                    >
                        Find your gaps
                        <br />
                        before
                        {/* All phrases share one grid cell so the line keeps the width/height of the longest one */}
                        <span className="grid whitespace-nowrap pb-4 text-blue-900">
                            {rotatingWords.map((word) => (
                                <span key={word} className="invisible col-start-1 row-start-1" aria-hidden="true">{word}</span>
                            ))}
                            <span className="col-start-1 row-start-1">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={rotatingWords[wordIndex]}
                                        initial={{ opacity: 0, y: 30, rotateX: -60 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        exit={{ opacity: 0, y: -30, rotateX: 60 }}
                                        transition={{ duration: 0.45 }}
                                        className="relative inline-block"
                                    >
                                        {rotatingWords[wordIndex]}
                                        <svg className="absolute left-0 top-full h-3 w-full sm:h-4" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none" aria-hidden="true">
                                            <motion.path
                                                d="M3 12 C 80 3, 200 3, 297 10"
                                                stroke="#fbbf24"
                                                strokeWidth="6"
                                                strokeLinecap="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
                                            />
                                        </svg>
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                        className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl"
                    >
                        A five-stage audit that puts you through a real placement process (online test, AI interview, group discussion,
                        panel and an expert interview) and hands you a precise map of what to fix.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-10 flex flex-wrap gap-4"
                    >
                        <a
                            href="#register"
                            className="group inline-flex items-center gap-2 rounded-full bg-blue-900 px-7 py-4 font-bold text-white shadow-xl shadow-blue-900/25 transition-all hover:-translate-y-1 hover:bg-blue-800"
                        >
                            Book your audit
                            <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href="#pricing"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white/70 px-7 py-4 font-bold text-slate-700 transition-all hover:-translate-y-1 hover:border-blue-900 hover:text-blue-900"
                        >
                            Plans from ₹399
                        </a>
                    </motion.div>
                </div>

                {/* Sample scorecard */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mx-auto w-full max-w-md"
                >
                    <div className="relative rounded-3xl border border-white bg-white/90 p-7 shadow-2xl shadow-blue-900/15 backdrop-blur">
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sample audit report</p>
                                <p className="mt-1 font-display text-2xl font-bold text-slate-900">Employability Score</p>
                            </div>
                            <div className="relative grid h-20 w-20 place-items-center">
                                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
                                    <circle cx="40" cy="40" r="34" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                                    <motion.circle
                                        cx="40" cy="40" r="34" stroke="#1e3a8a" strokeWidth="8" fill="none" strokeLinecap="round"
                                        strokeDasharray={2 * Math.PI * 34}
                                        animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - overall / 100) }}
                                        initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                                        transition={{ duration: 1.2, ease: 'easeOut' }}
                                    />
                                </svg>
                                <motion.span key={overall} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-xl font-bold text-blue-900">
                                    {overall}
                                </motion.span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {scoreAreas.map((area, idx) => (
                                <div key={area.label}>
                                    <div className="mb-1.5 flex justify-between text-sm">
                                        <span className="font-semibold text-slate-700">{area.label}</span>
                                        <span className={`font-bold ${scores[idx] < 60 ? 'text-rose-500' : 'text-slate-500'}`}>
                                            {scores[idx] < 60 ? 'Gap found' : `${scores[idx]}%`}
                                        </span>
                                    </div>
                                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                                        <motion.div
                                            className={`h-full rounded-full ${area.color}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${scores[idx]}%` }}
                                            transition={{ duration: 1, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
                            <Icon name="sparkle" className="h-5 w-5 flex-shrink-0 text-amber-500" />
                            <span><strong>Personal growth plan</strong> built from your weakest areas.</span>
                        </div>
                    </div>

                    {floatingChips.map((chip) => (
                        <div
                            key={chip.label}
                            className={`absolute hidden items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg animate-float sm:flex ${chip.className}`}
                            style={{ animationDelay: `${chip.delay}s` }}
                        >
                            <Icon name={chip.icon} className="h-4 w-4 text-blue-900" />
                            {chip.label}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
