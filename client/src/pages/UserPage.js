import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SmallPostItem from '../components/SmallPostItem';
import "../styles/UserPage.scss";
import Navbar from "../components/Navbar";


export default function UserPage() {

  const [userData, setUserData] = useState({
    posts: [],
    username: null
  });
  const userID = useParams().id;

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8080/api/users/${userID}`),
      axios.get(`http://localhost:8080/api/users/username/${userID}`),
    ]).then((all) => {
      console.log(all);
      setUserData((prev) => ({
        ...prev,
        posts: all[0].data,
        username: all[1].data[0].username
      }));
    });
  }, []);

  const postsArray = userData.posts.map(post => {
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
      <Navbar />
      <h3 className="title">{userData.username}'s journal</h3>
      <div className="container">
        <div className="row row-cols-4">
          {postsArray}
        </div>
      </div>

    </div>
  );

}