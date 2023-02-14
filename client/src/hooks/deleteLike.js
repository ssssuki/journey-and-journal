import axios from "axios";

export default function deleteLike(data) {
  return axios
    .put(`http://localhost:8080/api/likes/delete`, { data })
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => console.log(err));
}
