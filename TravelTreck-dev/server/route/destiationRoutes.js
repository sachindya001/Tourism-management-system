import express from "express";
import {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../controllers/destinationController.js";

const router = express.Router();

// Get all destinations
router.get("/", getAllDestinations);

// Get a specific destination by ID
router.get("/:id", getDestinationById);

// Create a new destination
router.post("/", createDestination);

// Update an existing destination by ID
router.put("/:id", updateDestination);

// Delete a destination by ID
router.delete("/:id", deleteDestination);

export default router;
