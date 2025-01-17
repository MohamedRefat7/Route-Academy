import express from "express";
import {
  createTables,
  signup,
  login,
  alterUserTable,
  truncateProductsTable,
} from "../controller/UserController.js";

const router = express.Router();

// Route to create database tables
router.post("/create-tables", createTables);

// User routes
router.post("/signup", signup); // Add a new user
router.post("/login", login); // User login
router.post("/alter-table", alterUserTable); // Alter user table (admin only)
router.post("/truncate-table", truncateProductsTable); // Truncate products table (admin only)

export default router;
