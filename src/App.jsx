import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import FavoritesPanel from './components/FavoritesPanel';
import ReservationModal from './components/ReservationModal';
import MapArea from './components/MapArea';
import CafeDetails from './components/CafeDetails';
import CafeImage from './components/CafeImage';
import MatchmakerModal from './components/MatchmakerModal';
import MobileLayout from './components/MobileLayout';
import HomeOverlay from './components/HomeOverlay';
import { REAL_CAFES } from './data/realCafes';
import './App.css';

const LIBRARIES = ['places'];
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: '', state: '', city: '', openNow: false });
  const [cafes, setCafes] = useState(REAL_CAFES);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'explore', 'favorites'
  const [favorites, setFavorites] = useState([]);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMatchmakerOpen, setIsMatchmakerOpen] = useState(false);

  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  const onScriptLoad = () => {
    if (window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      const dummyDiv = document.createElement('div');
      placesService.current = new window.google.maps.places.PlacesService(dummyDiv);
      setIsApiLoaded(true);
    }
  };

  // Perform Text Search

  const fetchLiveCafes = (locationCoords = { lat: 17.4065, lng: 78.4772 }) => {
    if (!placesService.current) return;

    let allResults = [];

    // NearbySearch naturally returns denser location-based results (up to 60 with pagination)
    const request = {
      location: new window.google.maps.LatLng(locationCoords.lat, locationCoords.lng),
      radius: 10000, // 10km radius
      type: 'cafe'
    };

    const handleResults = (results, status, pagination) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        allResults = [...allResults, ...results];

        // Fetch up to 3 pages (approx 60 cafes) to make clustering look good
        if (pagination && pagination.hasNextPage && allResults.length < 60) {
          // delay required by Google API before next page is ready
          setTimeout(() => {
            pagination.nextPage();
          }, 2000);
        } else {
          // Process all fetched cafes
          const formattedCafes = allResults.map(place => ({
            id: place.place_id,
            name: place.name,
            type: filters.type || 'Social',
            state: 'Telangana',
            city: 'Hyderabad',
            coordinates: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
            rating: place.rating || (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
            visitors: `${place.user_ratings_total || Math.floor(Math.random() * 500) + 50}+`,
            reviewsCount: place.user_ratings_total || Math.floor(Math.random() * 500) + 50,
            address: place.vicinity || place.formatted_address || "Hyderabad",
            image: place.photos ? place.photos[0].getUrl({ maxWidth: 800 }) : "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
            images: place.photos ? place.photos.slice(0, 5).map(p => p.getUrl({ maxWidth: 800 })) : ["https://images.unsplash.com/photo-1554118811-1e0d58224f24"],
            markerType: 'blue',
            label: ''
          }));

          setCafes(formattedCafes);

          if (formattedCafes.length > 0 && !selectedCafe) {
            handleSelectSuggestion({ id: formattedCafes[0].id });
          }
        }
      }
    };

    placesService.current.nearbySearch(request, handleResults);
  };




  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Geolocation and Initial Setup
  useEffect(() => {


    // NOTE: Removed automatic geolocation search to prefer the Curated Hyderabad List on load.
    // User can trigger geolocation search manually if implemented.
  }, [location.pathname]);

  // Removed automatic URL syncing with cafe ID to keep the user on the clean root URL
  useEffect(() => {
    // If we want to restore history without pushing /cafe/:id, we could use a query param
    // but the user prefers it to just stay on root.
  }, [selectedCafe]);

  // Trigger initial live fetch on load
  useEffect(() => {
    // Disabled live fetch since we now have 900+ real cafes in REAL_CAFES
    if (isApiLoaded && cafes === REAL_CAFES && false) {
      // Automatic data pull for real places using NearbySearch
      fetchLiveCafes();
    }
  }, [isApiLoaded]);

  // Ensure states are cleanly reset when switching back to home
  useEffect(() => {
    if (activeTab === 'home') {
      setSearchTerm('');
      setFilters({ type: '', state: '', city: '', vibe: '' });
      setSelectedCafe(null);
      setIsMatchmakerOpen(false); // Belt & suspenders
    } else {
      setIsMatchmakerOpen(false);
    }
  }, [activeTab]);

  // Autocomplete Search Logic
  useEffect(() => {
    if (!searchTerm || searchTerm.length < 2 || !autocompleteService.current) {
      // Move setSuggestions into another place or suppress this specific cascaded render hook warning
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (suggestions.length > 0) setSuggestions([]);
      return;
    }
    const request = { input: searchTerm, types: ['cafe', 'bakery', 'restaurant', 'food'] };
    autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        setSuggestions(predictions.map(p => ({
          id: p.place_id,
          name: p.structured_formatting.main_text,
          city: p.structured_formatting.secondary_text,
          description: p.description
        })));
      } else {
        setSuggestions([]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSelectSuggestion = (suggestion) => {
    setSuggestions([]);
    // Intentional: we do NOT auto-set `searchTerm` here anymore to prevent map markers disappearing on click.

    if (placesService.current) {
      // If it's an autocomplete suggestion without coordinates, get details directly
      if (!suggestion.coordinates) {
        getPlaceDetails(suggestion.id || suggestion.place_id, suggestion);
      } else {
        // If it's a map click (OSM data), search by name and location first to find Place ID
        const request = {
          query: suggestion.name,
          location: new window.google.maps.LatLng(suggestion.coordinates.lat, suggestion.coordinates.lng),
          radius: 500
        };
        placesService.current.textSearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            getPlaceDetails(results[0].place_id, suggestion);
          } else {
            // Fallback if not found on Google Maps
            setSelectedCafe(suggestion);
          }
        });
      }
    } else {
      setSelectedCafe(suggestion);
    }
  };

  const getPlaceDetails = (placeId, originalCafe) => {
    const request = {
      placeId: placeId,
      fields: ['name', 'rating', 'formatted_address', 'geometry', 'photos', 'user_ratings_total', 'address_components', 'reviews', 'website', 'url', 'opening_hours']
    };

    placesService.current.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let city = originalCafe.city || "Unknown";
        let state = originalCafe.state || "Unknown";
        if (place.address_components) {
          place.address_components.forEach(comp => {
            if (comp.types.includes('locality')) city = comp.long_name;
            if (comp.types.includes('administrative_area_level_1')) state = comp.long_name;
          });
        }

        const enrichedCafe = {
          ...originalCafe,
          id: originalCafe.id, // Preserve map ID
          name: place.name || originalCafe.name,
          city: city,
          state: state,
          coordinates: originalCafe.coordinates || { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
          rating: place.rating || originalCafe.rating,
          reviewsCount: place.user_ratings_total || originalCafe.reviewsCount,
          recentReviews: place.reviews || [],
          website: place.website || originalCafe.website,
          googleUrl: place.url || originalCafe.googleUrl,
          address: place.formatted_address || originalCafe.address,
          isOpen: place.opening_hours ? (place.opening_hours.isOpen() ? 'Open Now' : 'Closed') : 'Unknown',
          image: place.photos ? place.photos[0].getUrl({ maxWidth: 800 }) : originalCafe.image,
          images: place.photos ? place.photos.slice(0, 5).map(p => p.getUrl({ maxWidth: 800 })) : originalCafe.images || [originalCafe.image],
        };

        setCafes(prev => {
          const exists = prev.find(c => c.id === enrichedCafe.id);
          if (exists) return prev.map(c => c.id === enrichedCafe.id ? enrichedCafe : c);
          return [...prev, enrichedCafe]; // Only if it was purely an autocomplete suggestion not in dataset
        });
        setSelectedCafe(enrichedCafe);
      } else {
        setSelectedCafe(originalCafe);
      }
    });
  };

  const toggleFavorite = (cafe) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === cafe.id);
      if (exists) {
        return prev.filter(fav => fav.id !== cafe.id);
      }
      return [...prev, cafe];
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleVibeSelect = (query) => {
    setActiveTab('explore');
    setSearchTerm(query);
    // You could also hook up textSearch here if they input a specific vibe phrase
  };

  const trendingCafes = useMemo(() => {
    return [...cafes].sort((a, b) => b.rating - a.rating).slice(0, 10);
  }, [cafes]);

  const filteredCafes = useMemo(() => {
    return cafes.filter(cafe => {
      // Pseudo-filter for combinations given we don't have actual vibe/type data natively
      if (filters.state && cafe.state && cafe.state !== filters.state) return false;
      if (filters.city && cafe.city && cafe.city !== filters.city) return false;

      // Filter by text search if present
      if (searchTerm && searchTerm.trim()) {
        if (!cafe.name.toLowerCase().includes(searchTerm.toLowerCase().trim())) {
          return false;
        }
      }

      const lowerName = cafe.name.toLowerCase();

      if (filters.vibe) {
        if (filters.vibe === 'cozy' && !/bake|book|wood|nest|house|home/i.test(lowerName) && cafe.id % 3 !== 0) return false;
        if (filters.vibe === 'work' && !/roast|brew|bean|work|desk|lab/i.test(lowerName) && cafe.id % 3 !== 1) return false;
        if (filters.vibe === 'romantic' && !/lounge|star|moon|date|love/i.test(lowerName) && cafe.id % 4 !== 0) return false;
        if (filters.vibe === 'speciality' && !/roaster|special|craft|artisan|pure/i.test(lowerName) && cafe.id % 5 !== 0) return false;
        if (filters.vibe === 'meetups' && !/social|club|group|meet|hub/i.test(lowerName) && cafe.id % 5 !== 1) return false;
        if (filters.vibe === 'outdoor' && !/garden|yard|terrace|patio|outside/i.test(lowerName) && cafe.id % 5 !== 2) return false;
      }

      if (filters.type) {
        if (filters.type === 'Cozy' && !/bake|book|wood|nest/i.test(lowerName) && cafe.id % 3 !== 0) return false;
        if (filters.type === 'Work' && !/roast|brew|bean|work|desk/i.test(lowerName) && cafe.id % 3 !== 1) return false;
        if (filters.type === 'Social' && !/social|club|group|meet|hub/i.test(lowerName) && cafe.id % 3 !== 2) return false;
      }
      return true;
    });
  }, [cafes, filters]);

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={LIBRARIES} onLoad={onScriptLoad}>
      {isMobile ? (
        <MobileLayout
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFilterChange={handleFilterChange}
          suggestions={suggestions}
          onSuggestionSelect={(val) => {
            handleSelectSuggestion(val);
            if (val && val.name) setSearchTerm(val.name);
          }}
          cafes={filteredCafes}
          selectedCafe={selectedCafe}
          onCafeSelect={(cafe) => {
            if (cafe === null) {
              setSelectedCafe(null);
              return;
            }
            handleSelectSuggestion(cafe);
            // Intentionally not switching tabs or wiping search
          }}
        />
      ) : (
        <div
          className="flex h-screen w-screen overflow-hidden font-sans text-slate-800"
          style={{
            background: 'linear-gradient(-45deg, #D3F8E2, #E9FBF1, #9EEAFF)',
            backgroundSize: '200% 200%'
          }}
        >
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onOpenMatchmaker={() => setIsMatchmakerOpen(true)}
          />

          <main className="flex-1 flex flex-col h-full relative">

            <ReservationModal
              isOpen={isReservationOpen}
              onClose={() => setIsReservationOpen(false)}
              cafe={selectedCafe}
            />

            <MatchmakerModal
              isOpen={isMatchmakerOpen}
              onClose={() => setIsMatchmakerOpen(false)}
              cafes={filteredCafes}
              onMatchFound={(match) => {
                const query = typeof match === 'string' ? match : (match.name || '');
                const lower = query.toLowerCase();
                let foundVibe = '';

                if (/cozy|quiet|book|read|warm|nest|relax/.test(lower)) foundVibe = 'cozy';
                else if (/work|wifi|laptop|study|meeting|office/.test(lower)) foundVibe = 'work';
                else if (/romantic|date|couple|love|intimate/.test(lower)) foundVibe = 'romantic';
                else if (/speciality|brew|roast|artisan|craft/.test(lower)) foundVibe = 'speciality';
                else if (/outdoor|patio|garden|terrace|outside/.test(lower)) foundVibe = 'outdoor';
                else if (/group|social|friend|meetup|casual/.test(lower)) foundVibe = 'meetups';

                if (foundVibe) {
                  setFilters(prev => ({ ...prev, vibe: foundVibe }));
                  setSearchTerm(''); // Clear text to let vibe take priority
                } else {
                  setSearchTerm(query); // Fallback to raw text search
                }
              }}
            />

            {/* Favorites Panel */}
            {activeTab === 'favorites' && (
              <FavoritesPanel
                favorites={favorites}
                onCafeSelect={handleSelectSuggestion}
                onClose={() => setActiveTab('explore')}
              />
            )}

            <main className="flex-1 flex flex-col h-full relative">
              {/* Top Bar - Only visible in Explore tab */}
              {activeTab === 'explore' && (
                <TopBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  suggestions={suggestions}
                  onSuggestionSelect={(val) => {
                    handleSelectSuggestion(val);
                    if (val && val.name) setSearchTerm(val.name);
                    setActiveTab('home'); // Send them back to map to see their exact search
                  }}
                />
              )}

              {activeTab === 'home' && !isMatchmakerOpen && (
                <HomeOverlay
                  onVibeSelect={handleVibeSelect}
                  trendingCafes={trendingCafes}
                  onCafeSelect={(cafe) => {
                    handleSelectSuggestion(cafe);
                    // Stay on home so they can see the map markers and bottom details
                  }}
                  onOpenMatchmaker={() => setIsMatchmakerOpen(true)}
                />
              )}

              {/* Grid View (Hidden when not on explore) */}
              <div className={`flex-1 w-full overflow-y-auto hide-scrollbar pt-[150px] px-8 pb-8 z-10 ${activeTab === 'explore' ? 'block' : 'hidden'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
                  {filteredCafes.map(cafe => (
                    <div
                      key={cafe.id}
                      className="h-[300px] hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                      onClick={() => {
                        handleSelectSuggestion(cafe);
                        setActiveTab('home');
                      }}
                    >
                      <CafeDetails
                        cafe={{
                          ...cafe,
                          isFavorite: favorites.some(fav => fav.id === cafe.id),
                          onToggleFavorite: toggleFavorite,
                          onReserve: () => {
                            setSelectedCafe(cafe);
                            setIsReservationOpen(true);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Map View (Hidden when on explore) */}
              <div className={`flex-1 w-full relative min-h-0 p-8 z-0 ${activeTab !== 'explore' ? 'block' : 'hidden'}`}>
                <MapArea
                  cafes={filteredCafes}
                  selectedCafe={selectedCafe}
                  onCafeSelect={(cafe) => {
                    handleSelectSuggestion(cafe);
                  }}
                  isHome={activeTab === 'home'}
                />
              </div>

              {/* Bottom Details Area (Only for Map View modes) */}
              <div className={`h-[320px] w-full flex gap-6 shrink-0 p-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none transition-transform duration-500 ease-in-out ${(activeTab !== 'explore' && !isMatchmakerOpen && selectedCafe) ? 'translate-y-0 opacity-100 z-50' : 'translate-y-full opacity-0 absolute bottom-0 z-0'}`}>
                <div className="pointer-events-auto flex w-full gap-6 h-full items-end max-w-[1600px] mx-auto">
                  <div className="w-[480px] shrink-0 h-[280px]">
                    <CafeDetails
                      cafe={selectedCafe ? {
                        ...selectedCafe,
                        isFavorite: favorites.some(fav => fav.id === selectedCafe.id),
                        onToggleFavorite: toggleFavorite,
                        onReserve: () => setIsReservationOpen(true)
                      } : null}
                    />
                  </div>
                  {selectedCafe && (
                    <div className="flex-1 h-[280px] relative transition-all duration-500 delay-100 transform origin-bottom animate-in fade-in slide-in-from-bottom-8">
                      <CafeImage cafe={selectedCafe} />
                      <button
                        onClick={() => setSelectedCafe(null)}
                        className="absolute -top-3 -right-3 bg-white shadow-xl rounded-full p-2 text-gray-500 hover:text-black hover:scale-110 transition-transform z-20"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </main>
        </div>
      )}
    </LoadScript>
  );
}

export default App;
