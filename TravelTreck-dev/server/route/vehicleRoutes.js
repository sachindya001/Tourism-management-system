import { Router } from "express";
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";

const router = Router();

// Create a new vehicle
router.post("/", createVehicle);

// Get all vehicles
router.get("/", getVehicles);

// Get a single vehicle by ID
router.get("/:id", getVehicleById);

// Update a vehicle by ID
router.put("/:id", updateVehicle);

// Delete a vehicle by ID
router.delete("/:id", deleteVehicle);

export default router;
