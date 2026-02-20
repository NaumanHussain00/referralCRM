const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// POST /api/messages/generate - Generate referral message
router.post("/generate", messageController.generate);

module.exports = router;
