import React, { useState } from "react";
import useUser from "../hooks/useUser";
// import { useCookies } from "react-cookie";
// import setUser from "../hooks/setUser";

export default function Navbar(props) {
  const [search, setSearch] = useState("");
  // const [cookies, setCookie, removeCookie] = useCookies(["session"]);

  const { login, logout, cookies } = useUser();

  const handleSearch = (search) => {
    console.log(search);
  };

  // const login = (id) => {
  //   const user = setUser(id).then(() => {
  //     setCookie("session", user);
  //     console.log(cookies.session);
  //   });
  // };

  // const logout = () => {
  //   removeCookie("session");
  //   console.log(cookies.session);
  // };

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
    </div>
  );
}
