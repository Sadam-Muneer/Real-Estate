import express from "express";
import { createResidency } from "../Controllers/ResidencyController.js";
const router = express.Router();
router.post("/residency", createResidency);
export { router as ResidencyRoute };
