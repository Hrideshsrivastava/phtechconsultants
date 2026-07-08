import React from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from '../SectionReveal';

const TestsDashboard = () => {
    return (
        <div className="w-full flex flex-col items-center py-12 relative min-h-screen">
            <div className="absolute inset-0 bg-slate-50 -z-10"></div>
            
            <SectionReveal className="text-center mb-12 max-w-3xl px-4">
                <Link to="/lms" className="text-blue-900 hover:underline text-sm font-bold mb-4 inline-block">&larr; Back to LMS Dashboard</Link>
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
                    Tests & Assessments
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    Choose an assessment to evaluate your professional capabilities.
                </p>
            </SectionReveal>

            <div className="w-full max-w-5xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link to="/lms/tests/employability" className="group block">
                    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-slate-200/50 hover:shadow-md hover:border-blue-300 transition-all duration-300 h-full flex flex-col md:flex-row items-center text-center md:text-left">
                        <div className="w-20 h-20 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6 md:mb-0 md:mr-8 shrink-0 border border-blue-100 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">Employability Assessment</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium mb-4">
                                A comprehensive test to evaluate your professional readiness, problem-solving skills, and teamwork.
                            </p>
                            <div className="inline-flex items-center text-blue-900 font-bold text-sm bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 group-hover:bg-blue-100 transition-colors">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                60 seconds
                            </div>
                        </div>
                    </div>
                </Link>
                {/* Future tests can go here */}
            </div>
        </div>
    );
};

export default TestsDashboard;
