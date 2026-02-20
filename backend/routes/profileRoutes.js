const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// GET /api/profiles/company/:companyId - Get all profiles for a company
router.get("/company/:companyId", profileController.getProfilesByCompany);

// GET /api/profiles/:id - Get single profile
router.get("/:id", profileController.getProfileById);

// PATCH /api/profiles/:id/status - Update profile status
router.patch("/:id/status", profileController.updateStatus);

// PATCH /api/profiles/:id/notes - Update profile notes
router.patch("/:id/notes", profileController.updateNotes);

// DELETE /api/profiles/:id - Delete profile
router.delete("/:id", profileController.deleteProfile);

module.exports = router;
