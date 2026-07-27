const fs = require('fs');

let content = fs.readFileSync('src/components/lms/GenericQuiz.jsx', 'utf8');

// 1. Update states
content = content.replace(
    'const [sectionAnalysis, setSectionAnalysis] = useState({});',
    `const [sectionAnalysis, setSectionAnalysis] = useState({});
    
    const [violationCount, setViolationCount] = useState(0);
    const [showViolationModal, setShowViolationModal] = useState(false);
    const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);`
);

// 2. Add startAssessment and useEffects
const effectToAdd = `
    const startAssessment = () => {
        setStarted(true);
        setPreviousResult(null);
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

    const handleOptionSelect = (questionIndex, optionKey) => {`;

content = content.replace('    const handleOptionSelect = (questionIndex, optionKey) => {', effectToAdd);

// Replace the two setStarted(true) with startAssessment()
content = content.replace(
    'setStarted(true);\n                                            setPreviousResult(null);',
    'startAssessment();'
);
content = content.replace(
    'onClick={() => setStarted(true)}',
    'onClick={startAssessment}'
);

// We want to replace everything from "return (" to just before "{completed && ("
// Let's use regex
const regexToReplace = /return \([\s\S]*?(?=\{\s*completed && \()/m;

const replacementJSX = `return (
        <div className={\`w-full flex flex-col items-center relative \${started && !completed ? 'h-screen w-screen overflow-hidden bg-slate-50' : 'py-12 min-h-screen'}\`}>
            {(!started || completed) && <div className="absolute inset-0 bg-slate-50 -z-10"></div>}
            
            {showFullscreenWarning && started && !completed && (
                <div className="fixed inset-0 bg-black/90 z-[9999] flex flex-col items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Fullscreen Required</h2>
                        <p className="text-slate-700 mb-6 font-medium">You have exited full-screen mode. You must submit your test to leave, or return to full-screen to continue.</p>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => document.documentElement.requestFullscreen()} className="bg-blue-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800">Return to Full Screen</button>
                            <button onClick={handleSubmit} className="bg-red-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-red-700">Submit Test</button>
                        </div>
                    </div>
                </div>
            )}

            {showViolationModal && started && !completed && (
                <div className="fixed inset-0 bg-black/90 z-[9999] flex flex-col items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl border-4 border-red-500">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Warning: Tab Switching</h2>
                        <p className="text-slate-700 mb-6 font-medium">
                            You have navigated away from the test window. This is violation {violationCount}/3. The test will automatically submit on the 3rd violation.
                        </p>
                        <button onClick={() => {
                            setShowViolationModal(false);
                            document.documentElement.requestFullscreen().catch(() => {});
                        }} className="bg-blue-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-800">
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
                    <div className="flex-none p-4 px-6 md:px-8 bg-white shadow-sm border-b border-slate-200 flex justify-between items-center shrink-0 z-20 w-full max-w-4xl mx-auto rounded-b-2xl">
                        <div className="text-slate-600 font-bold text-sm md:text-base">
                            Answered: {Object.keys(selectedAnswers).length} / {test.totalQuestions}
                        </div>
                        <div className={\`text-xl font-extrabold \${timeLeft < 120 ? 'text-red-600 animate-pulse' : 'text-blue-900'}\`}>
                            {formatTime(timeLeft)}
                        </div>
                        <button 
                            onClick={() => handleSubmit()}
                            className="bg-red-600 text-white text-xs md:text-sm font-bold py-2 px-4 md:px-6 rounded-lg shadow-sm hover:bg-red-700 transition-colors"
                        >
                            Submit
                        </button>
                    </div>

                    {/* Middle Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full max-w-4xl mx-auto custom-scrollbar">
                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200/50">
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
                        </div>
                    </div>

                    {/* Bottom Navigation - Fixed */}
                    <div className="flex-none p-4 md:p-6 bg-white border-t border-slate-200 shrink-0 z-20 w-full max-w-4xl mx-auto rounded-t-2xl">
                        <div className="flex justify-between w-full items-center">
                            <button 
                                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                                disabled={currentIndex === 0}
                                className={\`font-bold py-3 px-6 md:px-8 rounded-xl transition-all duration-300 text-sm md:text-base \${currentIndex === 0 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-800 text-white hover:bg-slate-700'}\`}
                            >
                                Previous
                            </button>
                            
                            <div className="hidden md:block w-1/3 bg-slate-200 rounded-full h-2 overflow-hidden mx-4">
                                <div 
                                    className="bg-blue-900 h-2 rounded-full transition-all duration-300" 
                                    style={{ width: \`\${((currentIndex + 1) / test.totalQuestions) * 100}%\` }}
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
                </div>
            )}

            `;

content = content.replace(regexToReplace, replacementJSX);

fs.writeFileSync('src/components/lms/GenericQuiz.jsx', content);
console.log("Updated GenericQuiz.jsx");
