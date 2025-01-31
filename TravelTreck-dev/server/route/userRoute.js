import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";

const router = Router();

// Create a new user
router.post("/", createUser);

// Get all users
router.get("/", getUsers);

// Get a single user by ID
router.get("/:id", getUserById);

// Update a user by ID
router.put("/:id", updateUser);

// Delete a user by ID
router.delete("/:id", deleteUser);

router.post("/login", loginUser);

export default router;
