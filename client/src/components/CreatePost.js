import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const containerStyle = {
  width: "33vw",
  height: "33vh",
};
const center = {
  lat: 43.653225,
  lng: -79.383186,
};

export default function CreatePost() {
  const [state, setState] = useState({
    title: "",
    address: "",
    picture_url: "",
    entry: "",
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  function submitPost() {
    console.log(state);
  }

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={0}
          center={center}
          onLoad={onLoad}
          onUnmount={onUnmount}
        ></GoogleMap>
      ) : (
        <></>
      )}
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={state.title}
          onChange={(event) =>
            setState({ ...state, title: event.target.value })
          }
        />
        <input
          name="picture_url"
          type="text"
          placeholder="Picture"
          value={state.picture_url}
          onChange={(event) =>
            setState({ ...state, picture_url: event.target.value })
          }
        />
        <input
          name="entry"
          type="text"
          placeholder="Journal Entry"
          value={state.entry}
          onChange={(event) =>
            setState({ ...state, entry: event.target.value })
          }
        />
      </form>
      <button onClick={() => submitPost()}>Post</button>
    </div>
  );
}
