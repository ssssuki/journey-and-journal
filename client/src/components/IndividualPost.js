import React, { useState, useCallback } from "react";
import useApplicationData from "../hooks/useApplicationData";
import { useParams } from "react-router-dom";
import createComment from "../hooks/createComments";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import createLikes from "../hooks/CreateLikes"; 

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function IndividualPost(props) {
  let { id } = useParams();

  const { state, setState } = useApplicationData(id, 1);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    map.setZoom(13);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

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

    const likesList = state.likes.filter((like) => like.user_id === 1)
    .map((user) => {
      return (
        <p>
          Likes: Liked By User: {state.like.user_id}
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

  function LikePost(){
    const like = {
      user_id: 1,
      post_id: state.post.id
    }
    console.log(like)
    createLikes(like);
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
        <div className="likes"> {likesList}</div>

      </div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            state.post.longitude && state.post.latitude
              ? {
                  lat: Number(state.post.latitude),
                  lng: Number(state.post.longitude),
                }
              : center
          }
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
            <MarkerF position={
              {
                  lat: Number(state.post.latitude),
                  lng: Number(state.post.longitude),
                }
          }
               />
        </GoogleMap>
      ) : (
        <></>
      )}
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
      <button onClick={() => submitComment()}>comment</button>
      <button onClick={() => LikePost()}>like</button>
    </section>
  );
}
