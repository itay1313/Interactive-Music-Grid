import React, { useState } from 'react';
import InstrumentGrid from './InstrumentGrid';
import Piano from './Piano';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="App">
      <h1>Interactive Music Grid</h1>
      <button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Play'}</button>
      <InstrumentGrid isPlaying={isPlaying} />
      <Piano />
    </div>
  );
}

export default App;
