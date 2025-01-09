import { Request, Response } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";

// Get user by auth0Id
export const getUser = async (req: Request, res: Response) => {
  const { auth0Id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { auth0Id },
      include: { links: true, theme: true }, // Include user's links
    });
    if (!user) {
      res.status(404).json({ error: "User not found" }); // Send response
      return; // Exit the function
    }
    res.json(user); // Send response and implicitly return void
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" }); // Send response
  }
};
export const getUserByUserName = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { links: true, theme: true },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" }); // Send response
      return; // Exit the function
    }
    res.json(user); // Send response and implicitly return void
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" }); // Send response
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { auth0Id, name, username, picture } = req.body;
  // Check if the required `username` field is provided
  if (!username) {
    res.status(400).json({ error: "Username is required" });
    return;
  }

  try {
    const user = await prisma.user.create({
      data: {
        auth0Id,
        name, // Optional field
        username, // Required field
        picture, // Optional field
      } as Prisma.UserCreateInput, // Explicitly type the data object
    });
    res.json(user);
  } catch (error: any) {
    // Use Prisma-specific error type
    if (error.code === "P2002" && error.meta?.target?.includes("username")) {
      // Handle unique constraint violation for username
      res.status(400).json({ error: "Username is already taken" });
      return;
    } else {
      res.status(500).json({ error: "Something went wrong" });
      return;
    }
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  const { auth0Id } = req.params;
  const { name, username, picture } = req.body; // Destructure fields

  try {
    const updatedUser = await prisma.user.update({
      where: { auth0Id },
      data: {
        name, // Optional field
        username, // Optional field
        picture, // Optional field
      } as Prisma.UserUpdateInput, // Explicitly type the data object
    });
    res.json(updatedUser);
  } catch (error: any) {
    // Use Prisma-specific error type
    if (error.code === "P2002" && error.meta?.target?.includes("username")) {
      // Handle unique constraint violation for username
      res.status(400).json({ error: "Username is already taken" });
      return;
    } else {
      res.status(500).json({ error: "Something went wrong" });
      return;
    }
  }
};
