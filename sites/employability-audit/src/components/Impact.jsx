import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionHeading } from './Reveal';
import Icon from './Icon';
import { impacts } from '../data/program';

// Card that tilts toward the cursor
const TiltCard = ({ impact, index }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

    const handleMove = (event) => {
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            style={{ rotateX, rotateY, transformPerspective: 800 }}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur ${index === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}
        >
            {index === 0 && (
                <Icon name={impact.icon} className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 text-white/5 transition-transform duration-700 group-hover:scale-110" />
            )}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/0 blur-2xl transition-all duration-500 group-hover:bg-amber-400/30" />
            <div className="relative mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-amber-400 text-blue-950 shadow-lg shadow-amber-400/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                <Icon name={impact.icon} className="h-7 w-7" />
            </div>
            <h3 className={`relative font-display font-bold text-white ${index === 0 ? 'text-3xl lg:text-4xl' : 'text-2xl'}`}>{impact.title}</h3>
            <p className={`relative mt-3 leading-relaxed text-blue-100 ${index === 0 ? 'text-lg' : ''}`}>{impact.text}</p>
        </motion.div>
    );
};

const Impact = () => (
    <section className="relative overflow-hidden bg-blue-950 py-24 md:py-32">
        <div className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-sky-500/20 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-violet-500/20 blur-3xl animate-blob [animation-delay:-7s]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Impact" title="What changes after the audit" light>
                Real pressure, honest feedback, and a plan, so the real interview feels like a re-run.
            </SectionHeading>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {impacts.map((impact, idx) => (
                    <TiltCard key={impact.title} impact={impact} index={idx} />
                ))}
            </div>
        </div>
    </section>
);

export default Impact;
