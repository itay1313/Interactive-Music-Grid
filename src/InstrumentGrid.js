import React, { useState, useEffect, useCallback, useRef } from 'react';
import InstrumentBox from './InstrumentBox';
import './InstrumentGrid.css';

const instruments = [
  { name: 'Drums', url: '/sounds/drums.wav' },
  { name: 'Bass', url: '/sounds/bass.wav' },
  { name: 'Lead', url: '/sounds/lead.wav' },
  { name: 'Noise', url: '/sounds/noise.wav' },
  { name: 'Vocal 1', url: '/sounds/vocal1.wav' },
  { name: 'Vocal 2', url: '/sounds/vocal2.wav' },
  { name: 'Vocal 3', url: '/sounds/vocal3.wav' },
  { name: 'Vocal 4', url: '/sounds/vocal4.wav' }
];

function InstrumentGrid({ isPlaying }) {
  const [activeInstruments, setActiveInstruments] = useState({});
  const [audioElements, setAudioElements] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingErrors, setLoadingErrors] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const audioContextRef = useRef(null);
  const sourceNodesRef = useRef({});

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    let loadedAudioElements = {};
    let errors = [];

    const loadInstrument = (instrument) => {
      return fetch(instrument.url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContextRef.current.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
          loadedAudioElements[instrument.name] = audioBuffer;
          console.log(`${instrument.name} loaded successfully`);
        })
        .catch(error => {
          console.error(`Error loading ${instrument.name}:`, error);
          errors.push(`Failed to load ${instrument.name}: ${error.message}`);
        });
    };

    Promise.all(instruments.map(loadInstrument))
      .then(() => {
        console.log('All instruments processed');
        setAudioElements(loadedAudioElements);
        setLoadingErrors(errors);
        setIsLoaded(true);
      })
      .catch(error => {
        console.error('Error in Promise.all:', error);
        setLoadingErrors([...errors, `General error: ${error.message}`]);
        setIsLoaded(true);
      });

    return () => {
      audioContextRef.current.close();
    };
  }, []);

  useEffect(() => {
    let rafId;
    const updateTime = () => {
      setCurrentTime(audioContextRef.current.currentTime);
      rafId = requestAnimationFrame(updateTime);
    };

    if (isPlaying) {
      updateTime();
    } else {
      cancelAnimationFrame(rafId);
    }

    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  const toggleInstrument = useCallback((instrumentName) => {
    if (isLoaded) {
      setActiveInstruments(prev => {
        const newState = { ...prev, [instrumentName]: !prev[instrumentName] };
        
        if (newState[instrumentName]) {
          // Start playing this instrument
          const source = audioContextRef.current.createBufferSource();
          source.buffer = audioElements[instrumentName];
          source.loop = true;
          source.connect(audioContextRef.current.destination);
          source.start(0, audioContextRef.current.currentTime % source.buffer.duration);
          sourceNodesRef.current[instrumentName] = source;
        } else {
          // Stop playing this instrument
          if (sourceNodesRef.current[instrumentName]) {
            sourceNodesRef.current[instrumentName].stop();
            delete sourceNodesRef.current[instrumentName];
          }
        }
        
        return newState;
      });
    }
  }, [isLoaded, audioElements]);

  useEffect(() => {
    if (isLoaded) {
      if (isPlaying) {
        audioContextRef.current.resume();
      } else {
        audioContextRef.current.suspend();
      }
    }
  }, [isPlaying, isLoaded]);

  if (!isLoaded) {
    return <div>Loading audio samples...</div>;
  }

  if (loadingErrors.length > 0) {
    return (
      <div>
        <p>Some audio samples failed to load:</p>
        <ul>
          {loadingErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
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
      <div className="current-time">Current Time: {currentTime.toFixed(2)}s</div>
    </div>
  );
}

export default InstrumentGrid;
