import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export default function PostsCard({ posts, id }) {
  let navigate = useNavigate();
  return (
    <div className="posts-card" key={id}>
      <p
        className="name"
        onClick={() =>
          navigate("/profile", {
            state: { id: posts?.userID, email: posts.userEmail },
          })
        }
      >
        {posts.userName}
      </p>
      <p className="timestamp">{posts.timeStamp}</p>
      <p className="status">{posts.status}</p>
    </div>
  );
}
