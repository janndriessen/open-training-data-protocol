'use client'

import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const southBeachCenter: LatLngExpression = [25.782545, -80.134017]

// Realistic running workout in South Beach, Miami (6.31 km, split into ~1 km sections)
const route: LatLngExpression[] = [
  [25.7706, -80.1355], // 0.00 km: South Pointe Park (Start)
  [25.776, -80.1325], // 1.00 km: Ocean Dr north
  [25.782, -80.13], // 2.00 km: Ocean Dr & 5th St
  [25.787, -80.129], // 3.00 km: Ocean Dr & 10th St
  [25.792, -80.1305], // 4.00 km: Ocean Dr & 15th St
  [25.797, -80.134], // 5.00 km: Collins Park
  [25.803, -80.137], // 6.00 km: 23rd St
  [25.805, -80.14], // 6.31 km: End near 25th St
]

export function MapSouthBeach() {
  return (
    <div
      style={{
        width: 'calc(100% - 48px)',
        height: 320,
        borderRadius: 12,
        overflow: 'hidden',
        marginLeft: 24,
        marginRight: 24,
      }}
    >
      <MapContainer
        center={southBeachCenter}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={false}
        dragging={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Polyline
          positions={route}
          pathOptions={{ color: '#6A6FF5', weight: 5 }}
        />
        <Marker position={route[0]}>
          <Popup>Start: South Pointe Park</Popup>
        </Marker>
        <Marker position={route[route.length - 1]}>
          <Popup>End: Near 25th St (6.31 km)</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
