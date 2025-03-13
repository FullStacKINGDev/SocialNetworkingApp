import React from "react";

const Post = ({ post }) => {
  return (
    <div className="post-card">
      <h3>{post.user.username}</h3>
      <p>{post.content}</p>
      <div className="post-actions">
        <button className="button">❤️ Like</button>
        <button className="button">💬 Comment</button>
      </div>
    </div>
  );
};

export default Post;
