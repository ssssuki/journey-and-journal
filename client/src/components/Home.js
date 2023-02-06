import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home () {

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
    )
  });


  return(
    <div>I am home component
    </div>
  )
}