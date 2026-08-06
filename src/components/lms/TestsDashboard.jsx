import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SectionReveal from '../SectionReveal';
import allTests from './data/all_tests.json';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const categoriesList = [
    {
        name: "Human Resources & Finance",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        )
    },
    {
        name: "Career & Interview Preparation",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        )
    },
    {
        name: "Communication & Soft Skills",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
        )
    },
    {
        name: "Leadership & Personal Growth",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
        )
    },
    {
        name: "Business & Entrepreneurship",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
        )
    },
    {
        name: "Technical & Engineering Assessments",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
        )
    }
];

const branchesList = [
    {
        name: "Computer Science & Engineering (CSE)",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
        )
    },
    {
        name: "Electronics & Communication (ECE)",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
        )
    },
    {
        name: "Mechanical Engineering (ME)",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        )
    }
];

const TestsDashboard = () => {
    const { currentUser } = useAuth();
    const [userResults, setUserResults] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    
    const activeCategory = searchParams.get('category');

    useEffect(() => {
        const fetchResults = async () => {
            if (!currentUser) return;
            try {
                const q = query(collection(db, 'testResults'), where('userId', '==', currentUser.uid));
                const querySnapshot = await getDocs(q);
                const results = {};
                querySnapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    results[data.testId] = data;
                });
                setUserResults(results);
            } catch (err) {
                console.error("Failed to fetch results:", err.code, err.message);
            }
        };
        fetchResults();
    }, [currentUser]);

    const filteredTests = activeCategory ? allTests.filter(test => {
        const matchesCategory = (test.category || "General") === activeCategory;
        const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              test.targetUsers.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    }) : [];

    return (
        <div className="w-full flex flex-col items-center py-12 relative min-h-screen">
            <div className="absolute inset-0 bg-slate-50 -z-10"></div>
            
            {!activeCategory ? (
                <div className="w-full max-w-6xl px-4 mx-auto mt-4">
                    <SectionReveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                            {categoriesList.map(cat => (
                                <button key={cat.name} onClick={() => setSearchParams({ category: cat.name })} className="group block text-left h-full">
                                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 h-full flex flex-col items-start relative overflow-hidden">
                                        <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                                            {cat.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-900 transition-colors leading-tight">{cat.name}</h3>
                                        <p className="text-slate-500 text-sm">Explore assessments and certifications.</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </SectionReveal>
                </div>
            ) : activeCategory === "Technical & Engineering Assessments" ? (
                <div className="w-full max-w-6xl px-4 mx-auto mt-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 w-full mt-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <button onClick={() => setSearchParams({})} className="text-slate-400 hover:text-blue-900 transition-colors p-2 -ml-2 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            </button>
                            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">{activeCategory}</h2>
                        </div>
                    </div>
                    <SectionReveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                            {branchesList.map(branch => (
                                <button key={branch.name} onClick={() => setSearchParams({ category: branch.name })} className="group block text-left h-full">
                                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 h-full flex flex-col items-start relative overflow-hidden">
                                        <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                                            {branch.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-900 transition-colors leading-tight">{branch.name}</h3>
                                        <p className="text-slate-500 text-sm">Select branch to view tests.</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </SectionReveal>
                </div>
            ) : (
                <div className="w-full max-w-6xl px-4 mx-auto flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 w-full mt-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <button onClick={() => { 
                                const isBranch = branchesList.some(b => b.name === activeCategory);
                                if (isBranch) {
                                    setSearchParams({ category: "Technical & Engineering Assessments" });
                                } else {
                                    setSearchParams({}); 
                                }
                                setSearchQuery(""); 
                            }} className="text-slate-400 hover:text-blue-900 transition-colors p-2 -ml-2 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            </button>
                            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">{activeCategory}</h2>
                        </div>
                        <div className="w-full md:w-1/3 relative">
                            <input 
                                type="text" 
                                placeholder="Search in category..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-5 py-3.5 pl-12 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm font-medium"
                            />
                            <svg className="w-5 h-5 text-slate-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>

                    <SectionReveal>
                        {filteredTests.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">No tests found</h3>
                                <p className="text-slate-500">Try adjusting your search criteria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                                {filteredTests.map((test) => {
                                    const result = userResults[test.id];
                                    return (
                                        <Link key={test.id} to={`/lms/tests/${test.id}`} className="group block h-full">
                                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                                                {result && (
                                                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                                                        Completed
                                                    </div>
                                                )}
                                                
                                                <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                                                </div>
                                                
                                                <h3 className="text-xl font-extrabold text-slate-800 mb-2 group-hover:text-blue-900 transition-colors leading-tight">{test.title}</h3>
                                                <p className="text-sm font-medium text-slate-500 mb-6 flex-grow">{test.targetUsers}</p>
                                                
                                                {result ? (
                                                    <div className="mb-4">
                                                        <span className="inline-block bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded-full font-bold border border-green-200">
                                                            Score: {result.score} / {result.maxScore}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="mb-4">
                                                        <span className="inline-block bg-slate-50 text-slate-500 text-xs px-3 py-1.5 rounded-full font-bold border border-slate-200">
                                                            Not Attempted
                                                        </span>
                                                    </div>
                                                )}
                                                
                                                <div className="flex items-center text-xs font-bold text-slate-400 gap-4 mt-auto">
                                                    <span>{test.totalQuestions} Questions</span>
                                                    <span>{Math.round(test.totalTimeSeconds / 60)} Mins</span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </SectionReveal>
                </div>
            )}
        </div>
    );
};

export default TestsDashboard;
