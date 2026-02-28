import React, { useMemo, useState, useRef } from 'react';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import useSupercluster from 'use-supercluster';
import { Coffee, Star } from 'lucide-react';

const containerStyle = {
    width: '100%',
    height: '100%'
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

// Individual Cafe Marker -> Refactored to match Blrbloom single pins
const CafeMarker = ({ position, onClick, isSelected }) => {
    return (
        <OverlayView
            position={position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
            <div
                className="cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform z-[150]"
                onClick={onClick}
            >
                <div className={`w-5 h-5 rounded-full bg-pink-400 border-[3px] border-white shadow-md relative`}>
                    {isSelected && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-pink-300/40 rounded-full animate-ping -z-10"></div>}
                </div>
            </div>
        </OverlayView>
    );
};

// Custom Styles for the Map Clusters
const ClusterMarker = ({ position, count, colorClass }) => {
    // Blrbloom clusters dynamically scale but don't get too large
    const baseSize = 40;
    const scaleFactor = Math.min(count * 1.5, 30);
    const size = baseSize + scaleFactor;

    return (
        <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div className={`flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-[100] relative cursor-pointer group`} style={{ width: `${size}px`, height: `${size}px` }}>

                {/* Solid Pink/Purple Cluster */}
                <div
                    className={`absolute inset-0 rounded-full shadow-lg border-2 border-white/50 flex items-center justify-center transition-transform hover:scale-110 ${colorClass}`}
                >
                    <span className="font-bold text-white text-[15px] font-sans drop-shadow-md">{count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count}</span>
                </div>
            </div>
        </OverlayView>
    );
};

// LabelMarker representing the MVP Cafe black tooltip
const LabelMarker = ({ position, name, rating, placement = 'top', onClick }) => {
    return (
        <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div
                className={`flex flex-col items-center transform -translate-x-1/2 -translate-y-[calc(100%-10px)] cursor-pointer z-[200] group`}
                onClick={onClick}
            >
                <div className={`flex flex-col items-center relative`}>

                    {/* Black Label Box - Figma style */}
                    <div className={`bg-black text-white px-3 py-1.5 shadow-2xl whitespace-nowrap flex items-center relative z-50`}>
                        <span className="font-medium text-[12px] tracking-wide font-sans">{name}</span>
                    </div>

                    {/* Thin Connecting Line */}
                    <div className={`w-[1px] h-8 bg-gray-500`}></div>

                    {/* Orange Dot Point at the base */}
                    <div className="w-5 h-5 rounded-full bg-[#FFAC33] border-[4px] border-orange-100 z-40 relative transition-transform duration-300 group-hover:scale-125 shadow-sm">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-orange-300/40 rounded-full -z-10"></div>
                    </div>
                </div>
            </div>
        </OverlayView>
    );
};

const MOCK_CLUSTERS = [
    { id: 'c1', pos: { lat: 17.4485, lng: 78.3910 }, count: 12, color: 'from-blue-200 to-cyan-200', borderColor: 'border-blue-400', mvp: { name: "The Roastery Coffee House", rating: 4.9, pos: { lat: 17.4420, lng: 78.3975 } }, labelOffset: { lat: -0.0065, lng: 0.0065 } }, // Madhapur Core
    { id: 'c2', pos: { lat: 17.4350, lng: 78.4000 }, count: 8, color: 'from-purple-200 to-pink-200', borderColor: 'border-purple-400', mvp: { name: "Araku Coffee", rating: 4.8, pos: { lat: 17.4320, lng: 78.4050 } }, labelOffset: { lat: -0.003, lng: 0.005 } }, // Jubilee Area
    { id: 'c3', pos: { lat: 17.4500, lng: 78.3700 }, count: 15, color: 'from-orange-200 to-yellow-200', borderColor: 'border-orange-400', mvp: { name: "Third Wave Coffee, Hitech", rating: 4.7, pos: { lat: 17.4480, lng: 78.3750 } }, labelOffset: { lat: -0.002, lng: 0.005 } }, // Hitech City
];

const MapArea = ({ cafes = [], selectedCafe, onCafeSelect, isHome }) => {
    const mapRef = useRef(null);
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(12);

    const toLatLng = (coords) => {
        if (!coords) return { lat: 17.3850, lng: 78.4867 };
        if (Array.isArray(coords)) return { lat: coords[0], lng: coords[1] };
        return coords;
    };

    const center = selectedCafe ? toLatLng(selectedCafe.coordinates) : (cafes.length > 0 ? toLatLng(cafes[0].coordinates) : { lat: 17.4400, lng: 78.3489 });

    // Convert cafes to GeoJSON Points for supercluster
    const points = useMemo(() => {
        return cafes.map(cafe => {
            const coords = toLatLng(cafe.coordinates);
            return {
                type: "Feature",
                properties: {
                    cluster: false,
                    cafeId: cafe.id,
                    name: cafe.name,
                    rating: parseFloat(cafe.rating) || 0,
                    reviewsCount: parseInt(cafe.reviewsCount) || 0,
                    original: cafe
                },
                geometry: {
                    type: "Point",
                    coordinates: [coords.lng, coords.lat] // GeoJSON expects [longitude, latitude]
                }
            };
        });
    }, [cafes]);

    // Apply useSupercluster
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: {
            radius: 160, // Increased radius to group more points (fewer total clusters)
            maxZoom: 20,
            map: props => ({
                mvp: props.original,
                rating: props.rating,
                reviewsCount: props.reviewsCount
            }),
            reduce: (accumulated, props) => {
                const accRating = accumulated.rating;
                const propRating = props.rating;
                if (propRating > accRating) {
                    accumulated.mvp = props.mvp;
                    accumulated.rating = propRating;
                    accumulated.reviewsCount = props.reviewsCount;
                } else if (propRating === accRating) {
                    if (props.reviewsCount > accumulated.reviewsCount) {
                        accumulated.mvp = props.mvp;
                        accumulated.reviewsCount = props.reviewsCount;
                    }
                }
            }
        }
    });

    // Blrbloom pastel pink/purple colors
    const getClusterColor = (clusterId) => {
        const blrbloomClasses = [
            'bg-gradient-to-br from-pink-400 to-rose-400',
            'bg-gradient-to-br from-purple-400 to-fuchsia-400',
            'bg-gradient-to-br from-rose-400 to-pink-500',
            'bg-gradient-to-br from-fuchsia-400 to-purple-500'
        ];
        return blrbloomClasses[Math.abs(clusterId) % blrbloomClasses.length];
    };

    return (
        <div className="w-full h-full relative z-0">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={mapOptions}
                onLoad={(map) => {
                    mapRef.current = map;
                    if (cafes && cafes.length > 0) {
                        const newBounds = new window.google.maps.LatLngBounds();
                        cafes.forEach(cafe => {
                            if (cafe.coordinates) {
                                newBounds.extend(toLatLng(cafe.coordinates));
                            }
                        });
                        map.fitBounds(newBounds);
                    }
                }}
                onBoundsChanged={() => {
                    if (mapRef.current) {
                        const mapBounds = mapRef.current.getBounds();
                        if (mapBounds) {
                            setBounds([
                                mapBounds.getSouthWest().lng(),
                                mapBounds.getSouthWest().lat(),
                                mapBounds.getNorthEast().lng(),
                                mapBounds.getNorthEast().lat()
                            ]);
                        }
                    }
                }}
                onZoomChanged={() => {
                    if (mapRef.current) {
                        setZoom(mapRef.current.getZoom());
                    }
                }}
            >
                {isHome ? (
                    <>
                        {clusters.map(cluster => {
                            const [longitude, latitude] = cluster.geometry.coordinates;
                            const { cluster: isCluster, point_count: pointCount, mvp, original } = cluster.properties;

                            if (isCluster) {
                                const colorClass = getClusterColor(cluster.id);
                                return (
                                    <React.Fragment key={`cluster-${cluster.id}`}>
                                        <ClusterMarker
                                            position={{ lat: latitude, lng: longitude }}
                                            count={pointCount}
                                            colorClass={colorClass}
                                        />
                                        {mvp && (
                                            <LabelMarker
                                                position={toLatLng(mvp.coordinates)}
                                                name={mvp.name}
                                                rating={mvp.rating}
                                                onClick={() => onCafeSelect(mvp)}
                                            />
                                        )}
                                    </React.Fragment>
                                );
                            }

                            // It's a single point (unclustered)
                            return (
                                <React.Fragment key={`cafe-${cluster.properties.cafeId}`}>
                                    <CafeMarker
                                        position={{ lat: latitude, lng: longitude }}
                                        isSelected={selectedCafe?.id === cluster.properties.cafeId}
                                        onClick={() => onCafeSelect(original)}
                                    />
                                    {isHome && zoom > 14 && (
                                        <LabelMarker
                                            position={{ lat: latitude, lng: longitude }}
                                            name={original.name}
                                            rating={original.rating}
                                            onClick={() => onCafeSelect(original)}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </>
                ) : (
                    // Explore Mode: Individual Pins
                    cafes.map(cafe => (
                        <CafeMarker
                            key={cafe.id}
                            position={toLatLng(cafe.coordinates)}
                            isSelected={selectedCafe?.id === cafe.id}
                            onClick={() => onCafeSelect(cafe)}
                        />
                    ))
                )}
            </GoogleMap>
        </div>
    );
};

export default MapArea;
