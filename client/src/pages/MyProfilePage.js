import { useEffect, useState } from 'react';
import axios from 'axios';
import useUser from "../hooks/useUser"


export default function HomePage() {

  const [user, setUser] = useState([]);
  const { cookies } = useUser();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${cookies.session.id}`)
      .then(res => {
        console.log(res.data);
        setUser(res.data);
      });
  }, []);

  return (
    <h1>My user Page</h1>
  )

}