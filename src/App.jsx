import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
// import LeftPanel from './components/LeftPanel';
import FavoritesPanel from './components/FavoritesPanel';
import ReservationModal from './components/ReservationModal';
import MapArea from './components/MapArea';
import CafeDetails from './components/CafeDetails';
import CafeImage from './components/CafeImage';
import MatchmakerModal from './components/MatchmakerModal';
import MobileLayout from './components/MobileLayout';
import HomeOverlay from './components/HomeOverlay';
import { HYDERABAD_CAFES } from './data/mockCafes';
import './App.css';

const LIBRARIES = ['places'];
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: '', state: '', city: '', openNow: false });
  const [cafes, setCafes] = useState(HYDERABAD_CAFES);
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

  const performSearch = (query, location = null) => {
    if (!placesService.current) return;

    console.log("Fetching Cafes:", query, location);

    const request = {
      query: query,
      fields: ['name', 'geometry', 'photos', 'formatted_address', 'rating', 'user_ratings_total', 'types'],
      openNow: filters.openNow,
      types: ['cafe'], // Prioritize cafes in the search itself if supported by textSearch (it's not strictly a filter but a bias)
      ...(location && { location: new window.google.maps.LatLng(location.lat, location.lng), radius: 5000 })
    };

    placesService.current.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        console.log("Found results:", results.length);
        const newCafes = results.map(place => ({
          id: place.place_id,
          name: place.name,
          type: filters.type || 'Social',
          state: filters.state || 'Unknown',
          city: filters.city || 'Unknown',
          coordinates: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
          rating: place.rating || 4.2,
          visitors: `${place.user_ratings_total || 0}+`,
          reviewsCount: place.user_ratings_total || 0,
          address: place.formatted_address,
          image: place.photos ? place.photos[0].getUrl({ maxWidth: 800 }) : "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
          markerType: 'blue',
          label: ''
        }));

        // Strict Client-Side Filtering for "cafe" type
        const cafeOnlyResults = newCafes.filter(cafe => {
          // We can check the original result's types if we want to be strict
          // The API results usually have a 'types' array
          const originalResult = results.find(r => r.place_id === cafe.id);
          return originalResult && originalResult.types && originalResult.types.includes('cafe');
        });

        console.log("Filtered to Cafes:", cafeOnlyResults.length);
        setCafes(cafeOnlyResults);

        // Select first one by default if nothing selected
        if (cafeOnlyResults.length > 0 && !selectedCafe) {
          handleSelectSuggestion({ id: cafeOnlyResults[0].id });
        }
      } else {
        console.warn("No results found or API error", status);
      }
    });
  };



  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Geolocation and Initial Setup
  useEffect(() => {
    // Check if we have a deep link
    const path = location.pathname;
    if (path.startsWith('/cafe/')) {
      const cafeId = path.split('/')[2];
      // We'll handle selecting this cafe after we load cafes, or we fetch it directly.
    }

    // NOTE: Removed automatic geolocation search to prefer the Curated Hyderabad List on load.
    // User can trigger geolocation search manually if implemented.
  }, []);

  // Sync URL with Selected Cafe
  useEffect(() => {
    if (selectedCafe) {
      navigate(`/cafe/${selectedCafe.id}`, { replace: true });
    }
  }, [selectedCafe, navigate]);

  // Trigger search when filtering explicitly
  useEffect(() => {
    if (isApiLoaded) {
      // Only search if there are explicit filters active that require API
      // Otherwise we stick to our curated list
      if (filters.city || filters.state || (filters.type && filters.type !== '')) {
        const locationQuery = filters.city || filters.state || 'Hyderabad';
        const typeQuery = filters.type ? `${filters.type} cafes` : 'Best cafes';
        const query = `${typeQuery} in ${locationQuery}`;
        // performSearch(query); // Optional: Enable if we want API search for filters
      }
    }
  }, [isApiLoaded, filters]);

  // Autocomplete Search Logic
  useEffect(() => {
    if (!searchTerm || searchTerm.length < 2 || !autocompleteService.current) {
      setSuggestions([]);
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
  }, [searchTerm]);

  const handleSelectSuggestion = (suggestion) => {
    setSuggestions([]);
    if (suggestion.name) setSearchTerm(suggestion.name);

    if (placesService.current) {
      const request = {
        placeId: suggestion.id || suggestion.place_id,
        fields: ['name', 'rating', 'formatted_address', 'geometry', 'photos', 'user_ratings_total', 'address_components', 'reviews', 'website', 'url']
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          let city = "Unknown";
          let state = "Unknown";
          place.address_components?.forEach(comp => {
            if (comp.types.includes('locality')) city = comp.long_name;
            if (comp.types.includes('administrative_area_level_1')) state = comp.long_name;
          });

          const newCafe = {
            id: suggestion.id || suggestion.place_id,
            name: place.name,
            type: filters.type || 'Social',
            state: state,
            city: city,
            coordinates: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
            rating: place.rating || 4.0,
            visitors: `${place.user_ratings_total || 100}+`,
            reviewsCount: `${place.user_ratings_total || 50}`,
            recentReviews: place.reviews || [],
            website: place.website,
            googleUrl: place.url,
            address: place.formatted_address,
            image: place.photos ? place.photos[0].getUrl({ maxWidth: 800 }) : "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
            markerType: 'blue',
            label: '!'
          };

          setCafes(prev => {
            // Check if exists
            const exists = prev.find(c => c.id === newCafe.id);
            if (exists) return prev.map(c => c.id === newCafe.id ? newCafe : c);
            return [...prev, newCafe];
          });
          setSelectedCafe(newCafe);
        }
      });
    }
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
    performSearch(query);
  };

  const trendingCafes = useMemo(() => {
    return [...cafes].sort((a, b) => b.rating - a.rating).slice(0, 10);
  }, [cafes]);

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={LIBRARIES} onLoad={onScriptLoad}>
      {isMobile ? (
        <MobileLayout
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFilterChange={handleFilterChange}
          suggestions={suggestions}
          onSuggestionSelect={handleSelectSuggestion}
          cafes={cafes}
          selectedCafe={selectedCafe}
          onCafeSelect={handleSelectSuggestion}
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



          <ReservationModal
            isOpen={isReservationOpen}
            onClose={() => setIsReservationOpen(false)}
            cafe={selectedCafe}
          />

          <MatchmakerModal
            isOpen={isMatchmakerOpen}
            onClose={() => setIsMatchmakerOpen(false)}
            cafes={cafes}
            onMatchFound={(match) => {
              handleSelectSuggestion(match);
              setActiveTab('explore');
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
                onSuggestionSelect={handleSelectSuggestion}
              />
            )}

            {activeTab === 'home' && (
              <HomeOverlay
                onVibeSelect={handleVibeSelect}
                trendingCafes={trendingCafes}
                onCafeSelect={(cafe) => {
                  handleSelectSuggestion(cafe);
                  setActiveTab('explore'); // Switch to explore to show details
                }}
                onOpenMatchmaker={() => setIsMatchmakerOpen(true)}
              />
            )}

            <div className="flex-1 w-full relative min-h-0 p-8">
              {/* Map Area with padding to reveal background */}
              <MapArea
                cafes={activeTab === 'favorites' ? favorites : cafes}
                selectedCafe={selectedCafe}
                onCafeSelect={handleSelectSuggestion}
                isHome={activeTab === 'home'}
              />
            </div>

            {/* Bottom Details Area */}
            {activeTab !== 'home' && (
              <div className="h-[320px] w-full flex gap-6 shrink-0 p-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none">
                <div className="pointer-events-auto flex w-full gap-6">
                  <div className="w-[450px] shrink-0 h-full">
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
                    <div className="flex-1 h-full">
                      <CafeImage cafe={selectedCafe} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </LoadScript>
  );
}

export default App;
