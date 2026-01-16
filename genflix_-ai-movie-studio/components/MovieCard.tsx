
import React from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPlay }) => {
  return (
    <div className="relative flex-shrink-0 w-48 md:w-64 aspect-video group cursor-pointer rounded-sm overflow-hidden bg-[#2f2f2f] transition-all duration-300 hover:scale-110 hover:z-10 shadow-lg">
      <img 
        src={movie.thumbnail} 
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      
      {/* Mini Overlay on Hover */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
        <div className="flex items-center gap-2 mb-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onPlay(movie); }}
            className="p-1.5 rounded-full bg-white text-black hover:bg-gray-200"
          >
            <Play className="w-4 h-4 fill-current" />
          </button>
          <button className="p-1.5 rounded-full border border-gray-400 text-white hover:border-white">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-full border border-gray-400 text-white hover:border-white ml-auto">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="text-[10px] md:text-xs font-bold text-green-500 mb-1">
          98% Match <span className="text-gray-400 ml-1 border border-gray-500 px-1 text-[8px]">AI GEN</span>
        </div>
        <h4 className="text-xs md:text-sm font-semibold truncate">{movie.title}</h4>
      </div>
    </div>
  );
};

export default MovieCard;
