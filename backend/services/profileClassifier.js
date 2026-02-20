/**
 * Rule-based profile classifier
 * Classifies profiles based on their title
 */

const classifyProfile = (title) => {
  if (!title) return "Other";

  const lowerTitle = title.toLowerCase();

  // Check for recruiter
  if (lowerTitle.includes("recruit")) {
    return "Recruiter";
  }

  // Check for talent (often talent acquisition)
  if (lowerTitle.includes("talent")) {
    return "Recruiter";
  }

  // Check for HR
  if (lowerTitle.includes("hr") || lowerTitle.includes("human resource")) {
    return "HR";
  }

  // Check for hiring manager
  if (
    lowerTitle.includes("manager") ||
    lowerTitle.includes("lead") ||
    lowerTitle.includes("director")
  ) {
    return "Hiring Manager";
  }

  // Check for engineer
  if (
    lowerTitle.includes("engineer") ||
    lowerTitle.includes("developer") ||
    lowerTitle.includes("sde") ||
    lowerTitle.includes("swe")
  ) {
    return "Engineer";
  }

  return "Other";
};

module.exports = {
  classifyProfile,
};
