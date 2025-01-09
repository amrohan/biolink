import express from "express";
import {
  getUser,
  createUser,
  getUserByUserName,
} from "../controllers/userController";
import { auth } from "express-oauth2-jwt-bearer";

const router = express.Router();
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_BASE_URL,
  tokenSigningAlg: "RS256",
});

// Protected routes
router.get("/:auth0Id", checkJwt, getUser);
router.get("/@/:username", getUserByUserName);
router.post("/", checkJwt, createUser);

export default router;
