import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/posts/";

export const getPosts = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createPost = async (content, token) => {
  console.log("Token being sent:", token);
  console.log("Post content:", content);

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/posts/",
      { content },
      {
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json" 
        },
      }
    );
    console.log("Post created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error.response ? error.response.data : error.message);
    throw error;
  }
};



export const likePost = async (postId, token) => {
  console.log("Token being sent:", token);
  console.log("Liking post ID:", postId);

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/posts/like/",
      { post: postId },
      {
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json" 
        },
      }
    );
    console.log("Post liked successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error liking post:", error.response ? error.response.data : error.message);
    throw error;
  }
};

