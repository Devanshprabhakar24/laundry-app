import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapPicker = ({ pickup, delivery, readOnly }) => {
  const center = pickup || delivery || { lat: 28.6139, lng: 77.2090 };

  return (
    <MapContainer center={center} zoom={13} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pickup && <Marker position={pickup}><Popup>Pickup Location</Popup></Marker>}
      {delivery && <Marker position={delivery}><Popup>Delivery Location</Popup></Marker>}
    </MapContainer>
  );
};

export default MapPicker;
