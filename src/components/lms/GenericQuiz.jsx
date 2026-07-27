import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SectionReveal from '../SectionReveal';
import allTests from './data/all_tests.json';
import { db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const GenericQuiz = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    
    const [test, setTest] = useState(null);
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [previousResult, setPreviousResult] = useState(null);
    
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [score, setScore] = useState(0);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sectionAnalysis, setSectionAnalysis] = useState({});
    const [viewMode, setViewMode] = useState('questions');
    
    const [violationCount, setViolationCount] = useState(0);
    const [showViolationModal, setShowViolationModal] = useState(false);
    const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
    const [violationTimer, setViolationTimer] = useState(20);

    useEffect(() => {
        const foundTest = allTests.find(t => t.id === testId);
        if (foundTest) {
            setTest(foundTest);
            setTimeLeft(foundTest.totalTimeSeconds);
            
            // Check for previous results
            if (currentUser) {
                const fetchPrevious = async () => {
                    try {
                        const docRef = doc(db, 'testResults', `${currentUser.uid}_${testId}`);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            setPreviousResult(docSnap.data());
                        }
                    } catch (e) {
                        console.error("Failed to fetch previous result", e);
                    }
                };
                fetchPrevious();
            }
        } else {
            navigate('/lms/tests');
        }
    }, [testId, navigate, currentUser]);

    useEffect(() => {
        let timer;
        if (started && !completed && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && started && !completed) {
            handleSubmit();
        }
        return () => clearInterval(timer);
    }, [started, completed, timeLeft]);

    const startAssessment = () => {
        setStarted(true);
        setPreviousResult(null);
        if (test && test.caseStudyText) {
            setViewMode('casestudy');
        } else {
            setViewMode('questions');
        }
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error("Error attempting to enable fullscreen:", err);
            });
        }
    };

    useEffect(() => {
        if (!started || completed) return;

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
    }, [started, completed]);

    useEffect(() => {
        if (violationCount >= 3 && !completed) {
            handleSubmit();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [violationCount]);

    useEffect(() => {
        let interval;
        if (showViolationModal && !completed) {
            setViolationTimer(20);
            interval = setInterval(() => {
                setViolationTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        handleSubmit();
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
    }, [showViolationModal, completed]);

    const handleOptionSelect = (questionIndex, optionKey) => {
        if (!completed) {
            setSelectedAnswers({
                ...selectedAnswers,
                [questionIndex]: optionKey
            });
        }
    };

    const handleSubmit = () => {
        let calculatedScore = 0;
        const analysis = {};
        
        test.questions.forEach((q, index) => {
            if (!analysis[q.section]) {
                analysis[q.section] = { earned: 0, max: 0, count: 0, correctCount: 0 };
            }
            
            let qWeight = 0;
            if (q.difficulty === 'Easy') qWeight = 1;
            else if (q.difficulty === 'Medium') qWeight = 2;
            else if (q.difficulty === 'Hard') qWeight = 3;
            
            analysis[q.section].max += qWeight;
            analysis[q.section].count += 1;
            
            if (selectedAnswers[index] === q.answer) {
                calculatedScore += qWeight;
                analysis[q.section].earned += qWeight;
                analysis[q.section].correctCount += 1;
            }
        });
        
        const maxS = test.questions.reduce((acc, q) => {
            if (q.difficulty === 'Easy') return acc + 1;
            if (q.difficulty === 'Medium') return acc + 2;
            if (q.difficulty === 'Hard') return acc + 3;
            return acc;
        }, 0);
        
        const accuracy = Math.round((Object.values(analysis).reduce((acc, s) => acc + s.correctCount, 0) / test.totalQuestions) * 100);

        if (currentUser) {
            const resultRef = doc(db, 'testResults', `${currentUser.uid}_${testId}`);
            setDoc(resultRef, {
                userId: currentUser.uid,
                userEmail: currentUser.email,
                testId: testId,
                testTitle: test.title,
                score: calculatedScore,
                maxScore: maxS,
                accuracy: accuracy,
                timeUsedSeconds: test.totalTimeSeconds - timeLeft,
                sectionAnalysis: analysis,
                completedAt: new Date()
            }, { merge: true }).catch(err => console.error("Error saving result", err));
        }
        
        setScore(calculatedScore);
        setSectionAnalysis(analysis);
        setCompleted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!test) return null;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const maxScore = test.questions.reduce((acc, q) => {
        if (q.difficulty === 'Easy') return acc + 1;
        if (q.difficulty === 'Medium') return acc + 2;
        if (q.difficulty === 'Hard') return acc + 3;
        return acc;
    }, 0);

    const currentQ = test.questions[currentIndex];

    return (
        <div className={`w-full flex flex-col items-center relative ${started && !completed ? 'h-screen w-screen overflow-hidden bg-slate-50' : 'py-12 min-h-screen'}`}>
            {(!started || completed) && <div className="absolute inset-0 bg-slate-50 -z-10"></div>}
            
            {showFullscreenWarning && started && !completed && (
                <div className="fixed inset-0 bg-slate-900/95 z-[9999] flex flex-col items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl border-t-8 border-blue-900">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Fullscreen Required</h2>
                        <p className="text-slate-600 mb-6 font-medium leading-relaxed">You have exited full-screen mode. You must submit your test to leave, or return to full-screen to continue.</p>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => document.documentElement.requestFullscreen()} className="bg-blue-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-colors">Return to Full Screen</button>
                            <button onClick={handleSubmit} className="bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-300 transition-colors">Submit Test</button>
                        </div>
                    </div>
                </div>
            )}

            {showViolationModal && started && !completed && (
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

            {!started && !completed && (
                <SectionReveal className="text-center mb-12 max-w-4xl px-4">
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 block">{test.targetUsers}</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
                        {test.title}
                    </h1>
                    
                    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-slate-200/50 max-w-2xl mx-auto mt-8">
                        {previousResult ? (
                            <>
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">You have completed this assessment!</h2>
                                <p className="text-slate-500 font-medium mb-8">
                                    Your previous score: <strong className="text-blue-900 text-xl">{previousResult.score}/{previousResult.maxScore}</strong>
                                </p>
                                <div className="flex justify-center gap-4">
                                    <button 
                                        onClick={() => navigate('/lms/tests')}
                                        className="bg-slate-100 text-slate-600 font-bold py-3 px-6 rounded-xl hover:bg-slate-200 transition-all duration-300"
                                    >
                                        Go Back
                                    </button>
                                    <button 
                                        onClick={startAssessment}
                                        className="bg-blue-900 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-blue-800 transition-all duration-300"
                                    >
                                        Retake Assessment
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-slate-800 mb-4">Ready to begin?</h2>
                                <p className="text-red-600 font-semibold mb-6">Note: This test requires full-screen. Changing tabs or leaving the screen will result in auto-submission.</p>
                                <div className="flex justify-center gap-8 mb-8 text-slate-600">
                                    <div>
                                        <span className="block text-2xl font-bold text-blue-900">{test.totalQuestions}</span>
                                        <span className="text-sm">Questions</span>
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-bold text-blue-900">{Math.round(test.totalTimeSeconds / 60)}</span>
                                        <span className="text-sm">Minutes</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={startAssessment}
                                    className="bg-blue-900 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-300"
                                >
                                    Start Assessment
                                </button>
                            </>
                        )}
                    </div>
                </SectionReveal>
            )}

            {started && !completed && currentQ && (
                <div className="flex flex-col h-full w-full mx-auto max-w-4xl">
                    {/* Top Bar */}
                    <div className="flex-none p-4 px-6 md:px-8 bg-white shadow-sm border-b border-slate-200 flex flex-wrap justify-between items-center shrink-0 z-20 w-full rounded-b-2xl gap-4">
                        <div className="text-slate-600 font-bold text-sm md:text-base flex items-center gap-4">
                            <span>Answered: {Object.keys(selectedAnswers).length} / {test.totalQuestions}</span>
                            {test.caseStudyText && (
                                <div className="bg-slate-100 p-1 rounded-lg flex items-center shadow-inner">
                                    <button 
                                        onClick={() => setViewMode('casestudy')}
                                        className={`px-3 py-1.5 text-xs md:text-sm font-bold rounded-md transition-all duration-300 ${viewMode === 'casestudy' ? 'bg-white text-blue-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Case Study
                                    </button>
                                    <button 
                                        onClick={() => setViewMode('questions')}
                                        className={`px-3 py-1.5 text-xs md:text-sm font-bold rounded-md transition-all duration-300 ${viewMode === 'questions' ? 'bg-white text-blue-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Questions
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-6">
                            <div className={`text-xl font-extrabold ${timeLeft < 120 ? 'text-red-600 animate-pulse' : 'text-blue-900'}`}>
                                {formatTime(timeLeft)}
                            </div>
                            <button 
                                onClick={() => handleSubmit()}
                                className="bg-red-600 text-white text-xs md:text-sm font-bold py-2 px-4 md:px-6 rounded-lg shadow-sm hover:bg-red-700 transition-colors"
                            >
                                Submit Early
                            </button>
                        </div>
                    </div>

                    {/* Middle Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full custom-scrollbar">
                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200/50 h-full">
                            {viewMode === 'casestudy' ? (
                                <div className="max-w-4xl mx-auto h-full flex flex-col">
                                    <h3 className="text-2xl font-extrabold text-blue-900 mb-6 border-b border-slate-100 pb-4">Case Study Reference</h3>
                                    <div className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                                        {test.caseStudyText}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between text-xs md:text-sm font-bold text-slate-400 mb-4 tracking-wider uppercase">
                                        <span>Question {currentIndex + 1} of {test.totalQuestions}</span>
                                        <span>{currentQ.section} • {currentQ.difficulty}</span>
                                    </div>
                                    
                                    <h3 className="text-lg md:text-2xl font-semibold text-slate-800 leading-relaxed mb-6 md:mb-8">
                                        {currentQ.question}
                                    </h3>
                                    
                                    <div className="space-y-3 md:space-y-4">
                                        {Object.entries(currentQ.options).map(([key, text]) => {
                                            const isSelected = selectedAnswers[currentIndex] === key;
                                            let buttonClasses = "w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-300 font-medium text-base md:text-lg ";
                                            
                                            if (isSelected) {
                                                buttonClasses += "border-blue-900 bg-blue-50 text-blue-900 shadow-sm";
                                            } else {
                                                buttonClasses += "border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700";
                                            }

                                            return (
                                                <button
                                                    key={key}
                                                    onClick={() => handleOptionSelect(currentIndex, key)}
                                                    className={buttonClasses}
                                                >
                                                    <span className="font-bold mr-2 md:mr-3">{key}.</span> {text}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Bottom Navigation - Fixed */}
                    {viewMode === 'casestudy' ? (
                        <div className="flex-none p-4 md:p-6 bg-white border-t border-slate-200 shrink-0 z-20 w-full rounded-t-2xl flex justify-center">
                            <button 
                                onClick={() => setViewMode('questions')}
                                className="bg-blue-900 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-300 text-sm md:text-base flex items-center gap-2"
                            >
                                Continue to Questions
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </div>
                    ) : (
                        <div className="flex-none p-4 md:p-6 bg-white border-t border-slate-200 shrink-0 z-20 w-full rounded-t-2xl">
                            <div className="flex justify-between w-full items-center">
                                <button 
                                    onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                                    disabled={currentIndex === 0}
                                    className={`font-bold py-3 px-6 md:px-8 rounded-xl transition-all duration-300 text-sm md:text-base ${currentIndex === 0 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-800 text-white hover:bg-slate-700 shadow-sm hover:shadow-md'}`}
                                >
                                    Previous
                                </button>
                                
                                <div className="hidden md:block w-1/3 bg-slate-200 rounded-full h-2 overflow-hidden mx-4 shadow-inner">
                                    <div 
                                        className="bg-blue-900 h-2 rounded-full transition-all duration-500 ease-out" 
                                        style={{ width: `${((currentIndex + 1) / test.totalQuestions) * 100}%` }}
                                    ></div>
                                </div>
                                
                                {currentIndex < test.totalQuestions - 1 ? (
                                    <button 
                                        onClick={() => setCurrentIndex(prev => Math.min(test.totalQuestions - 1, prev + 1))}
                                        className="bg-blue-900 text-white font-bold py-3 px-6 md:px-8 rounded-xl shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-300 text-sm md:text-base"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => handleSubmit()}
                                        className="bg-green-600 text-white font-bold py-3 px-6 md:px-8 rounded-xl shadow-md hover:bg-green-500 hover:shadow-lg transition-all duration-300 text-sm md:text-base"
                                    >
                                        Finish & Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {completed && (
                <div className="w-full max-w-5xl px-4 pb-20">
                    <SectionReveal>
                        <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-lg border border-slate-200/50 text-center mb-12 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50 to-transparent"></div>
                            
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-2 relative z-10">Assessment Complete!</h2>
                            <p className="text-slate-500 font-medium mb-12 relative z-10">Here is your comprehensive performance analysis.</p>
                            
                            <div className="flex flex-col md:flex-row justify-center items-center gap-12 relative z-10">
                                <div className="flex flex-col items-center">
                                    <div className="w-48 h-48 rounded-full border-8 border-slate-100 flex items-center justify-center relative mb-4 shadow-sm bg-white">
                                        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-md" viewBox="0 0 100 100">
                                            <circle 
                                                cx="50" cy="50" r="46" 
                                                fill="transparent" 
                                                stroke="currentColor" 
                                                strokeWidth="8" 
                                                className="text-blue-600 transition-all duration-1000 ease-out" 
                                                strokeDasharray="289.02" 
                                                strokeDashoffset={289.02 - (289.02 * (score / maxScore))}
                                            />
                                        </svg>
                                        <div className="text-center">
                                            <span className="text-5xl font-black text-slate-800">{score}</span>
                                            <span className="text-2xl text-slate-400 font-medium">/{maxScore}</span>
                                        </div>
                                    </div>
                                    <span className="font-extrabold text-slate-600 uppercase tracking-widest text-sm">Weighted Score</span>
                                </div>

                                <div className="flex flex-col items-center justify-center gap-6 w-full max-w-sm">
                                    <div className="bg-white rounded-2xl p-6 w-full border border-slate-200 shadow-sm flex items-center justify-between">
                                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Accuracy</span>
                                        <span className="text-3xl font-black text-slate-700">
                                            {Math.round((Object.values(sectionAnalysis).reduce((acc, s) => acc + s.correctCount, 0) / test.totalQuestions) * 100)}%
                                        </span>
                                    </div>
                                    <div className="bg-white rounded-2xl p-6 w-full border border-slate-200 shadow-sm flex items-center justify-between">
                                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Time Used</span>
                                        <span className="text-3xl font-black text-slate-700">
                                            {formatTime(test.totalTimeSeconds - timeLeft)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>

                    <SectionReveal>
                        <h3 className="text-2xl font-extrabold text-blue-900 mb-8 px-2 flex items-center gap-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                            Section Analysis
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {Object.entries(sectionAnalysis).map(([sectionName, data]) => {
                                const percentage = data.max > 0 ? Math.round((data.earned / data.max) * 100) : 0;
                                let barColor = "bg-emerald-500";
                                if (percentage < 50) barColor = "bg-rose-500";
                                else if (percentage < 75) barColor = "bg-amber-500";

                                return (
                                    <div key={sectionName} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="font-bold text-slate-700 leading-snug max-w-[70%]">{sectionName}</h4>
                                            <span className={`font-black text-xl ${barColor.replace('bg-', 'text-')}`}>{percentage}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden shadow-inner">
                                            <div className={`${barColor} h-3 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${percentage}%` }}></div>
                                        </div>
                                        <div className="text-sm font-semibold text-slate-400 flex justify-between bg-slate-50 p-3 rounded-xl">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                {data.correctCount} / {data.count} Correct
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                                {data.earned} / {data.max} Pts
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </SectionReveal>

                    <SectionReveal>
                        <div className="flex justify-center mt-8">
                            <button 
                                onClick={() => navigate('/lms/tests')}
                                className="bg-slate-800 text-white font-bold py-4 px-12 rounded-xl shadow-md hover:bg-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                Return to Dashboard
                            </button>
                        </div>
                    </SectionReveal>
                </div>
            )}
        </div>
    );
};

export default GenericQuiz;
