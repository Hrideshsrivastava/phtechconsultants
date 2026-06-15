import React from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from './SectionReveal';

/**
 * ServiceLayout Component
 * A reusable template for dedicated service pages (e.g., HR-OD, SCM).
 * Enforces a corporate, authoritative structure with large typography and ample whitespace.
 */
const ServiceLayout = ({
    title,
    subtitle,
    philosophy,
    offerings,
    approach,
    impact
}) => {
    return (
        <div className="flex flex-col mb-16">

            {/* Hero Section */}
            <SectionReveal className="bg-blue-900 text-white rounded-2xl p-8 md:p-12 lg:p-20 text-center mb-16 shadow-md mx-4 lg:mx-0 border border-blue-800">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                    {title}
                </h1>
                <p className="text-xl md:text-2xl font-light text-blue-100 max-w-3xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            </SectionReveal>

            {/* Service Philosophy */}
            <SectionReveal delay={0.1} className="max-w-4xl mx-auto text-center mb-24 px-4">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 block">Our Philosophy</span>
                <h2 className="text-3xl font-bold text-blue-900 leading-tight mb-6 tracking-tight">
                    Strategic Positioning
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    {philosophy}
                </p>
            </SectionReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto px-4 w-full mb-24">
                {/* Key Offerings / Focus Areas */}
                <SectionReveal delay={0.2} className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Key Priorities</h3>
                    <ul className="space-y-4">
                        {offerings.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="text-blue-900 mr-4 font-bold opacity-50 block mt-1">0{idx + 1}</span>
                                <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </SectionReveal>

                {/* Impact & Approach */}
                <div className="flex flex-col space-y-16">
                    <SectionReveal delay={0.3}>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Business Impact</h3>
                        <div className="flex flex-wrap gap-3">
                            {impact.map((item, idx) => (
                                <span key={idx} className="bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded border border-slate-200 text-sm shadow-sm">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.4}>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Approach</h3>
                        <p className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-lg border-l-4 border-blue-900">
                            {approach}
                        </p>
                    </SectionReveal>
                </div>
            </div>

            {/* CTA Section */}
            <SectionReveal delay={0.2} className="bg-slate-50 border-t border-b border-slate-200 py-16 text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Initiate Transformation</h2>
                    <p className="text-slate-600 mb-8 font-medium">
                        Contact our advisory team to discuss aligning your specific organizational requirements with our proven methodologies.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/contact"
                            className="bg-blue-900 text-white font-bold py-4 px-10 rounded-lg shadow-sm hover:bg-blue-800 transition-colors"
                        >
                            Contact Advisory
                        </Link>
                        <Link
                            to="/services"
                            className="bg-white text-blue-900 font-bold py-4 px-10 rounded-lg shadow-sm border border-slate-300 hover:bg-slate-50 transition-colors"
                        >
                            All Services
                        </Link>
                    </div>
                </div>
            </SectionReveal>

        </div>
    );
};

export default ServiceLayout;
