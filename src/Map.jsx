import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = ({ startCoordinates, endCoordinates, speed }) => {
  const [currentPosition, setCurrentPosition] = useState(startCoordinates);
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    const totalDistance = L.latLng(startCoordinates).distanceTo(L.latLng(endCoordinates));
    // converting to seconds
    const duration = (totalDistance / 1000) / speed * 3600; 
    // converting speed to meters per second
    const speedMetersPerSecond = (speed * 1000) / 3600;
    // 1 ms second interval
    const interval = 1;
    // total number of times the marker updates and gets closer to the ending coordinate
    const steps = duration / (interval / 1000);
    // const steps = totalDistance / speedMetersPerSecond
    // step represents progress
    let step = 0;
    
    const id = setInterval(() => {
      step += 1000;
      const lat = startCoordinates[0] + (step / steps) * (endCoordinates[0] - startCoordinates[0]);
      const lng = startCoordinates[1] + (step / steps) * (endCoordinates[1] - startCoordinates[1]);
      setCurrentPosition([lat, lng]);

      if (step >= steps) {
        clearInterval(id);
      }
    }, interval);

    return () => clearInterval(id);
  }, [startCoordinates, endCoordinates, speed, restart]);

  // triggers the useEffect to restart animation.
  const Restart = () => {
    setCurrentPosition(startCoordinates);
    setRestart(prev => !prev);
  }

  return (
    <>
    <button className="restart-button" onClick={Restart}>Restart</button>
    <MapContainer center={startCoordinates} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={startCoordinates}>
        <Popup>Start Location</Popup>
      </Marker>
      <Marker position={endCoordinates}>
        <Popup>End Location</Popup>
      </Marker>
      <Marker position={currentPosition}>
        <Popup>Vessel Position</Popup>
      </Marker>
      <Polyline positions={[startCoordinates, currentPosition, endCoordinates]} color="blue" />
    </MapContainer>
    </>
  );
};

export default Map;
