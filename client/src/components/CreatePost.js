import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  // Marker,
  // InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

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
    latitude: null,
    longitude: null,
    address: "",
    picture_url: "",
    entry: "",
  });

  const PlacesAutocomplete = () => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {},
      debounce: 300,
    });

    const ref = useOnclickOutside(() => {
      clearSuggestions();
    });

    const handleInput = (e) => {
      setValue(e.target.value);
    };

    const handleSelect =
      ({ description }) =>
      () => {
        setValue(description, false);
        clearSuggestions();

        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          // console.log("📍 Coordinates: ", { lat, lng });
          // console.log(description);
          setState({
            ...state,
            latitude: lat,
            longitude: lng,
            address: description,
          });
        });
      };

    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li key={place_id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });

    return (
      <div ref={ref}>
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Where did you go?"
        />
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div>
    );
  };

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
      <PlacesAutocomplete />
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={10}
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
