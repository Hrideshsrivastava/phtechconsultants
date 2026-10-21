import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useScroll, useSpring } from 'framer-motion';
import Reveal, { SectionHeading } from './Reveal';
import Icon from './Icon';
import { deliveryFacts, modules, nextLevel, purpose, stats } from '../data/program';

export const moduleColors = {
    sky: { bg: 'bg-sky-500', soft: 'bg-sky-50', text: 'text-sky-700', ring: 'ring-sky-200' },
    violet: { bg: 'bg-violet-500', soft: 'bg-violet-50', text: 'text-violet-700', ring: 'ring-violet-200' },
    emerald: { bg: 'bg-emerald-500', soft: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200' },
    amber: { bg: 'bg-amber-400', soft: 'bg-amber-50', text: 'text-amber-800', ring: 'ring-amber-200' },
    rose: { bg: 'bg-rose-500', soft: 'bg-rose-50', text: 'text-rose-700', ring: 'ring-rose-200' }
};

const marqueeItems = ['Proctored Online Test', 'AI Video Interview', 'Group Discussion', 'Panel Interview', 'Senior Expert CXO Round', 'Personal Growth Map'];

export const Marquee = () => (
    <div className="relative -rotate-1 overflow-hidden bg-blue-900 py-5 shadow-xl">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                <span key={idx} className="flex items-center gap-10 font-display text-xl font-semibold text-white md:text-2xl">
                    {item}
                    <Icon name="sparkle" className="h-5 w-5 text-amber-300" />
                </span>
            ))}
        </div>
    </div>
);

const Counter = ({ value, suffix }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return undefined;
        const controls = animate(0, value, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setDisplay(Math.round(v)) });
        return () => controls.stop();
    }, [inView, value]);

    return <span ref={ref}>{display}{suffix}</span>;
};

const Timeline = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

    return (
        <div ref={ref} className="relative mx-auto max-w-5xl">
            {/* Track + line that draws as you scroll */}
            <div className="absolute bottom-0 left-6 top-0 w-1 rounded-full bg-slate-200 md:left-1/2 md:-translate-x-1/2" />
            <motion.div style={{ scaleY }} className="absolute bottom-0 left-6 top-0 w-1 origin-top rounded-full bg-gradient-to-b from-sky-500 via-emerald-500 to-rose-500 md:left-1/2 md:-translate-x-1/2" />

            <ol className="space-y-12 md:space-y-0">
                {modules.map((module, idx) => {
                    const colors = moduleColors[module.color];
                    const isLeft = idx % 2 === 0;
                    return (
                        <li key={module.code} className={`relative md:grid md:grid-cols-2 md:gap-16 ${idx > 0 ? 'md:-mt-24' : ''}`}>
                            <motion.div
                                style={{ x: '-50%' }}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true, margin: '-120px 0px' }}
                                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                                className={`absolute left-6 top-6 z-10 grid h-12 w-12 place-items-center rounded-full text-white shadow-lg ring-8 ring-slate-50 md:left-1/2 ${colors.bg}`}
                            >
                                <Icon name={module.icon} className="h-5 w-5" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -6 }}
                                className={`ml-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl md:ml-0 md:p-8 ${isLeft ? 'md:col-start-1 md:mr-6' : 'md:col-start-2 md:ml-6'}`}
                            >
                                <div className="mb-3 flex flex-wrap items-center gap-3">
                                    <span className={`rounded-lg px-2.5 py-1 font-display text-sm font-bold ${colors.soft} ${colors.text}`}>Stage {idx + 1} · {module.code}</span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{module.gap}</span>
                                </div>
                                <h3 className="font-display text-2xl font-bold text-slate-900">{module.title}</h3>
                                <p className="mt-2 leading-relaxed text-slate-600">{module.description}</p>
                            </motion.div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

const Outline = () => (
    <section id="outline" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Stats */}
            <div className="mb-24 grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((stat, idx) => (
                    <Reveal key={stat.label} delay={idx * 0.08}>
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                            <p className="font-display text-4xl font-bold text-blue-900 md:text-5xl">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </p>
                            <p className="mt-2 text-sm font-semibold text-slate-500">{stat.label}</p>
                        </div>
                    </Reveal>
                ))}
            </div>

            <SectionHeading eyebrow="Programme outline" title="Your placement season, rehearsed.">
                {purpose}
            </SectionHeading>

            <Reveal className="mb-16 text-center">
                <p className="font-display text-lg font-semibold text-slate-700">
                    Five stages. Each one uncovers a different gap. Pick the ones you need, or take them all.
                </p>
            </Reveal>

            <Timeline />

            {/* Delivery details */}
            <div className="mt-28 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <Reveal>
                    <div className="h-full rounded-3xl bg-gradient-to-br from-blue-900 to-blue-950 p-8 text-white shadow-xl md:p-10">
                        <h3 className="font-display text-2xl font-bold">How it's delivered</h3>
                        <p className="mt-2 text-blue-100">A modular workshop, so institutions can schedule it the way that suits them.</p>
                        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                            {deliveryFacts.map((fact) => (
                                <div key={fact.label} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                                    <dt className="text-xs font-bold uppercase tracking-widest text-amber-300">{fact.label}</dt>
                                    <dd className="mt-2 font-display text-xl font-semibold">{fact.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </Reveal>
                <Reveal delay={0.1}>
                    <div className="h-full rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50 p-8 md:p-10">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-700">Next level</span>
                        <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">Want to go further?</h3>
                        <ul className="mt-6 space-y-4">
                            {nextLevel.map((item) => (
                                <li key={item} className="flex gap-3 text-slate-700">
                                    <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-amber-400 text-white">
                                        <Icon name="check" className="h-4 w-4" />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </div>
        </div>
    </section>
);

export default Outline;
