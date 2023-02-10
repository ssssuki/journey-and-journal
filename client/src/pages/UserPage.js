import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SmallPostItem from '../components/SmallPostItem';


export default function HomePage() {

  const [posts, setUser] = useState([]);
  const userID = useParams().id;

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${userID}`)
      .then(res => {
        console.log(res.data);
        setUser(res.data);
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
      <h1>User Page {userID}</h1>
      {postsArray}
    </div>
  )

}