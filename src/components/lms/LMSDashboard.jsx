import React from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from '../SectionReveal';
import { useAuth } from '../../contexts/AuthContext';

const LMSDashboard = () => {
    const { currentUser, logout } = useAuth();

    return (
        <div className="w-full flex flex-col items-center py-12 relative min-h-screen">
            <div className="absolute inset-0 bg-slate-50 -z-10"></div>

            <SectionReveal className="text-center mb-12 max-w-3xl px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
                    Welcome, {currentUser?.displayName || 'User'}!
                </h1>

                <button
                    onClick={logout}
                    className="text-sm font-bold text-slate-500 hover:text-blue-900 underline"
                >
                    Log Out
                </button>
            </SectionReveal>

            <div className="w-full max-w-5xl px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Link to="/lms/tests" className="group block">
                    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-slate-200/50 hover:shadow-md hover:border-blue-300 transition-all duration-300 h-full flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">Tests & Assessments</h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            Evaluate your skills, take professional readiness tests, and track your progress.
                        </p>
                    </div>
                </Link>
                {/* Future modules can be added here */}
            </div>
        </div>
    );
};

export default LMSDashboard;
