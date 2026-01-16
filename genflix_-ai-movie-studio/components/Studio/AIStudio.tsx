
import React, { useState, useEffect, useRef } from 'react';
import { GeminiService } from '../../services/geminiService';
import { Script, Scene, CinematicStyle } from '../../types';
import { 
  Loader2, Sparkles, PlayCircle, Save, Film, LayoutGrid, 
  Monitor, Smartphone, ChevronRight, Wand2, Music, 
  Trash2, RefreshCw, CheckCircle2, Clapperboard
} from 'lucide-react';

const STYLES: CinematicStyle[] = ['Cinematic', 'Anime', 'Cyberpunk', 'Noir', 'Claymation', 'Hand-Drawn'];

const AIStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<CinematicStyle>('Cinematic');
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [script, setScript] = useState<Script | null>(null);
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [isVipMode, setIsVipMode] = useState(false);
  const [format, setFormat] = useState<'16:9' | '9:16'>('16:9');
  const [isPublishing, setIsPublishing] = useState(false);
  
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (typeof window.aistudio !== 'undefined') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setIsVipMode(hasKey);
      }
    };
    checkKey();
  }, []);

  const handleCreateScript = async () => {
    if (!prompt.trim()) return;
    setIsGeneratingScript(true);
    try {
      const result = await GeminiService.generateScript(prompt, selectedStyle);
      setScript(result);
      setScenes(result.scenes.map((s, i) => ({
        id: `scene-${i}`,
        prompt: s.visualPrompt,
        status: 'idle'
      })));
    } catch (error) {
      console.error(error);
      alert('AI Director is busy. Please try again.');
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const handleGenerateVideo = async (index: number) => {
    if (!isVipMode) {
      await window.aistudio.openSelectKey();
      setIsVipMode(true);
      return;
    }

    const scene = scenes[index];
    const newScenes = [...scenes];
    newScenes[index].status = 'generating';
    setScenes(newScenes);

    try {
      const operation = await GeminiService.startVideoGeneration(scene.prompt, format);
      
      const poll = async () => {
        const status = await GeminiService.pollVideoStatus(operation);
        if (status.done) {
          const videoUri = status.response.generatedVideos[0].video.uri;
          const downloadUrl = await GeminiService.getMediaUrl(videoUri);
          const finalScenes = [...scenes];
          finalScenes[index].status = 'completed';
          finalScenes[index].videoUrl = downloadUrl;
          setScenes([...finalScenes]);
        } else {
          setTimeout(poll, 10000);
        }
      };
      poll();
    } catch (error) {
      console.error(error);
      const failedScenes = [...scenes];
      failedScenes[index].status = 'failed';
      setScenes(failedScenes);
    }
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      alert('Movie published to the GenFlix community!');
    }, 3000);
  };

  return (
    <div className="pt-20 md:pt-28 px-4 md:px-12 pb-32 md:pb-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-black mb-2 flex items-center gap-3 tracking-tighter">
            <Clapperboard className="text-red-600 w-10 h-10 md:w-14 md:h-14" />
            STUDIO
          </h1>
          <p className="text-gray-400 text-sm md:text-lg font-medium">Create AI-native micro dramas in minutes.</p>
        </div>
        
        {/* Format & Style Controls */}
        <div className="flex items-center gap-3 bg-[#1f1f1f] p-2 rounded-2xl border border-gray-800 self-start md:self-auto shadow-2xl">
          <div className="flex bg-[#141414] p-1 rounded-xl border border-gray-700">
            <button 
              onClick={() => setFormat('16:9')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${format === '16:9' ? 'bg-gray-700 text-white shadow-inner' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Monitor className="w-4 h-4" /> <span className="hidden sm:inline">16:9</span>
            </button>
            <button 
              onClick={() => setFormat('9:16')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${format === '9:16' ? 'bg-gray-700 text-white shadow-inner' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Smartphone className="w-4 h-4" /> <span className="hidden sm:inline">9:16</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
        {/* Left: Configuration */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-[#1f1f1f] p-6 rounded-3xl border border-gray-800 shadow-xl space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Wand2 className="w-4 h-4" /> Visual Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {STYLES.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedStyle(s)}
                    className={`text-[10px] md:text-xs font-bold py-2 rounded-xl border transition-all ${selectedStyle === s ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/40' : 'bg-[#141414] border-gray-700 text-gray-400 hover:border-gray-500'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Film className="w-4 h-4" /> Story Prompt
              </label>
              <textarea
                className="w-full bg-[#141414] border border-gray-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600 h-32 resize-none text-sm leading-relaxed"
                placeholder="A lone astronaut finds an abandoned theme park on Mars..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                onClick={handleCreateScript}
                disabled={isGeneratingScript || !prompt.trim()}
                className="w-full bg-white text-black hover:bg-gray-200 active:scale-95 font-black py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-xl uppercase tracking-tighter"
              >
                {isGeneratingScript ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                {script ? 'Refine Script' : 'Generate AI Script'}
              </button>
            </div>
          </section>

          {script && (
            <div className="bg-gradient-to-br from-red-600/20 to-purple-600/20 p-6 rounded-3xl border border-white/5 shadow-inner animate-in fade-in zoom-in duration-500">
               <div className="flex items-center gap-2 mb-3">
                  <Music className="w-4 h-4 text-red-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500">AI Soundtrack</span>
               </div>
               <p className="text-xs text-gray-300 italic">"{script.soundtrackPrompt}"</p>
            </div>
          )}
        </div>

        {/* Right: Production Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {!script ? (
            <div className="h-[400px] md:h-full border-2 border-dashed border-gray-800 rounded-3xl flex flex-col items-center justify-center text-gray-600 bg-[#1f1f1f]/20 group">
              <Clapperboard className="w-16 h-16 mb-4 opacity-10 group-hover:opacity-20 transition-all group-hover:scale-110" />
              <p className="font-bold uppercase tracking-widest text-sm">Enter a prompt to start filming</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-black tracking-tighter flex items-center gap-3">
                  SCENE EDITOR
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded-md text-gray-400 font-bold">3 CLIPS</span>
                </h3>
              </div>

              {/* Vertical Scroll for Mobile, Grid for Desktop */}
              <div className="space-y-4 md:space-y-6">
                {scenes.map((scene, idx) => (
                  <div key={scene.id} className="bg-[#1f1f1f] rounded-3xl border border-gray-800 overflow-hidden shadow-2xl flex flex-col md:flex-row gap-4 p-4 hover:border-gray-600 transition-all group">
                    <div className={`relative bg-black rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-500 ${format === '9:16' ? 'w-full md:w-32 aspect-[9/16]' : 'w-full md:w-64 aspect-video'}`}>
                      {scene.status === 'completed' && scene.videoUrl ? (
                        <video 
                          src={scene.videoUrl} 
                          controls 
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : scene.status === 'generating' ? (
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
                        </div>
                      ) : (
                        <div className="text-gray-800 flex flex-col items-center gap-2">
                           <PlayCircle className="w-12 h-12 opacity-20 group-hover:opacity-40 transition-opacity" />
                        </div>
                      )}
                      
                      {/* Indicator for generating state */}
                      {scene.status === 'generating' && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                           <div className="text-[10px] font-black text-white uppercase tracking-tighter px-3 py-1 bg-red-600 rounded-full animate-pulse">Rendering AI...</div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-black text-[10px] uppercase text-gray-500 tracking-widest flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                            CLIP {idx + 1}
                          </h4>
                          {scene.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                        </div>
                        <p className="text-sm font-bold text-gray-200 line-clamp-2 md:line-clamp-3 leading-relaxed mb-3">
                          {script.scenes[idx].description}
                        </p>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] bg-[#141414] px-2 py-1 rounded font-bold text-gray-500 uppercase tracking-tighter">AI PROMPT:</span>
                           <p className="text-[10px] text-gray-400 truncate max-w-[200px] italic">"{scene.prompt}"</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={() => handleGenerateVideo(idx)}
                          disabled={scene.status === 'generating'}
                          className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 ${
                            scene.status === 'completed' 
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                            : 'bg-red-600 text-white hover:bg-red-700'
                          }`}
                        >
                          {scene.status === 'completed' ? <><RefreshCw className="w-3 h-3" /> Re-Gen Clip</> : <><Sparkles className="w-3 h-3" /> Generate Clip</>}
                        </button>
                        <button className="p-3 rounded-xl bg-[#141414] text-gray-600 hover:text-red-500 transition-colors border border-transparent hover:border-red-900/30">
                           <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Timeline Visual Footer */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Master Stitch Preview</p>
                    <p className="text-xs font-bold text-red-500">{(scenes.filter(s => s.status === 'completed').length / scenes.length * 100).toFixed(0)}% READY</p>
                  </div>
                  <div className="flex gap-2 h-16 md:h-20 mb-8 overflow-hidden rounded-2xl bg-[#141414] border border-gray-800 p-2 shadow-inner">
                    {scenes.map((s, i) => (
                      <div key={i} className={`flex-1 rounded-lg transition-all duration-1000 ${s.status === 'completed' ? 'bg-gradient-to-br from-red-600 to-purple-600 border border-white/10' : 'bg-gray-800 animate-pulse'}`}>
                        {s.videoUrl && <img src={`https://picsum.photos/seed/${i}${s.id}/100/100`} className="w-full h-full object-cover opacity-30 rounded-lg grayscale" />}
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={handlePublish}
                    disabled={scenes.some(s => s.status !== 'completed') || isPublishing}
                    className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-[length:200%_auto] animate-gradient-x hover:scale-[1.02] active:scale-95 py-5 rounded-3xl text-xl font-black shadow-2xl shadow-red-900/40 disabled:opacity-20 disabled:grayscale transition-all flex items-center justify-center gap-3 uppercase tracking-tighter"
                  >
                    {isPublishing ? <Loader2 className="animate-spin" /> : <LayoutGrid className="w-6 h-6" />}
                    {isPublishing ? 'PUBLISHING...' : 'PUBLISH MICRO-MOVIE'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIStudio;
