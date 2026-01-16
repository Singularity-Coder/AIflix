
import React from 'react';
import { AIMovie } from '../types';
import { Link } from 'react-router-dom';

interface HeroProps {
  featured: AIMovie;
}

const Hero: React.FC<HeroProps> = ({ featured }) => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      <img 
        src={featured.thumbnail} 
        alt={featured.title} 
        className="absolute inset-0 w-full h-full object-cover transform scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="absolute bottom-1/4 left-4 md:left-12 max-w-2xl space-y-6">
        <div className="flex items-center gap-4">
          <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] uppercase font-black tracking-widest text-white">AI Exclusive</span>
          <span className="text-purple-400 font-bold text-sm">{featured.genre}</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight drop-shadow-2xl">
          {featured.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed drop-shadow-lg">
          {featured.description}
        </p>
        
        <div className="flex items-center gap-4 pt-4">
          <Link 
            to={`/play/${featured.id}`}
            className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            Play Now
          </Link>
          <Link 
            to="/studio"
            className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/10 shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Remix Story
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
