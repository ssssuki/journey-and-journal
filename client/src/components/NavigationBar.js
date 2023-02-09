import React, { useState } from "react";
import useUser from "../hooks/useUser";
<<<<<<< HEAD:client/src/components/NavigationBar.js
import  Navbar from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/NavigationBar.scss"
// import { useCookies } from "react-cookie";
// import setUser from "../hooks/setUser";

export default function NavigationBar(props) {
  const [search, setSearch] = useState("");
  // const [cookies, setCookie, removeCookie] = useCookies(["session"]);
=======
import "../styles/navbar.scss";
import { useNavigate } from "react-router-dom";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
>>>>>>> e25964be074b9a9fa3b5d8b2ed37af3ac03563ef:client/src/components/Navbar.js

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

<<<<<<< HEAD:client/src/components/NavigationBar.js
  return (
    <>
      <Navbar bg="light" expand="lg" variant="dark">
        <Container>
      <img
        alt="logo">
      </img>
      <form onSubmit={(event) => event.preventDefault()}>
=======
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
            className="search-suggestion"
            key={place_id}
            onClick={handleSelect(suggestion)}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });

    return (
      <div ref={ref}>
>>>>>>> e25964be074b9a9fa3b5d8b2ed37af3ac03563ef:client/src/components/Navbar.js
        <input
          className="search-bar"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search by Location!"
        />
<<<<<<< HEAD:client/src/components/NavigationBar.js
      </form>
      <button onClick={() => handleSearch(search)}>Go!</button>
      {!cookies.session ? (
        <>
          <button onClick={() => login(2)}>Login As Bob</button>
          <button onClick={() => login(3)}>Login As Jessie</button>
        </>
      ) : (
        <>
          <span>Logged in as {cookies.session.username}</span>
          <button onClick={() => logout()}>Logout</button>
        </>
      )}
      </Container>
      </Navbar>
    </>
=======
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div>
    );
  };

  return (
    <div className="nav-bar">
      <div className="nav-bar-item">
        <h1 onClick={() => navigate("/")}>Logo</h1>
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
            <span>Logged in as {cookies.session.username}</span>
            <button className="btn btn-secondary" onClick={() => logout()}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
>>>>>>> e25964be074b9a9fa3b5d8b2ed37af3ac03563ef:client/src/components/Navbar.js
  );
}
