import axios from "axios";

const baseUrl = "http://localhost:8080/api/packages";

export const getAllPackages = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

export const getPackageById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching package:", error);
    throw error;
  }
};

export const createPackage = async (packageData) => {
  try {
    const response = await axios.post(baseUrl, packageData);
    return response.data;
  } catch (error) {
    console.error("Error creating package:", error);
    throw error;
  }
};

export const updatePackage = async (id, packageData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, packageData);
    return response.data;
  } catch (error) {
    console.error("Error updating package:", error);
    throw error;
  }
};

export const deletePackage = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting package:", error);
    throw error;
  }
};
