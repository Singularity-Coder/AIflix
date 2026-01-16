
import React, { useState } from 'react';
import { PromptConfig, GenerationState, AIMovie } from '../types';
import { generateStoryPlot, generateVideoContent } from '../services/geminiService';

const CreatorStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Cinematic');
  const [genState, setGenState] = useState<GenerationState>({
    isGenerating: false,
    status: '',
    progress: 0
  });
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [story, setStory] = useState<any>(null);

  const styles = [
    { name: 'Cinematic', icon: '🎬' },
    { name: 'Anime', icon: '🌸' },
    { name: 'Noir', icon: '🕵️' },
    { name: 'Cyberpunk', icon: '⚡' },
    { name: 'Dreamlike', icon: '💭' },
    { name: 'Documentary', icon: '🎥' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setGenState({ isGenerating: true, status: 'Architecting narrative...', progress: 10 });
    setGeneratedVideo(null);
    setStory(null);
    
    // Step 1: Generate Story Plot using Flash
    const plot = await generateStoryPlot(prompt);
    setStory(plot);
    
    // Step 2: Generate Video using Veo
    const config: PromptConfig = {
      prompt: prompt,
      style: style,
      aspectRatio: '16:9',
      resolution: '720p'
    };

    const videoUrl = await generateVideoContent(config, (status) => {
      setGenState(prev => ({ ...prev, status }));
    });

    if (videoUrl) {
      setGeneratedVideo(videoUrl);
      setGenState({ isGenerating: false, status: 'Generation complete', progress: 100 });
      
      // PERSIST TO LIBRARY
      const newMovie: AIMovie = {
        id: Math.random().toString(36).substr(2, 9),
        title: plot?.title || 'Untitled Creation',
        description: plot?.description || prompt,
        thumbnail: 'https://picsum.photos/seed/' + Math.random() + '/800/450',
        videoUrl: videoUrl,
        genre: style,
        duration: '0:10',
        creator: 'Me',
        timestamp: Date.now(),
        isGenerated: true
      };

      const existing = JSON.parse(localStorage.getItem('aether_library') || '[]');
      localStorage.setItem('aether_library', JSON.stringify([newMovie, ...existing]));
    } else {
      setGenState({ isGenerating: false, status: 'Generation failed', progress: 0 });
    }
  };

  return (
    <div className="pt-32 px-4 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
      {/* Sidebar Controls */}
      <div className="lg:col-span-4 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight">Creator Studio</h1>
          <p className="text-gray-400">Direct your AI cinematic masterpiece.</p>
        </div>

        <div className="space-y-6 glass p-6 rounded-3xl">
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Story Prompt</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A futuristic samurai fighting echoes of his past in a digital forest..."
              className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none placeholder:text-gray-600"
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Visual Style</label>
            <div className="grid grid-cols-2 gap-2">
              {styles.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setStyle(s.name)}
                  className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${style === s.name ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/20' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                >
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-sm font-bold">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={genState.isGenerating}
            className={`w-full py-4 rounded-xl font-black text-lg transition-all transform active:scale-95 shadow-xl ${genState.isGenerating ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-purple-500/20 hover:scale-[1.02]'}`}
          >
            {genState.isGenerating ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </div>
            ) : 'Start Production'}
          </button>
        </div>
      </div>

      {/* Preview/Output Area */}
      <div className="lg:col-span-8">
        <div className="aspect-video w-full rounded-3xl bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
          {genState.isGenerating ? (
            <div className="text-center space-y-6 max-w-md px-6">
              <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="space-y-2">
                <p className="text-2xl font-bold animate-pulse-slow">{genState.status}</p>
                <p className="text-sm text-gray-400">High-fidelity cinematics take time to render. It's being saved to your library automatically.</p>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-purple-500 h-full transition-all duration-500 ease-out" 
                  style={{ width: `${genState.progress}%` }} 
                />
              </div>
            </div>
          ) : generatedVideo ? (
            <video 
              src={generatedVideo} 
              autoPlay 
              loop 
              controls 
              className="w-full h-full object-cover rounded-3xl"
            />
          ) : (
            <div className="text-center space-y-4 text-gray-500">
              <svg className="w-16 h-16 mx-auto opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="font-bold">Your cinematic output will appear here</p>
            </div>
          )}

          {generatedVideo && (
            <div className="absolute top-4 right-4 flex gap-2">
               <span className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">SAVED TO LIBRARY</span>
            </div>
          )}
        </div>

        {story && (
          <div className="mt-8 space-y-6 glass p-8 rounded-3xl animate-in slide-in-from-bottom-4 duration-700">
             <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black">{story.title}</h3>
                <span className="px-3 py-1 bg-purple-600/30 rounded-full text-xs font-bold text-purple-400 border border-purple-500/30">AI Story Script</span>
             </div>
             <p className="text-gray-400 text-lg leading-relaxed">{story.description}</p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {story.scenes?.map((scene: any, idx: number) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group">
                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest block mb-2 group-hover:text-purple-400 transition-colors">Shot {idx + 1}: {scene.shot}</span>
                    <p className="text-sm text-gray-300">{scene.description}</p>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorStudio;
