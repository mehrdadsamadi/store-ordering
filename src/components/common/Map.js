import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import LocIcon from '../icons/LocIcon';

function MyComponent({ onMove }) {
    const map = useMapEvents({
        moveend: () => {
            onMove(map.getCenter())
        }
    })
    return null
}

export default function Map({ setStoreLoc, canMove = true, center = [35.715298, 51.404343] }) {
    // const [center, setCenter] = useState([35.715298, 51.404343]); // موقعیت پیش‌فرض، تهران
    
    return (
        <div className='w-full h-full relative'>
            <MapContainer
                center={center}
                zoom={canMove ? 14 : 16}
                scrollWheelZoom={canMove}
                dragging={canMove}
                zoomControl={canMove}
                className='w-full h-full z-10'
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MyComponent onMove={setStoreLoc} />
            </MapContainer>
            <div className='z-50 absolute' style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <LocIcon className='w-12 h-12' />
            </div>
        </div>
    );
}
