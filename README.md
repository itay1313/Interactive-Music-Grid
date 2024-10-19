# Interactive Music Grid

![Interactive Music Grid Logo](src/logo.svg)

## Description

Interactive Music Grid is a React-based web application that allows users to create and play music through an interactive grid interface. Each box in the grid represents a different musical instrument, and users can activate or deactivate these instruments to create unique musical compositions.

## Features

- Interactive grid of instrument boxes
- Each box represents a different musical instrument (e.g., drums, piano, guitar)
- Click or hover over boxes to activate/deactivate instruments
- Synchronized playback of multiple instrument tracks
- Custom cursor for music-related interactions
- Play/Stop button to control overall playback

## Technologies Used

- React
- JavaScript (ES6+)
- HTML5
- CSS3
- Web Audio API

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/interactive-music-grid.git
   ```

2. Navigate to the project directory:
   ```
   cd interactive-music-grid
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to view the app.

## Usage

1. Click the "Play" button to start the overall playback.
2. Click on individual instrument boxes to activate or deactivate them.
3. Experiment with different combinations to create your unique sound.
4. Click the "Stop" button to stop the playback.

## Project Structure

```
interactive-music-grid/
├── public/
│   ├── index.html
│   └── sounds/
│       ├── drums.mp3
│       ├── piano.mp3
│       └── ...
├── src/
│   ├── App.js
│   ├── App.css
│   ├── InstrumentGrid.js
│   ├── InstrumentGrid.css
│   ├── InstrumentBox.js
│   ├── InstrumentBox.css
│   ├── index.js
│   └── logo.svg
├── package.json
└── README.md
