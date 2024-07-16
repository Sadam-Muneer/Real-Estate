import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../Controllers/ResidencyController.js";
import jwtCheck from "../Config/Auth0Config.js";
const router = express.Router();
router.post("/residency", jwtCheck, createResidency);
router.get("/Allresidency", getAllResidencies);
router.get("/:id", getResidency);

export { router as ResidencyRoute };
