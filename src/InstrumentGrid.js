import React, { useState, useEffect, useCallback } from 'react';
import InstrumentBox from './InstrumentBox';
import './InstrumentGrid.css';
import * as Tone from 'tone';

const instruments = [
  { name: 'Drums', url: '/sounds/drums.mp3' },
  { name: 'Piano', url: '/sounds/piano.mp3' },
  { name: 'Guitar', url: '/sounds/guitar.mp3' },
  { name: 'Bass', url: '/sounds/bass.mp3' },
  { name: 'Synth', url: '/sounds/synth.mp3' },
  { name: 'Vocals', url: '/sounds/vocals.mp3' },
  { name: 'Percussion', url: '/sounds/percussion.mp3' },
  { name: 'Strings', url: '/sounds/strings.mp3' },
  { name: 'FX', url: '/sounds/fx.mp3' }
];

function InstrumentGrid({ isPlaying }) {
  const [activeInstruments, setActiveInstruments] = useState({});
  const [players, setPlayers] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loadedPlayers = {};
    let loadedCount = 0;

    const loadInstrument = async (instrument) => {
      const player = new Tone.Player({
        url: instrument.url,
        loop: true,
        autostart: false,
        onload: () => {
          loadedCount++;
          if (loadedCount === instruments.length) {
            setIsLoaded(true);
          }
        }
      }).toDestination();

      await player.load();
      loadedPlayers[instrument.name] = player;
    };

    Promise.all(instruments.map(loadInstrument)).then(() => {
      setPlayers(loadedPlayers);
    });

    return () => {
      Object.values(loadedPlayers).forEach(player => player.dispose());
    };
  }, []);

  const startPlayer = useCallback((player) => {
    if (player.loaded && player.state !== "started") {
      player.start();
    }
  }, []);

  const stopPlayer = useCallback((player) => {
    if (player.state === "started") {
      player.stop();
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (isPlaying) {
        Tone.start();
        Object.entries(activeInstruments).forEach(([name, isActive]) => {
          if (isActive && players[name]) {
            startPlayer(players[name]);
          }
        });
      } else {
        Object.values(players).forEach(stopPlayer);
      }
    }
  }, [isPlaying, activeInstruments, players, startPlayer, stopPlayer, isLoaded]);

  const toggleInstrument = useCallback((instrumentName) => {
    if (isLoaded) {
      setActiveInstruments(prev => {
        const newState = { ...prev, [instrumentName]: !prev[instrumentName] };
        if (newState[instrumentName] && isPlaying) {
          startPlayer(players[instrumentName]);
        } else {
          stopPlayer(players[instrumentName]);
        }
        return newState;
      });
    }
  }, [players, isPlaying, startPlayer, stopPlayer, isLoaded]);

  if (!isLoaded) {
    return <div>Loading audio samples...</div>;
  }

  return (
    <div className="instrument-grid">
      {instruments.map((instrument) => (
        <InstrumentBox
          key={instrument.name}
          name={instrument.name}
          onClick={() => toggleInstrument(instrument.name)}
          isActive={activeInstruments[instrument.name]}
        />
      ))}
    </div>
  );
}

export default InstrumentGrid;
