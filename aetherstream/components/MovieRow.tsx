
import React from 'react';
import { AIMovie } from '../types';
import { Link } from 'react-router-dom';

interface MovieRowProps {
  title: string;
  movies: AIMovie[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
        {title}
        <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </h2>
      
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
        {movies.map((movie) => (
          <Link 
            key={movie.id} 
            to={`/play/${movie.id}`}
            className="group relative flex-none w-[280px] md:w-[350px] aspect-video rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 shadow-lg"
          >
            <img 
              src={movie.thumbnail} 
              alt={movie.title} 
              className="w-full h-full object-cover group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold text-lg">{movie.title}</span>
                <span className="text-purple-400 text-xs font-bold bg-black/50 px-2 py-1 rounded">{movie.duration}</span>
              </div>
              <p className="text-gray-300 text-xs line-clamp-2">{movie.description}</p>
              <div className="mt-4 flex items-center gap-2">
                 <button className="p-2 bg-white text-black rounded-full hover:bg-purple-500 hover:text-white transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                 </button>
                 <button className="p-2 border border-white/50 text-white rounded-full hover:bg-white/10 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                 </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
