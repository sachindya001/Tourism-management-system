import axios from "axios";

// Set up the base URL for Axios (optional, depending on your API setup)
const API_URL = "http://localhost:8080/api/users";

// Service to handle user-related API requests
const userService = {
  // Create a new user
  createUser: async (userData) => {
    try {
      const response = await axios.post(API_URL, userData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Get all users
  getUsers: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Get a user by ID
  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Update a user by ID
  updateUser: async (userId, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${userId}`, updatedData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Delete a user by ID
  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  loginUser: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// Error handling function
const handleError = (error) => {
  if (error.response) {
    // The request was made, but the server responded with a status code
    // that falls out of the range of 2xx
    console.error("Server responded with an error:", error.response.data);
    throw new Error(error.response.data.message || "Server Error");
  } else if (error.request) {
    // The request was made, but no response was received
    console.error("No response received:", error.request);
    throw new Error("Network error or no response from server.");
  } else {
    // Something happened in setting up the request that triggered an error
    console.error("Error in request setup:", error.message);
    throw new Error(error.message || "An unknown error occurred.");
  }
};

export default userService;
