import React from 'react';
import SectionReveal from '../SectionReveal';

const TermsOfService = () => {
    return (
        <div className="w-full flex flex-col items-center py-16 relative min-h-screen bg-slate-50">
            <SectionReveal className="w-full max-w-4xl px-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/50 p-8 md:p-12">
                    <h1 className="text-4xl font-extrabold text-blue-900 mb-8 tracking-tight border-b border-slate-200 pb-6">
                        Terms of Service
                    </h1>
                    
                    <div className="space-y-8 text-slate-600 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using the PHTech Consultants website, Learning Management System (LMS), and related services, you accept and agree to be bound by the terms and provisions of this agreement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Use of Services</h2>
                            <p>
                                You agree to use our services and LMS for lawful purposes only. You must not use our platform to distribute malicious content, attempt unauthorized access, or engage in any activity that disrupts the normal functioning of our educational and consulting modules.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Intellectual Property</h2>
                            <p>
                                All content provided on this website, including but not limited to assessment questions, training materials, text, graphics, logos, and software, is the property of PHTech Consultants and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. User Accounts</h2>
                            <p>
                                Access to certain features, such as the LMS, requires account registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. We reserve the right to suspend or terminate accounts that violate these terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Disclaimer of Warranties</h2>
                            <p>
                                The materials and services on PHTech Consultants' website are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                        </section>
                        
                        <p className="text-sm text-slate-400 pt-8 border-t border-slate-100 mt-12">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </SectionReveal>
        </div>
    );
};

export default TermsOfService;
