import { Router } from "express";
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} from "../controllers/paymantControler.js";

const router = Router();

// Create a new payment
router.post("/", createPayment);

// Get all payments
router.get("/", getPayments);

// Get a single payment by ID
router.get("/:id", getPaymentById);

// Update a payment by ID
router.put("/:id", updatePayment);

// Delete a payment by ID
router.delete("/:id", deletePayment);

export default router;
