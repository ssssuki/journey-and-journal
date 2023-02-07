import React, { useState } from "react";
import useUser from "../hooks/useUser";
import "../styles/navbar.scss";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const [search, setSearch] = useState("");

  const { login, logout, cookies } = useUser();

  const navigate = useNavigate();

  const handleSearch = (search) => {
    console.log(search);
  };
  return (
    <div className="nav-bar">
      <div className="nav-bar-item">
        <h1 onClick={() => navigate("/")}>Logo</h1>
      </div>
      <div className="nav-bar-item">
        <form
          classname="search-bar"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            name="search-query"
            type="text"
            placeholder="Search by Location!"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </form>
        <button
          className="btn btn-primary"
          onClick={() => handleSearch(search)}
        >
          Go!
        </button>
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
  );
}
