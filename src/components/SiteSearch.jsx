import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchSite } from '../data/searchIndex';

const suggestions = ['Services', 'Training', 'Trainers', 'Simulation', 'Assessments', 'Contact'];

const typeStyles = {
    Page: 'bg-slate-100 text-slate-700',
    Service: 'bg-blue-50 text-blue-800',
    Training: 'bg-emerald-50 text-emerald-800',
    Workshop: 'bg-emerald-50 text-emerald-800',
    Simulation: 'bg-amber-50 text-amber-800',
    Trainer: 'bg-purple-50 text-purple-800',
    Assessment: 'bg-rose-50 text-rose-800'
};

const SearchIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
    </svg>
);

const SiteSearch = ({ onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const buttonRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const results = useMemo(() => searchSite(query), [query]);

    const open = () => {
        onOpen?.();
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        setQuery('');
        setActiveIndex(0);
    };

    // Ctrl/Cmd + K or "/" opens search from anywhere (except while typing in a field)
    useEffect(() => {
        const handleKeyDown = (event) => {
            // The navbar renders a desktop and a mobile copy; only the one on screen answers the shortcut
            if (!buttonRef.current?.offsetParent) return;
            const target = event.target;
            const isTyping = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
            if ((event.key === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !isTyping)) {
                event.preventDefault();
                onOpen?.();
                setIsOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onOpen]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    useEffect(() => {
        listRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex]);

    const goTo = (entry) => {
        close();
        navigate(entry.path);

        // OnePage only scrolls when the path changes, so scroll ourselves when we're already there.
        if (entry.path === location.pathname) {
            const el = document.getElementById(entry.path.substring(1) || 'home');
            if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Escape') {
            // Keep the service/training panel from also closing on the same keypress
            event.stopPropagation();
            close();
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((idx) => Math.min(idx + 1, results.length - 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((idx) => Math.max(idx - 1, 0));
        } else if (event.key === 'Enter' && results[activeIndex]) {
            event.preventDefault();
            goTo(results[activeIndex]);
        }
    };

    const modal = isOpen && (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-900/40 backdrop-blur-sm px-4 pt-20 sm:pt-28"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) close();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Search the website"
                className="w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
            >
                <div className="flex items-center gap-3 border-b border-slate-200 px-4">
                    <SearchIcon className="h-5 w-5 flex-shrink-0 text-slate-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setActiveIndex(0);
                        }}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Search services, training, trainers, tests..."
                        className="h-14 w-full bg-transparent text-base text-slate-800 placeholder-slate-400 outline-none"
                        role="combobox"
                        aria-expanded={results.length > 0}
                        aria-controls="site-search-results"
                        aria-activedescendant={results[activeIndex] ? `site-search-${results[activeIndex].id}` : undefined}
                        autoComplete="off"
                    />
                    <button
                        type="button"
                        onClick={close}
                        className="flex-shrink-0 rounded border border-slate-200 px-1.5 py-0.5 text-xs font-semibold text-slate-500 hover:bg-slate-50"
                    >
                        Esc
                    </button>
                </div>

                {query.trim() === '' ? (
                    <div className="px-4 py-5">
                        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Popular</p>
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => {
                                        setQuery(suggestion);
                                        inputRef.current?.focus();
                                    }}
                                    className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition-colors hover:border-blue-900 hover:text-blue-900"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : results.length === 0 ? (
                    <p className="px-4 py-8 text-center text-sm text-slate-500">
                        No results for “{query}”. Try a different keyword.
                    </p>
                ) : (
                    <ul id="site-search-results" ref={listRef} role="listbox" className="max-h-[60vh] overflow-y-auto overscroll-contain py-2">
                        {results.map((entry, idx) => (
                            <li
                                key={entry.id}
                                id={`site-search-${entry.id}`}
                                data-index={idx}
                                role="option"
                                aria-selected={idx === activeIndex}
                                onMouseMove={() => setActiveIndex(idx)}
                                onClick={() => goTo(entry)}
                                className={`mx-2 flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 ${idx === activeIndex ? 'bg-blue-50' : ''}`}
                            >
                                <span className={`mt-0.5 flex-shrink-0 rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${typeStyles[entry.type]}`}>
                                    {entry.type}
                                </span>
                                <span className="min-w-0">
                                    <span className="block truncate font-semibold text-slate-900">{entry.title}</span>
                                    {entry.description && (
                                        <span className="block truncate text-sm text-slate-500">{entry.description}</span>
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="hidden items-center gap-4 border-t border-slate-100 bg-slate-50 px-4 py-2 text-xs text-slate-500 sm:flex">
                    <span><kbd className="font-sans font-semibold">↑↓</kbd> to navigate</span>
                    <span><kbd className="font-sans font-semibold">Enter</kbd> to open</span>
                    <span><kbd className="font-sans font-semibold">Ctrl K</kbd> to search anytime</span>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                onClick={open}
                className="inline-flex items-center gap-2 rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-900 focus:outline-none"
                aria-label="Search the website"
                title="Search (Ctrl K)"
            >
                <SearchIcon className="h-5 w-5" />
            </button>
            {modal && createPortal(modal, document.body)}
        </>
    );
};

export default SiteSearch;
