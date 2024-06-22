import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LocIcon from '../icons/LocIcon';

import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useEffect } from 'react';

// تنظیم آیکون پیش‌فرض leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Routing({ map, startPoint, endPoint }) {
    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(startPoint[0], startPoint[1]), // نقطه شروع
                L.latLng(endPoint[0], endPoint[1])     // نقطه پایان
            ],
            routeWhileDragging: true
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [map]);

    return null;
}

function MyComponent({ onMove, canRouting, startPoint, endPoint }) {
    const map = useMapEvents({
        moveend: () => {
            onMove(map.getCenter())
        }
    })

    return canRouting ? <Routing map={map} startPoint={startPoint} endPoint={endPoint} /> : null;
}

export default function Map({ setStoreLoc, canMove = true, center = [35.715298, 51.404343], canRouting = false, startPoint = [], endPoint = []}) {

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
                <MyComponent onMove={setStoreLoc} canRouting={canRouting} startPoint={startPoint} endPoint={endPoint}/>
            </MapContainer>
            <div className='z-50 absolute' style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <LocIcon className='w-12 h-12' />
            </div>
        </div>
    );
}
