import React, { useState, useMemo, useEffect, useRef } from 'react';
import { LoadScript } from '@react-google-maps/api';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MapArea from './components/MapArea';
import CafeDetails from './components/CafeDetails';
import CafeImage from './components/CafeImage';
import './App.css';

const LIBRARIES = ['places'];
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: '', state: '', city: 'Hyderabad' });
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

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
  const performSearch = (query) => {
    if (!placesService.current) return;

    console.log("Fetching Cafes:", query);

    const request = {
      query: query,
      fields: ['name', 'geometry', 'photos', 'formatted_address', 'rating', 'user_ratings_total']
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
          visitors: '...',
          reviewsCount: place.user_ratings_total || 0,
          address: place.formatted_address,
          image: place.photos ? place.photos[0].getUrl({ maxWidth: 800 }) : "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
          markerType: 'blue',
          label: ''
        }));
        setCafes(newCafes);
        // Select first one by default if nothing selected
        if (newCafes.length > 0 && !selectedCafe) {
          handleSelectSuggestion({ id: newCafes[0].id });
        }
      } else {
        console.warn("No results found or API error", status);
      }
    });
  };

  // Trigger search when API loads or filters change
  useEffect(() => {
    if (isApiLoaded && (filters.city || filters.state)) {
      const locationQuery = filters.city || filters.state;
      const typeQuery = filters.type ? `${filters.type} cafes` : 'Best cafes';
      const query = `${typeQuery} in ${locationQuery}`;
      performSearch(query);
    }
  }, [isApiLoaded, filters.city, filters.state, filters.type]);

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

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={LIBRARIES} onLoad={onScriptLoad}>
      <div className="flex h-screen w-screen bg-cafe-mint overflow-hidden font-sans text-slate-800">
        <Sidebar />
        <main className="flex-1 flex flex-col p-6 gap-6 h-full relative">
          <div className="flex-1 w-full relative min-h-0">
            <TopBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filters={filters}
              onFilterChange={handleFilterChange}
              suggestions={suggestions}
              onSuggestionSelect={handleSelectSuggestion}
            />
            <MapArea
              cafes={cafes}
              selectedCafe={selectedCafe}
              onCafeSelect={handleSelectSuggestion}
            />
          </div>
          <div className="h-[300px] w-full flex gap-6 shrink-0">
            <div className="w-[500px] shrink-0">
              <CafeDetails cafe={selectedCafe} />
            </div>
            <div className="flex-1">
              <CafeImage cafe={selectedCafe} />
            </div>
          </div>
        </main>
      </div>
    </LoadScript>
  );
}

export default App;
