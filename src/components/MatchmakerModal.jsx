import React, { useState } from 'react';
import { X, Sparkles, Coffee, Briefcase, Heart, Music, ArrowRight, Zap, Trophy, Smile } from 'lucide-react';

const MatchmakerModal = ({ isOpen, onClose, cafes, onMatchFound }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [match, setMatch] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);

    if (!isOpen) return null;

    const questions = [
        {
            id: 'vibe',
            question: "What's the plan for today?",
            options: [
                { id: 'work', label: 'Deep Work', icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
                { id: 'date', label: 'Date / Chill', icon: Heart, color: 'bg-pink-100 text-pink-600' },
                { id: 'social', label: 'Catching Up', icon: Smile, color: 'bg-green-100 text-green-600' },
                { id: 'coffee', label: 'Just Coffee', icon: Coffee, color: 'bg-amber-100 text-amber-700' },
            ]
        },
        {
            id: 'noise',
            question: "How loud should it be?",
            options: [
                { id: 'quiet', label: 'Library Quiet', icon: Music, color: 'bg-purple-100 text-purple-600' },
                { id: 'moderate', label: 'Coffee Shop Hum', icon: Coffee, color: 'bg-orange-100 text-orange-600' },
                { id: 'loud', label: 'Lively / Buzzing', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
            ]
        },
        // We can add more, but 2-3 is best for speed. Let's stick to 2 for MVP + calculating.
    ];

    const handleAnswer = (optionId) => {
        const currentQ = questions[step];
        setAnswers(prev => ({ ...prev, [currentQ.id]: optionId }));

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            calculateMatch({ ...answers, [currentQ.id]: optionId });
        }
    };

    const calculateMatch = () => {
        setIsCalculating(true);
        // Simulate "AI" thinking
        setTimeout(() => {
            // Simple Logic for MVP:
            // 1. Filter by Vibe (Mapping vibe answer to cafe types/keywords)
            // 2. Sort by Rating
            // 3. Pick top 1 (or random from top 3 to keep it fresh)



            // Mock logic: Sort by rating, get top 3
            const candidates = [...cafes].sort((a, b) => b.rating - a.rating).slice(0, 3);

            setMatch(candidates);
            setIsCalculating(false);
            setStep('result');
        }, 1500);
    };

    const reset = () => {
        setStep(0);
        setAnswers({});
        setMatch(null);
        setIsCalculating(false);
    };

    // Rendering Steps
    const renderQuestion = () => {
        const q = questions[step];
        return (
            <div className="animate-in fade-in slide-in-from-right duration-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{q.question}</h2>
                <div className="grid grid-cols-2 gap-4">
                    {q.options.map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => handleAnswer(opt.id)}
                            className="flex flex-col items-center p-6 rounded-2xl border-2 border-transparent hover:border-blue-500 bg-gray-50 hover:bg-blue-50 transition-all gap-3 group"
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${opt.color} group-hover:scale-110 transition-transform`}>
                                <opt.icon size={24} />
                            </div>
                            <span className="font-semibold text-gray-700">{opt.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const renderLoading = () => (
        <div className="flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Sparkles size={32} className="text-blue-600 animate-spin-slow" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Analyzing Vibes...</h3>
            <p className="text-gray-500">Scanning reviews, checking wifi speeds, tasting coffee...</p>
        </div>
    );

    const renderResult = () => (
        <div className="text-center animate-in zoom-in-95 duration-500 w-full max-w-md">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-bold mb-4">
                <Trophy size={14} />
                Top 3 Matches for You
            </div>

            <p className="text-gray-500 mb-6 text-sm">Based on your mood, we think you'll love these:</p>

            <div className="flex flex-col gap-3">
                {match.map((m, i) => (
                    <div
                        key={m.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex gap-4 hover:shadow-md transition-shadow cursor-pointer text-left group"
                        onClick={() => {
                            onMatchFound(m);
                            onClose();
                        }}
                    >
                        <div className="w-20 h-20 rounded-xl bg-gray-200 shrink-0 overflow-hidden relative">
                            <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                            {i === 0 && <div className="absolute top-0 left-0 bg-yellow-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg">#1</div>}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <h3 className="font-bold text-gray-800 line-clamp-1">{m.name}</h3>
                            <p className="text-xs text-gray-400 mb-1">{m.city}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded text-green-700 text-xs font-bold">
                                    <Smile size={10} />
                                    {m.rating}
                                </div>
                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-colors">
                                    <ArrowRight size={12} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={reset} className="w-full text-center mt-6 text-gray-400 text-sm hover:text-gray-600">
                Start Over
            </button>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white/95 backdrop-blur-xl rounded-[40px] shadow-2xl w-full max-w-lg p-8 relative overflow-hidden border border-white/50">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors z-10"
                >
                    <X size={24} />
                </button>

                {/* Progress Bar (if in quiz) */}
                {step !== 'result' && !isCalculating && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                        <div
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500"
                            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                )}

                <div className="min-h-[400px] flex items-center justify-center">
                    {isCalculating ? renderLoading() : (
                        step === 'result' ? renderResult() : renderQuestion()
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatchmakerModal;
