import React from 'react';
import SectionReveal from './SectionReveal';

const simulations = [
    {
        title: "HR Management Simulation",
        purpose: "Practical exposure to strategic HR functioning through real-time crisis and operational simulation.",
        objectives: ["Understanding HR KRA & sub-functions", "Role alignment in HR department", "Corporate HR culture awareness", "Skill assessment platforming"],
        structure: ["HR Concepts (4 hrs)", "Role Description (4 hrs)", "Role Transactions (4 hrs)", "Normal Mode Game (4 hrs)", "Crisis Simulation (8 hrs)"],
        impact: "Bridges the gap between academic HR theory and high-pressure corporate realities, fostering immediate deployment readiness.",
        target: "HR Professionals & Management Students",
        duration: "24 Hours (Structured Modules)"
    },
    {
        title: "Supply Chain Simulation",
        purpose: "An immersive deep-dive into the logistical and operational bottlenecks that dictate profit margins.",
        objectives: ["SCM KRA understanding", "Role mapping across the supply network", "Risk scenario mitigation", "Practical operations management"],
        structure: ["Core SCM Concepts (4 hrs)", "Network Mapping (4 hrs)", "Procurement Transactions (4 hrs)", "Normal Operations (4 hrs)", "Supply Shock/Crisis (8 hrs)"],
        impact: "Builds resilient supply chain leaders capable of maintaining operational continuity during severe market disruptions.",
        target: "SCM Professionals & Operations Managers",
        duration: "24 Hours (Structured Modules)"
    },
    {
        title: "Project Management Simulation",
        purpose: "Master the backbone of service profitability through rigorous baseline adherence training.",
        objectives: ["Planning discipline", "Risk management logs", "Change & claim handling logic", "Cost baseline adherence under pressure"],
        structure: ["Core PM Concepts (16 hrs)", "Normal Project Simulation (4 hrs)", "Constraint/Crisis Simulation (4 hrs)"],
        impact: "Drastically reduces scope creep and cost overruns by embedding strict change control and risk anticipation behaviors.",
        target: "Project Managers & Delivery Heads",
        duration: "24 Hours (Structured Modules)"
    },
    {
        title: "B2B Marketing Simulation",
        purpose: "Navigate complex corporate purchasing ecosystems and long sales cycles.",
        objectives: ["TAM/TSM analysis", "Stakeholder mapping (Economic buyer vs Technical buyer)", "Value proposition engineering"],
        structure: ["Market Concepts (8 hrs)", "Account Planning (4 hrs)", "Pitch Simulation (4 hrs)", "Negotiation & Close (8 hrs)"],
        impact: "Shortens B2B sales cycles and improves win rates in high-value corporate bids.",
        target: "B2B Sales & Marketing Teams",
        duration: "24 Hours (Structured Modules)"
    },
    {
        title: "B2C Marketing Simulation",
        purpose: "Master consumer psychology, brand positioning, and mass-market reach methodologies.",
        objectives: ["Brand positioning", "Campaign ROI analysis", "Consumer touchpoint mapping"],
        structure: ["Consumer Behavior (8 hrs)", "Campaign Design (8 hrs)", "Market Launch Simulation (8 hrs)"],
        impact: "Optimizes marketing spend and improves brand perception metrics across diverse demographics.",
        target: "Brand Managers & Marketing Executives",
        duration: "24 Hours (Structured Modules)"
    },
    {
        title: "Contract & Risk Simulation",
        purpose: "Experiential training in anticipating, documenting, and mitigating severe commercial risks.",
        objectives: ["Compliance tracking systems", "Risk vs opportunity analysis", "Change & claim management protocols"],
        structure: ["Legal Frameworks (8 hrs)", "Contract Auditing (8 hrs)", "Dispute Resolution Simulation (8 hrs)"],
        impact: "Protects organizational revenue by fostering a proactive, process-based approach to commercial agreements.",
        target: "Commercial Managers & Senior Execs",
        duration: "24 Hours (Structured Modules)"
    }
];

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
