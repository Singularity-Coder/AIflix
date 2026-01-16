
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const VideoPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="pt-24 min-h-screen bg-black flex flex-col items-center">
      <div className="w-full max-w-6xl aspect-video bg-white/5 rounded-3xl overflow-hidden relative group">
        <video 
          src="https://www.w3schools.com/html/mov_bbb.mp4" 
          className="w-full h-full object-cover"
          autoPlay
          controls
        />
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Resonance Echoes</h2>
              <p className="text-gray-400 text-sm">Created by AetherStudioAI • 3m 42s</p>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/studio"
                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/20"
              >
                Remix This Clip
              </Link>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl font-bold border border-white/10 hover:bg-white/20 transition-all">
                Fork Timeline
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl px-4 md:px-0 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-4xl font-black">About this Universe</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              This cinematic piece was generated using a multi-agent AI workflow. The narrative was crafted by AetherStory-Pro, 
              while the visuals were synthesized frame-by-frame on a high-density compute node. 
              The score adapts in real-time to your interaction with the remix controls.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {['Cyberpunk', 'Atmospheric', 'Slow-Mo', '4K', 'Original Score'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-gray-400 border border-white/10">#{tag}</span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold">Directorial Forking</h3>
            <div className="space-y-4">
              <div className="glass p-4 rounded-2xl cursor-pointer hover:border-purple-500/50 transition-all border border-transparent">
                <p className="font-bold text-purple-400 mb-1">Continue Story</p>
                <p className="text-xs text-gray-400">What happens after the hero reaches the digital forest?</p>
              </div>
              <div className="glass p-4 rounded-2xl cursor-pointer hover:border-purple-500/50 transition-all border border-transparent">
                <p className="font-bold text-purple-400 mb-1">Change Perspective</p>
                <p className="text-xs text-gray-400">Re-generate scene from the antagonist's point of view.</p>
              </div>
              <div className="glass p-4 rounded-2xl cursor-pointer hover:border-purple-500/50 transition-all border border-transparent">
                <p className="font-bold text-purple-400 mb-1">Switch Style</p>
                <p className="text-xs text-gray-400">Watch this movie in 1950's Anime aesthetic.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
