import express from "express";
import {
  createTouristPlan,
  getAllTouristPlans,
  getTouristPlanById,
  updateTouristPlan,
  deleteTouristPlan,
} from "../controllers/touristPlanController.js";

const router = express.Router();

// Create a new tourist plan
router.post("/", createTouristPlan);

// Get all tourist plans
router.get("/", getAllTouristPlans);

// Get a specific tourist plan by ID
router.get("/:id", getTouristPlanById);

// Update a tourist plan
router.put("/:id", updateTouristPlan);

// Delete a tourist plan
router.delete("/:id", deleteTouristPlan);

export default router;
