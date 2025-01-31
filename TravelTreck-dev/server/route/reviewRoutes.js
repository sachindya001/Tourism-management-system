import { Router } from "express";
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = Router();

// Create a new review
router.post("/", createReview);

// Get all reviews
router.get("/", getReviews);

// Get a single review by ID
router.get("/:id", getReviewById);

// Update a review by ID
router.put("/:id", updateReview);

// Delete a review by ID
router.delete("/:id", deleteReview);

export default router;
