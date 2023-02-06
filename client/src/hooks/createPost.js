import { useState, useEffect } from "react";
import axios from "axios";

export default function createPost(data) {
  return axios
    .put(`http://localhost:8080/api/posts`, { data })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
}
