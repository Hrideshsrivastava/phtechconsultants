import React from 'react';
import { motion } from 'framer-motion';

// Fades and lifts children into view the first time they scroll on screen.
const Reveal = ({ children, delay = 0, y = 32, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

export const SectionHeading = ({ eyebrow, title, children, light = false }) => (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
        <span className={`mb-4 inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] ${light ? 'bg-white/10 text-amber-300' : 'bg-blue-900/5 text-blue-900'}`}>
            {eyebrow}
        </span>
        <h2 className={`font-display text-4xl font-bold tracking-tight md:text-5xl ${light ? 'text-white' : 'text-slate-900'}`}>
            {title}
        </h2>
        {children && (
            <p className={`mt-5 text-lg leading-relaxed ${light ? 'text-blue-100' : 'text-slate-600'}`}>{children}</p>
        )}
    </Reveal>
);

export default Reveal;
