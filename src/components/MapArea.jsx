import React from 'react';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { Coffee } from 'lucide-react';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '24px'
};

const mapOptions = {
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
        }
    ]
};

// Google-like Coffee Marker
const CafeMarker = ({ position, onClick, isSelected }) => {
    return (
        <OverlayView
            position={position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
            <div
                className="cursor-pointer transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform origin-bottom"
                onClick={onClick}
            >
                <div className={`flex flex-col items-center group relative`}>
                    {/* The Pin */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white transition-colors ${isSelected ? 'bg-black text-white' : 'bg-[#FF9E0D] text-white'}`}>
                        <Coffee size={14} fill="currentColor" />
                    </div>
                    {/* The Triangle Pointer */}
                    <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] -mt-[1px] ${isSelected ? 'border-t-black' : 'border-t-[#FF9E0D]'}`}></div>

                    {/* Pulse effect only if selected */}
                    {isSelected && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full animate-ping -z-10"></div>
                    )}
                </div>
            </div>
        </OverlayView>
    );
};

const MapArea = ({ cafes, selectedCafe, onCafeSelect }) => {
    const toLatLng = (coords) => {
        if (!coords) return { lat: 17.3850, lng: 78.4867 }; // Default Hyderabad
        if (Array.isArray(coords)) return { lat: coords[0], lng: coords[1] };
        return coords;
    };

    const center = selectedCafe ? toLatLng(selectedCafe.coordinates) : { lat: 17.3850, lng: 78.4867 };

    return (
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-inner border-4 border-white relative z-0">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                options={mapOptions}
            >
                {cafes.map(cafe => (
                    <CafeMarker
                        key={cafe.id}
                        position={toLatLng(cafe.coordinates)}
                        isSelected={selectedCafe?.id === cafe.id}
                        onClick={() => onCafeSelect(cafe)}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default MapArea;
