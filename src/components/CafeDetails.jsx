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


                {/* Content Area - Figma Match */}
                <div className="p-6 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h2 className="font-sans text-[22px] font-bold text-gray-900">
                                {cafe.name}
                            </h2>
                            <div className="flex items-center gap-1.5 text-[14px] font-bold text-gray-900 mt-0.5">
                                <span>{cafe.rating}</span>
                                <div className="flex gap-[1px] text-yellow-500">
                                    <Star size={12} fill="currentColor" strokeWidth={0} />
                                    <Star size={12} fill="currentColor" strokeWidth={0} />
                                    <Star size={12} fill="currentColor" strokeWidth={0} />
                                    <Star size={12} fill="currentColor" strokeWidth={0} />
                                    <Star size={12} fill="currentColor" strokeWidth={0} />
                                </div>
                            </div>
                        </div>

                        {/* Top Right Action Button */}
                        <button
                            className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white shrink-0 hover:scale-110 transition-transform shadow-md ml-2 mt-1"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (cafe.coordinates) {
                                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${cafe.coordinates.lat},${cafe.coordinates.lng}`, '_blank');
                                } else if (cafe.address) {
                                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cafe.address)}`, '_blank');
                                }
                            }}
                        >
                            <Navigation size={14} className="fill-white transform rotate-45 -ml-0.5 -mt-0.5" />
                        </button>
                    </div>

                    {/* Address / Meta */}
                    <p className="text-gray-500 text-[15px] leading-relaxed mb-6 font-medium max-w-[85%] font-sans">
                        {cafe.address}
                    </p>

                    {/* Big Stat Blocks */}
                    <div className="grid grid-cols-3 gap-3 w-full mt-auto pb-2">
                        <div className="bg-[#E8F8F0] rounded-2xl p-4 flex flex-col justify-center relative overflow-hidden group">
                            <span className={`font-bold text-[18px] leading-tight block mb-1 ${cafe.isOpen === 'Open Now' ? 'text-green-600' : (cafe.isOpen === 'Closed' ? 'text-red-500' : 'text-gray-900')}`}>{cafe.isOpen || "Unknown"}</span>
                            <span className="text-[12px] text-gray-500 font-medium">Status</span>
                        </div>

                        <div className="bg-[#E8F8F0] rounded-2xl p-4 flex flex-col justify-center relative overflow-hidden group">
                            <span className="font-bold text-[22px] text-gray-900 leading-tight block mb-1">{cafe.reviewsCount || "23,879"}</span>
                            <span className="text-[12px] text-gray-500 font-medium">Reviews</span>
                        </div>

                        <div
                            className="bg-[#E8F8F0] rounded-2xl p-4 flex flex-col justify-center gap-[6px] cursor-pointer hover:bg-[#d5eedf] transition-colors"
                            onClick={() => cafe.onReserve && cafe.onReserve()}
                        >
                            {/* Logos simulation */}
                            <div className="flex gap-1.5 mb-1">
                                <div className="w-5 h-5 bg-[#E23744] rounded text-white flex items-center justify-center text-[9px] font-bold shadow-sm">Z</div>
                                <div className="w-5 h-5 bg-[#FC8019] rounded text-white flex items-center justify-center text-[9px] font-bold shadow-sm">S</div>
                                <div className="w-5 h-5 bg-[#E23744] rounded text-white flex items-center justify-center text-[9px] font-bold shadow-sm">d</div>
                            </div>
                            <span className="text-[12px] text-gray-500 font-medium">Book a Table</span>
                        </div>
                    </div>

                    {/* Live Reviews Snippet from Google Places */}
                    {cafe.recentReviews && cafe.recentReviews.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <h3 className="text-[13px] font-bold text-gray-900 mb-2 uppercase tracking-wide">Featured Review</h3>
                            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden">
                                        {cafe.recentReviews[0].profile_photo_url && <img src={cafe.recentReviews[0].profile_photo_url} alt="Reviewer" className="w-full h-full object-cover" />}
                                    </div>
                                    <span className="text-[13px] font-bold text-gray-800">{cafe.recentReviews[0].author_name}</span>
                                    <span className="text-[11px] text-gray-400 ml-auto">{cafe.recentReviews[0].relative_time_description}</span>
                                </div>
                                <p className="text-[12px] text-gray-600 leading-relaxed font-medium line-clamp-3">
                                    "{cafe.recentReviews[0].text}"
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default CafeDetails;
