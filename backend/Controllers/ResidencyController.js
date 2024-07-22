import asyncHandler from "express-async-handler";
import { prisma } from "../Config/PrismaConfig.js";
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
    listType,
  } = req.body;
  console.log("Received userEmail:", userEmail);

  // Validate listType
  const validListTypes = ["SELL", "BUY", "RENT"];
  if (!listType || !validListTypes.includes(listType)) {
    return res.status(400).json({
      error: "Invalid listType value. It should be one of SELL, BUY, or RENT.",
    });
  }

  try {
    if (!userEmail) {
      return res.status(400).json({ error: "User email is required" });
    }

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
        facilities,
        image,
        listType,
        owner: { connect: { email: userEmail } },
      },
    });

    res.status(201).json({
      message: "Residency created successfully",
      residency,
    });
  } catch (error) {
    console.error("Error creating residency:", error);
    if (error.code === "P2002") {
      res.status(400).json({
        error:
          "A Residency with this address already exists. Please check the address and try again.",
      });
    } else {
      res.status(500).json({
        error:
          "Internal server error. Something went wrong, please try again later.",
        details: error.message,
      });
    }
  }
});

// Get all residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
        // asc
      },
    });
    res.send(residencies);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("Fetching residency with ID:", id);

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });

    if (residency) {
      res.send(residency);
    } else {
      console.log("Residency not found:", id);
      res.status(404).json({ message: "Residency not found" });
    }
  } catch (error) {
    console.error("Error fetching residency:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});
