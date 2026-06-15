import React, { useState } from 'react';
import SectionReveal from './SectionReveal';

const trainers = [
    {
        name: "Vivek Srivastava",
        role: "Founder & Lead Assessor",
        experience: "20+ Years Experience",
        certifications: ["HR Certification – IIM Lucknow", "Electronics Engineering Graduate"],
        highlights: ["Trained 5000+ Professionals Globally", "Visiting Faculty – IIT Roorkee", "Gold Medallist HR Manager", "Author of Performance Management papers"],
        focus: "Telecom, PSU, Education sectors",
        bio: "Mr. Vivek is a seasoned competence development strategist and a People development professional of international repute. He has conducted training programs for top Telecom MNC’s & many reputed Indian organizations. Vivek with consistently ranked among top performers, his presentations and workshops are well known for high quality content backed by his unique and engaging style of delivery. His energizing sessions are insightful and stimulate participants to unleash their innate energies, explore their potential and create an intense desire for performance excellence.",
        links: { linkedin: "in.linkedin.com/in/vivekksindia/", youtube: "http://youtu.be/7VmmiF2pAlo" }
    },
    {
        name: "Dr. P.C. Srivastava",
        role: "Senior Consultant",
        experience: "Extensive Corporate Experience",
        certifications: ["PhD in Business Administration"],
        highlights: ["Corporate Strategy Advisory", "Sales Mechanism Architecture"],
        focus: "Sales & Business Strategy",
        bio: "Driving rigorous, data-backed sales architectures and high-level business strategy for transitioning enterprise clients."
    },
    {
        name: "Garima Arora",
        role: "Culture Analyst",
        experience: "15+ Years Experience",
        certifications: ["Organizational Psychology"],
        highlights: ["Culture Audit Leadership", "Change Management Architect"],
        focus: "People & Culture Development",
        bio: "Specializing in the diagnosis and restructuring of corporate cultures to support rapid organizational scaling."
    },
    {
        name: "Komal Chopra",
        role: "Behavioral Coach",
        experience: "12+ Years Experience",
        certifications: ["Certified Executive Coach"],
        highlights: ["Emotional Intelligence Frameworks", "Soft Skills Amplification"],
        focus: "Human Values & Soft Skills",
        bio: "Aligning human values with corporate deliverables through intensive soft-skills and behavioral coaching paradigms."
    },
    {
        name: "A.K. Saha",
        role: "SCM Strategist",
        experience: "25+ Years Experience",
        certifications: ["Supply Chain Optimization"],
        highlights: ["Logistics Network Design", "Advanced Corporate Negotiation"],
        focus: "Supply Chain & Negotiation",
        bio: "Expertise in resolving critical supply chain bottlenecks and securing highly favorable corporate contracts through advanced negotiation tactics."
    },
    {
        name: "Anil Kumar Kaushik",
        role: "Financial Advisor",
        experience: "20+ Years Experience",
        certifications: ["Corporate Governance"],
        highlights: ["Financial Re-structuring", "Risk Governance"],
        focus: "Finance & Governance",
        bio: "Providing stringent financial oversight, risk auditing, and corporate governance frameworks for sustainable profitability."
    },
    {
        name: "Deepak Sharma",
        role: "Leadership Coach",
        experience: "18+ Years Experience",
        certifications: ["Customer Experience Strategy"],
        highlights: ["Service Delivery Optimization", "C-Suite Leadership Training"],
        focus: "Customer Service & Leadership",
        bio: "Scaling frontline customer service capabilities while simultaneously grooming next-generation corporate leaders."
    },
    {
        name: "Swati Bhandari",
        role: "HR Systems Expert",
        experience: "10+ Years Experience",
        certifications: ["HR Analytics"],
        highlights: ["Lifecycle Management", "Talent Retention Coaching"],
        focus: "HR Lifecycle & Coaching",
        bio: "Architecting end-to-end HR lifecycles that accurately attract, retain, and measure top-tier corporate talent."
    }
];

const TrainerCard = ({ trainer, onClick }) => (
    <div
        onClick={() => onClick(trainer)}
        className="bg-white border border-slate-200 p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full relative overflow-hidden group"
    >
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
        <div className="relative z-10 flex flex-col flex-grow">
            {trainer.name === "Vivek Srivastava" && (
                <span className="bg-blue-900 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded inline-block self-start mb-3">Lead Partner</span>
            )}
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{trainer.name}</h3>
            <p className="text-blue-900 font-semibold mb-4 text-sm uppercase tracking-wide">{trainer.focus}</p>

            <div className="space-y-2 mb-6 text-slate-600 text-sm flex-grow">
                <p className="flex items-center"><span className="text-slate-400 mr-2">✦</span> {trainer.experience}</p>
                <p className="flex items-start"><span className="text-slate-400 mr-2 mt-0.5">✦</span> <span>{trainer.highlights[0]}</span></p>
            </div>

            <div className="text-blue-900 text-sm font-bold flex items-center group-hover:text-blue-700">
                Read Full Profile
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
        </div>
    </div>
);

const TrainersPage = () => {
    const [selectedTrainer, setSelectedTrainer] = useState(null);

    // Split trainers (Lead vs Others)
    const leadTrainer = trainers[0];
    const experts = trainers.slice(1);

    return (
        <div className="flex flex-col max-w-6xl mx-auto py-8 px-4 relative">

            <SectionReveal className="text-center mb-16">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 block">Consultancy Network</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
                    Executive Subject Matter Experts
                </h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light max-w-3xl mx-auto">
                    Our interventions are delivered by seasoned industry veterans. We deploy individuals with decades of Tier-1 corporate experience, not career academics.
                </p>
            </SectionReveal>

            {/* Featured Lead Assessor */}
            <SectionReveal delay={0.1} className="mb-20">
                <div className="bg-blue-900 text-white rounded-2xl p-6 md:p-12 shadow-xl border border-blue-800 flex flex-col md:flex-row gap-8 md:gap-10">
                    <div className="md:w-1/3 flex flex-col">
                        <div className="bg-white/10 w-full aspect-square rounded-xl flex items-center justify-center mb-6 overflow-hidden border border-blue-700/50">
                            {/* 
                 A placeholder for the actual photo. Using initials for an executive look. 
                 Replace with an img tag pointing to the actual photo if available.
               */}
                            <span className="text-6xl font-light text-blue-200">VS</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-1">{leadTrainer.name}</h2>
                        <p className="text-blue-300 font-bold uppercase tracking-wider text-sm mb-6">{leadTrainer.role}</p>

                        <div className="space-y-4">
                            <a href={`https://${leadTrainer.links.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center text-blue-200 hover:text-white transition-colors">
                                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                LinkedIn Profile
                            </a>
                            <a href={leadTrainer.links.youtube} target="_blank" rel="noreferrer" className="flex items-center text-blue-200 hover:text-white transition-colors">
                                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                                Session Video
                            </a>
                        </div>
                    </div>

                    <div className="md:w-2/3 border-l md:border-t-0 border-blue-800 pt-8 md:pt-0 md:pl-10">
                        <h3 className="text-xl font-bold mb-4">Executive Summary</h3>
                        <p className="text-blue-100 leading-relaxed font-light mb-8">
                            {leadTrainer.bio}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 border-b border-blue-800 pb-1">Certifications</h4>
                                <ul className="space-y-1">
                                    {leadTrainer.certifications.map((cert, idx) => (
                                        <li key={idx} className="text-sm font-medium text-blue-50">{cert}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 border-b border-blue-800 pb-1">Highlights</h4>
                                <ul className="space-y-1">
                                    {leadTrainer.highlights.slice(0, 2).map((h, idx) => (
                                        <li key={idx} className="text-sm font-medium text-blue-50">{h}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionReveal>

            {/* Other Experts Grid */}
            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">Practice Leaders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {experts.map((trainer, idx) => (
                    <SectionReveal key={idx} delay={idx * 0.1}>
                        <TrainerCard trainer={trainer} onClick={setSelectedTrainer} />
                    </SectionReveal>
                ))}
            </div>

            {/* Modal Profile View */}
            {selectedTrainer && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedTrainer(null)}>
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-12 relative overflow-hidden max-h-[90vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedTrainer(null)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                        >
                            ✕
                        </button>

                        <h2 className="text-3xl font-extrabold text-blue-900 mb-1 pr-10">{selectedTrainer.name}</h2>
                        <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-6">{selectedTrainer.focus}</p>

                        <div className="text-slate-700 leading-relaxed font-medium mb-8 p-6 bg-slate-50 border border-slate-100 rounded-lg">
                            {selectedTrainer.bio}
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-200 pb-1">Core Experience</h4>
                                <ul className="space-y-2">
                                    <li className="text-sm font-medium text-slate-800">{selectedTrainer.experience}</li>
                                    {selectedTrainer.highlights.map((h, idx) => (
                                        <li key={idx} className="text-sm font-medium text-slate-800">{h}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-200 pb-1">Certifications</h4>
                                <ul className="space-y-2">
                                    {selectedTrainer.certifications.map((cert, idx) => (
                                        <li key={idx} className="text-sm font-medium text-slate-800">{cert}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TrainersPage;
