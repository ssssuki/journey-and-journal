import  { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(post_id) {

  const [state, setState] = useState({
    post:null,
    comment: null,
    posts: {},
    comments:{},
    isLoading:true
  });

  useEffect(() => {
    if(post_id === undefined){
      Promise.all([
        axios.get("http://localhost:8080/api/posts"),
        axios.get("http://localhost:8080/api/comments"),
      ]).then((all) => {
        setState((prev) => ({
          ...prev,
          posts: all[0].data,
          comments: all[1].data,
          isLoading: false
        }));
      });
    }else{
      Promise.all([
        axios.get(`http://localhost:8080/api/posts/${post_id}`),
        axios.get(`http://localhost:8080/api/comments/${post_id}`),
      ]).then((all) => {
        setState((prev) => ({
          ...prev,
          post: all[0].data[0],
          comments: all[1].data,
          isLoading: false
        }));
      });
    }
  }, []);
  

  return {
    state: state,
    setState: setState
  }
}