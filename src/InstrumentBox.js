import React from 'react';
import './InstrumentBox.css';

function InstrumentBox({ name, onClick, isActive }) {
  return (
    <div 
      className={`instrument-box ${isActive ? 'active' : ''}`} 
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  );
}

export default InstrumentBox;
