import express from "express";
import {
  createTheme,
  getThemes,
  getThemeById,
  updateTheme,
  deleteTheme,
  updateThemeByUserId,
} from "../controllers/themeController";
import { auth } from "express-oauth2-jwt-bearer";

const router = express.Router();
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_BASE_URL,
  tokenSigningAlg: "RS256",
});

// Create a new theme (protected route)
router.post("/", checkJwt, createTheme);

// Get all themes (public route)
router.get("/", getThemes);

// Get a theme by ID (public route)
router.get("/:id", getThemeById);

// Update a theme by ID (protected route)
router.put("/:id", checkJwt, updateTheme);

// Delete a theme by ID (protected route)
router.delete("/:id", checkJwt, deleteTheme);
// Update theme for a specific user by userId (protected route)
router.put("/user/theme", checkJwt, updateThemeByUserId);
export default router;
