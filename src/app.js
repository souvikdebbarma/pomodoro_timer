import React, { useState, useEffect } from 'react';
import Timer from './timer.js';
import Settings from './settings.js';
import MusicControl from './components/MusicControl.js';

const Tutorial = ({ onClose }) => (
  <div className="fixed inset-0 bg-finch/60 flex items-center justify-center p-4 z-50">
    <div className="bg-finch/80 backdrop-blur-sm border-2 border-lemongrass/30 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Welcome to Pomodoro Timer!</h2>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <p className="text-sm text-white font-medium">
            The Pomodoro Technique helps you stay focused and productive:
          </p>
          <ul className="space-y-2 text-sm text-white list-disc pl-5 mt-2">
            <li>Work for 25 minutes</li>
            <li>Take a 5-minute break</li>
            <li>After 4 sessions, take a longer break</li>
          </ul>
        </div>

        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <p className="text-sm font-medium text-white mb-1">Features:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-white">
            <li>Keyboard shortcuts (Space & R)</li>
            <li>Background music</li>
            <li>Multiple themes</li>
            <li>Session tracking</li>
          </ul>
        </div>
      </div>

      <button 
        onClick={onClose}
        className="w-full bg-lemongrass hover:bg-battleship text-white py-2.5 rounded-lg transition-colors duration-300 font-medium"
      >
        Got it, let's start!
      </button>
    </div>
  </div>
);

const App = () => {
  const [workDuration, setWorkDuration] = useState(() => {
    return parseInt(localStorage.getItem('workDuration')) || 25;
  });
  const [breakDuration, setBreakDuration] = useState(() => {
    return parseInt(localStorage.getItem('breakDuration')) || 5;
  });

  const handleSettingsUpdate = (newWorkDuration, newBreakDuration) => {
    setWorkDuration(newWorkDuration);
    setBreakDuration(newBreakDuration);
    localStorage.setItem('workDuration', newWorkDuration);
    localStorage.setItem('breakDuration', newBreakDuration);
  };

  const themes = {
    earth: {
      bison: '#C5BEAB',
      bone: '#E1DBCB',
      lemongrass: '#9CA089',
      battleship: '#868B6B',
      finch: '#5D624C',
    },
    ocean: {
      bison: '#B8C5D6',
      bone: '#DDE5F0',
      lemongrass: '#7B97B9',
      battleship: '#5A789C',
      finch: '#3A5273',
    },
    sunset: {
      bison: '#D6B8B8',
      bone: '#F0DDDD',
      lemongrass: '#B97B7B',
      battleship: '#9C5A5A',
      finch: '#733A3A',
    }
  };

  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'earth';
  });

  useEffect(() => {
    // Update CSS variables when theme changes
    const root = document.documentElement;
    const theme = themes[currentTheme];
    
    root.style.setProperty('--color-bison', theme.bison);
    root.style.setProperty('--color-bone', theme.bone);
    root.style.setProperty('--color-lemongrass', theme.lemongrass);
    root.style.setProperty('--color-battleship', theme.battleship);
    root.style.setProperty('--color-finch', theme.finch);
    
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const [showTutorial, setShowTutorial] = useState(() => {
    const tutorialSeen = localStorage.getItem('tutorialSeen');
    return tutorialSeen === null;
  });

  useEffect(() => {
    const tutorialSeen = localStorage.getItem('tutorialSeen');
    if (tutorialSeen === null) {
      setShowTutorial(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-bone flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[360px] sm:max-w-[400px] bg-bison rounded-2xl shadow-lg p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-finch">Pomodoro Timer</h1>
          <select 
            className="bg-bone text-finch px-2 py-1 rounded text-xs sm:text-sm"
            onChange={(e) => setCurrentTheme(e.target.value)}
            value={currentTheme}
          >
            <option value="earth">Earth</option>
            <option value="ocean">Ocean</option>
            <option value="sunset">Sunset</option>
          </select>
        </div>
        <Timer workDuration={workDuration} breakDuration={breakDuration} />
        <Settings 
          workDuration={workDuration} 
          breakDuration={breakDuration} 
          onSave={handleSettingsUpdate}
        />
      </div>
      <MusicControl />
      {showTutorial && (
        <Tutorial onClose={() => {
          setShowTutorial(false);
          localStorage.setItem('tutorialSeen', 'true');
        }} />
      )}
    </div>
  );
};

export default App;
