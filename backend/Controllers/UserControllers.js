import asyncHandler from "express-async-handler";
import { prisma } from "../Config/PrismaConfig.js";
export const createUser = asyncHandler(async (req, res) => {
  console.log("Received request to create or update user");
  const { email, name } = req.body;
  console.log("User details received:", { email, name });

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      console.log("User exists, updating user:", email);
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { name },
      });
      console.log("User updated successfully:", updatedUser);
      res.status(200).send({
        message: "User Updated Successfully",
        user: updatedUser,
      });
    } else {
      console.log("User does not exist, creating user:", email);
      const newUser = await prisma.user.create({
        data: { email, name },
      });
      console.log("User created successfully:", newUser);
      res.status(201).send({
        message: "User Registered Successfully",
        user: newUser,
      });
    }
  } catch (error) {
    console.error("Error handling user details:", error);
    res.status(500).send({
      message: "Internal server error",
      details: error.message,
    });
  }
});

export const bookVisit = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body);
  const { email, date } = req.body;
  const { id } = req.params;
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

    if (user.bookedVisits.some((visit) => visit.id === id)) {
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

    res.send("Your visit is booked successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", details: error.message });
  }
});

export const allBookedVisits = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const Bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).json(Bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", details: error.message });
  }
});
// cancelBookings
export const cancelBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    const index = user.bookedVisits.findIndex((visit) => visit.id === id);
    if (index === -1) {
      res.status(400).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
      res.send("Booking has been Canceled Successfully");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
