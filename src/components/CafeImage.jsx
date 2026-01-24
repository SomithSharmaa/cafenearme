import React from 'react';

const CafeImage = ({ cafe }) => {
    if (!cafe) return <div className="w-full h-full rounded-[2rem] bg-gray-200 shadow-xl" />;

    return (
        <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl relative group border-4 border-white">
            <img
                src={cafe.image}
                alt={cafe.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Search/Zoom or overlay icons could go here */}

            {/* Pagination dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white/80" />
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <div className="w-2 h-2 rounded-full bg-white/40" />
            </div>
        </div>
    );
};

export default CafeImage;
