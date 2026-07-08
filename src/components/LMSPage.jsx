import React, { useState } from 'react';
import SectionReveal from './SectionReveal';

const quizQuestions = [
    {
        question: "How do you typically approach a complex problem?",
        options: [
            { text: "Break it down into smaller, manageable parts", score: 4 },
            { text: "Ask clarifying questions and collaborate on a solution", score: 4 },
            { text: "Look for immediate solutions online", score: 2 },
            { text: "Wait for someone else to take the lead", score: 1 }
        ]
    },
    {
        question: "When working in a team, what role do you usually take?",
        options: [
            { text: "Leader - guiding the group to the goal", score: 4 },
            { text: "Collaborator - ensuring everyone's voice is heard", score: 4 },
            { text: "Executer - focusing on completing assigned tasks", score: 3 },
            { text: "Observer - stepping back unless needed", score: 2 }
        ]
    },
    {
        question: "How do you handle constructive criticism?",
        options: [
            { text: "Listen, reflect, and apply the feedback to improve", score: 4 },
            { text: "Ask for specific examples to understand better", score: 4 },
            { text: "Feel defensive but try to adjust my work", score: 2 },
            { text: "Ignore it if I disagree with the assessment", score: 1 }
        ]
    },
    {
        question: "What is your primary motivation in a professional setting?",
        options: [
            { text: "Continuous learning and professional growth", score: 4 },
            { text: "Achieving targets and creating measurable impact", score: 4 },
            { text: "Job security and a stable routine", score: 2 },
            { text: "Building strong workplace relationships", score: 3 }
        ]
    },
    {
        question: "How do you manage tight deadlines or unexpected changes?",
        options: [
            { text: "Prioritize tasks and focus on structured execution", score: 4 },
            { text: "Communicate potential delays early and adjust plans", score: 4 },
            { text: "Work overtime quietly to get it done", score: 2 },
            { text: "Feel overwhelmed and hope for an extension", score: 1 }
        ]
    }
];

const LMSPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (optionScore) => {
        setSelectedOption(optionScore);
    };

    const handleNext = () => {
        if (selectedOption !== null) {
            setScore(score + selectedOption);
            setSelectedOption(null);
            
            if (currentQuestion + 1 < quizQuestions.length) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setShowResults(true);
            }
        }
    };
    
    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResults(false);
        setSelectedOption(null);
    };

    const getResultCategory = () => {
        const maxScore = quizQuestions.length * 4;
        const percentage = (score / maxScore) * 100;
        
        if (percentage >= 85) return { title: "Highly Employable", desc: "You exhibit excellent problem-solving, teamwork, and professional traits highly sought after by top organizations." };
        if (percentage >= 60) return { title: "Strong Potential", desc: "You have a solid foundation of professional skills with room for growth in specific areas like leadership or adaptability." };
        return { title: "Developing Professional", desc: "You are on the right track, but focusing on core soft skills like proactive problem-solving and communication will greatly enhance your profile." };
    };

    return (
        <div className="w-full flex flex-col items-center py-12 relative min-h-screen">
            <div className="absolute inset-0 bg-slate-50 -z-10"></div>
            
            <SectionReveal className="text-center mb-12 max-w-3xl px-4">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 block">Learning Management System</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
                    Employability Assessment
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    Evaluate your professional readiness and identify areas for growth with our comprehensive employability quiz.
                </p>
            </SectionReveal>

            <div className="w-full max-w-3xl px-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-200/50 overflow-hidden mb-16 transition-all">
                    {!showResults ? (
                        <div className="p-8 md:p-12">
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-sm font-bold text-slate-400">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                                <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-blue-900 h-full transition-all duration-300 ease-out"
                                        style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-tight">
                                {quizQuestions[currentQuestion].question}
                            </h2>
                            
                            <div className="space-y-4 mb-10">
                                {quizQuestions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(option.score)}
                                        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                                            selectedOption === option.score 
                                            ? 'border-blue-900 bg-blue-50 text-blue-900 font-bold shadow-sm' 
                                            : 'border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50 hover:shadow-sm font-medium'
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${selectedOption === option.score ? 'border-blue-900' : 'border-slate-300'}`}>
                                                {selectedOption === option.score && <div className="w-2.5 h-2.5 bg-blue-900 rounded-full"></div>}
                                            </div>
                                            {option.text}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            
                            <div className="flex justify-end pt-4 border-t border-slate-100">
                                <button
                                    onClick={handleNext}
                                    disabled={selectedOption === null}
                                    className={`py-3 px-8 rounded-lg font-bold tracking-wide transition-all duration-300 ${
                                        selectedOption !== null
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
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            
                            <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3 block">Assessment Complete</span>
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

export default LMSPage;
