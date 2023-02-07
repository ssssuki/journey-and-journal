import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [search, setSearch] = useState("");
  const handleSearch = (search) => {
    console.log(search);
  };

  return (
    <div>
      <h1>Logo</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          name="search-query"
          type="text"
          placeholder="Search by Location!"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </form>
      <button onClick={() => handleSearch(search)}>Go!</button>
      <button>
        Login
        <Link to="/login" />
      </button>
      <button>
        Logout
        <Link to="logout" />
      </button>
    </div>
  );
}
