import axios from "axios";

const API_URL = "http://localhost:8080/api/destinations";

// Get all destinations
export const getAllDestinations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw error;
  }
};

// Get a specific destination by ID
export const getDestinationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching destination with id ${id}:`, error);
    throw error;
  }
};

// Create a new destination
export const createDestination = async (destinationData) => {
  try {
    const response = await axios.post(API_URL, destinationData);
    return response.data;
  } catch (error) {
    console.error("Error creating destination:", error);
    throw error;
  }
};

// Update a destination by ID
export const updateDestination = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating destination with id ${id}:`, error);
    throw error;
  }
};

// Delete a destination by ID
export const deleteDestination = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting destination with id ${id}:`, error);
    throw error;
  }
};
