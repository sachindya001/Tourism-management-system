import { Router } from "express";
import {
  createAdventure,
  getAdventures,
  getAdventureById,
  updateAdventure,
  deleteAdventure,
} from "../controllers/adventureController.js";

const router = Router();

// Create a new adventure
router.post("/", createAdventure);

// Get all adventures
router.get("/", getAdventures);

// Get a single adventure by ID
router.get("/:id", getAdventureById);

// Update an adventure by ID
router.put("/:id", updateAdventure);

// Delete an adventure by ID
router.delete("/:id", deleteAdventure);

export default router;
