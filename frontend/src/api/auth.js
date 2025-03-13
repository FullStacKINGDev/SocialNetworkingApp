import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/users/";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}login/`, credentials);
    const data = response.data;

    // Store the access token in localStorage for future requests
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);

    return data;
  } catch (error) {
    console.error("Login failed:", error.response ? error.response.data : error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register/`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response ? error.response.data : error);
    throw error;
  }
};
