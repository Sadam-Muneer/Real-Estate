import express from "express";
import { bookVisit, createUser } from "../Controllers/UserControllers.js";
const router = express.Router();
router.post("/register", createUser);
router.post("/bookvisit/:id", bookVisit);

export { router as userRoutes };
