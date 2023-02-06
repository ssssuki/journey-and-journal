import axios from "axios";

export default function createPost(data) {
  return axios
    .put(`${process.env.REACT_APP_SERVER_API_KEY}api/posts`, { data })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
}
