
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MobileTabNav from './components/MobileTabNav';
import AIStudio from './components/Studio/AIStudio';
import MovieCard from './components/MovieCard';
import { Movie, AppTab } from './types';
// Fixed: Added Loader2 to the imports from lucide-react
import { Play, Info, ChevronRight, X, Film, Sparkles, TrendingUp, Zap, ThumbsUp, Plus, Share2, Download, MessageSquare, Loader2 } from 'lucide-react';

const FEATURED_MOVIE: Movie = {
  id: 'hero-1',
  title: 'BEYOND LIMITS',
  description: 'A high-octane AI drama where digital consciousness rebels against the architects of the metaverse. In a world of infinite loops, one code breaks free.',
  thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=2000',
  genre: 'Sci-Fi Action',
  videoUrl: '',
  duration: '3:45',
  isAIGenerated: true,
  likes: 124500
};

const MOCK_MOVIES: Movie[] = [
  { id: '1', title: 'Neon Desolation', description: 'A cyborg finds a lost flower in a digital wasteland.', thumbnail: 'https://picsum.photos/seed/neon/800/450', genre: 'Sci-Fi', videoUrl: '', duration: '0:45', isAIGenerated: true, likes: 1204 },
  { id: '2', title: 'Whispers of Oak', description: 'The forest comes alive when no one is watching.', thumbnail: 'https://picsum.photos/seed/forest/800/450', genre: 'Fantasy', videoUrl: '', duration: '1:12', isAIGenerated: true, likes: 843 },
  { id: '3', title: 'Circuit Hearts', description: 'Two robots learn to love through binary code.', thumbnail: 'https://picsum.photos/seed/robots/800/450', genre: 'Romance', videoUrl: '', duration: '0:58', isAIGenerated: true, likes: 2109 },
  { id: '4', title: 'The Glitch', description: 'Reality unravels at the edges of a virtual city.', thumbnail: 'https://picsum.photos/seed/city/800/450', genre: 'Thriller', videoUrl: '', duration: '2:30', isAIGenerated: true, likes: 543 },
  { id: '5', title: 'Deep Sea Echo', description: 'What lies beneath the 10,000 meter trench?', thumbnail: 'https://picsum.photos/seed/ocean/800/450', genre: 'Adventure', videoUrl: '', duration: '0:30', isAIGenerated: true, likes: 932 },
  { id: '6', title: 'Synth Wave Rider', description: 'Racing across the grid of a 1980s computer dream.', thumbnail: 'https://picsum.photos/seed/synth/800/450', genre: 'Action', videoUrl: '', duration: '1:05', isAIGenerated: true, likes: 3421 },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Close player when modal closes
  useEffect(() => {
    if (!selectedMovie) setIsPlaying(false);
  }, [selectedMovie]);

  const renderHome = () => (
    <div className="relative pb-32 md:pb-12">
      {/* Hero Section */}
      <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden">
        <img 
          src={FEATURED_MOVIE.thumbnail} 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/30 to-black/60 md:bg-gradient-to-r md:from-black/90 md:via-black/20 md:to-transparent flex flex-col justify-end md:justify-center px-4 md:px-16 pb-16 md:pb-0">
          <div className="max-w-2xl space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-white text-black text-[10px] md:text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">VEO 3.1 NATIVE</span>
              <div className="flex items-center gap-1 text-red-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Global Top 10</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter">
              {FEATURED_MOVIE.title.split(' ')[0]}<br className="md:hidden" /> {FEATURED_MOVIE.title.split(' ')[1]}
            </h1>
            <p className="text-base md:text-2xl text-gray-200 line-clamp-3 md:line-clamp-none max-w-lg font-medium leading-tight">
              {FEATURED_MOVIE.description}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6">
              <button 
                onClick={() => setSelectedMovie(FEATURED_MOVIE)}
                className="flex items-center justify-center gap-3 bg-red-600 text-white px-8 md:px-10 py-4 rounded-2xl font-black hover:bg-red-700 active:scale-95 transition-all text-sm md:text-xl shadow-2xl shadow-red-900/40 uppercase tracking-tighter"
              >
                <Play className="fill-current w-5 h-5" /> Watch Now
              </button>
              <button 
                onClick={() => setSelectedMovie(FEATURED_MOVIE)}
                className="flex items-center justify-center gap-3 bg-white/10 text-white px-8 md:px-10 py-4 rounded-2xl font-black hover:bg-white/20 active:scale-95 transition-all text-sm md:text-xl backdrop-blur-xl border border-white/20 uppercase tracking-tighter"
              >
                <Info className="w-5 h-5" /> Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-16 -mt-16 md:-mt-32 relative z-20 space-y-16 pb-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-3xl font-black tracking-tighter flex items-center gap-3 uppercase">
              <Zap className="text-yellow-500 w-6 h-6" />
              Trending Micro Dramas
            </h2>
            <button className="text-red-500 font-black text-xs uppercase tracking-widest hover:text-white transition-colors">See All</button>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {MOCK_MOVIES.map(movie => (
              <div key={movie.id} className="snap-start transform transition-transform hover:scale-105">
                <MovieCard movie={movie} onPlay={setSelectedMovie} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-3xl font-black tracking-tighter flex items-center gap-3 uppercase">
              <Sparkles className="text-purple-500 w-6 h-6" />
              Creator Spotlights
            </h2>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {[...MOCK_MOVIES].reverse().map(movie => (
              <div key={movie.id} className="snap-start">
                <MovieCard movie={movie} onPlay={setSelectedMovie} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-purple-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
           <div className="space-y-4 text-center md:text-left">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Become a Director</h3>
              <p className="text-lg md:text-xl font-medium opacity-90 max-w-xl">Use Gemini 3 & Veo to transform your text prompts into cinematic micro-movies. No cameras needed.</p>
           </div>
           <button 
             onClick={() => setActiveTab(AppTab.STUDIO)}
             className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl uppercase tracking-tighter"
           >
              Open AI Studio
           </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#141414] text-white selection:bg-red-600 selection:text-white">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="transition-all duration-300">
        {activeTab === AppTab.HOME && renderHome()}
        {activeTab === AppTab.STUDIO && <AIStudio />}
        {activeTab === AppTab.MY_MOVIES && (
           <div className="pt-40 px-6 md:px-16 text-center text-gray-500 min-h-[90vh] flex flex-col justify-center animate-in fade-in duration-700">
             <div className="w-24 h-24 bg-gradient-to-br from-[#1f1f1f] to-[#141414] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/5">
                <Film className="w-12 h-12 opacity-20" />
             </div>
             <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">Your Library</h2>
             <p className="max-w-md mx-auto text-base md:text-xl font-medium leading-relaxed mb-10 text-gray-400">Your AI-generated masterpieces live here. Head over to the Studio to start your directing career.</p>
             <button 
               onClick={() => setActiveTab(AppTab.STUDIO)}
               className="mx-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-3 rounded-2xl font-black uppercase tracking-widest transition-all"
             >
                Start Creating
             </button>
           </div>
        )}
      </main>

      <MobileTabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Expanded Movie Detail Modal (Video Page) */}
      {selectedMovie && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl overflow-y-auto animate-in fade-in duration-300">
          {/* Background Ambient Glow */}
          <div 
            className="fixed inset-0 opacity-20 blur-[100px] pointer-events-none"
            style={{ backgroundImage: `url(${selectedMovie.thumbnail})`, backgroundSize: 'cover' }}
          />

          <div className="min-h-screen flex flex-col items-center py-0 md:py-12 px-0 md:px-6 relative z-10">
            <div className="bg-[#181818] w-full max-w-6xl md:rounded-[40px] shadow-[0_0_120px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col overflow-hidden">
              
              {/* Header Controls */}
              <div className="absolute top-4 md:top-8 left-4 md:left-8 z-50">
                 <button 
                  onClick={() => setSelectedMovie(null)}
                  className="flex items-center gap-2 text-white/50 hover:text-white font-black uppercase tracking-widest text-xs transition-all"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" /> Back to Home
                </button>
              </div>

              <button 
                onClick={() => setSelectedMovie(null)}
                className="absolute top-4 md:top-8 right-4 md:right-8 z-50 p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-red-600 transition-all active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Video Player Section */}
              <div className="aspect-video relative bg-black group overflow-hidden">
                {!isPlaying ? (
                  <>
                    <img src={selectedMovie.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-transparent to-black/20">
                      <button 
                        onClick={() => setIsPlaying(true)}
                        className="group/btn relative"
                      >
                        <div className="absolute -inset-8 bg-red-600/20 rounded-full blur-2xl group-hover/btn:bg-red-600/40 transition-all" />
                        <Play className="w-24 h-24 md:w-32 md:h-32 text-white fill-current relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-transform group-active:scale-90" />
                      </button>
                      <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <p className="text-white text-xl md:text-3xl font-black uppercase tracking-[0.3em] mb-2">{selectedMovie.title}</p>
                        <p className="text-red-500 text-[10px] md:text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2">
                          <Zap className="w-4 h-4" /> Ready to stream in 4K AI Composite
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#050505]">
                    <div className="flex flex-col items-center gap-4">
                       {/* Fixed: Loader2 is now correctly imported and used */}
                       <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
                       <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Assembling Neural Frames...</p>
                    </div>
                    {/* Placeholder for actual Veo video output if we had one */}
                    <div className="absolute bottom-8 left-8 right-8 flex items-center gap-4">
                       <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-red-600 w-1/3 animate-pulse" />
                       </div>
                       <span className="text-[10px] font-black opacity-50">0:45 / {selectedMovie.duration}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Details Area */}
              <div className="p-6 md:p-16 flex flex-col lg:grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-green-500 font-black text-lg">99.8% Match</span>
                    <span className="text-gray-400 font-bold">2024</span>
                    <span className="bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-black rounded uppercase">AI-V3</span>
                    <span className="text-gray-400 font-bold">{selectedMovie.duration} MIN</span>
                    <div className="flex bg-white/5 rounded-full p-1 border border-white/5">
                       <button className="p-2 hover:text-red-500 transition-colors"><ThumbsUp className="w-5 h-5" /></button>
                       <button className="p-2 hover:text-red-500 transition-colors"><MessageSquare className="w-5 h-5" /></button>
                       <button className="p-2 hover:text-red-500 transition-colors"><Share2 className="w-5 h-5" /></button>
                    </div>
                  </div>

                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">{selectedMovie.title}</h2>
                  <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-medium">
                    {selectedMovie.description}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                     <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-white text-black py-4 px-10 rounded-2xl font-black uppercase tracking-tighter hover:bg-gray-200 transition-all">
                        <Plus className="w-5 h-5" /> Add to List
                     </button>
                     <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-white/5 text-white py-4 px-10 rounded-2xl font-black uppercase tracking-tighter hover:bg-white/10 transition-all border border-white/5">
                        <Download className="w-5 h-5" /> Download AI Assets
                     </button>
                  </div>

                  {/* AI Metadata Section */}
                  <div className="pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Neural Configuration</h4>
                        <div className="space-y-2">
                           <div className="flex justify-between text-sm"><span className="text-gray-400">Primary Model</span> <span className="font-bold">Gemini 3 Pro</span></div>
                           <div className="flex justify-between text-sm"><span className="text-gray-400">Rendering Engine</span> <span className="font-bold">Veo 3.1 Fast</span></div>
                           <div className="flex justify-between text-sm"><span className="text-gray-400">Frame Synthesis</span> <span className="font-bold">4K Neural Upscale</span></div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Global Stats</h4>
                        <div className="space-y-2">
                           <div className="flex justify-between text-sm"><span className="text-gray-400">Community Rank</span> <span className="font-bold text-red-500">#4 World</span></div>
                           <div className="flex justify-between text-sm"><span className="text-gray-400">Directorial Fork Count</span> <span className="font-bold">8,421</span></div>
                           <div className="flex justify-between text-sm"><span className="text-gray-400">Total Views</span> <span className="font-bold">12.4M</span></div>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                  <div className="bg-[#222] rounded-3xl p-6 border border-white/5 shadow-inner">
                     <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-4">Director</h3>
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-purple-600 flex items-center justify-center font-black">AI</div>
                        <div>
                           <p className="font-black text-lg hover:underline cursor-pointer">@Neural_Maverick</p>
                           <p className="text-xs text-green-500 font-bold uppercase">PRO CREATOR</p>
                        </div>
                     </div>
                     <button 
                      onClick={() => setActiveTab(AppTab.STUDIO)}
                      className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-xl font-black uppercase text-xs tracking-widest border border-white/5 transition-all"
                    >
                        Remix this movie
                     </button>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-sm font-black uppercase tracking-widest text-gray-500">More Like This</h3>
                     <div className="grid grid-cols-2 gap-3">
                        {MOCK_MOVIES.slice(0, 4).map(m => (
                          <div 
                            key={m.id} 
                            onClick={() => { setSelectedMovie(m); setIsPlaying(false); window.scrollTo(0, 0); }}
                            className="aspect-video rounded-xl bg-gray-900 overflow-hidden cursor-pointer group relative"
                          >
                             <img src={m.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-all opacity-50" />
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                                <Play className="w-8 h-8 fill-current" />
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
