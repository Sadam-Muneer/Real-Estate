import asyncHandler from "express-async-handler";
import { prisma } from "../Config/PrismaConfig.js";

// Function to create or update a user
export const createUser = asyncHandler(async (req, res) => {
  console.log("Creating or updating a user");
  const { email, name } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      // Update existing user
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { name },
      });
      res.status(200).send({
        message: "User Updated Successfully",
        user: updatedUser,
      });
    } else {
      // Create new user
      const newUser = await prisma.user.create({
        data: { email, name },
      });
      res.status(201).send({
        message: "User Registered Successfully",
        user: newUser,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      details: error.message,
    });
  }
});

// Book Visit
export const bookVisit = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body); // Add this line for debugging
  const { email, date } = req.body;
  const { id } = req.params;

  // Basic validation
  if (!email || !date) {
    return res
      .status(400)
      .json({ message: "Email and date are required fields" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.bookedVisits &&
      user.bookedVisits.some((visit) => visit.id === id)
    ) {
      return res
        .status(400)
        .json({ message: "This Residency is Already Booked By You" });
    }

    await prisma.user.update({
      where: { email },
      data: {
        bookedVisits: { push: { id, date } },
      },
    });

    res.status(200).json({ message: "Your visit is booked successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", details: error.message });
  }
});

// All Booked Visits
export const allBookedVisits = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const Bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (!Bookings) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(Bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", details: error.message });
  }
});

// Cancel Bookings
export const cancelBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);
    if (index === -1) {
      return res.status(400).json({ message: "Booking not found" });
    }

    user.bookedVisits.splice(index, 1);
    await prisma.user.update({
      where: { email },
      data: {
        bookedVisits: user.bookedVisits,
      },
    });
    res.status(200).json({ message: "Booking has been Canceled Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", details: error.message });
  }
});
