import React, { useState, useEffect } from 'react';

const Timer = ({ workDuration, breakDuration }) => {
  const [seconds, setSeconds] = useState(workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreakMode, setIsBreakMode] = useState(false);
  const [sessions, setSessions] = useState(0);

  // Load audio when component mounts
  const notificationSound = new Audio('./sounds/notification.mp3');

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      // Timer completed
      notificationSound.play();
      setIsActive(false);
      setIsBreakMode(!isBreakMode);
      if (!isBreakMode) {
        setSessions(s => s + 1);
        setSeconds(breakDuration * 60);
      } else {
        setSeconds(workDuration * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, isBreakMode, workDuration, breakDuration]);

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-sessions', sessions);
  }, [sessions]);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('pomodoro-sessions');
    if (savedSessions) {
      setSessions(parseInt(savedSessions));
    }
  }, []);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(workDuration * 60);
    setIsActive(false);
    setIsBreakMode(false);
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        toggle();
      } else if (e.code === 'KeyR') {
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-6">
      <div className="flex items-center justify-center space-x-4">
        <div className="text-xs sm:text-sm text-finch/70">
          {isBreakMode ? 'Break Time' : 'Work Time'}
        </div>
        <div className="text-xs sm:text-sm text-finch/70">
          Sessions: {sessions}
        </div>
      </div>
      
      <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-finch tracking-wider">
        {formatTime(seconds)}
      </div>
      
      <div className="flex space-x-3 w-full sm:w-auto">
        <button
          onClick={toggle}
          className={`flex-1 sm:flex-none sm:w-32 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-semibold transition-all duration-300 text-bone ${
            isActive 
              ? 'bg-battleship hover:bg-finch' 
              : 'bg-lemongrass hover:bg-battleship'
          }`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        
        <button
          onClick={reset}
          className="flex-1 sm:flex-none sm:w-32 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-semibold bg-battleship hover:bg-finch transition-all duration-300 text-bone"
        >
          Reset
        </button>
      </div>

      <div className="w-full bg-bone rounded-full h-2">
        <div 
          className="bg-lemongrass h-2 rounded-full transition-all duration-300"
          style={{ width: `${(seconds / (workDuration * 60)) * 100}%` }}
        ></div>
      </div>

      <div className="text-[10px] sm:text-xs text-finch/60 text-center mt-2">
        <p>Keyboard shortcuts:</p>
        <p>Space - Start/Pause | R - Reset</p>
      </div>

      <div className="w-full mt-4 p-3 sm:p-4 bg-bone/50 rounded-lg">
        <h3 className="text-xs sm:text-sm font-medium text-finch mb-2">Today's Sessions</h3>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {Array(sessions).fill(0).map((_, i) => (
            <div 
              key={i}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-lemongrass"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timer;
