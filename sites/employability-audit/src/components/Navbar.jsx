import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MAIN_SITE_URL } from '../data/program';

const links = [
    { id: 'outline', label: 'Programme' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'videos', label: 'Videos' },
    { id: 'register', label: 'Register' }
];

const Navbar = () => {
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            let current = null;
            for (const link of links) {
                const el = document.getElementById(link.id);
                if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) current = link.id;
            }
            setActive(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-sm backdrop-blur-md' : 'bg-transparent'}`}>
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <a href="#top" className="flex items-baseline" onClick={() => setMenuOpen(false)}>
                    <span className="text-xl font-extrabold tracking-tight text-blue-900 sm:text-2xl">PHTech</span>
                    <span className="ml-1 text-xl font-medium text-slate-500 sm:text-2xl">Consultant</span>
                </a>

                <nav className="hidden items-center gap-7 md:flex">
                    {links.slice(0, 3).map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className={`relative py-2 text-sm font-semibold transition-colors ${active === link.id ? 'text-blue-900' : 'text-slate-600 hover:text-blue-900'}`}
                        >
                            {link.label}
                            {active === link.id && (
                                <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-amber-400" />
                            )}
                        </a>
                    ))}
                    <a href={MAIN_SITE_URL} className="text-sm font-semibold text-slate-500 hover:text-blue-900">Main website</a>
                    <a
                        href="#register"
                        className="rounded-full bg-blue-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
                    >
                        Register now
                    </a>
                </nav>

                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
                    aria-expanded={menuOpen}
                    aria-label="Toggle menu"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                    </svg>
                </button>
            </div>

            {menuOpen && (
                <div className="border-b border-slate-200 bg-white px-4 pb-4 shadow-md md:hidden">
                    {links.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-md px-3 py-3 font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-900"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a href={MAIN_SITE_URL} className="block rounded-md px-3 py-3 font-medium text-slate-500 hover:bg-slate-50">
                        ← Main website
                    </a>
                </div>
            )}

            <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-blue-900 via-sky-500 to-amber-400" />
        </header>
    );
};

export default Navbar;
