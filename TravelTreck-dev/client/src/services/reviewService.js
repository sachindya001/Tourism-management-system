import axios from "axios";

const baseUrl = "http://localhost:8080/api/reviews";

export const getAllReviews = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const getReviewById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching review:", error);
    throw error;
  }
};

export const createReview = async (reviewData) => {
  try {
    const response = await axios.post(baseUrl, reviewData);
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const updateReview = async (id, reviewData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, reviewData);
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
