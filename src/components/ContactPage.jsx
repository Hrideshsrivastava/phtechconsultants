import React from 'react';
import SectionReveal from './SectionReveal';

const ContactPage = () => (
    <div className="flex flex-col max-w-4xl mx-auto py-12 px-4">
        <SectionReveal className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 tracking-tight">Executive Advisory Board</h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-10 max-w-2xl mx-auto font-medium">
                Ready to align your strategic capabilities and eliminate operational friction? Reach out to schedule a closed-door consultation session.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left max-w-2xl mx-auto bg-slate-50 p-6 md:p-8 rounded-xl border border-slate-100">
                {/* Email Section */}
                <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-900 mr-4 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Direct Outreach</h3>
                        <a href="mailto:info@phtechconsultant.com" className="block text-slate-900 font-bold text-base md:text-lg hover:text-blue-700 transition-colors">
                            <span className="md:hidden">E-Mail</span>
                            <span className="hidden md:inline">info@phtechconsultant.com</span>
                        </a>
                    </div>
                </div>

                {/* Location Section */}
                <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-900 mr-4 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Based In</h3>
                        <p className="text-slate-900 font-bold text-lg">Noida</p>
                    </div>
                </div>

                {/* Phone Section */}
                <div className="flex items-start md:col-span-2">
                    <svg className="w-6 h-6 text-blue-900 mr-4 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Mobile</h3>
                            <a href="tel:8800446350" className="text-slate-900 font-bold text-lg hover:text-blue-700 transition-colors">8800446350</a>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Landline</h3>
                            <a href="tel:+91-120-4565227" className="text-slate-900 font-bold text-lg hover:text-blue-700 transition-colors">+91-120-4565227</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center space-x-6">
                <a href="https://in.linkedin.com/in/vivekksindia/" target="_blank" rel="noreferrer" className="text-blue-900 hover:text-blue-700 font-bold flex items-center transition-colors">
                    Connect on LinkedIn
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
            </div>
        </SectionReveal>
    </div>
);

export default ContactPage;