import React, { useState } from 'react';
import FlowerScene from './components/FlowerScene';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [bloomState, setBloomState] = useState<'idle' | 'blooming' | 'resetting'>('idle');

  const handleBloom = () => {
    if (bloomState === 'idle' || bloomState === 'resetting') {
      setBloomState('blooming');
    }
  };

  const handleReset = () => {
    setBloomState('resetting');
    // Allow a small delay for the reset animation to complete before going back to idle if needed,
    // or just let the component handle the 'resetting' state visual.
    setTimeout(() => setBloomState('idle'), 500);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-sky-100 to-sky-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative background sun */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
      
      <header className="absolute top-0 left-0 w-full p-6 z-10">
        <h1 className="text-3xl font-bold text-sky-900 tracking-tight text-center md:text-left">
          Botanical<span className="text-pink-500">.io</span>
        </h1>
      </header>

      <main className="flex-grow flex items-center justify-center w-full max-w-4xl px-4 mt-8 md:mt-0">
        <FlowerScene state={bloomState} />
      </main>

      <footer className="w-full p-8 z-10 flex justify-center pb-12">
        <Controls 
          onBloom={handleBloom} 
          onReset={handleReset} 
          state={bloomState} 
        />
      </footer>
    </div>
  );
};

export default App;