import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getAllUsers } from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import "./index.scss";

export default function PostsCard({ posts, id }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  return (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        <img
          alt="profile-image"
          className="post-image"
          src={
            allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
        />
        <div>
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
        </div>
      </div>

      <p className="status">{posts.status}</p>

      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />
    </div>
  );
}
