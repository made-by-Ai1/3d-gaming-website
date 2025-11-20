import React from 'react';
import { Game } from '../types';
import { ShoppingCart, Star } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-neon-cyan transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)] hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs text-neon-cyan font-bold border border-neon-cyan/30">
          {game.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">{game.title}</h3>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-medium">{game.rating}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-gray-200">{game.price}</span>
          <button className="bg-slate-700 hover:bg-neon-purple text-white p-2 rounded-lg transition-colors flex items-center gap-2 group-active:scale-95">
             <ShoppingCart size={18} />
             <span className="text-sm">خرید</span>
          </button>
        </div>
      </div>
      
      {/* Glow effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
    </div>
  );
};