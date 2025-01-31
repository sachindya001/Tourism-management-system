import axios from "axios";

const baseUrl = "http://localhost:8080/api/advertisements";

export const getAllAdvertisement = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching Advertisement:", error);
    throw error;
  }
};

export const getAdvertisementById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Advertisement:", error);
    throw error;
  }
};

export const createAdvertisement = async (AdvertisementData) => {
  try {
    const response = await axios.post(baseUrl, AdvertisementData);
    return response.data;
  } catch (error) {
    console.error("Error creating Advertisement:", error);
    throw error;
  }
};

export const updateAdvertisement = async (id, AdvertisementData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, AdvertisementData);
    return response.data;
  } catch (error) {
    console.error("Error updating Advertisement:", error);
    throw error;
  }
};

export const deleteAdvertisement = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Advertisement:", error);
    throw error;
  }
};
