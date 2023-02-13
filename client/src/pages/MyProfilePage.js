import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "../hooks/useUser";
import SmallPostItem from "../components/SmallPostItem";
import Navbar from "../components/Navbar";
import "../styles/SmallPostItem.scss";
import "../styles/UserPage.scss"

export default function MyProfilePage() {
  const { cookies } = useUser();
  const [state, setState] = useState({
    ownPosts: [],
    likedPosts: [],
    showing: "own",
    user: cookies.session,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.session) {
      navigate("/");
    }
    Promise.all([
      axios.get(`http://localhost:8080/api/users/${cookies.session.id}`),
      axios.get(
        `http://localhost:8080/api/likes/by-user/${cookies.session.id}`
      ),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        ownPosts: all[0].data,
        likedPosts: all[1].data,
      }));
    });
  }, []);

  useEffect(() => {
    if (!cookies.session) {
      navigate("/");
    }
  }, [cookies.session]);

  const ownPostsArray = state.ownPosts.map((post) => {
    return (
      <SmallPostItem
        key={post.id}
        id={post.id}
        title={post.title}
        photo={post.photo_link}
        address={post.address}
      />
    );
  });

  const likedPostsArray = state.likedPosts.map((post) => {
    return (
      <SmallPostItem
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
      <h1>My User Page</h1>
      <h3
        onClick={() => {
          setState((prev) => ({ ...prev, showing: "own" }));
        }}>
        My Posts
      </h3>
      <h3
        onClick={() => {
          setState((prev) => ({ ...prev, showing: "liked" }));
        }}>
        Liked Posts
      </h3>
      <div className="container">
        <div className="row row-cols-4">
          {state.showing === "own" && ownPostsArray}
          {state.showing === "liked" && likedPostsArray}
        </div>
      </div>
    </div>
  );
}
