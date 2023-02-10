import { useEffect, useState } from 'react';
import axios from 'axios';
import SmallPostItem from "../components/SmallPostItem";
import Navbar from '../components/Navbar';
import "../styles/SmallPostItem.scss";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import "../styles/HomePage.scss";

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
    <main>

      <Parallax pages={2.5}>
        <ParallaxLayer>
      <Navbar />
        </ParallaxLayer>
      <ParallaxLayer speed={2.5}>
        <p>Parallax</p>
      </ParallaxLayer>
      <ParallaxLayer speed={0.5} factor={2}>
        <img className='parallax' src="../images/parallax_1.png" />
      </ParallaxLayer>
      <ParallaxLayer speed={1.5} >
        <img className='parallax' src="../images/parallax_3.png" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.5} offset={1}>
      <div className="container">
        <div className="row row-cols-4">
          {postsArray}
        </div>
      </div>
      </ParallaxLayer>
    </Parallax>

    </main>
  );
}