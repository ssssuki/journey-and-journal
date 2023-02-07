import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function Navbar(props) {
  const [search, setSearch] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);

  const handleSearch = (search) => {
    console.log(search);
  };

  const login = () => {
    setCookie("session", 1);
    console.log(cookies.session);
  };

  const logout = () => {
    removeCookie("session");
    console.log(cookies.session);
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
      {!cookies.session ? (
        <button onClick={() => login()}>Login</button>
      ) : (
        <button onClick={() => logout()}>Logout</button>
      )}
    </div>
  );
}
