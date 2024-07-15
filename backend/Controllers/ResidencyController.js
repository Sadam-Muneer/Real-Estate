import asyncHandler from "express-async-handler";
import { prisma } from "../Config/PrismaConfig.js";

// Create a new residency
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
    listType, // Add listType here
  } = req.body.data;

  // Validate listType
  const validListTypes = ["SELL", "BUY", "RENT"];
  if (!listType || !validListTypes.includes(listType)) {
    return res.status(400).json({ error: "Invalid listType value" });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userEmail,
        },
      });
    }

    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities, // Assume facilities is already a JSON object
        image,
        listType, // Include listType here
        owner: { connect: { email: userEmail } },
      },
    });

    res.status(201).json({
      message: "Residency created successfully",
      residency,
    });
  } catch (error) {
    if (error.code === "P2002") {
      res
        .status(400)
        .json({ error: "A Residency with this address already exists." });
    } else {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
});

// Get all residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(residencies);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

// Get a residency by ID
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    if (residency) {
      res.send(residency);
    } else {
      res.status(404).json({ message: "Residency not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});
