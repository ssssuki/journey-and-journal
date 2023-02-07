import React, { useState } from "react";

export default function Navbar(props) {
  const [search, setSearch] = useState("");

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
      <button onClick={() => handleSearch(search)}></button>
      {props.session ? (
        <button onClick={() => console.log("Logout Button")}>Log Out</button>
      ) : (
        <button onClick={() => console.log("Login Button")}>Log In</button>
      )}
    </div>
  );
}
