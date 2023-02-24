import React, { useMemo, useState } from "react";
import { likePost, getLikesByUser } from "../../../api/FirestoreAPI";
import "./index.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function LikeButton({ userId, postId }) {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    likePost(userId, postId, liked);
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
  }, [userId, postId]);
  return (
    <div className="like-container" onClick={handleLike}>
      <p>{likesCount} People Like this Post</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="likes-inner">
        {liked ? (
          <AiFillHeart size={30} color="#0a66c2" />
        ) : (
          <AiOutlineHeart size={30} />
        )}

        <p className={liked ? "blue" : "black"}>Like</p>
      </div>
    </div>
  );
}
