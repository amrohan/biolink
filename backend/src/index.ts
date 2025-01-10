import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import linkRoutes from "./routes/linkRoutes";
import themeRoute from "./routes/themeRoutes";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

// Use routes
app.use("/users", userRoutes);
app.use("/links", linkRoutes);
app.use("/themes", themeRoute);
// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Linktree Alternative API");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
