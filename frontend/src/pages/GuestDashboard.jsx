import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { guestApi } from "../api/api";
import { useGuest } from "../context/GuestContext";
import toast from "react-hot-toast";

function GuestDashboard() {
  const navigate = useNavigate();
  const {
    guestApiKey,
    setGuestApiKey,
    searchCount,
    guestProfiles,
    setGuestProfiles,
    incrementSearchCount,
    exitGuestMode,
  } = useGuest();

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [searching, setSearching] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(!guestApiKey);
  const resultsRef = useRef(null);

  const MAX_GUEST_SEARCHES = 3;

  const handleSearch = async (e) => {
    e.preventDefault();

    // Check search limit
    if (searchCount >= MAX_GUEST_SEARCHES) {
      toast.error(
        "You've reached the guest mode limit. Sign up for unlimited searches!",
      );
      return;
    }

    if (!guestApiKey.trim()) {
      toast.error("Please enter your SerpAPI key");
      setShowApiKeyInput(true);
      return;
    }

    if (!companyName.trim() || !role.trim()) {
      toast.error("Company name and role are required");
      return;
    }

    setSearching(true);
    try {
      const response = await guestApi.searchProfiles({
        apiKey: guestApiKey,
        companyName,
        role,
        location,
      });

      setGuestProfiles(response.data.data.profiles);
      incrementSearchCount();
      toast.success(`Found ${response.data.data.profiles.length} profiles`);

      // Scroll to results after a brief delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to search profiles";
      toast.error(errorMessage);

      // If API key is invalid, prompt to re-enter
      if (error.response?.status === 400 && errorMessage.includes("API key")) {
        setShowApiKeyInput(true);
      }
    } finally {
      setSearching(false);
    }
  };

  const handleExit = () => {
    exitGuestMode();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link
                to="/guest"
                className="text-2xl font-bold text-gray-900 hover:text-gray-700"
              >
                Referral CRM
              </Link>
              <div className="flex items-center gap-3 mt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Guest Mode
                </span>
                <span className="text-sm text-gray-500">
                  Searches made:{" "}
                  <span className="font-semibold text-blue-600">
                    {searchCount}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/register"
                className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Sign Up
              </Link>
              <button
                onClick={handleExit}
                className="text-sm px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                Exit Guest Mode
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Guest Mode Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-800">
                You're using Guest Mode
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Search results are not saved.{" "}
                <Link
                  to="/register"
                  className="font-medium underline hover:text-blue-900"
                >
                  Create an account
                </Link>{" "}
                to save profiles, track outreach status, and generate
                personalized messages.
              </p>
            </div>
          </div>
        </div>

        {/* API Key Section */}
        {showApiKeyInput && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  Enter Your SerpAPI Key
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Get your free API key from{" "}
                  <a
                    href="https://serpapi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    serpapi.com
                  </a>{" "}
                  (250 free searches/month)
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <input
                type="password"
                value={guestApiKey}
                onChange={(e) => setGuestApiKey(e.target.value)}
                placeholder="Enter your SerpAPI key"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => {
                  if (guestApiKey.trim()) {
                    setShowApiKeyInput(false);
                    toast.success("API key saved");
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Search LinkedIn Profiles
          </h2>
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Google"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Software Engineer, SDE, Talent Acquisition"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., San Francisco, CA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={
                  searching || !guestApiKey || searchCount >= MAX_GUEST_SEARCHES
                }
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {searching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Searching...
                  </>
                ) : searchCount >= MAX_GUEST_SEARCHES ? (
                  <>Limit Reached</>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Find Profiles ({MAX_GUEST_SEARCHES - searchCount} left)
                  </>
                )}
              </button>
              {!showApiKeyInput && guestApiKey && (
                <button
                  type="button"
                  onClick={() => setShowApiKeyInput(true)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Change API Key
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Search Counter */}
        <div
          className={`rounded-lg border p-4 mb-6 ${searchCount >= MAX_GUEST_SEARCHES ? "bg-gradient-to-r from-red-50 to-orange-50 border-red-200" : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${searchCount >= MAX_GUEST_SEARCHES ? "bg-red-100" : "bg-blue-100"}`}
              >
                <svg
                  className={`w-5 h-5 ${searchCount >= MAX_GUEST_SEARCHES ? "text-red-600" : "text-blue-600"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Guest Mode Searches</p>
                <p
                  className={`text-2xl font-bold ${searchCount >= MAX_GUEST_SEARCHES ? "text-red-600" : "text-blue-600"}`}
                >
                  {searchCount} / {MAX_GUEST_SEARCHES}
                </p>
              </div>
            </div>
            {searchCount >= MAX_GUEST_SEARCHES ? (
              <div className="text-right">
                <p className="text-sm font-medium text-red-700">
                  Limit reached!
                </p>
                <Link
                  to="/register"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline"
                >
                  Sign up for unlimited searches
                </Link>
              </div>
            ) : (
              <p className="text-sm text-gray-500 max-w-xs text-right">
                {MAX_GUEST_SEARCHES - searchCount} search
                {MAX_GUEST_SEARCHES - searchCount !== 1 ? "es" : ""} remaining.
                Sign up for unlimited access.
              </p>
            )}
          </div>
        </div>

        {/* Results */}
        {guestProfiles.length > 0 && (
          <div
            ref={resultsRef}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Search Results ({guestProfiles.length} profiles)
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {guestProfiles.map((profile, index) => (
                <div
                  key={index}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {profile.name}
                      </p>
                      <p className="text-sm text-gray-500">{profile.title}</p>
                    </div>
                  </div>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    View Profile
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {guestProfiles.length === 0 && !searching && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Search for LinkedIn profiles
            </h3>
            <p className="text-gray-500">
              Enter a company name and role above to find relevant profiles
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 fixed bottom-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col items-center gap-3">
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-900">
                Built by Nauman Hussain
              </p>
              <p className="text-xs text-gray-600">Backend Developer</p>
              <p className="text-xs text-gray-500">
                B. Tech. in Computer Science & Engg
              </p>
            </div>
            <div className="flex justify-center items-center gap-6">
              <Link
                to="/support"
                className="hover:opacity-80 transition-opacity"
                title="Support This Project"
              >
                <img
                  src="/buy-me-an-attar.png"
                  alt="Support This Project"
                  className="h-20 w-30px rounded-2xl"
                />
              </Link>
              <a
                href="https://www.linkedin.com/in/nauman-hussain-a89297262"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="LinkedIn"
              >
                <img
                  src="/linkedin_logo_icon_170234.png"
                  alt="LinkedIn"
                  className="h-20 w-25"
                />
              </a>
              <a
                href="https://x.com/Noon_Tech_"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="X (Twitter)"
              >
                <img
                  src="/twitter_x_new_logo_square_x_icon_256075.png"
                  alt="X"
                  className="h-20 w-25"
                />
              </a>
              <a
                href="https://github.com/NaumanHussain00"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="GitHub"
              >
                <img
                  src="/github-logo_icon-icons.com_73546.png"
                  alt="GitHub"
                  className="h-20 w-20"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default GuestDashboard;
