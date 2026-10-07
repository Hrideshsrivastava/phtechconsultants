import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SectionReveal from './SectionReveal';
import { trainingCategories } from '../data/trainingPrograms';

const TrainingPage = () => {
    const location = useLocation();

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col py-8">
            <SectionReveal className="mb-16 px-4 text-center md:mb-20 md:px-0">
                <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-slate-400">Corporate Training</span>
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-blue-900 md:text-5xl">
                    Executive Workshops
                </h1>
                <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-600 md:text-xl">
                    Explore our capability-development portfolios. Each category brings together focused programmes designed for a shared organizational outcome.
                </p>
            </SectionReveal>

            <div className="flex flex-col space-y-6 px-4 md:px-0">
                {trainingCategories.map((category, index) => (
                    <SectionReveal key={category.id} delay={index * 0.08}>
                        <Link
                            to={`/training/${category.id}`}
                            state={{ trainingTransition: true, returnTo: location.pathname }}
                            className="group relative block overflow-hidden rounded-xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-10"
                        >
                            <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-blue-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                                <div className="flex-grow md:pr-8">
                                    <div className="mb-3 flex flex-wrap items-center gap-3">
                                        <h2 className="text-2xl font-bold text-blue-900 transition-colors group-hover:text-blue-700">
                                            {category.category}
                                        </h2>
                                        <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-900">
                                            {category.workshops.length} {category.workshops.length === 1 ? 'Programme' : 'Programmes'}
                                        </span>
                                    </div>
                                    <p className="text-base font-medium leading-relaxed text-slate-600">
                                        {category.description}
                                    </p>
                                </div>

                                <div className="shrink-0 self-start text-slate-400 transition-colors duration-300 group-hover:text-blue-900 md:self-center">
                                    <svg className="h-8 w-8 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </SectionReveal>
                ))}
            </div>
        </div>
    );
};

export default TrainingPage;
