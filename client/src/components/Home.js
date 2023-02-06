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


  return(
    <div>I am home component
      {posts.map(post => <li>{ post.id } { post.photo_link } {post.locality} {post.title}</li>)}
    </div>
  )
}