import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import DistortableImageOverlay from "./DistorceableImage";
import { useCallback, useState } from "react";
import L from "leaflet";
import { defaultActions } from "./contants";

function App() {
  const [center, _] = useState([-6.789272, -43.045765]);
  const [images, setImages] = useState(null);
  const [enableOnMapClick, setEnableOnMapClick] = useState(false);
  const [newImageCoorners, setNewImageCoorners] = useState(null);
  const [showActualImageCoorners, setShowActualImageCoorners] = useState(false);

  const addImage = useCallback(() => {
    const url = document.getElementById("url").value;

    if (!url) {
      alert("Preencha os campos de url e nome");
      return;
    }
    const allSelected = document.querySelector(
      "input[name='actions[]-all']:checked"
    );

    const actionsArray = [];

    if (allSelected) {
      actionsArray.push(...defaultActions.map((action) => action.class));
    } else {
      const actions = document.querySelectorAll(
        "input[name='actions[]']:checked"
      );
      actions.forEach((action) => {
        const actionName = action.value;
        const actionClass = defaultActions.find(
          (action) => action.name === actionName
        ).class;
        actionsArray.push(actionClass);
      });
    }

    const image = L.distortableImageOverlay(url, {
      actions: actionsArray,
      corners: [
        newImageCoorners[2],
        newImageCoorners[3],
        newImageCoorners[1],
        newImageCoorners[0],
      ],
    });

    if (images) {
      setImages((prev) => [...prev, image]);
    } else {
      setImages([image]);
    }

    setNewImageCoorners(null);
    setEnableOnMapClick(false);
  }, [images, newImageCoorners]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        if (!newImageCoorners || newImageCoorners.length < 4) {
          setNewImageCoorners((prevCorners) => {
            const updatedCorners = prevCorners ? [...prevCorners] : [];
            updatedCorners.push(e.latlng);

            return updatedCorners;
          });
        }
      },
    });

    return null;
  }

  return (
    <div
      style={{
        display: "flex",
      }}
    >
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
        {images && <DistortableImageOverlay images={images} />}

        {enableOnMapClick && <LocationMarker />}
        {newImageCoorners &&
          newImageCoorners.length > 0 &&
          newImageCoorners.map((nc) => <Marker position={nc}></Marker>)}
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
        <p>ações</p>
        <label>
          <input type="checkbox" name="actions[]-all" value="L.DragAction" />{" "}
          Todos
        </label>
        <label>
          <input type="checkbox" name="actions[]" value="L.DragAction" />{" "}
          L.DragAction
        </label>
        <label>
          <input type="checkbox" name="actions[]" value="L.ScaleAction" />{" "}
          L.ScaleAction
        </label>
        <label>
          <input type="checkbox" name="actions[]" value="L.DistortAction" />{" "}
          L.DistortAction
        </label>
        <label>
          <input type="checkbox" name="actions[]" value="L.RotateAction" />{" "}
          L.RotateAction
        </label>
        <label>
          <input type="checkbox" name="actions[]" value="L.FreeRotateAction" />{" "}
          L.FreeRotateAction
        </label>
        <label>
          <input type="checkbox" name="actions[]" value="L.LockAction" />{" "}
          L.LockAction
        </label>
        <label>
          <input type="checkbox" name="actions[]" value="L.OpacityAction" />{" "}
          L.OpacityAction
        </label>
        <label>
          <input type="checkbox" name="actions[]" value="L.BorderAction" />{" "}
          L.BorderAction
        </label>
        <label>
          <input type="checkbox" name="actions[]" value="L.ExportAction" />{" "}
          L.ExportAction
        </label>
        <label>
          <input type="checkbox" name="actions[]" value="L.DeleteAction" />{" "}
          L.DeleteAction
        </label>
        <label>
          <input type="checkbox" name="actions[]" value="L.RestoreAction" />{" "}
          L.RestoreAction
        </label>
        <br />
        <button
          onClick={() => {
            setEnableOnMapClick((prev) => !prev);
          }}
        >
          Selecione os cantos da imagem -{" "}
          {enableOnMapClick ? "ativo" : "inativo"}
        </button>
        <br />
        <br />

        <hr
          style={{
            width: "100%",
          }}
        />

        {newImageCoorners && (
          <>
            <p>Cantos da imagem:</p>
            {newImageCoorners.map((corner, index) => (
              <div key={index}>
                Canto {index + 1}: {corner.lat}, {corner.lng}
              </div>
            ))}
          </>
        )}

        <button
          onClick={addImage}
          disabled={
            !newImageCoorners ||
            !newImageCoorners.length ||
            newImageCoorners.length < 4
          }
        >
          Adicionar
        </button>

        <hr
          style={{
            width: "100%",
          }}
        />
        <br />
        <button onClick={() => {
          setShowActualImageCoorners(prev => !prev);
        }}>Exibir  novas posições das imagens</button>
        {showActualImageCoorners && <pre>
          <code>{images && JSON.stringify(images.map(image => {
            return {
              url: image._url,
              corners: image.getCorners()
            }
          }), null, 2)}</code>
        </pre>}
      </div>
    </div>
  );
}

export default App;
