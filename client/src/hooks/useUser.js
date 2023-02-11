import axios from "axios";
import { useCookies } from "react-cookie";

export default function useUser() {
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);

  function login(id) {
    axios.get(`http://localhost:8080/api/users/${id}`).then((res) => {
      // setCookie("session", res.data[0], { path : '/' });
      const { id, username, role } = res.data[0];
      setCookie("session", { id, username, role });
    });
  }

  function logout() {
    removeCookie("session");
  }

  return { login, logout, cookies };
}