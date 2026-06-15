import React from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from './SectionReveal';

const consultingServices = [
    {
        path: "/services/hr-od",
        title: "HR & Organisation Development",
        description: "Build robust organizational structures with motivated, capable teams aligned to business objectives. Comprehensive design, competence management, and engagement strategies.",
    },
    {
        path: "/services/scm",
        title: "Supply Chain Services",
        description: "Establish and troubleshoot supply chain functions for operational efficiency. Includes strategy support, critical roadblock resolution, and SC audits.",
    },
    {
        path: "/services/ipa",
        title: "Information Process Automation",
        description: "Accelerate data analysis speed and internal communication leveraging macro tools, SharePoint solutions, and IMS data repository designs.",
    },
    {
        path: "/services/ppm",
        title: "Program & Project Management",
        description: "Execute with absolute control over risk, cost, time, and resources via strategic dashboards, baseline tracking, and robust planning methodologies.",
    },
    {
        path: "/services/mrbd",
        title: "Market Research & Business Development",
        description: "Establish expanding business networks and technical registrations for market dominance. Holistic SWOT, TAM/TSM analysis, and distributor network setup.",
    }
];

const ServicesPage = () => {
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
