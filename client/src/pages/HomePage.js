import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from "../components/Home";

export default function HomePage() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/')
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      });
  }, []);

  const postsArray = posts.map(post => {
    return (
      < Home
        key={post.id}
        title={post.title}
        photo={post.photo_link}
        locality={post.locality}
      />
    );
  });

  return <h1>"I am home page!"
    <ul>
      {postsArray}
    </ul>
  </h1>;
}