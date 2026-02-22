const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/auth");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.get("/verify-email/:token", authController.verifyEmail);

// Protected routes
router.get("/me", protect, authController.getMe);
router.put("/profile", protect, authController.updateProfile);
router.put("/password", protect, authController.changePassword);
router.put("/api-key", protect, authController.updateApiKey);
router.delete("/api-key", protect, authController.deleteApiKey);
router.post("/resend-verification", protect, authController.resendVerification);

module.exports = router;
