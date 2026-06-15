import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionReveal Component
 * Applies a subtle, professional fade-in and slight upward motion (y: 20 -> 0)
 * designed to emulate Tier-1 consulting firm page transitions (e.g., McKinsey, Deloitte).
 * 
 * Animation constraints:
 * - Slow duration (0.5s)
 * - No bounce (easeOut)
 * - Triggers once when scrolled into view
 */
const SectionReveal = ({ children, delay = 0, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default SectionReveal;
