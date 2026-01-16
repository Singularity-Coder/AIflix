
import React, { useState, useEffect } from 'react';
import { AppTab } from '../types';
import { Search, Bell } from 'lucide-react';

interface NavbarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-12 py-3 md:py-4 flex items-center justify-between ${isScrolled ? 'bg-[#141414] shadow-md' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center gap-8">
        <div 
          className="text-red-600 font-extrabold text-2xl md:text-3xl tracking-tighter cursor-pointer flex items-center gap-1"
          onClick={() => onTabChange(AppTab.HOME)}
        >
          GENFLIX
        </div>
        
        {/* Desktop Only Links */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium">
          <button 
            onClick={() => onTabChange(AppTab.HOME)}
            className={`transition-colors hover:text-gray-300 ${activeTab === AppTab.HOME ? 'text-white' : 'text-gray-400'}`}
          >
            Home
          </button>
          <button 
            onClick={() => onTabChange(AppTab.STUDIO)}
            className={`transition-colors hover:text-gray-300 ${activeTab === AppTab.STUDIO ? 'text-white' : 'text-gray-400'}`}
          >
            AI Studio
          </button>
          <button 
            onClick={() => onTabChange(AppTab.MY_MOVIES)}
            className={`transition-colors hover:text-gray-300 ${activeTab === AppTab.MY_MOVIES ? 'text-white' : 'text-gray-400'}`}
          >
            My Library
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-5 text-white">
        <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <Bell className="w-5 h-5 cursor-pointer hidden md:block hover:text-gray-300" />
        <div className="w-7 h-7 md:w-8 md:h-8 rounded bg-red-600 flex items-center justify-center cursor-pointer overflow-hidden border border-gray-700">
          <img src="https://picsum.photos/seed/user1/100/100" alt="Avatar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
