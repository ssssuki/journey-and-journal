import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(post_id, user_id) {
  const [state, setState] = useState({
    post: null,
    comment: "",
    like: null,
    posts: {},
    comments: {},
    likes: {},
    isLoading: true,
  });

  useEffect(() => {
    if (post_id === undefined) {
      Promise.all([
        axios.get("http://localhost:8080/api/posts"),
        axios.get("http://localhost:8080/api/comments"),
        axios.get("http://localhost:8080/api/likes"),
      ]).then((all) => {
        setState((prev) => ({
          ...prev,
          posts: all[0].data,
          comments: all[1].data,
          likes: all[2].data,
          isLoading: false,
        }));
      });
    } else {
      Promise.all([
        axios.get(`http://localhost:8080/api/posts/${post_id}`),
        axios.get(`http://localhost:8080/api/comments/${post_id}`),
        axios.get(`http://localhost:8080/api/likes/${user_id}`),
      ]).then((all) => {
        setState((prev) => ({
          ...prev,
          post: all[0].data[0],
          comments: all[1].data,
          like: all[2].data,
          isLoading: false,
        }));
      });
    }
  }, []);

  return {
    state: state,
    setState: setState,
  };
}
