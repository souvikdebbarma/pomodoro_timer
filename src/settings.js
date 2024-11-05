import React, { useState, useEffect } from 'react';

const Settings = ({ workDuration, breakDuration, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempWorkDuration, setTempWorkDuration] = useState(workDuration);
  const [tempBreakDuration, setTempBreakDuration] = useState(breakDuration);
  const [volume, setVolume] = useState(() => {
    return parseFloat(localStorage.getItem('musicVolume')) || 0.5;
  });

  const handleShowTutorial = () => {
    localStorage.removeItem('tutorialSeen');
    window.location.reload(); // Reload to show tutorial
  };

  useEffect(() => {
    const audio = document.querySelector('audio');
    if (audio) {
      audio.volume = volume;
      localStorage.setItem('musicVolume', volume);
    }
  }, [volume]);

  const handleSave = () => {
    onSave(tempWorkDuration, tempBreakDuration);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-3 py-2 text-xs sm:text-sm font-medium text-finch hover:text-battleship transition-colors duration-300"
      >
        ▲ Show Settings
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-finch/80 flex items-center justify-center p-4">
          <div className="bg-bone rounded-lg p-4 sm:p-6 w-[300px] sm:w-[320px] max-w-[95%]">
            <h2 className="text-lg sm:text-xl font-bold text-finch mb-4">Settings</h2>
            
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-xs sm:text-sm text-finch">Work Duration (minutes)</label>
                <input 
                  type="number"
                  min="1"
                  max="60" 
                  className="w-full bg-bison rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lemongrass text-finch"
                  value={tempWorkDuration}
                  onChange={(e) => setTempWorkDuration(Number(e.target.value))}
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="text-xs sm:text-sm text-finch">Break Duration (minutes)</label>
                <input 
                  type="number"
                  min="1"
                  max="30"
                  className="w-full bg-bison rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-lemongrass text-finch"
                  value={tempBreakDuration}
                  onChange={(e) => setTempBreakDuration(Number(e.target.value))}
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="text-xs sm:text-sm text-finch">
                  Background Music Volume
                </label>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-lemongrass"
                />
              </div>

              <div className="pt-2 border-t border-finch/10">
                <button
                  onClick={handleShowTutorial}
                  className="w-full bg-bone border border-lemongrass text-finch font-medium py-2 rounded transition-colors duration-300 text-xs sm:text-sm hover:bg-lemongrass hover:text-bone"
                >
                  Show Tutorial
                </button>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-battleship/20 text-finch font-medium py-2 rounded transition-colors duration-300 text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 bg-lemongrass hover:bg-battleship text-bone font-medium py-2 rounded transition-colors duration-300 text-xs sm:text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
