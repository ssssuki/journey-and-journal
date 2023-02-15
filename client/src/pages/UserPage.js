import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SmallPostItem from '../components/SmallPostItem';
import "../styles/UserPage.scss";
import Navbar from "../components/Navbar"


export default function UserPage() {

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
      <Navbar />
      <h3 className="title">UserID {userID}'s journal</h3>
      <div className="container">
        <div className="row row-cols-4">
          {postsArray}
        </div>
      </div>

    </div>
  );

}