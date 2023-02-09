import React, { useState, useCallback } from "react";
import "../styles/createPost.scss";
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
import { useNavigate } from "react-router-dom";
import useOnclickOutside from "react-cool-onclickoutside";
import createPost from "../hooks/createPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
    rating: 0,
  });

  const navigate = useNavigate();

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
    map.setZoom(13);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  function submitPost() {
    const data = {
      user_id: 1,
      title: state.title,
      entry: state.entry,
      rating: 4,
      photo_link: state.picture_url,
      latitude: state.latitude,
      longitude: state.longitude,
      address: state.address,
    };

    createPost(data);
    navigate("/");
  }

  return (
    <div>
      <PlacesAutocomplete />
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            state.longitude && state.latitude
              ? { lat: state.latitude, lng: state.longitude }
              : center
          }
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* {state.longitude && state.latitude ? (
            <Marker lat={state.latitude} lng={state.longitude} />
          ) : (
            <></>
          )} */}
        </GoogleMap>
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
      <h3>
        <span style={state.rating >= 1 ? { color: "gold" } : {}}>
          <FontAwesomeIcon
            icon={faStar}
            onClick={() => {
              setState({ ...state, rating: 1 });
            }}
          />
        </span>
        <span style={state.rating >= 2 ? { color: "gold" } : {}}>
          <FontAwesomeIcon
            icon={faStar}
            onClick={() => {
              setState({ ...state, rating: 2 });
            }}
          />
        </span>
        <span style={state.rating >= 3 ? { color: "gold" } : {}}>
          <FontAwesomeIcon
            icon={faStar}
            onClick={() => {
              setState({ ...state, rating: 3 });
            }}
          />
        </span>
        <span style={state.rating >= 4 ? { color: "gold" } : {}}>
          <FontAwesomeIcon
            icon={faStar}
            onClick={() => {
              setState({ ...state, rating: 4 });
            }}
          />
        </span>
        <span style={state.rating >= 5 ? { color: "gold" } : {}}>
          <FontAwesomeIcon
            icon={faStar}
            onClick={() => {
              setState({ ...state, rating: 5 });
            }}
          />
        </span>
      </h3>
      <button onClick={() => submitPost()}>Post</button>
    </div>
  );
}
