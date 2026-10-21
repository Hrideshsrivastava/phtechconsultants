import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { consultingServices } from '../data/services';
import { trainingCategories } from '../data/trainingPrograms';
import { simulations } from '../data/simulations';

const CONTACT_EMAIL = 'info@phtechconsultant.com';
const GENERAL = 'General enquiry';
const isFirebaseConfigured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID);

const optionGroups = [
    { label: 'Consulting', options: consultingServices.map((service) => service.title) },
    { label: 'Training', options: trainingCategories.flatMap((category) => category.workshops.map((workshop) => workshop.title)) },
    { label: 'Simulations', options: simulations.map((simulation) => simulation.title) },
    { label: 'Products & programmes', options: ['KRA Analysis Suite (demo)', 'Employability Audit'] }
];

const emptyForm = { name: '', email: '', phone: '', organisation: '', interest: GENERAL, message: '' };

const inputClass = 'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10';

const Field = ({ label, children, className = '' }) => (
    <label className={`block ${className}`}>
        <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
        {children}
    </label>
);

const buildSummary = (form) => [
    'Website enquiry',
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    form.organisation && `Organisation / college: ${form.organisation}`,
    `Interested in: ${form.interest}`,
    form.message && `Message: ${form.message}`
].filter(Boolean).join('\n');

// Enquiry form; submissions land in the `contactEnquiries` collection shown in the data console.
const ContactForm = () => {
    const location = useLocation();
    const [form, setForm] = useState(emptyForm);
    const [status, setStatus] = useState('idle'); // idle | sending | done | fallback
    const [summary, setSummary] = useState('');

    // "Inquire" / "Contact" buttons elsewhere on the site pass what the visitor was looking at
    const presetInterest = location.state?.interest;
    useEffect(() => {
        if (presetInterest) {
            setForm((current) => ({ ...current, interest: presetInterest }));
            setStatus('idle');
        }
    }, [presetInterest, location.key]);

    const knownOptions = useMemo(() => new Set([GENERAL, ...optionGroups.flatMap((group) => group.options)]), []);
    const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSummary(buildSummary(form));
        if (!isFirebaseConfigured) {
            console.warn('Enquiry not saved: the VITE_FIREBASE_* build variables were not set when this site was built.');
            setStatus('fallback');
            return;
        }
        setStatus('sending');
        try {
            await addDoc(collection(db, 'contactEnquiries'), {
                ...form,
                source: window.location.host,
                createdAt: serverTimestamp()
            });
            setStatus('done');
            setForm(emptyForm);
        } catch (error) {
            // permission-denied here means the Firestore rule for contactEnquiries isn't published
            console.error(`Enquiry could not be saved (${error.code || 'unknown error'})`, error);
            setStatus('fallback');
        }
    };

    if (status === 'done') {
        return (
            <div className="flex flex-col items-center py-10 text-center">
                <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Thank you, we've received your enquiry</h3>
                <p className="mt-2 max-w-md text-slate-600">Our team will get in touch with you shortly.</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-6 font-semibold text-blue-900 hover:underline">
                    Send another enquiry
                </button>
            </div>
        );
    }

    if (status === 'fallback') {
        return (
            <div className="flex flex-col items-center py-10 text-center">
                <h3 className="text-2xl font-bold text-slate-900">One last step</h3>
                <p className="mt-2 max-w-md text-slate-600">
                    Send us your enquiry by email with one tap. Everything you entered is already filled in.
                </p>
                <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Website enquiry: ${form.interest}`)}&body=${encodeURIComponent(summary)}`}
                    className="mt-6 rounded-lg bg-blue-900 px-8 py-3 font-bold text-white hover:bg-blue-800"
                >
                    Send by email
                </a>
                <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-sm font-semibold text-slate-500 hover:text-blue-900">
                    ← Back to the form
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-5 text-left sm:grid-cols-2">
            <Field label="Full name">
                <input required maxLength={100} value={form.name} onChange={update('name')} className={inputClass} placeholder="Your name" autoComplete="name" />
            </Field>
            <Field label="Phone">
                <input required type="tel" pattern="[0-9+\-\s]{10,15}" title="10 to 15 digits" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+91 98765 43210" autoComplete="tel" />
            </Field>
            <Field label="Email">
                <input required type="email" maxLength={200} value={form.email} onChange={update('email')} className={inputClass} placeholder="you@company.com" autoComplete="email" />
            </Field>
            <Field label="Organisation / college (optional)">
                <input maxLength={200} value={form.organisation} onChange={update('organisation')} className={inputClass} placeholder="Company or institution" autoComplete="organization" />
            </Field>
            <Field label="I'm interested in" className="sm:col-span-2">
                <select value={form.interest} onChange={update('interest')} className={inputClass}>
                    {!knownOptions.has(form.interest) && <option>{form.interest}</option>}
                    <option>{GENERAL}</option>
                    {optionGroups.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                            {group.options.map((option) => <option key={option}>{option}</option>)}
                        </optgroup>
                    ))}
                </select>
            </Field>
            <Field label="Message (optional)" className="sm:col-span-2">
                <textarea rows="4" maxLength={2000} value={form.message} onChange={update('message')} className={inputClass} placeholder="Tell us about your requirement, team size, preferred dates…" />
            </Field>
            <div className="sm:col-span-2">
                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full rounded-lg bg-blue-900 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-blue-800 disabled:opacity-60"
                >
                    {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                </button>
                <p className="mt-3 text-center text-xs text-slate-400">We only use your details to respond to your enquiry.</p>
            </div>
        </form>
    );
};

export default ContactForm;
