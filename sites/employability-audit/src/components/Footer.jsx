import React from 'react';
import Icon from './Icon';
import { MAIN_SITE_URL, contact } from '../data/program';

const Footer = () => (
    <footer className="bg-slate-950 py-14 text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
            <div>
                <a href={MAIN_SITE_URL} className="flex items-baseline">
                    <span className="text-2xl font-extrabold tracking-tight text-white">PHTech</span>
                    <span className="ml-1 text-2xl font-medium text-slate-500">Consultant</span>
                </a>
                <p className="mt-3 max-w-sm text-sm">
                    The Employability Audit is a programme by PH Tech Consultants, which also offers consulting, corporate training and simulations.
                </p>
                <a href={MAIN_SITE_URL} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200">
                    Explore the main website <Icon name="arrow" className="h-4 w-4" />
                </a>
            </div>
            <div className="space-y-2 text-sm">
                <a href={contact.phoneHref} className="flex items-center gap-2 hover:text-white"><Icon name="phone" className="h-4 w-4" /> {contact.phone}</a>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white"><Icon name="mail" className="h-4 w-4" /> {contact.email}</a>
                <p className="pt-3 text-xs text-slate-500">© {new Date().getFullYear()} PH Tech Consultants. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
