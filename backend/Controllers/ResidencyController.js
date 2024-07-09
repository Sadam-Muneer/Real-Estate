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
  } = req.body.data;

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
        facilities,
        image,
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
