import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-toolbar";
import "leaflet-distortableimage";
import "leaflet-toolbar/dist/leaflet.toolbar.css";
import "leaflet-distortableimage/dist/leaflet.distortableimage.css";

import { useEffect } from "react";

interface IDistortableImageOverlayProps {
  mapCenter: [number, number];
  imageUrl: string;
}

export default function DistortableImageOverlay({
  mapCenter,
  imageUrl,
}: IDistortableImageOverlayProps) {
  const map = useMap();

  useEffect(() => {
    // @ts-ignore
    const layer = L.distortableImageOverlay(imageUrl, {}).addTo(map);

    map.doubleClickZoom.disable();

    return () => {
      map.removeLayer(layer);
      map.setView(mapCenter);
    };
  }, []);

  return null;
}
