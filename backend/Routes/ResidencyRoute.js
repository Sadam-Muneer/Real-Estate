import express from "express";
import {
  createResidency,
  getAllResicemce,
  getResidency,
} from "../Controllers/ResidencyController.js";
const router = express.Router();
router.post("/residency", createResidency);
router.get("/Allresidency", getAllResicemce);
router.get("/:id", getResidency);

export { router as ResidencyRoute };
