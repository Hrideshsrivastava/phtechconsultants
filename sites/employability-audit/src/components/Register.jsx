import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal, { SectionHeading } from './Reveal';
import Icon from './Icon';
import { isFirebaseConfigured, saveRegistration } from '../firebase';
import { contact, modules, tiers } from '../data/program';

export const packageOptions = [
    ...tiers.map((tier) => `${tier.code} – ${tier.title}`),
    ...modules.filter((module) => module.standalone).map((module) => `${module.code} – ${module.title}`),
    'Not sure yet – please advise me'
];

const emptyForm = {
    name: '',
    email: '',
    phone: '',
    institution: '',
    course: '',
    package: packageOptions[0],
    message: ''
};

const confettiColors = ['#1e3a8a', '#fbbf24', '#0ea5e9', '#10b981', '#f43f5e', '#8b5cf6'];

const Confetti = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 60 }).map((_, idx) => {
            const left = (idx * 37) % 100;
            return (
                <motion.span
                    key={idx}
                    className="absolute top-0 block h-3 w-2 rounded-sm"
                    style={{ left: `${left}%`, backgroundColor: confettiColors[idx % confettiColors.length] }}
                    initial={{ y: -20, opacity: 1, rotate: 0 }}
                    animate={{ y: 520, opacity: 0, rotate: 360 + idx * 25, x: ((idx % 7) - 3) * 30 }}
                    transition={{ duration: 2 + (idx % 5) * 0.3, delay: (idx % 10) * 0.05, ease: 'easeOut' }}
                />
            );
        })}
    </div>
);

const Field = ({ label, children, className = '' }) => (
    <label className={`block ${className}`}>
        <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
        {children}
    </label>
);

const inputClass = 'w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-900';

const buildSummary = (form) => [
    'Employability Audit registration',
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `College / university: ${form.institution}`,
    form.course && `Course & year: ${form.course}`,
    `Package: ${form.package}`,
    form.message && `Message: ${form.message}`
].filter(Boolean).join('\n');

const Register = ({ selectedPackage }) => {
    const [form, setForm] = useState(emptyForm);
    const [status, setStatus] = useState('idle'); // idle | sending | done | fallback
    const [highlight, setHighlight] = useState(false);
    const [submittedName, setSubmittedName] = useState('');
    const [summary, setSummary] = useState('');

    // A plan picked in the pricing section fills in the package field
    useEffect(() => {
        if (!selectedPackage) return undefined;
        setForm((current) => ({ ...current, package: selectedPackage.name }));
        setHighlight(true);
        const timer = setTimeout(() => setHighlight(false), 1600);
        return () => clearTimeout(timer);
    }, [selectedPackage]);

    const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmittedName(form.name.split(' ')[0]);
        setSummary(buildSummary(form));
        if (!isFirebaseConfigured) {
            console.warn('Registration not saved: the VITE_FIREBASE_* build variables were not set when this site was built.');
            setStatus('fallback');
            return;
        }
        setStatus('sending');
        try {
            await saveRegistration({ ...form, source: window.location.host });
            setStatus('done');
            setForm(emptyForm);
        } catch (error) {
            // permission-denied here means the Firestore rule for employabilityRegistrations is missing
            console.error(`Registration could not be saved (${error.code || 'unknown error'})`, error);
            setStatus('fallback');
        }
    };

    return (
        <section id="register" className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-blue-50 py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <SectionHeading eyebrow="Registration" title="Claim your spot.">
                    It takes under a minute. We'll call you to confirm your slot.
                </SectionHeading>

                <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
                    <Reveal>
                        <div className="h-full rounded-3xl bg-blue-900 p-8 text-white shadow-xl md:p-10">
                            <h3 className="font-display text-2xl font-bold">What happens next?</h3>
                            <ol className="mt-8 space-y-6">
                                {['We confirm your slot and package by phone or email.', 'You get the schedule and joining details.', 'Take the audit and receive your gap report and growth plan.'].map((step, idx) => (
                                    <li key={step} className="flex gap-4">
                                        <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-amber-400 font-display font-bold text-blue-950">{idx + 1}</span>
                                        <span className="pt-1.5 text-blue-50">{step}</span>
                                    </li>
                                ))}
                            </ol>
                            <div className="mt-10 space-y-3 border-t border-white/10 pt-8">
                                <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Have a question?</p>
                                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 font-semibold hover:text-amber-300">
                                    <Icon name="mail" className="h-5 w-5" /> {contact.email}
                                </a>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="relative min-h-[34rem] overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10">
                            <AnimatePresence mode="wait">
                                {status === 'done' ? (
                                    <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full min-h-[30rem] flex-col items-center justify-center text-center">
                                        <Confetti />
                                        <motion.div
                                            initial={{ scale: 0, rotate: -90 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                                            className="grid h-24 w-24 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30"
                                        >
                                            <Icon name="check" className="h-12 w-12" />
                                        </motion.div>
                                        <h3 className="mt-8 font-display text-3xl font-bold text-slate-900">You're in{submittedName ? `, ${submittedName}` : ''}! 🎉</h3>
                                        <p className="mt-3 max-w-sm text-slate-600">We've received your registration and will be in touch shortly to confirm your slot.</p>
                                        <button type="button" onClick={() => setStatus('idle')} className="mt-8 font-semibold text-blue-900 underline-offset-4 hover:underline">
                                            Register someone else
                                        </button>
                                    </motion.div>
                                ) : status === 'fallback' ? (
                                    <motion.div key="fallback" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full min-h-[30rem] flex-col items-center justify-center text-center">
                                        <h3 className="font-display text-2xl font-bold text-slate-900">One last step</h3>
                                        <p className="mt-3 max-w-md text-slate-600">
                                            Send us your details by email with one tap. Everything you entered is already filled in, so just hit send and we'll contact you.
                                        </p>
                                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                                            <a
                                                href={`mailto:${contact.email}?subject=${encodeURIComponent('Employability Audit registration')}&body=${encodeURIComponent(summary)}`}
                                                className="rounded-full bg-blue-900 px-6 py-3 font-bold text-white transition-transform hover:-translate-y-0.5"
                                            >
                                                Send by email
                                            </a>
                                        </div>
                                        <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-sm font-semibold text-slate-500 hover:text-blue-900">
                                            ← Back to the form
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
                                        <Field label="Full name">
                                            <input required value={form.name} onChange={update('name')} className={inputClass} placeholder="Your name" autoComplete="name" />
                                        </Field>
                                        <Field label="Phone">
                                            <input required type="tel" pattern="[0-9+\-\s]{10,15}" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+91 98765 43210" autoComplete="tel" />
                                        </Field>
                                        <Field label="Email" className="sm:col-span-2">
                                            <input required type="email" value={form.email} onChange={update('email')} className={inputClass} placeholder="you@example.com" autoComplete="email" />
                                        </Field>
                                        <Field label="College / university">
                                            <input required value={form.institution} onChange={update('institution')} className={inputClass} placeholder="College name" />
                                        </Field>
                                        <Field label="Course & year">
                                            <input value={form.course} onChange={update('course')} className={inputClass} placeholder="e.g. B.Tech CSE, 4th year" />
                                        </Field>
                                        <Field label="Package" className="sm:col-span-2">
                                            <motion.select
                                                value={form.package}
                                                onChange={update('package')}
                                                animate={highlight ? { scale: [1, 1.03, 1], borderColor: ['#e2e8f0', '#fbbf24', '#e2e8f0'] } : {}}
                                                transition={{ duration: 0.8 }}
                                                className={inputClass}
                                            >
                                                {(packageOptions.includes(form.package) ? packageOptions : [form.package, ...packageOptions]).map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </motion.select>
                                        </Field>
                                        <Field label="Anything we should know? (optional)" className="sm:col-span-2">
                                            <textarea rows="3" value={form.message} onChange={update('message')} className={inputClass} placeholder="Preferred dates, target roles, questions..." />
                                        </Field>
                                        <div className="sm:col-span-2">
                                            <motion.button
                                                type="submit"
                                                disabled={status === 'sending'}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-4 font-bold text-white shadow-xl shadow-blue-900/25 disabled:opacity-60"
                                            >
                                                {status === 'sending' ? 'Submitting…' : 'Register for the audit'}
                                                {status !== 'sending' && <Icon name="arrow" className="h-5 w-5" />}
                                            </motion.button>
                                            <p className="mt-3 text-center text-xs text-slate-400">We only use your details to contact you about this programme.</p>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Register;
