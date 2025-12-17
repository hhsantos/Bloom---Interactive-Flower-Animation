import React from 'react';
import { Flower2, RefreshCw } from 'lucide-react';

interface ControlsProps {
  onBloom: () => void;
  onReset: () => void;
  state: 'idle' | 'blooming' | 'resetting';
}

const Controls: React.FC<ControlsProps> = ({ onBloom, onReset, state }) => {
  const isBlooming = state === 'blooming';

  return (
    <div className="flex gap-6 items-center bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50">
      <button
        onClick={onBloom}
        disabled={isBlooming}
        className={`
          flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform
          ${isBlooming 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed scale-95' 
            : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95 shadow-pink-200'
          }
        `}
      >
        <Flower2 size={24} className={isBlooming ? "animate-spin-slow" : ""} />
        {isBlooming ? 'Blooming...' : 'Bloom'}
      </button>

      <button
        onClick={onReset}
        className="p-4 rounded-xl text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all active:scale-90"
        title="Reset Animation"
      >
        <RefreshCw size={24} className={state === 'resetting' ? 'animate-spin' : ''} />
      </button>
    </div>
  );
};

export default Controls;