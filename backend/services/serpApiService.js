const { getJson } = require("serpapi");

/**
 * Parses a single search result into a profile object
 */
const parseResult = (result) => {
  let name = "Unknown";
  let title = "";

  if (result.title) {
    const titleParts = result.title.split(" - ");
    if (titleParts.length > 0) {
      name = titleParts[0].trim();
    }
    if (titleParts.length > 1) {
      // Remove "| LinkedIn" from title
      title = titleParts
        .slice(1)
        .join(" - ")
        .replace(/\s*\|\s*LinkedIn\s*$/i, "")
        .trim();
    }
  }

  // Use snippet for additional context if title is empty
  if (!title && result.snippet) {
    title = result.snippet.substring(0, 100);
  }

  return {
    name,
    title,
    linkedinUrl: result.link,
  };
};

/**
 * Fetches LinkedIn profiles using Google X-ray search via SerpAPI
 * Uses pagination to fetch up to 100 results (10 pages of 10)
 */
const fetchLinkedInProfiles = async (companyName, role, location = "") => {
  // Build the Google X-ray search query
  let query = `site:linkedin.com/in "${companyName}" "${role}"`;
  if (location) {
    query += ` "${location}"`;
  }

  const allProfiles = [];
  const seenUrls = new Set();
  const maxResults = 100;
  const resultsPerPage = 10;
  const maxPages = 10;

  try {
    // Fetch up to 10 pages (100 results total)
    for (
      let page = 0;
      page < maxPages && allProfiles.length < maxResults;
      page++
    ) {
      const params = {
        engine: "google",
        q: query,
        api_key: process.env.SERPAPI_KEY,
        num: resultsPerPage,
        start: page * resultsPerPage, // Pagination offset
        gl: "us",
        hl: "en",
      };

      const response = await getJson(params);

      if (!response.organic_results || response.organic_results.length === 0) {
        break; // No more results
      }

      const pageProfiles = response.organic_results
        .filter(
          (result) => result.link && result.link.includes("linkedin.com/in/"),
        )
        .map(parseResult)
        .filter((profile) => {
          // Deduplicate by URL
          if (seenUrls.has(profile.linkedinUrl)) {
            return false;
          }
          seenUrls.add(profile.linkedinUrl);
          return true;
        });

      allProfiles.push(...pageProfiles);

      // Stop if we got fewer results than expected (no more pages)
      if (response.organic_results.length < resultsPerPage) {
        break;
      }
    }

    return allProfiles.slice(0, maxResults);
  } catch (error) {
    console.error("SerpAPI Error:", error);
    throw new Error(`Failed to fetch profiles from SerpAPI: ${error.message}`);
  }
};

module.exports = {
  fetchLinkedInProfiles,
};
