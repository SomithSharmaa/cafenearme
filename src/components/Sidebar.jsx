import React from 'react';
import { Home, MapPin, FileText, ShoppingBag, Ticket, Globe, User } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="h-full w-20 flex flex-col items-center py-6 bg-cafe-sidebar backdrop-blur-md border-r border-white/40 gap-8 shadow-sm">
            {/* Brand Icon */}
            <div className="mb-4">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {/* Abstract logo placeholder */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            {/* Main Nav Items */}
            <div className="flex flex-col gap-6 flex-1">
                <NavItem icon={<Home size={24} />} active />
                <NavItem icon={<MapPin size={24} />} />
                <NavItem icon={<FileText size={24} />} />
                <NavItem icon={<ShoppingBag size={24} />} />
            </div>

            {/* Bottom Nav Items */}
            <div className="flex flex-col gap-6">
                <NavItem icon={<Ticket size={24} />} />
                <NavItem icon={<Globe size={24} />} />
                <NavItem icon={<User size={24} />} />
            </div>
        </div>
    );
};

const NavItem = ({ icon, active }) => {
    return (
        <button className={`p-3 rounded-full transition-all duration-300 ${active ? 'bg-black text-white shadow-lg scale-110' : 'bg-white text-gray-500 hover:bg-white/80 hover:scale-105 shadow-sm'}`}>
            {icon}
        </button>
    );
};

export default Sidebar;
