import React, { useState } from "react";
import useApplicationData from "../hooks/useApplicationData";
import { useParams } from "react-router-dom";
import createComment from "../hooks/createComments";

export default function IndividualPost(props) {
  let { id } = useParams();
  const { state, setState } = useApplicationData(id);

  if (state.isLoading) {
    return <div className="App">Loading...</div>;
  }

  const commentList = state.comments
    .filter((comment) => comment.post_id === state.post.id)
    .map((comment) => {
      return (
        <p>
          Comment: {comment.content} By User: {comment.user_id}
        </p>
      );
    });

  function submitComment() {
    const comment = {
      user_id: 1,
      post_id: state.post.id,
      content: state.comment,
    };
    createComment(comment);
  }

    return (
      <section>
        <div className="individualPost">
          <div className="photos">
            <img src={state.post.photo_link} height="200" />
          </div>
          <div className="userid">UserID: {state.post.user_id}</div>
          <div className="postcontent">
            Title: {state.post.title} Entry: {state.post.entry}
          </div>
          <div className="rating">Rating: {state.post.rating}</div>
          <div className="location">
            Latitude: {state.post.latitude} Longitude: {state.post.longitude}
          </div>
          <div className="localty">Locality: {state.post.locality}</div>
        </div>
        <div className="comment">{commentList}</div>
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            name="comment"
            type="text"
            placeholder="Enter your comments!"
            value={state.comment}
            onChange={(event) =>
              setState({ ...state, comment: event.target.value })
            }
          />
        </form>
        <button onClick={() => submitComment()}>Comment</button>
      </section>
    );
}
