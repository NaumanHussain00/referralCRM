const { fetchLinkedInProfiles } = require("../services/serpApiService");
const { classifyProfile } = require("../services/profileClassifier");

/**
 * Search LinkedIn profiles in guest mode (no authentication required)
 * Profiles are returned but not saved to database
 */
exports.searchProfiles = async (req, res) => {
  try {
    const { apiKey, companyName, role, location } = req.body;

    // Validate required fields
    if (!apiKey || !apiKey.trim()) {
      return res.status(400).json({
        success: false,
        message: "SerpAPI key is required",
      });
    }

    if (!companyName || !companyName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    if (!role || !role.trim()) {
      return res.status(400).json({
        success: false,
        message: "Role is required",
      });
    }

    // Validate API key format (basic check)
    if (apiKey.length < 20) {
      return res.status(400).json({
        success: false,
        message: "Invalid API key format",
      });
    }

    // Fetch profiles from SerpAPI using provided key
    const profiles = await fetchLinkedInProfiles(
      companyName.trim(),
      role.trim(),
      location?.trim() || "",
      apiKey.trim(),
    );

    // Add classification tags to profiles
    const classifiedProfiles = profiles.map((profile) => ({
      ...profile,
      tag: classifyProfile(profile.title),
    }));

    res.json({
      success: true,
      message: `Found ${profiles.length} profiles`,
      data: {
        profiles: classifiedProfiles,
        searchParams: {
          companyName,
          role,
          location: location || "",
        },
      },
    });
  } catch (error) {
    console.error("Guest search error:", error);

    // Handle specific SerpAPI errors
    if (error.message.includes("Invalid API key")) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid SerpAPI key. Please check your API key and try again.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to search profiles",
      error: error.message,
    });
  }
};
