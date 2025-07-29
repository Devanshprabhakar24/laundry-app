// frontend/src/components/OrderMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import './OrderMap.css';

const OrderMap = ({ lat, lng }) => {
  if (!lat || !lng) return <p>Location not available</p>;

  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} />
    </MapContainer>
  );
};

export default OrderMap;
