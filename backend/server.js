const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/url.routes");
const redirectRoutes = require("./routes/redirect.routes");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
  })
);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use("/api/urls", urlRoutes);
app.use("/", redirectRoutes);

app.get("/", (req, res) => {
  res.send("URL Shortener Backend is Running!");
});

app.get("/", (req, res) => {
  res.json({
    message: "URL Shortener API is running"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});