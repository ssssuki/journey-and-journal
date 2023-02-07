import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/user/1`)
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      });
  }, []);

  return (
    <h1>I am user Page</h1>
  )

}