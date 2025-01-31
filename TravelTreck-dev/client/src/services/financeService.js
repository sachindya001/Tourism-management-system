import axios from "axios";

// Base URL for API
const API_URL = "http://localhost:8080/api/finance";

// Get all site payments
export const getAllSitePayments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all payments:", error);
    throw error;
  }
};

// Get a single site payment by ID
export const getSitePaymentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching payment with ID ${id}:`, error);
    throw error;
  }
};

// Create a new site payment
export const createSitePayment = async (paymentData) => {
  try {
    const response = await axios.post(API_URL, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error creating new payment:", error);
    throw error;
  }
};

// Update a site payment by ID
export const updateSitePayment = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating payment with ID ${id}:`, error);
    throw error;
  }
};

// Delete a site payment by ID
export const deleteSitePayment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting payment with ID ${id}:`, error);
    throw error;
  }
};
