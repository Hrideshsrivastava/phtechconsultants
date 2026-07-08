import React from 'react';
import SectionReveal from '../SectionReveal';

const PrivacyPolicy = () => {
    return (
        <div className="w-full flex flex-col items-center py-16 relative min-h-screen bg-slate-50">
            <SectionReveal className="w-full max-w-4xl px-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/50 p-8 md:p-12">
                    <h1 className="text-4xl font-extrabold text-blue-900 mb-8 tracking-tight border-b border-slate-200 pb-6">
                        Privacy Policy
                    </h1>
                    
                    <div className="space-y-8 text-slate-600 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Information We Collect</h2>
                            <p>
                                At PHTech Consultants, we collect information that you provide directly to us when you use our website, services, or participate in our training and LMS programs. This may include your name, email address, professional details, and performance data from assessments.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. How We Use Your Information</h2>
                            <p>
                                We use the information we collect to provide, maintain, and improve our services. Specifically, we use your data to:
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Authenticate your access to the Learning Management System (LMS).</li>
                                <li>Track your progress and scores in various assessments and modules.</li>
                                <li>Communicate with you regarding our services, updates, and support.</li>
                                <li>Improve the quality and relevance of our consulting and training programs.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Data Security and Sharing</h2>
                            <p>
                                We implement industry-standard security measures to protect your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as required by law or to trusted third parties who assist us in operating our website and conducting our business, so long as those parties agree to keep this information confidential.
                            </p>
                        </section>
                        
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Third-Party Authentication</h2>
                            <p>
                                Our LMS utilizes Google Sign-In for secure authentication. When you choose to log in via Google, we receive basic profile information (such as your name and email) subject to your Google account privacy settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Contact Us</h2>
                            <p>
                                If you have any questions regarding this Privacy Policy, please contact us at: <a href="mailto:info@phtechconsultant.com" className="text-blue-600 hover:underline">info@phtechconsultant.com</a>.
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

export default PrivacyPolicy;
