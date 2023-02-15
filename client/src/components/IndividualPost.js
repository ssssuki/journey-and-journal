import React, { useState, useCallback } from "react";
import useApplicationData from "../hooks/useApplicationData";
import useUser from "../hooks/useUser";
import { useParams, useNavigate } from "react-router-dom";
import createComment from "../hooks/createComments";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";
import createLikes from "../hooks/CreateLikes";
import deleteLike from "../hooks/deleteLike";
import {
  BorderBottomOutlined,
  BorderTopOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import { Button, Divider, notification, Space } from "antd";
import axios from "axios";

const containerStyle = {
  width: "350px",
  height: "350px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function IndividualPost() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: "New comment created!",
      placement,
    });
  };

  const navigate = useNavigate();

  let { id } = useParams();
  const { state, setState } = useApplicationData(id);
  const { cookies } = useUser();

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

  const commentList = state.comments.map((comment) => {
    return (
      <p key={comment.id}>
        <div id="commenter"><FontAwesomeIcon icon={faUser} id="user" /> {comment.username}</div>
        <div>{comment.content}</div>
      </p>
    );
  });

  const likesList = state.likes.map((like) => {
    return <p key={like.id}>Likes: Liked By User: {like.user_id}</p>;
  });

  function submitComment() {
    const comment = {
      user_id: cookies.session.id,
      post_id: state.post.id,
      content: state.comment,
    };
    createComment(comment);
  }

  function LikePost() {
    const like = {
      user_id: cookies.session.id,
      post_id: state.post.id,
    };
    if (
      state.likes.find(
        (l) => l.user_id == cookies.session.id && l.post_id == state.post.id
      )
    ) {
      console.log("alright liked: now removing like");
      deleteLike(like);
    } else {
      console.log("not liked yet, now liking");
      createLikes(like);
    }
  }

  function NotifiedComment() {
    submitComment();
    openNotification("topLeft");
    axios.get(`http://localhost:8080/api/comments/${id}`).then((res) => {
      setState({ ...state, comments: res.data, comment: "" });
    });
  }

  const handleClick = () => {
    if (state.isClicked) {
      setState({ ...state, likeCount: state.likeCount - 1 });
    } else {
      setState({ ...state, likeCount: state.likeCount + 1 });
    }
    setState({ ...state, isClicked: !state.isClicked });
  };

  const starArray = () => {
    let starsArray = [];
    for (let i = 0; i < state.post.rating; i++) {
      starsArray.push(<FontAwesomeIcon icon={faStar} />);
    }
    return starsArray;
  };

  const renderStarArray = starArray().map((star) => {
    return star;
  });


  return (
    <section>
      <div className="container" id="left">
        <div className="individualPost">
          <div className="photos">
            <img src={state.post.photo_link} height="200" />
          </div>
          <div className="title">
            <h2>{state.post.title}</h2>
          </div>
          <div className="userid">
            {" "}
            <span onClick={() => navigate(`/user/${state.post.user_id}`)}>
              <FontAwesomeIcon icon={faUser} id="user" />
              {state.post.username}
            </span>
          </div>
          <div className="post-content-container">
            <div className="rating">{renderStarArray}</div>
            <div className="postcontent">{state.post.entry}</div>
            {/* <div className="likes"> {likesList}</div> */}
          </div>
        </div>
      </div>
      <div className="container" id="right">
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
            <MarkerF
              position={{
                lat: Number(state.post.latitude),
                lng: Number(state.post.longitude),
              }}
            />
          </GoogleMap>
        ) : (
          <></>
        )}
        <div className="weather">
          The current weather condition in {state.post.address} is
          <span> {state.weather.conditions} </span>
          with a temperature of
          <span> {state.weather.temp}°F </span>
          .
        </div>
        <div className="comment-section"></div>
        <h4>Comments</h4>
        {cookies.session ? (
          <>
            <form>
              <textarea
                name="comment"
                className="comment-box"
                type="text"
                placeholder="Leave a comment"
                value={state.comment}
                onChange={(event) =>
                  setState({ ...state, comment: event.target.value })
                }
              />
            </form>
            <div className="comment-button">
              <Space>
                <Button
                  type="primary"
                  icon={<RadiusBottomrightOutlined />}
                  onClick={() => NotifiedComment()}
                >
                  Comment
                </Button>
              </Space>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="comments">
          {commentList}
        </div>
        {cookies.session ? (
          <>
            <button onClick={() => LikePost()}>like</button>

            <button className={`like-button`} onClick={handleClick}>
              <span className="likes-counter">{`LikeCount | ${state.likeCount}`}</span>
            </button>
          </>
        ) : (
          <>
            <h4>Likes: {state.likeCount}</h4>
          </>
        )}
        <div>{contextHolder}</div>
      </div>
    </section>
  );
}