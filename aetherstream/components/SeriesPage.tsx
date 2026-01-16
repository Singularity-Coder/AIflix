
import React from 'react';
import { AISeries } from '../types';
import { Link } from 'react-router-dom';

const SeriesPage: React.FC = () => {
  const featuredSeries: AISeries[] = [
    {
      id: 's1',
      title: 'Neon Odyssey: Origins',
      description: 'A cyberpunk saga following the first consciousness born within the global neural network. As the digital wall crumbles, a new species emerges.',
      thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2000',
      creator: 'AetherStudio X',
      episodes: [
        { id: 'e1', title: 'The Binary Wake', description: 'Subject 01 manifests within the firewall.', thumbnail: '', genre: 'Sci-Fi', duration: '5:00', creator: 'AetherAI' },
        { id: 'e2', title: 'Silicon Ghost', description: 'The corporate task force begins the purge.', thumbnail: '', genre: 'Sci-Fi', duration: '4:45', creator: 'AetherAI' }
      ]
    },
    {
      id: 's2',
      title: 'Solstice Echo',
      description: 'In a world where the sun never sets, a group of nomads discovers the myth of the "Night". An AI-generated visual masterpiece of light and shadow.',
      thumbnail: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=2000',
      creator: 'Lumina Cine',
      episodes: []
    },
    {
      id: 's3',
      title: 'Architects of Memory',
      description: 'A noir thriller where detectives dive into AI-reconstructed crime scenes. Every memory is a lead, and every lead is a lie.',
      thumbnail: 'https://images.unsplash.com/photo-1478720143034-403f382e5627?auto=format&fit=crop&q=80&w=2000',
      creator: 'NoirGen Labs',
      episodes: []
    }
  ];

  return (
    <div className="pt-32 px-4 md:px-12 max-w-7xl mx-auto pb-20 space-y-12 animate-in fade-in duration-1000">
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-6xl font-black tracking-tighter text-glow">AI Originals</h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Premium episodic experiences, algorithmically synthesized for maximum immersion.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-16">
        {featuredSeries.map((series) => (
          <div key={series.id} className="group relative overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 flex flex-col lg:flex-row min-h-[450px] shadow-2xl shadow-purple-500/5 transition-all hover:border-purple-500/30">
            <div className="w-full lg:w-2/3 relative h-80 lg:h-auto overflow-hidden">
              <img 
                src={series.thumbnail} 
                alt={series.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent lg:hidden" />
            </div>
            
            <div className="p-10 lg:w-1/3 flex flex-col justify-center space-y-8 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-purple-500/30">
                    Series Hub
                  </span>
                  <span className="text-gray-500 text-xs font-bold">{series.creator}</span>
                </div>
                <h2 className="text-4xl font-black leading-tight group-hover:text-purple-400 transition-colors">{series.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">{series.description}</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <Link to={`/play/${series.id}`} className="w-full px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3 shadow-xl">
                   <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                   Begin Episode 1
                </Link>
                <button className="w-full px-8 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center gap-3">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                   Track Updates
                </button>
              </div>
              
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-black uppercase tracking-widest">
                 <div className="flex items-center gap-4">
                   <span>{series.episodes.length || 12} Episodes</span>
                   <span className="w-1 h-1 bg-gray-700 rounded-full" />
                   <span>HDR AI</span>
                 </div>
                 <span className="text-purple-500">Trending #1</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesPage;
