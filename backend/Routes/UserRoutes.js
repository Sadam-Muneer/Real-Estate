import express from "express";
import { createUser } from "../Controllers/UserControllers.js";
const router = express.Router();
router.post("/register", createUser);
export { router as userRoutes };
