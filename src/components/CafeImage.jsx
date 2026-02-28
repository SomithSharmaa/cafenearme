import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CafeImage = ({ cafe }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Reset index when cafe changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [cafe?.id]);

    if (!cafe) return <div className="w-full h-full rounded-[2rem] bg-gray-200 shadow-xl" />;

    const images = cafe.images || [cafe.image];

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl relative group border-4 border-white">
            <img
                src={images[currentIndex]}
                alt={`${cafe.name} image ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {images.length > 1 && (
                <>
                    {/* Navigation Arrows */}
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                    >
                        <ChevronRight size={20} strokeWidth={2.5} />
                    </button>

                    {/* Pagination dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 p-1 rounded-full bg-black/20 backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/60 hover:bg-white/80'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CafeImage;
