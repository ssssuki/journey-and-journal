import { useState, useEffect } from "react";
import axios from "axios";
import useUser from "./useUser";

export default function useApplicationData(post_id) {
  const { cookies } = useUser();

  const [state, setState] = useState({
    user_id: cookies.session.id,
    post: null,
    comment: null,
    like: null,
    likeCount: 0,
    posts: {},
    comments: {},
    likes: {},
    isLoading: true,
    isClicked: false,
    weather: {},
  });

  useEffect(() => {
    if (post_id === undefined) {
      Promise.all([
        axios.get("http://localhost:8080/api/posts"),
        axios.get("http://localhost:8080/api/comments"),
      ]).then((all) => {
        setState((prev) => ({
          ...prev,
          posts: all[0].data,
          comments: all[1].data,
          isLoading: false,
        }));
      });
    } else {
      Promise.all([
        axios.get(`http://localhost:8080/api/posts/${post_id}`),
        axios.get(`http://localhost:8080/api/comments/${post_id}`),
        axios.get(`http://localhost:8080/api/likes/${post_id}`),
      ]).then((all) => {
        setState((prev) => ({
          ...prev,
          post: all[0].data[0],
          comments: all[1].data,
          likes: all[2].data,
          likeCount: all[2].data.length,
          // isLoading: false,
        }));
        axios
          .get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${all[0].data[0].latitude},${all[0].data[0].longitude}?key=GJE8V8B2YP8EY88S5C34HNVL8`
          )
          .then((res) => {
            setState((prev) => ({
              ...prev,
              isLoading: false,
              weather: {
                conditions: res.data.currentConditions.conditions,
                temp: res.data.currentConditions.temp,
              },
            }));
          });
      });
    }
  }, []);

  return {
    state: state,
    setState: setState,
  };
}
