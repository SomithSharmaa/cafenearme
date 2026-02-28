import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, X, Coffee, Filter } from 'lucide-react';

const LeftPanel = ({ searchTerm, onSearchChange, filters, onFilterChange, suggestions, onSuggestionSelect }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Toggle logic: if already selected, clear it
    const handleFilterToggle = (key, val) => {
        if (filters[key] === val) {
            onFilterChange(key, '');
        } else {
            onFilterChange(key, val);
        }
        setActiveDropdown(null);
    };

    const clearAllFilters = () => {
        onFilterChange('type', '');
        onFilterChange('state', '');
        onFilterChange('city', '');
        onFilterChange('openNow', false);
    };

    const hasActiveFilters = filters.type || filters.state || filters.city || filters.openNow;

    return (
        <div className="h-full w-[350px] bg-white border-r border-gray-100 flex flex-col shadow-xl z-20">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-white z-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Find Your Cafe</h1>
                <p className="text-sm text-gray-400">Discover the best spots near you</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Search Bar */}
                <div className="relative z-50">
                    <div className={`bg-gray-50 rounded-xl flex items-center px-4 py-3 transition-all border ${isFocused ? 'border-blue-400 ring-2 ring-blue-50 bg-white shadow-sm' : 'border-transparent hover:bg-gray-100'}`}>
                        <Search className="text-gray-400 mr-3" size={20} />
                        <input
                            type="text"
                            placeholder="Search location..."
                            className="bg-transparent border-none outline-none text-gray-700 w-full placeholder-gray-400 text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        />
                    </div>

                    {/* Suggestions */}
                    {isFocused && suggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto border border-gray-100 z-[100]">
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

                {/* Filters Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-800 font-semibold">
                        <Filter size={18} />
                        <span>Filters</span>
                    </div>
                    {hasActiveFilters && (
                        <button
                            onClick={clearAllFilters}
                            className="text-xs text-red-500 hover:text-red-600 font-medium hover:underline"
                        >
                            Reset All
                        </button>
                    )}
                </div>

                {/* Filter Groups - Reverted to Dropdowns */}
                <div className="flex flex-col gap-4">
                    <Dropdown
                        label="City"
                        options={['Mumbai', 'Hyderabad', 'Bangalore', 'New Delhi']}
                        value={filters.city}
                        onChange={(val) => handleFilterToggle('city', val)}
                        isOpen={activeDropdown === 'city'}
                        onToggle={() => setActiveDropdown(activeDropdown === 'city' ? null : 'city')}
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
                        label="Cafe type"
                        options={['Cozy', 'Social', 'Work']}
                        value={filters.type}
                        onChange={(val) => handleFilterToggle('type', val)}
                        isOpen={activeDropdown === 'type'}
                        onToggle={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
                    />


                    {/* Open Now Toggle */}
                    <button
                        className={`w-full rounded-xl px-4 py-3 flex items-center justify-between transition-all border ${filters.openNow ? 'bg-green-50 border-green-200 text-green-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                        onClick={() => onFilterChange('openNow', !filters.openNow)}
                    >
                        <span className="font-medium text-sm">Open Now</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${filters.openNow ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'}`}>
                            {filters.openNow && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                    </button>
                </div>
            </div>

            {/* Footer / Info */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3 text-gray-500 text-xs">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Coffee size={14} />
                    </div>
                    <p>Found a bug? <a href="#" className="underline hover:text-blue-600">Report it here</a></p>
                </div>
            </div>
        </div>
    );
};

const Dropdown = ({ label, options, value, onChange, isOpen, onToggle }) => (
    <div className="relative dropdown-container">
        <button
            className={`w-full bg-white rounded-xl shadow-sm px-4 py-3 flex items-center justify-between transition-colors border ${isOpen ? 'border-blue-400 ring-2 ring-blue-50' : 'border-gray-200 hover:border-blue-300'} ${value ? 'text-blue-600 bg-blue-50/50' : 'text-gray-600'}`}
            onClick={onToggle}
        >
            <span className={`text-sm ${value ? 'font-semibold' : ''}`}>{value || label}</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 z-[2000] animate-in fade-in zoom-in-95 duration-200 origin-top">
                <div
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-400 text-xs font-medium border-b border-gray-50 uppercase tracking-wide"
                    onClick={() => onChange('')}
                >
                    Clear Selection
                </div>
                {options.map(opt => (
                    <div
                        key={opt}
                        className={`px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm transition-colors border-b border-gray-50 last:border-none ${value === opt ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}`}
                        onClick={() => onChange(opt)}
                    >
                        {opt}
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default LeftPanel;
