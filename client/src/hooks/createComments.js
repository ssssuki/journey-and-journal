import { useState, useEffect } from "react";
import axios from "axios";

export default function createComment(data) {
  return axios
    .put(`http://localhost:8080/api/comments`, { data })
    .then((res) => {
    })
    .catch((err) => console.log(err));
}