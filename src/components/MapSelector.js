import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';

function LocationMarker({ onLocationSelected }) {
    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationSelected(e.latlng.lat, e.latlng.lng);
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

export default function MapSelector({ onLocationSelected }) {
    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold dark:text-gray-100 mb-4">Select Location on Map</h2>
            <MapContainer
                center={[0, 0]}
                zoom={2}
                style={{ height: '400px', width: '100%' }}
                className="rounded shadow"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker onLocationSelected={onLocationSelected} />
            </MapContainer>
        </div>
    );
}
