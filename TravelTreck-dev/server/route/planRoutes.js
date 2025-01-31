// server/routes/planRoutes.js
import express from "express";

import { createPlan, getUserPlans, updatePlan, deletePlan } from"../controllers/planController.js";
const router = express.Router();

//router.post('/', createPlan);
router.get('/', getUserPlans);
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);

//export default router;

