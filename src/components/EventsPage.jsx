import React from 'react';
import SectionReveal from './SectionReveal';

const clients = [
    "Nokia Siemens Networks",
    "Huawei",
    "HCL",
    "Tech Mahindra",
    "Fujitsu",
    "Reliance",
    "Bharti",
    "ITI",
    "Adani",
    "HLL Lifecare",
    "Delhi Metro",
    "NIESBUD",
    "Johnson Lifts",
    "Ministry of Labour & Employment"
];

const EventsPage = () => {
    return (
        <div className="flex flex-col max-w-6xl mx-auto py-8 px-4">

            <SectionReveal className="text-center mb-20">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 block">Corporate Engagements</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
                    Capabilities Delivered
                </h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light max-w-3xl mx-auto">
                    We have successfully executed strategic consulting alignment and human capital transformations for industry leaders across telecommunications, public utilities, and infrastructure.
                </p>
            </SectionReveal>

            {/* Upcoming Events Placeholder */}
            <SectionReveal delay={0.1}>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 md:p-10 text-center mb-16 md:mb-24 shadow-sm mx-4 lg:mx-0">
                    <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Upcoming Engagements</h2>
                    <p className="text-slate-500 max-w-md mx-auto">
                        Currently running closed-door corporate interventions. Contact our advisory board to schedule a slot in our upcoming open-house public simulation cohorts.
                    </p>
                </div>
            </SectionReveal>

            {/* Past Corporate Engagements (Clients) */}
            <SectionReveal delay={0.2} className="mb-20">
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-extrabold text-blue-900 mb-4 tracking-tight">Past Corporate Engagements</h2>
                    <div className="w-20 h-1 bg-blue-900 mb-12"></div>

                    <div className="w-full bg-white border border-slate-100 shadow-sm rounded-2xl p-6 md:p-14">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                            {clients.map((client, idx) => (
                                <div key={idx} className="flex items-center justify-center text-center group">
                                    <span className="text-lg md:text-xl font-bold text-slate-400 group-hover:text-blue-900 transition-colors duration-300">
                                        {client}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionReveal>

        </div>
    );
};

export default EventsPage;
