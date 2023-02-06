import axios from "axios";

export default function createPost(data) {
  return axios
    .put(`api/posts`, { data })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
}
