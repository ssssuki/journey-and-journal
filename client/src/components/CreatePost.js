import React, { useState } from "react";

export default function CreatePost() {
  const [state, setState] = useState({
    title: "",
    address: "",
    picture_url: "",
    entry: "",
  });
  function submitPost() {
    console.log(state);
  }
  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={state.title}
          onChange={(event) =>
            setState({ ...state, title: event.target.value })
          }
        />
        <input
          name="address"
          type="text"
          placeholder="Address"
          value={state.address}
          onChange={(event) =>
            setState({ ...state, address: event.target.value })
          }
        />
        <input
          name="picture_url"
          type="text"
          placeholder="Picture"
          value={state.picture_url}
          onChange={(event) =>
            setState({ ...state, picture_url: event.target.value })
          }
        />
        <input
          name="entry"
          type="text"
          placeholder="Journal Entry"
          value={state.entry}
          onChange={(event) =>
            setState({ ...state, entry: event.target.value })
          }
        />
      </form>
      <button onClick={() => submitPost()}>Post</button>
    </div>
  );
}
