import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-toolbar";
import "leaflet-distortableimage";
import "leaflet-toolbar/dist/leaflet.toolbar.css";
import "leaflet-distortableimage/dist/leaflet.distortableimage.css";
import "leaflet/dist/leaflet.css";

import { useEffect } from "react";

export default function DistortableImageOverlay({
    images
}) {
    const map = useMap();
    console.log({images})
    useEffect(() => {
        map.whenReady(() => {
            const imgGroup = L.distortableCollection()
            images.forEach(image => {
                imgGroup.addLayer(image);
            })

            imgGroup.addTo(map)
        })
    }, [images, map])
    return null;
}