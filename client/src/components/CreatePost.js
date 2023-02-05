import React from "react";

export default function CreatePost() {
  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <input name="title" type="text" placeholder="Title" />
        <input name="address" type="text" placeholder="Address" />
        <input name="picture_url" type="test" placeholder="Picture" />
        <input name="entry" type="text" placeholder="Journal Entry" />
        <></>
      </form>
      <button onClick={console.log("submit")}>Submit</button>
    </div>
  );
}
