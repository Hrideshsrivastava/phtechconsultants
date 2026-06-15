import React from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from './SectionReveal';

const trainingCategories = [
    {
        category: "Performance & Planning",
        workshops: [
            {
                title: "Annual Work Plan Booster Workshop",
                purpose: "Enables management to create realistic, KRA-driven Annual Work Plans aligned with strategic objectives.",
                content: ["Brain-stimulating alignment game", "Self job analysis using KRA", "KPI definition aligned with KRA", "Business strategy alignment", "One-to-many presentation method"],
                impact: ["Performance-focused mindset", "Structured KRA-driven execution", "Better organizational value creation"],
                target: "Senior Management Executives",
                duration: "3 Hours",
                group: "12–15 participants"
            },
            {
                title: "Performance Excellence Workshop",
                purpose: "Builds performance excellence through structured KRA-KPI based self-analysis for operationally overloaded professionals.",
                content: ["Self job analysis using KRA & KPI", "Transaction point analysis", "Perception point analysis", "Growth action plan"],
                impact: ["Strong service orientation", "Structured execution", "Improved communication"],
                target: "Employees & Senior Executives",
                duration: "8 Hours",
                group: "8–12 participants"
            },
            {
                title: "Competence Audit & Mapping",
                purpose: "Builds structured competence management systems to optimize internal talent instead of frequent external hiring.",
                content: ["Competence requirement analysis", "Competence gap analysis", "Capability planning", "Development roadmap"],
                impact: ["Competence-driven culture", "Reduced talent loss", "Stronger capability planning"],
                target: "HR & Line Managers",
                duration: "8 Hours",
                group: "8–12 participants"
            }
        ]
    },
    {
        category: "Leadership & Team",
        workshops: [
            {
                title: "Penta-Power (High Performance Team)",
                purpose: "Identifies performance gaps and builds high-performance team culture as chemistry weakens during organizational growth.",
                content: ["Team job analysis", "Penta-Power framework", "Inter-team dependency mapping", "Communication style evaluation"],
                impact: ["Improved collaboration", "Reduced silos", "Open communication culture"],
                target: "Employees & Senior Management",
                duration: "8 Hours",
                group: "8–12 participants"
            },
            {
                title: "Leadership Development",
                purpose: "Equips emerging managers with foundational emotional intelligence and strategic alignment skills to lead cross-functional teams.",
                content: ["Emotional Intelligence profiling", "Conflict resolution models", "Strategic delegation", "Coaching methodologies"],
                impact: ["Resilient leadership pipeline", "Higher team engagement", "Better conflict resolution"],
                target: "Mid to Senior Level Managers",
                duration: "16 Hours (2 Days)",
                group: "12–20 participants"
            },
            {
                title: "Faculty Development",
                purpose: "Uses guided self-analysis and root cause evaluation to enhance academic and institutional performance for educators.",
                content: ["Service planning clarity", "Teaching methodology enhancement", "Presentation skills coaching"],
                impact: ["Improved teaching quality", "Stronger institutional brand perception", "Higher student engagement"],
                target: "Faculty & Academic Leadership",
                duration: "8 Hours",
                group: "20–30 participants"
            }
        ]
    },
    {
        category: "Commercial & Risk",
        workshops: [
            {
                title: "Contract & Risk Management",
                purpose: "Understanding contract structure and risk management is critical for profitability and project success.",
                content: ["Contract requirement analysis", "Compliance tracking", "Risk log creation", "Risk vs opportunity analysis"],
                impact: ["Revenue protection", "Risk anticipation skills", "Improved profitability awareness"],
                target: "Project Teams & Senior Management",
                duration: "8 Hours",
                group: "8–12 participants"
            },
            {
                title: "Project Management Workshop",
                purpose: "Instills the backbone disciplines required for service profitability and baseline schedule adherence.",
                content: ["Planning discipline", "Risk management", "Change & claim handling", "Cost baseline adherence"],
                impact: ["On-time delivery", "Cost control", "Scope creep reduction"],
                target: "Project Managers & Delivery Heads",
                duration: "16 Hours",
                group: "10–15 participants"
            }
        ]
    },
    {
        category: "Career & Employability",
        workshops: [
            {
                title: "Mock Interview for Success (MIFS)",
                purpose: "Simulates high-pressure corporate interview environments to prepare candidates for rigorous selection processes.",
                content: ["Behavioral event interviewing", "Stress testing", "Body language analysis", "Real-time feedback"],
                impact: ["Higher selection rates", "Confidence building", "Clear articulation of value"],
                target: "Campus Graduates & Early Career Professionals",
                duration: "4 Hours",
                group: "Individual/Small Groups"
            },
            {
                title: "Pre Placement Program",
                purpose: "Bridges the gap between academic theory and corporate behavioral expectations.",
                content: ["Corporate etiquette", "Email communication", "Time management", "First 90-days planning"],
                impact: ["Smoother onboarding", "Reduced early attrition", "Higher cultural fit"],
                target: "Final Year Students",
                duration: "24 Hours",
                group: "Batch of 40-50"
            },
            {
                title: "Employability Audit",
                purpose: "Provides a standardized baseline metric of a cohort's readiness for the modern workforce.",
                content: ["Aptitude testing", "Situational judgment tests", "Domain-specific capability mapping"],
                impact: ["Data-driven hiring", "Targeted training interventions"],
                target: "Institutions & Corporate HR",
                duration: "Custom",
                group: "Organization Wide"
            }
        ]
    }
];

const WorkshopCard = ({ ws }) => (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-blue-900 mb-4 leading-snug">
                {ws.title}
            </h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
                {ws.purpose}
            </p>

            {ws.content && (
                <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 block border-b border-slate-100 pb-2">Content</h4>
                    <ul className="space-y-1.5">
                        {ws.content.map((item, idx) => (
                            <li key={idx} className="flex items-start text-sm text-slate-700">
                                <span className="text-blue-900 mr-2 font-bold shrink-0">·</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {ws.impact && (
                <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 block border-b border-slate-100 pb-2">Impact</h4>
                    <div className="flex flex-wrap gap-2">
                        {ws.impact.map((item, idx) => (
                            <span key={idx} className="bg-slate-50 text-slate-600 text-xs px-2.5 py-1 rounded border border-slate-200">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-auto pt-5 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                <div>
                    <span className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider">Target</span>
                    <span className="text-slate-800 font-medium">{ws.target}</span>
                </div>
                <div>
                    <span className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider">Duration</span>
                    <span className="text-slate-800 font-medium">{ws.duration}</span>
                </div>
            </div>

            <Link to="/contact" className="block text-center mt-6 w-full bg-blue-50 text-blue-900 font-bold py-2.5 rounded-md border border-blue-100 hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-colors duration-300">
                Inquire Availability
            </Link>
        </div>
    </div>
);

const TrainingPage = () => {
    return (
        <div className="flex flex-col max-w-6xl mx-auto py-8">

            <SectionReveal className="text-center mb-16 md:mb-20 px-4 md:px-0">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 block">Corporate Training</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
                    Executive Workshops
                </h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light max-w-3xl mx-auto">
                    Intensive, structured interventions designed to close competence gaps, align personal performance with organizational KRAs, and upskill cross-functional leadership.
                </p>
            </SectionReveal>

            <div className="space-y-16 md:space-y-24">
                {trainingCategories.map((category, idx) => (
                    <div key={idx} className="px-4">
                        <SectionReveal>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 border-b-2 border-slate-100 pb-4 inline-block">
                                {category.category}
                            </h2>
                        </SectionReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                            {category.workshops.map((ws, wIdx) => (
                                <SectionReveal key={wIdx} delay={wIdx * 0.1} className="h-full">
                                    <WorkshopCard ws={ws} />
                                </SectionReveal>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default TrainingPage;
