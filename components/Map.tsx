"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([39.8283, -98.5795], 4);

    // Base map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Radar layer from your backend
    const radarLayer = L.tileLayer(
      `http://localhost:8000/tiles/{z}/{x}/{y}.png?ts=${Date.now()}`,
      {
        tileSize: 256,
        opacity: 0.7,
        minZoom: 0,
        maxZoom: 10,
        crossOrigin: true,
      }
    ).addTo(map);

    // CLEANUP: remove map on unmount
    return () => {
      map.remove();
    };
  }, []); // empty dependency array, run once

  return <div id="map" style={{ width: "100vw", height: "100vh" }} />;
}
