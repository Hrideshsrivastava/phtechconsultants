import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SectionReveal from '../SectionReveal';

const LMSLogin = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            await loginWithGoogle();
            navigate('/lms');
        } catch (err) {
            setError(err.message || 'Failed to sign in with Google.');
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="w-full flex flex-col items-center py-12 relative min-h-screen justify-center">
            <div className="absolute inset-0 bg-slate-50 -z-10"></div>
            
            <SectionReveal className="w-full max-w-md px-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/50 overflow-hidden p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">LMS Access</h2>
                        <p className="text-slate-600 font-medium text-sm">
                            Please sign in with your Google account to verify your identity and access the assessments.
                        </p>
                    </div>

                    {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100">{error}</div>}

                    <button 
                        disabled={loading}
                        onClick={handleGoogleLogin}
                        className="w-full bg-white text-slate-700 font-bold py-4 px-4 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 hover:shadow-md transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                    >
                        <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Sign in with Google
                    </button>
                </div>
            </SectionReveal>
        </div>
    );
};

export default LMSLogin;
