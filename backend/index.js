import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "./Routes/UserRoutes.js";
import { ResidencyRoute } from "./Routes/ResidencyRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Ensure this is before the routes
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/residency", ResidencyRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
