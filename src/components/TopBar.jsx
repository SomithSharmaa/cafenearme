import React, { useState } from 'react';
import { Search, ChevronDown, MapPin } from 'lucide-react';

const TopBar = ({ searchTerm, onSearchChange, filters, onFilterChange, suggestions, onSuggestionSelect }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Close dropdowns when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-container')) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleFilterToggle = (key, val) => {
        // Toggle logic: if already selected, clear it
        if (filters[key] === val) {
            onFilterChange(key, '');
        } else {
            onFilterChange(key, val);
        }
        setActiveDropdown(null); // Close after selection
    };

    const VIBES = [
        { id: 'cozy', label: "Cozy Cafe's", activeClass: "bg-[#FFE9A6] text-gray-900" },
        { id: 'work', label: "Work Cafe's", activeClass: "bg-[#C5E1F6] text-gray-900" },
        { id: 'romantic', label: "Romantic Dates", activeClass: "bg-[#FBCFFC] text-gray-900" },
        { id: 'speciality', label: "Speciality Coffee", activeClass: "bg-[#FBC38A] text-gray-900" },
        { id: 'meetups', label: "Meet-ups and Events", activeClass: "bg-[#DED2FE] text-gray-900" },
        { id: 'outdoor', label: "Outdoor Cafe's", activeClass: "bg-[#B5F5CA] text-gray-900" },
    ];

    return (
        <div className="absolute top-4 left-4 right-4 md:top-8 md:left-[110px] md:right-8 z-50 flex flex-col gap-4 pointer-events-none">

            {/* ROW 1: Search + Dropdowns + Search Button */}
            <div className="flex flex-col xl:flex-row gap-4 pointer-events-auto w-full">

                {/* Search Input Container */}
                <div className="relative z-50 w-full xl:max-w-md shrink-0">
                    <div className="bg-white rounded-xl shadow-sm flex items-center px-4 py-3 w-full border border-gray-200 focus-within:border-blue-400">
                        <Search className="text-gray-400 mr-3 shrink-0" size={18} />
                        <input
                            type="text"
                            placeholder="Search for nearby cafe"
                            className="bg-transparent border-none outline-none text-gray-700 w-full placeholder-gray-400 text-[14px] font-sans"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        />
                    </div>

                    {/* Search Suggestions Dropdown */}
                    {isFocused && suggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto border border-gray-100">
                            {suggestions.map(cafe => (
                                <div
                                    key={cafe.id}
                                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-b border-gray-50 last:border-none flex items-start gap-3 transition-colors"
                                    onClick={() => onSuggestionSelect(cafe)}
                                >
                                    <MapPin size={16} className="text-blue-500 mt-1 shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-800">{cafe.name}</div>
                                        <div className="text-xs text-gray-500 line-clamp-1">{cafe.city}, {cafe.state}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Filter Dropdowns & Button */}
                <div className="flex gap-4 overflow-x-auto xl:overflow-visible pb-2 xl:pb-0 shrink-0 w-full hide-scrollbar">
                    <Dropdown
                        label="Cafe type"
                        options={['Cozy', 'Social', 'Work']}
                        value={filters.type}
                        onChange={(val) => handleFilterToggle('type', val)}
                        isOpen={activeDropdown === 'type'}
                        onToggle={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
                    />
                    <Dropdown
                        label="State"
                        options={['Maharashtra', 'Telangana', 'Delhi', 'Karnataka']}
                        value={filters.state}
                        onChange={(val) => handleFilterToggle('state', val)}
                        isOpen={activeDropdown === 'state'}
                        onToggle={() => setActiveDropdown(activeDropdown === 'state' ? null : 'state')}
                    />
                    <Dropdown
                        label="City"
                        options={['Mumbai', 'Hyderabad', 'Bangalore', 'New Delhi']}
                        value={filters.city}
                        onChange={(val) => handleFilterToggle('city', val)}
                        isOpen={activeDropdown === 'city'}
                        onToggle={() => setActiveDropdown(activeDropdown === 'city' ? null : 'city')}
                    />

                    <button
                        className="bg-black text-white rounded-xl shadow-sm px-8 py-3 font-semibold text-[14px] hover:bg-gray-800 transition-colors shrink-0 font-sans"
                        onClick={() => {
                            if (searchTerm && searchTerm.trim()) {
                                onSuggestionSelect({ name: searchTerm.trim() });
                            }
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* ROW 2: Vibe Pills */}
            <div className="flex gap-3 pointer-events-auto overflow-x-auto hide-scrollbar w-full py-1">
                {VIBES.map(vibe => {
                    const isActive = filters.vibe === vibe.id;
                    return (
                        <button
                            key={vibe.id}
                            className={`px-4 py-2 rounded-lg text-[12px] font-bold shadow-sm transition-colors whitespace-nowrap font-sans border border-transparent ${isActive ? vibe.activeClass : 'bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-200'}`}
                            onClick={() => handleFilterToggle('vibe', vibe.id)}
                        >
                            {vibe.label}
                        </button>
                    );
                })}
            </div>

        </div>
    );
};

const Dropdown = ({ label, options, value, onChange, isOpen, onToggle }) => (
    <div className="relative dropdown-container">
        <button
            className={`bg-white rounded-xl shadow-sm px-4 py-3 min-w-[140px] flex items-center justify-between gap-2 transition-colors border border-gray-200 ${isOpen ? 'ring-2 ring-blue-100' : 'hover:bg-gray-50'} ${value ? 'text-gray-900' : 'text-gray-500'}`}
            onClick={onToggle}
        >
            <span className={`text-[14px] font-sans ${value ? 'font-semibold' : ''}`}>{value || label}</span>
            <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-[2000] animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                <div
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-500 text-sm font-medium border-b border-gray-50"
                    onClick={() => onChange('')}
                >
                    All
                </div>
                {options.map(opt => (
                    <div
                        key={opt}
                        className={`px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm transition-colors ${value === opt ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600'}`}
                        onClick={() => onChange(opt)}
                    >
                        {opt}
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default TopBar;
