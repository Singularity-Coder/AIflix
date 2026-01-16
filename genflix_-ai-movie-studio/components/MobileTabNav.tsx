
import React from 'react';
import { AppTab } from '../types';
import { Home, Sparkles, Film } from 'lucide-react';

interface MobileTabNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const MobileTabNav: React.FC<MobileTabNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#141414]/95 backdrop-blur-lg border-t border-gray-800 z-50 flex items-center justify-around py-3 pb-6 px-4">
      <button 
        onClick={() => onTabChange(AppTab.HOME)}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === AppTab.HOME ? 'text-red-600' : 'text-gray-500'}`}
      >
        <Home className="w-6 h-6" />
        <span className="text-[10px] font-bold">Home</span>
      </button>
      <button 
        onClick={() => onTabChange(AppTab.STUDIO)}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === AppTab.STUDIO ? 'text-red-600' : 'text-gray-500'}`}
      >
        <div className={`p-2 -mt-8 rounded-full shadow-lg transition-all ${activeTab === AppTab.STUDIO ? 'bg-red-600 text-white scale-110' : 'bg-[#2f2f2f] text-gray-400'}`}>
          <Sparkles className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold">Studio</span>
      </button>
      <button 
        onClick={() => onTabChange(AppTab.MY_MOVIES)}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === AppTab.MY_MOVIES ? 'text-red-600' : 'text-gray-500'}`}
      >
        <Film className="w-6 h-6" />
        <span className="text-[10px] font-bold">Library</span>
      </button>
    </div>
  );
};

export default MobileTabNav;
