import express from "express";
import {
  createLink,
  deleteLink,
  editLink,
  incrementLinkViews,
} from "../controllers/linkController";
import { auth } from "express-oauth2-jwt-bearer";

const router = express.Router();
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_BASE_URL,
  tokenSigningAlg: "RS256",
});

// Protected routes
router.post("/", checkJwt, createLink);
router.put("/", checkJwt, editLink);
router.delete("/:id", checkJwt, deleteLink);

// Public route to increment link views
router.patch("/:id/views", incrementLinkViews);

export default router;
