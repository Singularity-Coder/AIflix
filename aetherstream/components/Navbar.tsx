
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Creator Studio', path: '/studio' },
    { name: 'Series', path: '/series' },
    { name: 'My Library', path: '/library' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-black tracking-tighter text-purple-500 uppercase italic">
            AetherStream
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`hover:text-white transition-colors relative ${location.pathname === link.path ? 'text-white font-bold' : ''}`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link to="/studio" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold transition-all">
            Generate New
          </Link>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 cursor-pointer shadow-lg shadow-purple-500/20 ring-2 ring-white/10"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
