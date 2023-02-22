import React from "react";
import "./index.scss";

export default function PostsCard({ posts, id }) {
  return (
    <div className="posts-card" key={id}>
      <p className="name">{posts.userName}</p>
      <p className="timestamp">{posts.timeStamp}</p>
      <p className="status">{posts.status}</p>
    </div>
  );
}
