import React from "react";
import { useLocation } from "react-router-dom";
import useSearch from "../hooks/useSearch";

export default function SearchResults(props) {
  const location = useLocation();
  const { state } = useSearch(location.state.lat, location.state.lng);

  const renderedResults = state.posts.map((post) => {
    return (
      <li>
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
