import express from "express";
import {
  allBookedVisits,
  bookVisit,
  cancelBookings,
  createUser,
  getAllFavLists,
  toFav,
} from "../Controllers/UserControllers.js";
const router = express.Router();
router.post("/register", createUser);
router.post("/bookvisit/:id", bookVisit);
router.post("/allBookedVisits", allBookedVisits);
router.post("/cancelBookings/:id", cancelBookings);
router.post("/toFav/:rid", toFav);
router.post("/allFavLists", getAllFavLists);
export { router as userRoutes };
