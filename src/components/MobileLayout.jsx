import React, { useRef, useEffect } from 'react';
import TopBar from './TopBar';
import MapArea from './MapArea';
import CafeDetails from './CafeDetails';
import CafeImage from './CafeImage';
import { X } from 'lucide-react';

const MobileLayout = ({
    searchTerm, onSearchChange, filters, onFilterChange, suggestions, onSuggestionSelect,
    cafes, selectedCafe, onCafeSelect
}) => {
    const detailsRef = useRef(null);

    useEffect(() => {
        if (selectedCafe && detailsRef.current) {
            detailsRef.current.scrollTop = 0;
        }
    }, [selectedCafe]);

    return (
        <div className="h-screen w-screen flex flex-col relative overflow-hidden bg-white">
            {/* Map Layer */}
            <div className="absolute inset-0 z-0">
                <MapArea cafes={cafes} selectedCafe={selectedCafe} onCafeSelect={onCafeSelect} />
            </div>

            {/* Top Bar - Responsive via TopBar component itself */}
            <TopBar
                searchTerm={searchTerm} onSearchChange={onSearchChange}
                filters={filters} onFilterChange={onFilterChange}
                suggestions={suggestions} onSuggestionSelect={onSuggestionSelect}
            />

            {/* Bottom Sheet for Details */}
            <div
                className={`absolute bottom-0 left-0 right-0 z-[1050] bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out max-h-[85vh] flex flex-col ${selectedCafe ? 'translate-y-0' : 'translate-y-full'}`}
                style={{ visibility: selectedCafe ? 'visible' : 'hidden' }} // avoid blocking clicks when hidden
            >
                {selectedCafe && (
                    <>
                        <div className="w-full h-48 relative shrink-0">
                            <div className="w-full h-full rounded-t-2xl overflow-hidden">
                                <CafeImage cafe={selectedCafe} />
                            </div>
                            <button onClick={() => onCafeSelect(null)} className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full shadow-sm z-10 hover:bg-white text-gray-800">
                                <X size={20} />
                            </button>
                        </div>
                        <div ref={detailsRef} className="flex-1 overflow-y-auto w-full scroll-smooth bg-transparent">
                            <CafeDetails cafe={selectedCafe} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MobileLayout;
