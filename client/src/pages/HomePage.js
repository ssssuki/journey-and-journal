import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from "../components/Home";

export default function HomePage() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_API_KEY)
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      });
  }, []);

  const postsArray = posts.map(post => {
    return (
      < Home
        key={post.id}
        id={post.id}
        title={post.title}
        photo={post.photo_link}
        address={post.address}
      />
    );
  });

  return <h1>"I am home page!"
    <div>
      {postsArray}
    </div>
  </h1>;
}