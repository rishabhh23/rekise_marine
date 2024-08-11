import React from 'react';
import Map from './Map';

function App() {
  const startCoordinates = [22.1696, 91.4996];
  const endCoordinates = [22.2637, 91.7159];
  // Speed in kmph
  const speed = 20;

  return (
    <div>
      <h1>Vessel Navigation</h1>
      <div>
        <h2>Starting Coordinates:</h2>
        <p>Latitude: {startCoordinates[0]}, Longitude: {startCoordinates[1]}</p>
      </div>
      <div>
        <h2>Ending Coordinates:</h2>
        <p>Latitude: {endCoordinates[0]}, Longitude: {endCoordinates[1]}</p>
      </div>
      <div>
        <h2>Speed:</h2>
        <p>{speed} km/hr</p>
      </div>
      <Map startCoordinates={startCoordinates} endCoordinates={endCoordinates} speed={speed} />
    </div>
  );
}

export default App;
