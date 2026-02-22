const Company = require("../models/Company");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { fetchLinkedInProfiles } = require("../services/serpApiService");
const { classifyProfile } = require("../services/profileClassifier");

/**
 * Get all companies with profile stats
 */
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });

    // Get stats for each company
    const companiesWithStats = await Promise.all(
      companies.map(async (company) => {
        const stats = await Profile.getStatusCounts(company._id);
        return {
          ...company.toObject(),
          totalProfiles: stats.total,
          sent: stats.sent,
          accepted: stats.accepted,
          messaged: stats.messaged,
          referred: stats.referred,
        };
      }),
    );

    res.json({
      success: true,
      data: companiesWithStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch companies",
      error: error.message,
    });
  }
};

/**
 * Get single company by ID
 */
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const stats = await Profile.getStatusCounts(company._id);

    res.json({
      success: true,
      data: {
        ...company.toObject(),
        stats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch company",
      error: error.message,
    });
  }
};

/**
 * Create new company
 */
exports.createCompany = async (req, res) => {
  try {
    const { companyName, role, location } = req.body;

    if (!companyName || !role) {
      return res.status(400).json({
        success: false,
        message: "Company name and role are required",
      });
    }

    const company = await Company.create({
      companyName,
      role,
      location: location || "",
    });

    res.status(201).json({
      success: true,
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create company",
      error: error.message,
    });
  }
};

/**
 * Delete company and its profiles
 */
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Delete all profiles associated with this company
    await Profile.deleteMany({ companyId: company._id });

    // Delete the company
    await Company.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Company and associated profiles deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete company",
      error: error.message,
    });
  }
};

/**
 * Fetch LinkedIn profiles for a company using SerpAPI
 */
exports.fetchProfiles = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Get user's API key
    const user = await User.findById(req.user.id).select("+serpApiKey");
    if (!user.serpApiKey) {
      return res.status(400).json({
        success: false,
        message:
          "Please add your SerpAPI key in Settings before fetching profiles",
      });
    }

    // Fetch profiles from SerpAPI using user's key
    const profiles = await fetchLinkedInProfiles(
      company.companyName,
      company.role,
      company.location,
      user.serpApiKey,
    );

    let newProfiles = 0;
    let duplicates = 0;

    // Save profiles to database
    for (const profile of profiles) {
      try {
        const tag = classifyProfile(profile.title);

        await Profile.create({
          companyId: company._id,
          name: profile.name,
          title: profile.title,
          linkedinUrl: profile.linkedinUrl,
          tag,
        });
        newProfiles++;
      } catch (err) {
        // Handle duplicate LinkedIn URL error
        if (err.code === 11000) {
          duplicates++;
        } else {
          console.error("Error saving profile:", err);
        }
      }
    }

    res.json({
      success: true,
      message: `Fetched ${profiles.length} profiles. Added ${newProfiles} new, ${duplicates} duplicates skipped.`,
      data: {
        fetched: profiles.length,
        new: newProfiles,
        duplicates,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profiles",
      error: error.message,
    });
  }
};
