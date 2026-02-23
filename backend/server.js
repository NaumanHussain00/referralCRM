require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const profileRoutes = require("./routes/profileRoutes");
const messageRoutes = require("./routes/messageRoutes");
const guestRoutes = require("./routes/guestRoutes");

// Import auth middleware
const { protect } = require("./middleware/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/guest", guestRoutes); // Guest routes (no authentication required)
app.use("/api/companies", protect, companyRoutes);
app.use("/api/profiles", protect, profileRoutes);
app.use("/api/messages", protect, messageRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Database connection and server start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
