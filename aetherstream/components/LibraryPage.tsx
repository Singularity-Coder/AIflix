
import React, { useState, useEffect } from 'react';
import { AIMovie } from '../types';
import { Link } from 'react-router-dom';

const LibraryPage: React.FC = () => {
  const [myMovies, setMyMovies] = useState<AIMovie[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('aether_library');
    if (saved) {
      try {
        setMyMovies(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load library", e);
      }
    }
  }, []);

  const clearLibrary = () => {
    if (confirm("Are you sure you want to clear your local archive?")) {
      localStorage.removeItem('aether_library');
      setMyMovies([]);
    }
  };

  return (
    <div className="pt-32 px-4 md:px-12 max-w-7xl mx-auto pb-20 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <h1 className="text-6xl font-black tracking-tighter text-glow">Your Archive</h1>
          <p className="text-xl text-gray-400">Locally stored cinematics generated specifically for you.</p>
        </div>
        <div className="flex items-center gap-4">
          {myMovies.length > 0 && (
            <button 
              onClick={clearLibrary}
              className="px-6 py-4 bg-red-500/10 text-red-400 font-bold rounded-2xl hover:bg-red-500/20 transition-all border border-red-500/20"
            >
              Wipe Archive
            </button>
          )}
          <Link to="/studio" className="px-8 py-4 bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-500 transition-all shadow-2xl shadow-purple-600/30 transform hover:scale-105 active:scale-95">
            New Production
          </Link>
        </div>
      </div>

      {myMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 glass rounded-[3rem] border-dashed border-2 border-white/10 space-y-10">
           <div className="relative">
              <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-20 animate-pulse" />
              <div className="relative w-32 h-32 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10">
                <svg className="w-16 h-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
           </div>
           <div className="text-center space-y-3 px-6">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">The Vault is Cold</h2>
              <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                You haven't initiated any local renders yet. Every masterpiece begins with a single prompt.
              </p>
           </div>
           <Link to="/studio" className="flex items-center gap-2 text-purple-400 font-black hover:text-purple-300 transition-colors uppercase tracking-widest text-sm">
              Enter Creator Studio
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {myMovies.map((movie) => (
            <div key={movie.id} className="group relative flex flex-col bg-[#0f0f0f] rounded-[2rem] overflow-hidden border border-white/5 hover:border-purple-500/40 transition-all duration-500 shadow-xl hover:shadow-purple-500/10">
              <div className="aspect-video relative overflow-hidden">
                {movie.videoUrl ? (
                  <video 
                    src={movie.videoUrl} 
                    className="w-full h-full object-cover" 
                    muted 
                    loop 
                    onMouseOver={e => (e.target as HTMLVideoElement).play()} 
                    onMouseOut={e => (e.target as HTMLVideoElement).pause()} 
                  />
                ) : (
                  <img src={movie.thumbnail} className="w-full h-full object-cover opacity-80" />
                )}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-tighter">
                     {movie.duration}
                   </span>
                   <div className="flex gap-2">
                     <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                     </div>
                   </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-6 space-y-4 flex-grow flex flex-col">
                <div className="flex items-start justify-between">
                  <h3 className="font-black text-xl line-clamp-1 group-hover:text-purple-400 transition-colors">{movie.title}</h3>
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{movie.description}</p>
                <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between text-[10px] font-black text-gray-600 uppercase tracking-widest">
                  <span className="text-purple-500/60">{movie.genre}</span>
                  <span>{new Date(movie.timestamp || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>
              
              <Link to={`/play/${movie.id}`} className="absolute inset-0 z-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
