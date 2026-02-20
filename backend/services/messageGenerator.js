/**
 * Generates referral request messages based on profile tag
 */

const generateMessage = (name, companyName, role, tag) => {
  const templates = {
    Recruiter: `Hi ${name}, I'm applying for the ${role} role at ${companyName}.
I would really appreciate any guidance or referral if possible.`,

    HR: `Hi ${name}, I'm applying for the ${role} role at ${companyName}.
I would really appreciate any guidance or referral if possible.`,

    Engineer: `Hi ${name}, I'm a backend-focused CSE student working with Node.js.
I've applied for the ${role} role at ${companyName} and would love to learn from your experience.
If possible, I'd be grateful for a referral.`,

    "Hiring Manager": `Hi ${name}, I'm applying for the ${role} role at ${companyName}.
I noticed you might be involved in hiring for this team and would appreciate any advice or referral consideration.`,

    Other: `Hi ${name}, I'm applying for the ${role} role at ${companyName}.
I came across your profile and would appreciate any guidance or referral if possible.`,
  };

  return templates[tag] || templates.Other;
};

module.exports = {
  generateMessage,
};
