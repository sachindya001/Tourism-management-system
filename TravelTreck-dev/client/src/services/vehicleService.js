import axios from "axios";

const baseUrl = "http://localhost:8080/api/vehicles";

export const getAllVehicles = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
};

export const getVehicleById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    throw error;
  }
};

export const createVehicle = async (vehicleData) => {
  try {
    const response = await axios.post(baseUrl, vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }
};

export const updateVehicle = async (id, vehicleData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }
};

export const deleteVehicle = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};
