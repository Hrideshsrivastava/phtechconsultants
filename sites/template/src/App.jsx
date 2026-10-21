import React from 'react';

// Link back to the main PH Tech Consultants website
const MAIN_SITE_URL = 'https://phtechconsultant.com';

const App = () => (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
        <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                <a href={MAIN_SITE_URL} className="flex items-center">
                    <span className="text-xl sm:text-2xl font-extrabold text-blue-900 tracking-tight">PHTech</span>
                    <span className="text-xl sm:text-2xl font-medium text-slate-500 ml-1">Consultant</span>
                </a>
                <a href={MAIN_SITE_URL} className="text-sm font-semibold text-slate-600 hover:text-blue-900">
                    ← Main website
                </a>
            </div>
        </nav>

        <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">New Site</h1>
            <p className="text-lg text-slate-600">Replace this page with the content for the new site.</p>
        </main>

        <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} PH Tech Consultants · <a href={MAIN_SITE_URL} className="hover:text-blue-900">phtechconsultant.com</a>
        </footer>
    </div>
);

export default App;
