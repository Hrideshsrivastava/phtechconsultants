import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SectionReveal from './SectionReveal';
import { consultingServices } from '../data/services';

const ServicesPage = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto py-8">

            {/* Overview Header */}
            <SectionReveal className="text-center mb-16 md:mb-20 px-4 md:px-0">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 block">Strategic Consulting</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
                    Advisory &amp; Transformational Services
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed font-light max-w-3xl mx-auto">
                    We architect sustainable competitive advantage through rigorous organizational alignment, optimized supply chains, and automated intelligence.
                </p>
            </SectionReveal>

            {/* Services Stacked List */}
            <div className="flex flex-col space-y-6 px-4 md:px-0">
                {consultingServices.map((svc, idx) => (
                    <SectionReveal key={idx} delay={idx * 0.1}>
                        <Link
                            to={svc.path}
                            state={{
                                serviceTransition: true,
                                returnTo: location.pathname
                            }}
                            className="group block bg-white border border-slate-200 rounded-xl p-6 md:p-10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Subtle hover indicator stripe */}
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex-grow pr-8">
                                    <h2 className="text-2xl font-bold text-blue-900 mb-3 group-hover:text-blue-700 transition-colors">
                                        {svc.title}
                                    </h2>
                                    <p className="text-slate-600 text-base leading-relaxed font-medium">
                                        {svc.description}
                                    </p>
                                </div>

                                {/* Arrow Icon */}
                                <div className="flex-shrink-0 text-slate-400 group-hover:text-blue-900 transition-colors duration-300 self-start md:self-center">
                                    <svg className="w-8 h-8 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
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

export default ServicesPage;
