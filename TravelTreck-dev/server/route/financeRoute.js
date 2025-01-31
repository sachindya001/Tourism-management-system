import express from "express";
import {
  getAllSitePayments,
  getSitePaymentById,
  createSitePayment,
  updateSitePayment,
  deleteSitePayment,
} from "../controllers/financeController.js";

const router = express.Router();

// @route GET /api/sitePayments
// @desc Get all site payments
router.get("/", getAllSitePayments);

// @route GET /api/sitePayments/:id
// @desc Get a single site payment by ID
router.get("/:id", getSitePaymentById);

// @route POST /api/sitePayments
// @desc Create a new site payment
router.post("/", createSitePayment);

// @route PUT /api/sitePayments/:id
// @desc Update a site payment by ID
router.put("/:id", updateSitePayment);

// @route DELETE /api/sitePayments/:id
// @desc Delete a site payment by ID
router.delete("/:id", deleteSitePayment);

export default router;
