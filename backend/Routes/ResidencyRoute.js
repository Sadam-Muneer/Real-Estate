import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../Controllers/ResidencyController.js";

const router = express.Router();

router.post("/residency", createResidency);
router.get("/Allresidency", getAllResidencies);
router.get("/:id", getResidency);

export { router as ResidencyRoute };
