import express from "express";
import {
  allBookedVisits,
  bookVisit,
  cancelBookings,
  createUser,
} from "../Controllers/UserControllers.js";
import jwtCheck from "../Config/Auth0Config.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookvisit/:id", jwtCheck, bookVisit);
router.post("/allBookedVisits", allBookedVisits);
router.post("/cancelBookings/:id", cancelBookings);

export { router as userRoutes };
