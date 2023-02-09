import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSearch from "../hooks/useSearch";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  if (!location.state) {
    navigate("/");
  }
  const { state } = useSearch(location.state.lat, location.state.lng);

  const renderedResults = state.posts.map((post) => {
    return (
      <li key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.entry}</p>
        <img src={post.photo_link}></img>
      </li>
    );
  });
  return (
    <div>
      {state.isLoading ? <h1>Loading...</h1> : <ul>{renderedResults}</ul>}
    </div>
  );
}
