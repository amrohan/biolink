import { Request, Response } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client"; // Import Prisma types

// Create a new link for a user
export const createLink = async (req: Request, res: Response) => {
  const { title, url, auth0Id } = req.body;

  // Check if auth0Id is provided
  if (!auth0Id) {
    res.status(400).json({ error: "auth0Id is required" });
    return;
  }

  try {
    // Find the user by auth0Id
    const user = await prisma.user.findUnique({
      where: { auth0Id }, // Ensure auth0Id is defined
    });

    // If user is not found, return a 404 error
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Create a new link associated with the user
    const link = await prisma.link.create({
      data: {
        title,
        url,
        views: 0, // Initialize views to 0
        userId: user.id, // Associate the link with the user
      },
    });

    res.json(link);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const editLink = async (req: Request, res: Response) => {
  const { id, title, url, userId, views } = req.body;

  try {
    if (!id) {
      res.status(400).json({ error: "LinkId is required" });
      return;
    }

    const updatedLink = await prisma.link.update({
      where: {
        id,
      },
      data: {
        title,
        url,
        userId,
      },
    });
    res.json(updatedLink);
  } catch (error: any) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete a link by ID
export const deleteLink = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.link.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Link deleted successfully" }); // Send response
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" }); // Send response
  }
};

// Increment link views
export const incrementLinkViews = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const link = await prisma.link.update({
      where: { id: parseInt(id) },
      data: {
        views: {
          increment: 1, // Increment views by 1
        },
      } as Prisma.LinkUpdateInput, // Explicitly type the data object
    });
    res.json(link); // Send response
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" }); // Send response
  }
};
