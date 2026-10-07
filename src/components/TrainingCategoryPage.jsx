import React from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from './SectionReveal';

const WorkshopCard = ({ workshop }) => (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/50 bg-white/90 shadow-sm backdrop-blur-sm">
        <div className="flex flex-grow flex-col p-6 md:p-8">
            <h2 className="mb-4 text-xl font-bold leading-snug text-blue-900">
                {workshop.title}
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-slate-600">
                {workshop.purpose}
            </p>

            <div className="mb-6">
                <h3 className="mb-3 block border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-widest text-slate-500">Content</h3>
                <ul className="space-y-2">
                    {workshop.content.map((item) => (
                        <li key={item} className="flex items-start text-sm text-slate-700">
                            <span className="mr-2 shrink-0 font-bold text-blue-900">·</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-8">
                <h3 className="mb-3 block border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-widest text-slate-500">Impact</h3>
                <div className="flex flex-wrap gap-2">
                    {workshop.impact.map((item) => (
                        <span key={item} className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 text-xs">
                <div>
                    <span className="mb-1 block font-semibold uppercase tracking-wider text-slate-400">Target</span>
                    <span className="font-medium text-slate-800">{workshop.target}</span>
                </div>
                <div>
                    <span className="mb-1 block font-semibold uppercase tracking-wider text-slate-400">Duration</span>
                    <span className="font-medium text-slate-800">{workshop.duration}</span>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
                {workshop.pdfUrl && (
                    <a
                        href={workshop.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-blue-900 bg-blue-900 py-2.5 text-center font-bold text-white transition-colors duration-300 hover:bg-blue-800"
                        aria-label={`View ${workshop.title} programme PDF in a new tab`}
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 3h7v7m0-7L10 14M5 7v12h12v-5" />
                        </svg>
                        View Programme PDF
                    </a>
                )}

                <Link to="/contact" className="block w-full rounded-md border border-blue-100 bg-blue-50 py-2.5 text-center font-bold text-blue-900 transition-colors duration-300 hover:border-blue-900 hover:bg-blue-900 hover:text-white">
                    Inquire Availability
                </Link>
            </div>
        </div>
    </div>
);

const TrainingCategoryPage = ({ category, onBack }) => (
    <div className="flex flex-col pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 pb-4 pt-6">
            <button
                type="button"
                onClick={onBack}
                className="group inline-flex items-center gap-3 rounded-lg border border-slate-300 bg-white/90 px-4 py-2.5 text-sm font-bold text-blue-900 shadow-sm backdrop-blur-sm transition-all hover:-translate-x-1 hover:border-blue-900 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
                aria-label="Return to the training categories"
            >
                <svg className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Training
            </button>
        </div>

        <SectionReveal className="mx-4 mb-16 rounded-2xl border border-blue-800/50 bg-blue-900/90 p-8 text-center text-white shadow-lg backdrop-blur-sm md:p-12 lg:mx-0 lg:p-20">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.24em] text-blue-200">Training Portfolio</span>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                {category.category}
            </h1>
            <p className="mx-auto max-w-3xl text-xl font-light leading-relaxed text-blue-100 md:text-2xl">
                {category.description}
            </p>
        </SectionReveal>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-stretch gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
            {category.workshops.map((workshop, index) => (
                <SectionReveal key={workshop.id} delay={index * 0.1} className="h-full">
                    <WorkshopCard workshop={workshop} />
                </SectionReveal>
            ))}
        </div>

        <SectionReveal delay={0.2} className="mt-20 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">Build the Right Programme Mix</h2>
            <p className="mx-auto mb-8 max-w-2xl font-medium text-slate-600">
                Contact us to adapt these workshops to your audience, organizational context, and desired outcomes.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link to="/contact" className="rounded-lg bg-blue-900 px-10 py-4 font-bold text-white shadow-sm transition-colors hover:bg-blue-800">
                    Contact Advisory
                </Link>
                <button type="button" onClick={onBack} className="rounded-lg border border-slate-300 bg-white px-10 py-4 font-bold text-blue-900 shadow-sm transition-colors hover:bg-slate-50">
                    Back to Training
                </button>
            </div>
        </SectionReveal>
    </div>
);

export default TrainingCategoryPage;
