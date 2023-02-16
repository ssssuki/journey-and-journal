import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import SmallPostItem from "../components/SmallPostItem";
import "../styles/SmallPostItem.scss";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  if (!location.state) {
    navigate("/");
  }

  const { state } = useSearch(location.state.lat, location.state.lng);

  const renderedResults = state.posts.map((post) => {
    return (
      <SmallPostItem
        key={post.id}
        id={post.id}
        title={post.title}
        photo={post.photo_link}
        address={post.address}
      />
    );
  });
  return (
    <div className="search-results">
      {state.isLoading ? <h3>Loading...</h3> : 
      <div className="container">
        <h3 className="title">Search results</h3>
      <div className="row row-cols-4">
        {renderedResults}
      </div>
      </div>
      }
    </div>
  );
}
