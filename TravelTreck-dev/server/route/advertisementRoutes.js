import { Router } from "express";
import {
  createAdvertisement,
  getAdvertisements,
  getAdvertisementById,
  updateAdvertisement,
  deleteAdvertisement,
} from "../controllers/advertisementController.js";

const router = Router();

// Create a new advertisement
router.post("/", createAdvertisement);

// Get all advertisements
router.get("/", getAdvertisements);

// Get a single advertisement by ID
router.get("/:id", getAdvertisementById);

// Update an advertisement by ID
router.put("/:id", updateAdvertisement);

// Delete an advertisement by ID
router.delete("/:id", deleteAdvertisement);

export default router;
