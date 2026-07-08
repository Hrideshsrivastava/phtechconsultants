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

    return (
        <div className="w-full flex flex-col items-center py-12 relative min-h-screen">
            <div className="absolute inset-0 bg-slate-50 -z-10"></div>
            
            <SectionReveal className="text-center mb-8 max-w-3xl px-4">
                <Link to="/lms/tests" className="text-blue-900 hover:underline text-sm font-bold mb-4 inline-block">&larr; Back to Tests</Link>
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
                    Employability Assessment
                </h1>
            </SectionReveal>

            <div className="w-full max-w-3xl px-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-200/50 overflow-hidden mb-16 transition-all">
                    {!quizStarted ? (
                        <div className="p-8 md:p-16 text-center flex flex-col items-center">
                             <div className="w-24 h-24 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mb-8 border border-blue-100">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to begin?</h2>
                            <p className="text-slate-600 mb-8 max-w-md leading-relaxed">
                                You will have <strong>60 seconds</strong> to complete this {quizQuestions.length}-question assessment. Ensure you are in a quiet environment and ready to focus.
                            </p>
                            <button
                                onClick={startQuiz}
                                className="bg-blue-900 text-white py-4 px-10 rounded-lg font-bold tracking-wide shadow-md hover:bg-blue-800 transition-all duration-300"
                            >
                                Start Assessment
                            </button>
                        </div>
                    ) : !showResults ? (
                        <div className="p-8 md:p-12">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm font-bold text-slate-400">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                                <div className={`text-sm font-bold px-4 py-2 rounded-lg transition-colors ${timeLeft <= 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
                                    Time Remaining: {formatTime(timeLeft)}
                                </div>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-8">
                                <div 
                                    className="bg-blue-900 h-full transition-all duration-300 ease-out"
                                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                                ></div>
                            </div>
                            
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-tight">
                                {quizQuestions[currentQuestion].question}
                            </h2>
                            
                            <div className="space-y-4 mb-10">
                                {quizQuestions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(index)}
                                        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                                            selectedOptionIndex === index 
                                            ? 'border-blue-900 bg-blue-50 text-blue-900 font-bold shadow-sm' 
                                            : 'border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50 hover:shadow-sm font-medium'
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
                            
                            <div className="flex justify-end pt-4 border-t border-slate-100">
                                <button
                                    onClick={handleNext}
                                    disabled={selectedOptionIndex === null}
                                    className={`py-3 px-8 rounded-lg font-bold tracking-wide transition-all duration-300 ${
                                        selectedOptionIndex !== null
                                        ? 'bg-blue-900 text-white shadow-md hover:bg-blue-800'
                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    }`}
                                >
                                    {currentQuestion + 1 === quizQuestions.length ? 'See Results' : 'Next Question'}
                                </button>
                            </div>
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
            </div>
        </div>
    );
};

export default EmployabilityQuiz;
