import { useEffect, useState } from 'react';
import axios from 'axios';
import useUser from "../hooks/useUser"
import SmallPostItem from '../components/SmallPostItem';


export default function HomePage() {

  const [posts, setPosts] = useState([]);
  const { cookies } = useUser();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${cookies.session.id}`)
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      });
  }, []);

  const postsArray = posts.map(post => {
    return (
      < SmallPostItem
        key={post.id}
        id={post.id}
        title={post.title}
        photo={post.photo_link}
        address={post.address}
      />
    );
  });

  return (
    <div>
      <h1>My user Page</h1>
      {postsArray}
    </div>
    )

}