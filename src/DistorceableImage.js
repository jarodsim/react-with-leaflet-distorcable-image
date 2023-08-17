import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-toolbar";
import "leaflet-distortableimage";
import "leaflet-toolbar/dist/leaflet.toolbar.css";
import "leaflet-distortableimage/dist/leaflet.distortableimage.css";
import "leaflet/dist/leaflet.css";

import { useEffect } from "react";

export default function DistortableImageOverlay({
    mapCenter,
    imageUrl,
}) {
    const map = useMap();

    useEffect(() => {
        const layer = L.distortableImageOverlay(imageUrl, {}).addTo(map);

        map.doubleClickZoom.disable();

        return () => {
            if (map.getPane(layer)) {
                map.removeLayer(layer);
                map.setView(mapCenter);
            }
        };
    }, [map]);

    return null;
}