require("dotenv").config();
const mongoose = require("mongoose");
const Company = require("../models/Company");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data (optional)
    // await Company.deleteMany({});
    // console.log('Cleared existing companies');

    // Check if seed company already exists
    const existing = await Company.findOne({
      companyName: "Amazon",
      role: "SDE Intern",
    });

    if (existing) {
      console.log("ℹ️  Seed company already exists:", existing._id);
    } else {
      // Create sample company
      const company = await Company.create({
        companyName: "Amazon",
        role: "SDE Intern",
        location: "Seattle, WA",
      });
      console.log("✅ Created seed company:", company._id);
    }

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedData();
