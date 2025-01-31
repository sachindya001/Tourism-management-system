import axios from "axios";

const API_URL = "http://localhost:8080/api";

const touristPlanAPI = axios.create({
  baseURL: `${API_URL}/tourist-plans`,
  headers: {
    "Content-Type": "application/json",
  },
});

const TouristPlanService = {
  createTouristPlan: async (planData) => {
    try {
      const response = await touristPlanAPI.post("/", planData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAllTouristPlans: async () => {
    try {
      const response = await touristPlanAPI.get("/");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getTouristPlanById: async (id) => {
    try {
      const response = await touristPlanAPI.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateTouristPlan: async (id, planData) => {
    try {
      const response = await touristPlanAPI.put(`/${id}`, planData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteTouristPlan: async (id) => {
    try {
      const response = await touristPlanAPI.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default TouristPlanService;
