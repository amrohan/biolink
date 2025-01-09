import { Request, Response } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";

// Create a new theme
export const createTheme = async (req: Request, res: Response) => {
  const { bgColor, textColor, subTextColor, cardColor, cardTextColor, bgImage } = req.body;

  try {
    const theme = await prisma.theme.create({
      data: {
        bgColor,
        textColor,
        subTextColor,
        cardColor,
        cardTextColor,
        bgImage,
      },
    });

    res.json(theme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all themes
export const getThemes = async (req: Request, res: Response) => {
  try {
    const themes = await prisma.theme.findMany();
    res.json(themes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get a theme by ID
export const getThemeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const theme = await prisma.theme.findUnique({
      where: { id: parseInt(id) },
    });

    if (!theme) {
      res.status(404).json({ error: "Theme not found" });
      return;
    }

    res.json(theme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a theme by ID
export const updateTheme = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bgColor, textColor, subTextColor, cardColor, cardTextColor, bgImage } = req.body;

  try {
    const updatedTheme = await prisma.theme.update({
      where: { id: parseInt(id) },
      data: {
        bgColor,
        textColor,
        subTextColor,
        cardColor,
        cardTextColor,
        bgImage,
      } as Prisma.ThemeUpdateInput,
    });

    res.json(updatedTheme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
// Update theme for a specific user by userId
export const updateThemeByUserId = async (req: Request, res: Response) => {
  const { userId, themeId } = req.body;

  // Validate input
  if (!userId || !themeId) {
    res.status(400).json({ error: "userId and themeId are required" });
    return;
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Check if the theme exists
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
    });

    if (!theme) {
      res.status(404).json({ error: "Theme not found" });
      return;
    }

    // Update the user's themeId
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        themeId: themeId,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
// Delete a theme by ID
export const deleteTheme = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.theme.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Theme deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
