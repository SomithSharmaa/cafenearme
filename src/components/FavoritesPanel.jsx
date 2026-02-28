import React from 'react';
import { X, MapPin, Star } from 'lucide-react';

const FavoritesPanel = ({ favorites, onCafeSelect, onClose }) => {
    return (
        <div className="h-full w-[400px] bg-white border-r border-gray-100 shadow-xl z-40 flex flex-col animate-in slide-in-from-left duration-300">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">Your Favorites</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <p className="text-gray-500 text-sm">{favorites.length} saved places</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center p-6 text-gray-400">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Star size={32} className="text-gray-300" />
                        </div>
                        <p className="font-semibold text-gray-600 mb-1">No favorites yet</p>
                        <p className="text-xs max-w-[200px]">Mark cafes as favorites to create your personal collection here.</p>
                    </div>
                ) : (
                    favorites.map(cafe => (
                        <div
                            key={cafe.id}
                            className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group flex gap-3"
                            onClick={() => onCafeSelect(cafe)}
                        >
                            {/* Image */}
                            <div className="w-20 h-20 rounded-lg bg-gray-200 shrink-0 overflow-hidden relative">
                                <img src={cafe.image} alt={cafe.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-1 right-1 bg-white/90 backdrop-blur rounded px-1 flex items-center gap-0.5 text-[10px] font-bold shadow-sm">
                                    <Star size={8} className="text-yellow-400 fill-yellow-400" />
                                    {cafe.rating}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h3 className="font-bold text-gray-800 text-sm truncate mb-0.5">{cafe.name}</h3>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                                    <MapPin size={10} className="text-blue-500 shrink-0" />
                                    <span className="truncate">{cafe.city || 'Hyderabad'}, {cafe.state}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">
                                        {cafe.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer Tip */}
            {favorites.length > 0 && (
                <div className="p-4 bg-blue-50/50 border-t border-blue-100 text-center">
                    <p className="text-xs text-blue-400 font-medium">Tip: Click on a cafe to view details</p>
                </div>
            )}
        </div>
    );
};

export default FavoritesPanel;
