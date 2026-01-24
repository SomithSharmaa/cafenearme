import React, { useState } from 'react';
import { Search, ChevronDown, MapPin } from 'lucide-react';

const TopBar = ({ searchTerm, onSearchChange, filters, onFilterChange, suggestions, onSuggestionSelect }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="absolute top-8 left-8 right-8 z-[1000] flex gap-4 pointer-events-none">
            {/* Search Input Container */}
            <div className="relative pointer-events-auto z-50">
                <div className="bg-white rounded-xl shadow-lg flex items-center px-4 py-3 w-96 transition-transform hover:scale-[1.01] border border-transparent focus-within:border-blue-400">
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
            <div className="flex gap-4">
                <Dropdown
                    label="Cafe type"
                    options={['Cozy', 'Social', 'Work']}
                    value={filters.type}
                    onChange={(val) => onFilterChange('type', val)}
                />
                <Dropdown
                    label="State"
                    options={['Maharashtra', 'Telangana', 'Delhi', 'Karnataka']}
                    value={filters.state}
                    onChange={(val) => onFilterChange('state', val)}
                />
                <Dropdown
                    label="City"
                    options={['Mumbai', 'Hyderabad', 'Bangalore', 'New Delhi']}
                    value={filters.city}
                    onChange={(val) => onFilterChange('city', val)}
                />
            </div>
        </div>
    );
};

const Dropdown = ({ label, options, value, onChange }) => (
    <div className="relative group pointer-events-auto">
        <button className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2 text-gray-600 hover:bg-gray-50 transition-colors border border-transparent hover:border-blue-200">
            <span className={value ? 'font-semibold text-blue-600' : ''}>{value || label}</span>
            <ChevronDown size={16} />
        </button>

        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden hidden group-hover:block border border-gray-100 z-50">
            <div
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-500 text-sm font-medium"
                onClick={() => onChange('')}
            >
                All
            </div>
            {options.map(opt => (
                <div
                    key={opt}
                    className={`px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm ${value === opt ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600'}`}
                    onClick={() => onChange(opt)}
                >
                    {opt}
                </div>
            ))}
        </div>
    </div>
);

export default TopBar;
