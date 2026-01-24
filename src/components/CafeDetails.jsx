import React, { useState } from 'react';
import { Star, Heart, User, MapPin } from 'lucide-react';

const CafeDetails = ({ cafe }) => {
    if (!cafe) return <div className="bg-white rounded-3xl p-6 shadow-xl w-full h-full flex items-center justify-center text-gray-400">Select a cafe</div>;

    const zomatoLink = cafe.website && cafe.website.includes('zomato.com') ? cafe.website : `https://www.zomato.com/city/restaurants?q=${encodeURIComponent(cafe.name + ' ' + cafe.city)}`;
    const swiggyLink = cafe.website && cafe.website.includes('swiggy.com') ? cafe.website : `https://www.swiggy.com/search?q=${encodeURIComponent(cafe.name)}`;

    // Use the official Google Maps URL if available for "Reserve with Google" style behavior/access
    const googleMapsUrl = cafe.googleUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.name + ' ' + cafe.address)}`;

    return (
        <div className="bg-white rounded-3xl p-6 shadow-xl w-full h-full flex flex-col justify-between transition-all duration-500 relative">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{cafe.name}</h2>
                    <div className="flex items-center gap-1 mb-2">
                        <span className="font-bold text-sm">{cafe.rating}</span>
                        <div className="flex text-yellow-400">
                            {[...Array(Math.round(cafe.rating || 0))].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <span className="text-xs text-gray-400 ml-1">({cafe.type})</span>
                    </div>
                </div>
                <button className="text-red-500 hover:scale-110 transition-transform">
                    <Heart fill="currentColor" size={24} />
                </button>
            </div>

            {/* Address */}
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {cafe.address}
            </p>

            {/* Stats & Actions */}
            <div className="flex gap-4">
                <StatBox label="Daily Visitors" value={cafe.visitors} />

                {/* Reviews */}
                <div className="relative group/reviews flex-1">
                    <StatBox label="Reviews" value={cafe.reviewsCount} />
                    {cafe.recentReviews && cafe.recentReviews.length > 0 && (
                        <div className="absolute left-0 bottom-full mb-2 w-72 bg-white rounded-xl shadow-2xl p-4 hidden group-hover/reviews:block z-50 border border-gray-100 max-h-60 overflow-y-auto">
                            <h4 className="font-bold text-xs text-gray-800 mb-2 uppercase tracking-wide">Recent Reviews</h4>
                            <div className="flex flex-col gap-3">
                                {cafe.recentReviews.slice(0, 3).map((review, i) => (
                                    <div key={i} className="border-b border-gray-50 pb-2 last:border-none">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                                <User size={10} />
                                            </div>
                                            <span className="font-semibold text-xs text-gray-700 line-clamp-1">{review.author_name}</span>
                                            <div className="flex text-yellow-400">
                                                {[...Array(review.rating || 5)].map((_, j) => <Star key={j} size={8} fill="currentColor" />)}
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-3 italic">"{review.text}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Book / Actions */}
                <div className="bg-[#E0F5EE] rounded-2xl p-3 flex-1 flex flex-col items-center justify-center transition-colors group gap-2">

                    {/* Delivery Links */}
                    <div className="flex gap-2">
                        <a href={zomatoLink} target="_blank" rel="noopener noreferrer" className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white font-bold text-[10px] shadow hover:scale-110 transition" title="Zomato">Z</a>
                        <a href={swiggyLink} target="_blank" rel="noopener noreferrer" className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-[10px] shadow hover:scale-110 transition" title="Swiggy">S</a>
                    </div>

                    {/* Google Book/View */}
                    <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white px-3 py-1 rounded-lg text-[10px] font-bold text-blue-600 shadow-sm hover:shadow-md flex items-center gap-1 w-full justify-center whitespace-nowrap"
                    >
                        <MapPin size={10} />
                        Reserve / View
                    </a>

                </div>
            </div>
        </div>
    );
};

const StatBox = ({ label, value }) => (
    <div className="bg-[#E0F5EE] rounded-2xl p-4 flex-1 flex flex-col justify-center h-full hover:bg-[#d0f0e6] transition-colors cursor-default">
        <div className="text-xl font-bold text-gray-800 mb-1">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
    </div>
);

export default CafeDetails;
