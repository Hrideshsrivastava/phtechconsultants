import React from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from './SectionReveal';

const ProductsPage = () => {
    return (
        <div className="flex flex-col max-w-5xl mx-auto py-8 px-4">

            <SectionReveal className="text-center mb-16">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 block">Enterprise Software Solutions</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
                    KRA Analysis Suite
                </h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light max-w-3xl mx-auto">
                    A dedicated analytical platform engineered to resolve role ambiguity, enforce KPI alignment, and radically improve organizational productivity.
                </p>
            </SectionReveal>

            {/* Product Showcase Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-16 md:mb-20 bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-slate-200">

                {/* Left: The Challenge */}
                <SectionReveal delay={0.1}>
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                            <span className="bg-red-100 text-red-800 w-8 h-8 rounded flex items-center justify-center mr-3 text-sm">01</span>
                            The Organizational Problem
                        </h3>
                        <p className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-lg border-l-4 border-slate-300">
                            As organizations scale, job roles naturally bleed into one another. This results in severe KRA (Key Result Area) overlap, unclear priorities, and an inability to accurately measure individual performance against corporate strategy. The outcome is often low productivity, inter-departmental conflict, and reactive firefighting.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                            <span className="bg-blue-100 text-blue-900 w-8 h-8 rounded flex items-center justify-center mr-3 text-sm">02</span>
                            The Engineered Solution
                        </h3>
                        <p className="text-slate-600 leading-relaxed bg-blue-50/50 p-6 rounded-lg border-l-4 border-blue-900">
                            Our proprietary <strong>KRA Analysis Tool</strong> is a structured software intervention that forces absolute role clarity. It dynamically maps individual KPIs to exact organizational mandates, exposing overlaps and vacuums in real-time.
                        </p>
                    </div>
                </SectionReveal>

                {/* Right: The Benefits List */}
                <SectionReveal delay={0.2} className="bg-slate-900 text-white p-6 md:p-10 rounded-xl shadow-lg border border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 md:p-16 opacity-10">
                        <svg className="w-32 h-32 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-8 relative z-10">Systemic Benefits</h3>
                    <ul className="space-y-6 relative z-10">
                        <li className="flex items-start">
                            <span className="text-blue-400 mr-4 mt-1">✔</span>
                            <div>
                                <strong className="block text-blue-100 mb-1">Avoid Structural Overlap</strong>
                                <span className="text-slate-400 text-sm">Identify and eliminate redundant tasks being performed by multiple roles simultaneously.</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-400 mr-4 mt-1">✔</span>
                            <div>
                                <strong className="block text-blue-100 mb-1">Align Jobs with Strategy</strong>
                                <span className="text-slate-400 text-sm">Create a clear Line of Sight (LoS) between daily operations and macro-level business goals.</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-400 mr-4 mt-1">✔</span>
                            <div>
                                <strong className="block text-blue-100 mb-1">Improve Productivity & Motivation</strong>
                                <span className="text-slate-400 text-sm">Clarity breeds execution. When employees know exactly how they are measured, output naturally increases.</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-400 mr-4 mt-1">✔</span>
                            <div>
                                <strong className="block text-blue-100 mb-1">Reduce Workplace Conflict</strong>
                                <span className="text-slate-400 text-sm">Clear boundaries prevent operational disputes and "turf wars" between expanding departments.</span>
                            </div>
                        </li>
                    </ul>
                </SectionReveal>

            </div>

            {/* Clean CTA */}
            <SectionReveal delay={0.3} className="text-center py-8 md:py-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Digitize Your Role Architecture</h2>
                <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                    Schedule a brief technical demonstration to see how the KRA Analysis Tool maps the exact structure of your current workforce.
                </p>
                <Link
                    to="/contact"
                    className="inline-block w-full sm:w-auto bg-blue-900 text-white font-bold py-4 px-10 rounded-lg shadow-sm hover:bg-blue-800 transition-colors"
                >
                    Request Software Demo
                </Link>
            </SectionReveal>

        </div>
    );
};

export default ProductsPage;
