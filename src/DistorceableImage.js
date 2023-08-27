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
    actions
}) {
    const map = useMap();

    useEffect(() => {
        map.whenReady(() => {
            const imagem = L.distortableImageOverlay(imageUrl, { actions }).addTo(map);

            map.addGoogleMutant();

            map.doubleClickZoom.disable();


            return () => {
                imagem.removeFrom(map);
            };
        })
    }, [actions, imageUrl, map, mapCenter])
    return null;
}