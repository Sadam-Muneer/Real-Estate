import asyncHandler from "express-async-handler";
import { prisma } from "../Config/PrismaConfig.js";
export const createUser = asyncHandler(async (req, res) => {
  console.log("Creating a user");
  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User Registered Successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User Already Exist" });
});

// to book a visit to resident

export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

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
