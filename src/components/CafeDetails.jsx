import React from 'react';
import { Star, User, MapPin, Users, Navigation } from 'lucide-react';

const CafeDetails = ({ cafe }) => {
    if (!cafe) return null;

    return (
        <div className="bg-cafe-sand rounded-t-[32px] md:rounded-[32px] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] md:shadow-2xl w-full h-full flex flex-col pointer-events-auto transition-all duration-500 relative border border-white/50 pb-safe">

            {/* The Drag Handle (visual only) */}
            <div className="flex justify-center pt-3 pb-2 shrink-0 md:hidden">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full opacity-60" />
            </div>

            <div className="flex-1 overflow-y-auto w-full hide-scrollbar flex flex-col">


                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                        <h2 className="font-serif text-[28px] leading-[1.15] font-bold text-gray-900 pr-2">
                            {cafe.name}
                        </h2>
                    </div>

                    {/* Cute Pill Badges Row */}
                    <div className="flex flex-wrap gap-2 mb-4 shrink-0">
                        <div className="bg-pink-100 text-cafe-rose font-semibold tracking-wide text-[11px] uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-pink-200/50">
                            <Star size={12} fill="currentColor" /> {cafe.rating} Rating
                        </div>
                        <div className="bg-emerald-50 text-emerald-700 font-semibold tracking-wide text-[11px] uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-emerald-200/50">
                            <Users size={12} /> {cafe.visitors}
                        </div>
                        <div className="bg-amber-50 text-amber-700 font-semibold tracking-wide text-[11px] uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-amber-200/50">
                            <span>☕</span> {cafe.type}
                        </div>
                    </div>

                    {/* Address / Meta */}
                    <p className="text-gray-500 text-[14px] leading-relaxed mb-6 font-medium">
                        {cafe.address}
                    </p>

                    {/* Bottom Action Button (Anchored to bottom naturally if flex-1 above expands) */}
                    <div className="mt-auto shrink-0 pt-2">
                        <button
                            onClick={() => cafe.onReserve && cafe.onReserve()}
                            className="w-full bg-cafe-rose bg-opacity-95 text-white py-4 rounded-2xl font-bold text-[15px] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            <Navigation size={18} className="fill-white" /> Navigate to Cafe &rarr;
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CafeDetails;
