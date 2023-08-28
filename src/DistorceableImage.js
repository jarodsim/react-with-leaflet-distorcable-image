import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-toolbar";
import "leaflet-distortableimage";
import "leaflet-toolbar/dist/leaflet.toolbar.css";
import "leaflet-distortableimage/dist/leaflet.distortableimage.css";
import "leaflet/dist/leaflet.css";

import { useEffect } from "react";

export default function DistortableImageOverlay({
    images,
    groupedImages,
}) {
    const map = useMap();
    useEffect(() => {
        map.whenReady(() => {
            images.forEach(image => {
                groupedImages.addLayer(image);
            })

            groupedImages.addTo(map)
        })
    }, [groupedImages, images, map])
    return null;
}