import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import "../styles/HomePage.scss";
import SmallPostItem from "../components/SmallPostItem";
import "../styles/SmallPostItem.scss";

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
        <ParallaxLayer
          speed={0.8}
          style={{
            backgroundImage: "url(../images/parallax_1.png)",
            backgroundSize: 'cover',
          }}>
        </ParallaxLayer>
        <ParallaxLayer speed={0.4}
          style={{
            backgroundImage: "url(../images/parallax_3.png)",
            backgroundSize: 'cover',
          }}>
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.5}
          speed={0.1}
          style={{textAlign: 'center'}}>
          <h1>A new adventure awaits</h1>
        </ParallaxLayer>
        <ParallaxLayer
          offset={0}
          sticky={{ start: 0 , end: 0.1 }}>
          <div id="navbar-home-style">
            <Navbar />
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          speed={0.1}
          offset={1}>
          <div className="container">
            <h2>Browse the latest entries from around the world</h2>
            <div className="row row-cols-4">
              {postsArray}
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>

    </main>
  );
}