import React from 'react';
import * as Tone from 'tone';
import './Piano.css';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'];

const synth = new Tone.Synth().toDestination();

function Piano() {
  const playNote = (note, index) => {
    const octave = index === notes.length - 1 ? '5' : '4';
    synth.triggerAttackRelease(note + octave, '8n');
  };

  return (
    <div className="piano">
      <ul id="piano">
        {notes.map((note, index) => (
          <li
            key={index}
            className={note.includes('#') ? 'black' : 'white'}
            onClick={() => playNote(note, index)}
          >
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Piano;
