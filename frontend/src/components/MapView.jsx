import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ hospitals }) => {
  useEffect(() => {
    if (!hospitals || hospitals.length === 0) return;

    // Prevent map re-initialization crash
    const mapContainer = document.getElementById("map-container");
    if (mapContainer._leaflet_id) {
      mapContainer._leaflet_id = null;
    }

    // Create map
    const map = L.map("map-container").setView(
      [18.5204, 73.8567], // Pune default
      12
    );

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Add hospital markers
    hospitals.forEach((h) => {
      if (!h.lat || !h.lng) return;

      L.marker([h.lat, h.lng])
        .addTo(map)
        .bindPopup(`
          <strong>${h.name}</strong><br/>
          ${h.treatment}<br/>
          ₹${h.minCost.toLocaleString()} – ₹${h.maxCost.toLocaleString()}
        `);
    });

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, [hospitals]);

  return (
    <div className="sticky top-6 bg-white rounded-xl border h-[500px] p-4">
      <h3 className="font-semibold mb-2">Hospitals Nearby</h3>

      {/* Actual Map */}
      <div className="h-full rounded-lg overflow-hidden">
        <div
          id="map-container"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default MapView;
