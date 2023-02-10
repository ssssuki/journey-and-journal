import { useState, useEffect } from "react";
import axios from "axios";

export default function createLikes(data) {
  return axios
    .put(`http://localhost:8080/api/likes`, { data })
    .then((res) => {
      window.location.reload() 
    })
    .catch((err) => console.log(err));
}