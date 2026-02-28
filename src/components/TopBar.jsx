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

    return (
        <div className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-[1000] flex flex-col md:flex-row gap-4 pointer-events-none">
            {/* Search Input Container */}
            <div className="relative pointer-events-auto z-50 w-full md:w-auto">
                <div className="bg-white rounded-xl shadow-lg flex items-center px-4 py-3 w-full md:w-96 transition-transform hover:scale-[1.01] border border-transparent focus-within:border-blue-400">
                    <Search className="text-gray-400 mr-3" size={20} />
                    <input
                        type="text"
                        placeholder="Search for nearby cafe"
                        className="bg-transparent border-none outline-none text-gray-700 w-full placeholder-gray-400"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    />
                </div>

                {/* Search Suggestions Dropdown */}
                {isFocused && suggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto border border-gray-100">
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

            {/* Filter Dropdowns */}
            <div className="flex gap-2 md:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 pointer-events-auto w-full md:w-auto no-scrollbar">
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
                    className={`bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2 transition-colors border ${filters.openNow ? 'border-green-500 text-green-600 bg-green-50' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-blue-200'}`}
                    onClick={() => onFilterChange('openNow', !filters.openNow)}
                >
                    <span className={filters.openNow ? 'font-semibold' : ''}>Open Now</span>
                </button>
            </div>
        </div>
    );
};

const Dropdown = ({ label, options, value, onChange, isOpen, onToggle }) => (
    <div className="relative dropdown-container">
        <button
            className={`bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2 transition-colors border ${isOpen ? 'border-blue-400 ring-2 ring-blue-100' : 'border-transparent hover:border-blue-200'} ${value ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={onToggle}
        >
            <span className={value ? 'font-semibold' : ''}>{value || label}</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
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
