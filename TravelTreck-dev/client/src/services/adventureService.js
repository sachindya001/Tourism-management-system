import axios from "axios";

const baseUrl = "http://localhost:8080/api/adventures";

export const getAllAdventures = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching adventures:", error);
    throw error;
  }
};

export const getAdventureById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching adventure:", error);
    throw error;
  }
};

export const createAdventure = async (adventureData) => {
  try {
    const response = await axios.post(baseUrl, adventureData);
    return response.data;
  } catch (error) {
    console.error("Error creating adventure:", error);
    throw error;
  }
};

export const updateAdventure = async (id, adventureData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, adventureData);
    return response.data;
  } catch (error) {
    console.error("Error updating adventure:", error);
    throw error;
  }
};

export const deleteAdventure = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting adventure:", error);
    throw error;
  }
};
