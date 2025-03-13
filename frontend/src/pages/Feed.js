import { useState, useEffect, useContext } from "react";
import { getPosts, createPost, likePost } from "../api/posts";
import { AuthContext } from "../context/AuthContext";


const Feed = () => {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    if (token) {
      getPosts(token).then(setPosts).catch(console.error);
    }
  }, [token]);

  const handleCreatePost = async () => {
    const post = await createPost(newPost, token);
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = async (postId) => {
    await likePost(postId, token);
  };

  return (
    <div>
      <h2>Feed</h2>
      <div>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={handleCreatePost}>Post</button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>{post.content}</p>
            <button onClick={() => handleLike(post.id)}>Like</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
