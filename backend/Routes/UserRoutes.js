import express from "express";
import {
  allBookedVisits,
  bookVisit,
  cancelBookings,
  createUser,
  getAllFavLists,
  toFav,
} from "../Controllers/UserControllers.js";
import jwtCheck from "../Config/Auth0Config.js";
const router = express.Router();
router.post("/register", jwtCheck, createUser);
router.post("/bookvisit/:id", jwtCheck, bookVisit);
router.post("/allBookedVisits", allBookedVisits);
router.post("/cancelBookings/:id", cancelBookings);
router.post("/toFav/:rid", jwtCheck, toFav);
router.post("/allFavLists", jwtCheck, getAllFavLists);
export { router as userRoutes };
