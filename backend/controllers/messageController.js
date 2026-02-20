const { generateMessage } = require("../services/messageGenerator");

/**
 * Generate a referral message
 */
exports.generate = async (req, res) => {
  try {
    const { name, companyName, role, tag } = req.body;

    // Validate required fields
    if (!name || !companyName || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, company name, and role are required",
      });
    }

    const message = generateMessage(name, companyName, role, tag || "Other");

    res.json({
      success: true,
      data: {
        message,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate message",
      error: error.message,
    });
  }
};
