import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";

import drone from "./drone.png";
import DistortableImageOverlay from "./DistorcedImage";
import { useState } from "react";

function App() {
  const [center, _] = useState<[number, number]>([-6.789272, -43.045765]);
  return (
    <MapContainer
      center={center}
      zoom={18}
      scrollWheelZoom={false}
      style={{ minHeight: "50vh", width: "50vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://1.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?app_id=Xf717WLh23vibGrY2VdK&app_code=onhDRdp6818gjOCVn925eg"
      />
      <DistortableImageOverlay mapCenter={center} imageUrl={drone} />
    </MapContainer>
  );
}

export default App;
