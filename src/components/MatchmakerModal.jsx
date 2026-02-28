import React, { useState } from 'react';
import { Sparkles, MapPin, Mic, Volume2 } from 'lucide-react';

const MatchmakerModal = ({ isOpen, onClose, cafes, onMatchFound }) => {
    const [query, setQuery] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (query.trim()) {
            onMatchFound({ name: query.trim() });
            onClose();
        }
    };


    return (
        <div className="absolute inset-0 z-[40] bg-gradient-to-br from-[#d3f8e2] via-[#e9fbf1] to-[#9eeaff] animate-in fade-in duration-500 pl-[100px] flex items-center justify-center">

            <div className="w-full max-w-4xl px-8 flex flex-col items-center -mt-20">
                {/* Header Title */}
                <h1 className="font-sans text-[42px] md:text-[54px] font-bold text-gray-900 tracking-tight mb-10 text-center">
                    Ready to find your <span className="text-purple-500">next coffee</span> spot ?
                </h1>

                {/* Magical Input Bar - Exact Figma Match */}
                <div className="w-full relative shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full p-[2px] bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 mb-8 transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]">
                    <div className="w-full bg-white rounded-full py-4 px-6 flex items-center gap-4">
                        <Sparkles size={24} className="text-pink-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="What kind of cafe you are looking for?"
                            className="text-gray-600 font-sans font-medium text-[16px] flex-1 text-left outline-none border-none bg-transparent placeholder-gray-400"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        />

                        {/* Right aligned icons */}
                        <div className="flex items-center gap-4 text-emerald-500 shrink-0 border-l border-gray-100 pl-4 ml-2">
                            <button className="hover:scale-110 transition-transform"><MapPin size={20} /></button>
                            <button className="hover:scale-110 transition-transform text-gray-400 hover:text-gray-600"><Mic size={20} /></button>
                            <button
                                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition-transform"
                                onClick={handleSubmit}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Suggestions Block */}
                <div className="w-full max-w-3xl self-start ml-4">
                    <p className="text-gray-500 text-[14px] font-medium mb-4">Need a little inspiration?</p>
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50 flex flex-col gap-4">
                        {[
                            "Find me a cozy cafe to sit and work near hi-tech city",
                            "A romantic spot with outdoor seating in Jubilee Hills",
                            "A quiet place with strong wifi and great speciality coffee",
                            "A pet-friendly cafe around Banjara Hills"
                        ].map((item, index) => (
                            <button
                                key={index}
                                className="text-left text-gray-600 font-sans text-[15px] hover:text-purple-600 transition-colors py-1 block w-full outline-none"
                                onClick={() => {
                                    setQuery(item);
                                    onMatchFound({ name: item });
                                    onClose();
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Hidden overlay to close when clicking outside */}
            <div className="absolute inset-0 z-[-1] cursor-pointer" onClick={onClose}></div>
        </div>
    );
};

export default MatchmakerModal;
