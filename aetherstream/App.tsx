
import React, { useState, useEffect, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AIMovie } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import CreatorStudio from './components/CreatorStudio';
import VideoPlayer from './components/VideoPlayer';
import SeriesPage from './components/SeriesPage';
import LibraryPage from './components/LibraryPage';
import { checkApiKeyStatus, openKeySelection } from './services/geminiService';

const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-[200]">
    <div className="text-center space-y-6">
      <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto shadow-2xl shadow-purple-500/20" />
      <p className="text-purple-500 font-black tracking-widest uppercase text-sm animate-pulse italic">Synchronizing Neural Streams</p>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const [trending] = useState<AIMovie[]>([
    {
      id: '1',
      title: 'Digital Horizon',
      description: 'A cinematic exploration of a world where the sky is rendered in real-time by an ancient AI core.',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000',
      genre: 'Sci-Fi',
      duration: '3:20',
      creator: 'AetherAI'
    },
    {
      id: '2',
      title: 'Fractal Forest',
      description: 'Mathematics meets nature in this stunning visual study of self-similar ecosystems.',
      thumbnail: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=2000',
      genre: 'Experimental',
      duration: '4:15',
      creator: 'GeoGen'
    },
    {
      id: '3',
      title: 'The Mirror City',
      description: 'A noir journey through a city built entirely of reflections, where your own shadow might be your killer.',
      thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=2000',
      genre: 'Noir',
      duration: '2:45',
      creator: 'Studio Dark'
    }
  ]);

  return (
    <div className="pb-20 animate-in fade-in duration-700">
      <Hero featured={trending[0]} />
      <div className="px-4 md:px-12 -mt-20 relative z-10 space-y-16">
        <MovieRow title="Trending Universes" movies={trending} />
        <MovieRow title="Recently Synthesized" movies={trending.slice().reverse()} />
        <MovieRow title="Deep Neural Series" movies={trending.slice(1, 3)} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isKeySelected, setIsKeySelected] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      const selected = await checkApiKeyStatus();
      setIsKeySelected(selected);
    };
    checkKey();
  }, []);

  const handleOpenKey = async () => {
    await openKeySelection();
    setIsKeySelected(true);
  };

  if (isKeySelected === null) return <LoadingScreen />;

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
        {!isKeySelected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black p-6">
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-purple-600 rounded-full blur-[150px]" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-600 rounded-full blur-[150px]" />
            </div>
            
            <div className="max-w-xl w-full glass p-10 md:p-16 rounded-[3rem] text-center space-y-8 relative border border-white/10 shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform rotate-12 group hover:rotate-0 transition-transform duration-500">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 11-7.743-5.743L11 3l-4 4-4-4 4 4v3H4a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v2l1-1 2 2" />
                </svg>
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl font-black tracking-tighter italic">ACTIVATE VEO</h2>
                <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">
                  AetherStream requires high-compute authorization for cinematic synthesis. Select a paid project key to continue.
                </p>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={handleOpenKey}
                  className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all transform hover:scale-[1.02] active:scale-95 text-lg shadow-xl"
                >
                  Authorize Engine
                </button>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  Secure OAuth Handshake via Google Cloud
                </p>
              </div>
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="block text-sm text-purple-400 font-bold hover:text-purple-300 transition-colors">
                Setup Billing & Documentation →
              </a>
            </div>
          </div>
        )}

        <Navbar />
        
        <Suspense fallback={<LoadingScreen />}>
          <main className="relative z-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/studio" element={<CreatorStudio />} />
              <Route path="/series" element={<SeriesPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/play/:id" element={<VideoPlayer />} />
            </Routes>
          </main>
        </Suspense>

        {/* Global UI Effects */}
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-40" />
      </div>
    </Router>
  );
};

export default App;
