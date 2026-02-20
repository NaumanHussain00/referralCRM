const mongoose = require("mongoose");

const TAGS = ["Recruiter", "HR", "Engineer", "Hiring Manager", "Other"];
const STATUSES = ["not_sent", "sent", "accepted", "messaged", "referred"];

const profileSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "Company ID is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  title: {
    type: String,
    trim: true,
    default: "",
  },
  linkedinUrl: {
    type: String,
    required: [true, "LinkedIn URL is required"],
    trim: true,
  },
  tag: {
    type: String,
    enum: TAGS,
    default: "Other",
  },
  status: {
    type: String,
    enum: STATUSES,
    default: "not_sent",
  },
  notes: {
    type: String,
    trim: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for preventing duplicate LinkedIn URLs per company
profileSchema.index({ companyId: 1, linkedinUrl: 1 }, { unique: true });

// Static method to get status counts for a company
profileSchema.statics.getStatusCounts = async function (companyId) {
  const result = await this.aggregate([
    { $match: { companyId: new mongoose.Types.ObjectId(companyId) } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const counts = {
    total: 0,
    not_sent: 0,
    sent: 0,
    accepted: 0,
    messaged: 0,
    referred: 0,
  };

  result.forEach((item) => {
    counts[item._id] = item.count;
    counts.total += item.count;
  });

  return counts;
};

module.exports = mongoose.model("Profile", profileSchema);
module.exports.TAGS = TAGS;
module.exports.STATUSES = STATUSES;
