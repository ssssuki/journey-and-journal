import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import SmallPostItem from "../components/SmallPostItem";
import "../styles/SmallPostItem.scss";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
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
    <div>
      {state.isLoading ? <h1>Loading...</h1> : <div>{renderedResults}</div>}
    </div>
  );
}
