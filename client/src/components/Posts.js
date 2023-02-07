import React from "react";
import useApplicationData from "../hooks/useApplicationData";

export default function Posts(props) {
  const { state } = useApplicationData();

  if (state.isLoading) {
    return <div className="App">Loading...</div>;
  }

  const postList = state.posts.map((post) => {
    const commentList = state.comments.filter((comment) => comment.post_id === post.id).map((comment) => {
      return (
        <p>Comment: {comment.content} User: {comment.user_id}</p>
      );
    });
    return (
      <section className="posts">
        <div className="photos">
          <img src={post.photo_link} height="200" />
        </div>
        <div className="userid">UserID: {post.user_id}</div>
        <div className="postcontent">
          Title: {post.title} Entry: {post.entry}
        </div>
        <div className="rating">Rating: {post.rating}</div>
        <div className="location">
          Latitude: {post.latitude} Longitude: {post.longitude}
        </div>
        <div className="localty">Locality: {post.locality}</div>
        <div className="comment">
          {commentList}
        </div>
      </section>
    );
  });

  return (
    <main className="posts">
      {postList}
    </main>
  );
}
