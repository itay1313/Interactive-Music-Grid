import React from 'react';
import './InstrumentBox.css';

const instrumentIcons = {
  'Drums': '🥁',
  'Bass': '🎸',
  'Lead': '🎸',
  'Noise': '🎛️',
  'Vocal 1': '🎤',
  'Vocal 2': '🎤',
  'Vocal 3': '🎤',
  'Vocal 4': '🎤'
};

function InstrumentBox({ name, onClick, isActive }) {
  return (
    <div 
      className={`instrument-box ${isActive ? 'active' : ''}`} 
      onClick={onClick}
    >
      <span className="instrument-icon">{instrumentIcons[name]}</span>
      <span>{name}</span>
    </div>
  );
}

export default InstrumentBox;
