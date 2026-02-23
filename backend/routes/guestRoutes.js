const express = require("express");
const router = express.Router();
const guestController = require("../controllers/guestController");

// POST /api/guest/search - Search LinkedIn profiles without authentication
router.post("/search", guestController.searchProfiles);

module.exports = router;
