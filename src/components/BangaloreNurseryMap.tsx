import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom branded marker matching Figma screenshot
const customNurseryIcon = L.divIcon({
  className: "kanchan-custom-marker",
  html: `
    <div style="position: relative; transform: translate(-50%, -100%); display: flex; flex-direction: column; align-items: center; cursor: pointer; filter: drop-shadow(0 3px 8px rgba(0,0,0,0.18));">
      {/* Branded Label Pill */}
      <div style="background: #143826; color: #FFFFFF; padding: 6px 14px; border-radius: 9999px; font-size: 11.5px; font-weight: 700; white-space: nowrap; display: flex; align-items: center; gap: 6px; margin-bottom: 5px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; letter-spacing: -0.01em;">
        <svg style="width: 13px; height: 13px; fill: #C9E1B0;" viewBox="0 0 24 24">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
        </svg>
        <span>Kanchan Garden Store & Greenhouses</span>
      </div>
      {/* Pin Teardrop with white inner circle and dark center dot */}
      <div style="width: 28px; height: 28px; background: #143826; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2.5px solid #FFFFFF;">
        <div style="transform: rotate(45deg); width: 8px; height: 8px; background: #FFFFFF; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <div style="width: 4px; height: 4px; background: #143826; border-radius: 50%;"></div>
        </div>
      </div>
    </div>
  `,
  iconSize: [0, 0],
  popupAnchor: [0, -42],
});

interface BangaloreNurseryMapProps {
  className?: string;
}

export default function BangaloreNurseryMap({ className = "" }: BangaloreNurseryMapProps) {
  // Center coordinates on Koramangala / Bangalore nursery area
  const position: [number, number] = [12.9345, 77.6350];

  return (
    <div className={`relative w-full h-full ${className}`}>
      <MapContainer
        center={position}
        zoom={12.5}
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full z-0"
        style={{ minHeight: "340px", width: "100%", height: "100%" }}
      >
        {/* OpenStreetMap standard tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customNurseryIcon}>
          <Popup className="kanchan-map-popup">
            <div style={{ padding: "3px 4px", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
              <h4 style={{ margin: "0 0 4px 0", color: "#143826", fontSize: "13px", fontWeight: 700 }}>
                Kanchan Garden Store & Greenhouses
              </h4>
              <p style={{ margin: 0, color: "#4a5d4e", fontSize: "11.5px", lineHeight: 1.45 }}>
                125 Greenery Street, Koramangala<br />
                Bangalore 560001
              </p>
              <p style={{ margin: "6px 0 0 0", color: "#2d6a4f", fontSize: "11px", fontWeight: 600 }}>
                Monday to Sunday: 9:00 AM – 7:30 PM
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
