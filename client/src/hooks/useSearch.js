import axios from "axios";
import { useState, useEffect, useNavigate } from "react";

export default function useSearch(lat, lng) {
  const [state, setState] = useState({
    posts: [],
    isLoading: true,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/searches/lat=${lat}&lng=${lng}`)
      .then((res) => {
        setState((prev) => ({ ...prev, posts: res.data, isLoading: false }));
      });
  }, []);

  return { state: state };
}
