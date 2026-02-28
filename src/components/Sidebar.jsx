import React from 'react';
import { Home, MapPin, Heart, Ticket, User, Sparkles } from 'lucide-react';
import logo from '../assets/logo.png';

const Sidebar = ({ activeTab, onTabChange, onOpenMatchmaker }) => {
    return (
        <div className="h-full min-w-[100px] flex flex-col items-center py-10 z-50 pl-6 pr-2">
            {/* Brand Logo - Floating */}
            <div className="mb-8">
                <div className="w-20 h-20 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer overflow-hidden p-1">
                    <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
            </div>

            {/* Main Icons Floating */}
            <div className="flex flex-col gap-5 flex-1 w-full items-center">
                <NavItem
                    icon={<Home size={22} />}
                    active={activeTab === 'home'}
                    onClick={() => onTabChange('home')}
                />
                <NavItem
                    icon={<MapPin size={22} />}
                    active={activeTab === 'explore'}
                    onClick={() => onTabChange('explore')}
                />
                <NavItem
                    icon={<Heart size={22} />}
                    active={activeTab === 'favorites'}
                    onClick={() => onTabChange('favorites')}
                />
                <NavItem
                    icon={<Sparkles size={22} className="text-purple-600" />}
                    onClick={onOpenMatchmaker}
                    special
                />
            </div>

            {/* Bottom Icons */}
            <div className="flex flex-col gap-5 w-full items-center">
                <NavItem icon={<Ticket size={22} />} />
                <NavItem icon={<User size={22} />} />
            </div>
        </div>
    );
};

const NavItem = ({ icon, active, onClick, special }) => {
    return (
        <button
            onClick={onClick}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-white/60 ${active
                ? 'bg-black text-white shadow-xl scale-110'
                : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:scale-105 hover:shadow-md'
                } ${special ? 'border-purple-200 bg-purple-50/80' : ''}`}
        >
            {icon}
        </button>
    );
};

export default Sidebar;
