import React from "react";
import useApplicationData from "../hooks/useApplicationData";


export default function Posts(props){

  const {
    state
  } = useApplicationData();

  if (state.isLoading) {
    return (
      <div className="App">Loading...</div>
    );
  }

  const postList= state.posts.map((post) => {
    return (
      // <ul>
      // <li>{post.user_id} </li>
      // <li>{post.title} </li>
      // <li>{post.entry} </li>
      // <li>{post.rating} </li>     
      // <li>{post.latitude} </li>
      // <li>{post.longitude} </li>
      // <li>{post.locality} </li>
      // </ul>

    <div className="photos">
      <img src={post.photo_link} height="200"/>
    </div> 
    )

  })

  return(
    <main className="posts">
      <section>
        {postList}
      </section>
    </main>
  )
}