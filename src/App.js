import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import drone from "./drone.png";
import DistortableImageOverlay from "./DistorceableImage";
import { useCallback, useState } from "react";
import L from "leaflet";

function App() {
  const [center, _] = useState([-6.789272, -43.045765]);
  const [images, setImagens] = useState([
    {
      url: drone,
      name: "drone",
      bounds: null,
    },
  ]);
  const [newImageLocation, setNewImageLocation] = useState(null);
  const [enableOnMapClick, setEnableOnMapClick] = useState(false);

  const addImage = useCallback(() => {
    const defaultActions = [
      {
        name: "L.DragAction",
        class: L.DragAction,
      },
      {
        name: "L.ScaleAction",
        class: L.ScaleAction,
      },
      {
        name: "L.DistortAction",
        class: L.DistortAction,
      },
      {
        name: "L.RotateAction",
        class: L.RotateAction,
      },
      {
        name: "L.FreeRotateAction",
        class: L.FreeRotateAction,
      },
      {
        name: "L.LockAction",
        class: L.LockAction,
      },
      {
        name: "L.OpacityAction",
        class: L.OpacityAction,
      },
      {
        name: "L.BorderAction",
        class: L.BorderAction,
      },
      {
        name: "L.ExportAction",
        class: L.ExportAction,
      },
      {
        name: "L.DeleteAction",
        class: L.DeleteAction,
      },
      {
        name: "L.RestoreAction",
        class: L.RestoreAction,
      },
    ]

    const url = document.getElementById("url").value;
    const name = document.getElementById("name").value;

    if (!url || !name) {
      alert("Preencha os campos de url e nome");
    }

    const actions = document.querySelectorAll("input[name='actions[]']:checked");

    const actionsArray = [];

    actions.forEach(action => {
      const actionName = action.value;
      const actionClass = defaultActions.find(action => action.name === actionName).class;
      actionsArray.push(actionClass);
    })

    setImagens([
      ...images,
      {
        url,
        name,
        bounds: null,
        actions: actionsArray,
      },
    ]);
  }, [images]);


  function HandleMapClick() {
    const map = useMap();

    map.whenReady(() => {
      // pega a localização do click no mapa
      map.on("click", (e) => {
        if (enableOnMapClick) {
          setNewImageLocation(e.latlng);
        }
      })
    })

    return null;
  }

  console.log({ images })

  return (
    <div style={{
      display: "flex",
    }}>
      <MapContainer
        center={center}
        zoom={18}
        scrollWheelZoom={true}
        style={{ minHeight: window.innerHeight, width: "80%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://1.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?app_id=Xf717WLh23vibGrY2VdK&app_code=onhDRdp6818gjOCVn925eg"
        />
        {images.map((image, index) => (
          <DistortableImageOverlay
            mapCenter={center}
            imageUrl={image.url}
            key={index}
            actions={image.actions}
          />
        ))}

        <HandleMapClick />
      </MapContainer>
      <div
        style={{
          width: "19%",
          display: "flex",
          flexDirection: "column",
          marginLeft: "10px",
        }}
      >
        <h3>Adicionar imagem</h3>
        <p>url</p>
        <input type="url" name="url" id="url" />
        <p>name</p>
        <input type="text" name="name" id="name" />
        <p>ações</p>
        <label><input type="checkbox" name="actions[]" value="L.DragAction" /> L.DragAction</label>
        <label><input type="checkbox" name="actions[]" value="L.ScaleAction" /> L.ScaleAction</label>
        <label><input type="checkbox" name="actions[]" value="L.DistortAction" /> L.DistortAction</label>
        <label><input type="checkbox" name="actions[]" value="L.RotateAction" /> L.RotateAction</label>
        <label><input type="checkbox" name="actions[]" value="L.FreeRotateAction" /> L.FreeRotateAction</label>
        <label><input type="checkbox" name="actions[]" value="L.LockAction" /> L.LockAction</label>
        <label><input type="checkbox" name="actions[]" value="L.OpacityAction" /> L.OpacityAction</label>
        <label><input type="checkbox" name="actions[]" value="L.BorderAction" /> L.BorderAction</label>
        <label><input type="checkbox" name="actions[]" value="L.ExportAction" /> L.ExportAction</label>
        <label><input type="checkbox" name="actions[]" value="L.DeleteAction" /> L.DeleteAction</label>
        <label><input type="checkbox" name="actions[]" value="L.RestoreAction" /> L.RestoreAction</label>
        <br />
        {/* <button onClick={() => {
          setEnableOnMapClick((prev) => !prev)
        }}>Selecionar localização da imagem no mapa - {enableOnMapClick ? 'ativo' : 'inativo'}</button>
        {newImageLocation && (
          <small>localização da nova imagem: {newImageLocation.lat}, {newImageLocation.lng}</small>
        )}
        <br /><br /> */}
        <button onClick={addImage}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;
