import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from '../SectionReveal';
import quizQuestions from './data/employability_questions.json';

const EmployabilityQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
    const [quizStarted, setQuizStarted] = useState(false);
    
    const [violationCount, setViolationCount] = useState(0);
    const [showViolationModal, setShowViolationModal] = useState(false);
    const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
    const [violationTimer, setViolationTimer] = useState(20);

    useEffect(() => {
        let timer;
        if (quizStarted && !showResults && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !showResults) {
            setShowResults(true); // Auto-submit when timer hits 0
        }
        return () => clearInterval(timer);
    }, [quizStarted, showResults, timeLeft]);

    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
    };

    const handleNext = () => {
        if (selectedOptionIndex !== null) {
            const selectedScore = quizQuestions[currentQuestion].options[selectedOptionIndex].score;
            setScore(score + selectedScore);
            setSelectedOptionIndex(null);
            
            if (currentQuestion + 1 < quizQuestions.length) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setShowResults(true);
            }
        }
    };
    
    const startQuiz = () => {
        setQuizStarted(true);
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error("Error attempting to enable fullscreen:", err);
            });
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResults(false);
        setSelectedOptionIndex(null);
        setTimeLeft(60);
        setQuizStarted(false);
    };

    const getResultCategory = () => {
        const maxScore = quizQuestions.length * 4;
        const percentage = (score / maxScore) * 100;
        
        if (percentage >= 85) return { title: "Highly Employable", desc: "You exhibit excellent problem-solving, teamwork, and professional traits highly sought after by top organizations." };
        if (percentage >= 60) return { title: "Strong Potential", desc: "You have a solid foundation of professional skills with room for growth in specific areas like leadership or adaptability." };
        return { title: "Developing Professional", desc: "You are on the right track, but focusing on core soft skills like proactive problem-solving and communication will greatly enhance your profile." };
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    useEffect(() => {
        if (!quizStarted || showResults) return;

        const handleViolation = () => {
            setViolationCount(prev => {
                const newCount = prev + 1;
                if (newCount < 3) {
                    setShowViolationModal(true);
                }
                return newCount;
            });
        };

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setShowFullscreenWarning(true);
            } else {
                setShowFullscreenWarning(false);
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleViolation();
            }
        };

        const handleBlur = () => {
            handleViolation();
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
        };
    }, [quizStarted, showResults]);

    useEffect(() => {
        if (violationCount >= 3 && !showResults) {
            setShowResults(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [violationCount]);

    useEffect(() => {
        let interval;
        if (showViolationModal && !showResults) {
            setViolationTimer(20);
            interval = setInterval(() => {
                setViolationTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setShowResults(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            setViolationTimer(20);
        }
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showViolationModal, showResults]);

    return (
        <div className={`w-full flex flex-col items-center relative ${quizStarted && !showResults ? 'h-screen w-screen overflow-hidden bg-slate-50' : 'py-12 min-h-screen'}`}>
            {(!quizStarted || showResults) && <div className="absolute inset-0 bg-slate-50 -z-10"></div>}
            
            {showFullscreenWarning && quizStarted && !showResults && (
                <div className="fixed inset-0 bg-slate-900/95 z-[9999] flex flex-col items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl border-t-8 border-blue-900">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Fullscreen Required</h2>
                        <p className="text-slate-600 mb-6 font-medium leading-relaxed">You have exited full-screen mode. You must submit your test to leave, or return to full-screen to continue.</p>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => document.documentElement.requestFullscreen()} className="bg-blue-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-colors">Return to Full Screen</button>
                            <button onClick={() => setShowResults(true)} className="bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-300 transition-colors">Submit Test</button>
                        </div>
                    </div>
                </div>
            )}

            {showViolationModal && quizStarted && !showResults && (
                <div className="fixed inset-0 bg-slate-900/95 z-[9999] flex flex-col items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl border-t-8 border-amber-500">
                        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-amber-100">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Attention Required</h2>
                        <p className="text-slate-600 mb-4 font-medium leading-relaxed">
                            You have navigated away from the test window. This is violation {violationCount}/3. The test will automatically submit on the 3rd violation.
                        </p>
                        <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-100">
                            <span className="font-bold text-amber-700">Auto-submitting in: <span className="text-xl mx-1">{violationTimer}</span> seconds</span>
                        </div>
                        <button onClick={() => {
                            setShowViolationModal(false);
                            document.documentElement.requestFullscreen().catch(() => {});
                        }} className="bg-blue-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-800 shadow-md w-full transition-colors">
                            I Understand, Return to Test
                        </button>
                    </div>
                </div>
            )}

            {!quizStarted && !showResults && (
                <SectionReveal className="text-center mb-8 max-w-3xl px-4">
                    <Link to="/lms/tests" className="text-blue-900 hover:underline text-sm font-bold mb-4 inline-block">&larr; Back to Tests</Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
                        Employability Assessment
                    </h1>
                </SectionReveal>
            )}

            <div className={`w-full max-w-3xl ${!quizStarted || showResults ? 'px-4' : 'flex flex-col h-full mx-auto'}`}>
                {!quizStarted || showResults ? (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-200/50 overflow-hidden mb-16 transition-all">
                    {!quizStarted ? (
                        <div className="p-8 md:p-16 text-center flex flex-col items-center">
                             <div className="w-24 h-24 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mb-8 border border-blue-100">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to begin?</h2>
                            <p className="text-slate-600 mb-4 max-w-md leading-relaxed">
                                You will have <strong>60 seconds</strong> to complete this {quizQuestions.length}-question assessment. Ensure you are in a quiet environment and ready to focus.
                            </p>
                            <p className="text-red-600 font-semibold mb-8 max-w-md">
                                Note: This test requires full-screen. Changing tabs or leaving the screen will result in auto-submission.
                            </p>
                            <button
                                onClick={startQuiz}
                                className="bg-blue-900 text-white py-4 px-10 rounded-lg font-bold tracking-wide shadow-md hover:bg-blue-800 transition-all duration-300"
                            >
                                Start Assessment
                            </button>
                        </div>
                    ) : (
                        <div className="p-8 md:p-16 text-center flex flex-col items-center">
                            <div className="w-24 h-24 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mb-8 border-4 border-blue-100 shadow-inner">
                                {timeLeft === 0 ? (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                ) : (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                )}
                            </div>
                            
                            <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3 block">
                                {timeLeft === 0 ? 'Time is up!' : 'Assessment Complete'}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">{getResultCategory().title}</h2>
                            <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
                                {getResultCategory().desc}
                            </p>
                            
                            <div className="bg-slate-50 w-full p-8 rounded-2xl border border-slate-200 mb-10 shadow-inner">
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Total Score</div>
                                <div className="text-5xl font-extrabold text-blue-900">
                                    {score} <span className="text-2xl text-slate-400 font-medium">/ {quizQuestions.length * 4}</span>
                                </div>
                            </div>
                            
                            <button
                                onClick={resetQuiz}
                                className="bg-blue-900 text-white py-4 px-10 rounded-lg font-bold tracking-wide shadow-md hover:bg-blue-800 transition-all duration-300"
                            >
                                Retake Assessment
                            </button>
                        </div>
                    )}
                </div>
                ) : (
                    <>
                    {/* Top Bar */}
                    <div className="flex-none p-4 px-6 md:px-8 bg-white shadow-sm border-b border-slate-200 flex justify-between items-center shrink-0 z-20 w-full rounded-b-2xl">
                        <div className="text-slate-600 font-bold text-sm md:text-base">
                            Question {currentQuestion + 1} of {quizQuestions.length}
                        </div>
                        <div className={`text-xl font-extrabold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-blue-900'}`}>
                            {formatTime(timeLeft)}
                        </div>
                        <button 
                            onClick={() => setShowResults(true)}
                            className="bg-red-600 text-white text-xs md:text-sm font-bold py-2 px-4 md:px-6 rounded-lg shadow-sm hover:bg-red-700 transition-colors"
                        >
                            Submit
                        </button>
                    </div>

                    {/* Middle Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full custom-scrollbar">
                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200/50">
                            <h2 className="text-lg md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 leading-tight">
                                {quizQuestions[currentQuestion].question}
                            </h2>
                            
                            <div className="space-y-3 md:space-y-4 mb-4">
                                {quizQuestions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(index)}
                                        className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 ${
                                            selectedOptionIndex === index 
                                            ? 'border-blue-900 bg-blue-50 text-blue-900 font-bold shadow-sm' 
                                            : 'border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50 hover:shadow-sm font-medium text-base md:text-lg'
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center shrink-0 ${selectedOptionIndex === index ? 'border-blue-900' : 'border-slate-300'}`}>
                                                {selectedOptionIndex === index && <div className="w-2.5 h-2.5 bg-blue-900 rounded-full"></div>}
                                            </div>
                                            <span>{option.text}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Navigation - Fixed */}
                    <div className="flex-none p-4 md:p-6 bg-white border-t border-slate-200 shrink-0 z-20 w-full rounded-t-2xl">
                        <div className="flex justify-between w-full items-center">
                            <div className="hidden md:block w-1/3 bg-slate-200 rounded-full h-2 overflow-hidden mr-4">
                                <div 
                                    className="bg-blue-900 h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                                ></div>
                            </div>
                            
                            <button
                                onClick={handleNext}
                                disabled={selectedOptionIndex === null}
                                className={`py-3 px-6 md:px-8 rounded-lg font-bold tracking-wide transition-all duration-300 ml-auto ${
                                    selectedOptionIndex !== null
                                    ? 'bg-blue-900 text-white shadow-md hover:bg-blue-800'
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                {currentQuestion + 1 === quizQuestions.length ? 'See Results' : 'Next Question'}
                            </button>
                        </div>
                    </div>
                    </>
                )}
                        <div className="p-8 md:p-16 text-center flex flex-col items-center">
                            <div className="w-24 h-24 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mb-8 border-4 border-blue-100 shadow-inner">
                                {timeLeft === 0 ? (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                ) : (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                )}
                            </div>
                            
                            <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3 block">
                                {timeLeft === 0 ? 'Time is up!' : 'Assessment Complete'}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">{getResultCategory().title}</h2>
                            <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
                                {getResultCategory().desc}
                            </p>
                            
                            <div className="bg-slate-50 w-full p-8 rounded-2xl border border-slate-200 mb-10 shadow-inner">
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Total Score</div>
                                <div className="text-5xl font-extrabold text-blue-900">
                                    {score} <span className="text-2xl text-slate-400 font-medium">/ {quizQuestions.length * 4}</span>
                                </div>
                            </div>
                            
                            <button
                                onClick={resetQuiz}
                                className="bg-blue-900 text-white py-4 px-10 rounded-lg font-bold tracking-wide shadow-md hover:bg-blue-800 transition-all duration-300"
                            >
                                Retake Assessment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployabilityQuiz;
