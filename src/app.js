import React from 'react';
import Timer from './timer';
import Settings from './settings';

const App = () => {
  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <Timer />
      <Settings />
    </div>
  );
};

export default App;
