import React, { useState } from "react";
import useUser from "../hooks/useUser";
import "../styles/navbar.scss";
import { useNavigate, Link } from "react-router-dom";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

export default function Navbar() {
  const { login, logout, cookies } = useUser();

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
          navigate("/search", { state: { lat, lng } });
        });
      };

    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li
            className="search-suggestions-items"
            style={{ zIndex: 2 }}
            key={place_id}
            onClick={handleSelect(suggestion)}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });

    return (
      <div ref={ref}>
        <input
          className="search-bar"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search by Location!"
        />
        {status === "OK" && (
          <ul className="search-suggestions">{renderSuggestions()}</ul>
        )}
      </div>
    );
  };

  return (
    <div className="nav-bar">
      <div className="nav-bar-item">
        <img
          onClick={() => navigate("/")}
          alt="logo"
          src="../images/jnj-logo.png"
        ></img>
      </div>
      <div className="nav-bar-item">
        <PlacesAutocomplete />
      </div>
      <div className="nav-bar-item">
        {!cookies.session ? (
          <>
            <button className="btn btn-secondary" onClick={() => login(2)}>
              Login As Bob
            </button>
            <button className="btn btn-secondary" onClick={() => login(3)}>
              Login As Jessie
            </button>
          </>
        ) : (
          <>
            <span className="welcome-msg">
              Logged in as {cookies.session.username}
            </span>
            <button className="btn btn-secondary">
              <Link to={`/create`}>+</Link>
            </button>
            <button className="btn btn-secondary" onClick={() => logout()}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
