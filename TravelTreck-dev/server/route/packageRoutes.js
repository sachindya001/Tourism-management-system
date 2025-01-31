import { Router } from "express";
import {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";

const router = Router();

// Create a new package
router.post("/", createPackage);

// Get all packages
router.get("/", getPackages);

// Get a single package by ID
router.get("/:id", getPackageById);

// Update a package by ID
router.put("/:id", updatePackage);

// Delete a package by ID
router.delete("/:id", deletePackage);

export default router;
