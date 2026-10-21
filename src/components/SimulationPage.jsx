import React from 'react';
import SectionReveal from './SectionReveal';
import { simulations } from '../data/simulations';

const SimulationPage = () => {
    return (
        <div className="flex flex-col max-w-6xl mx-auto py-8">

            {/* Premium Header */}
            <SectionReveal className="text-center mb-16 md:mb-24 bg-blue-900 text-white rounded-2xl mx-4 lg:mx-0 p-8 md:p-12 lg:p-20 shadow-lg border border-blue-800">
                <span className="text-sm font-bold uppercase tracking-widest text-blue-300 mb-6 block">Executive Modalities</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                    Simulation-Based <br className="hidden md:block" />Capability Development
                </h1>
                <p className="text-lg md:text-xl text-blue-100 leading-relaxed font-light max-w-3xl mx-auto">
                    Advanced experiential learning programs. We replicate the pressure, ambiguity, and critical decision-making environments of Tier-1 corporate operations to accelerate executive capability.
                </p>
            </SectionReveal>

            {/* Simulations Grid */}
            <div className="space-y-16 px-4">
                {simulations.map((sim, idx) => (
                    <SectionReveal key={idx} delay={0.1} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">

                        {/* Left Block - Title & Impact */}
                        <div className="md:w-5/12 bg-slate-50 p-6 md:p-12 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-center relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-900"></div>
                            <h2 className="text-3xl font-bold text-blue-900 mb-4">{sim.title}</h2>
                            <p className="text-slate-600 lg:text-lg mb-8 font-medium leading-relaxed">{sim.purpose}</p>

                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">Business Impact</span>
                                <p className="text-sm text-slate-700 font-medium italic border-l-2 border-blue-300 pl-3 py-1">
                                    "{sim.impact}"
                                </p>
                            </div>
                        </div>

                        {/* Right Block - Details */}
                        <div className="md:w-7/12 p-6 md:p-12 flex flex-col justify-center">

                            <div className="mb-8">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center">
                                    <span className="w-4 h-px bg-slate-300 mr-3"></span> Learning Objectives
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {sim.objectives.map((obj, oIdx) => (
                                        <li key={oIdx} className="flex items-start text-sm text-slate-600">
                                            <svg className="w-5 h-5 text-blue-900 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            {obj}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-0">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center">
                                    <span className="w-4 h-px bg-slate-300 mr-3"></span> Modular Structure
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {sim.structure.map((mod, mIdx) => (
                                        <span key={mIdx} className="bg-white border border-slate-200 text-slate-700 text-xs py-1.5 px-3 rounded-full shadow-sm">
                                            {mod}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <span className="block text-xs text-slate-400 uppercase tracking-widest mb-1">Target Audience</span>
                                    <span className="text-sm font-bold text-slate-800">{sim.target}</span>
                                </div>
                                <div className="sm:text-right">
                                    <span className="block text-xs text-slate-400 uppercase tracking-widest mb-1">Total Duration</span>
                                    <span className="text-sm font-bold text-slate-800">{sim.duration}</span>
                                </div>
                            </div>

                        </div>

                    </SectionReveal>
                ))}
            </div>

        </div>
    );
};

export default SimulationPage;
