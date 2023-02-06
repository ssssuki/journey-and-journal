import  { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(props) {

  const [state, setState] = useState({
    posts: {},
    isLoading: true
  });

  useEffect(() =>{
    axios.get("http://localhost:8080/api/posts").then((res) => {
      setState((prev) => ({
        ...prev,
        posts: res.data,
        isLoading: false
      }))
    })
  }, [setState])

  

  return {
    state: state
  }
}