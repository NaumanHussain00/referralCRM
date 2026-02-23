import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="min-h-screen bg-white pb-28">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                {/* <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div> */}
                <span className="font-bold text-gray-900">Referral CRM</span>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Built for job seekers who hustle
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Find LinkedIn profiles for referrals.{" "}
              <span className="text-blue-600">Without the search limit.</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Enter your target company and role. Get a list of relevant
              LinkedIn profiles instantly. No premium subscription needed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Start Finding Profiles
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all"
              >
                See How It Works
              </a>
            </div>

            {/* Guest Mode Entry */}
            <div className="flex justify-center mb-12">
              <Link
                to="/guest"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="font-medium">Try without signing up</span>
                <span className="text-sm text-gray-400 group-hover:text-blue-400">
                  (Guest Mode)
                </span>
              </Link>
            </div>

            {/* Preview Image Placeholder */}
            <div className="relative max-w-3xl mx-auto">
              <div className="bg-gradient-to-b from-gray-100 to-gray-50 rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
                <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-gray-400 text-sm">Referral CRM</span>
                  </div>
                </div>
                <div className="p-6 bg-gray-50">
                  <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                    <div className="flex gap-4 items-center">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">
                          Company
                        </div>
                        <div className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800">
                          Google
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">Role</div>
                        <div className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800">
                          Software Engineer
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium mt-4">
                        Find Profiles
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {["AK", "SP", "RJ"][i - 1]}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {
                              ["Amit Kumar", "Sarah Patel", "Raj Johnson"][
                                i - 1
                              ]
                            }
                          </div>
                          <div className="text-sm text-gray-500">
                            Software Engineer at Google
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${i === 1 ? "bg-green-100 text-green-700" : i === 2 ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}
                          >
                            {["Replied", "Pending", "Not Contacted"][i - 1]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SerpApi Callout Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
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
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Just Add Your Google SerpApi Key
                  </h3>
                  <p className="text-lg text-gray-700 mb-2">
                    That's all you need to get started. SerpApi powers the
                    search functionality.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Free Tier: 250 searches/month</span>
                    </div>
                    <a
                      href="https://serpapi.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Get Your Free API Key
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600 text-center md:text-left">
                  💡 Perfect for job seekers - the free tier is more than enough
                  to search across all your target companies
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The LinkedIn Search Problem
              </h2>
              <p className="text-lg text-gray-600">Sound familiar?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Monthly Search Limits
                </h3>
                <p className="text-gray-600">
                  You've run out of LinkedIn searches this month. Again. And
                  you're only halfway through your target companies list.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Premium is Expensive
                </h3>
                <p className="text-gray-600">
                  LinkedIn Premium costs ₹1,800+/month. Just for unlimited
                  searches? That's a lot when you're job hunting.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Manual Google Searching
                </h3>
                <p className="text-gray-600">
                  Typing "site:linkedin.com Software Engineer Google" over and
                  over. It works, but it's tedious.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Way to Track Outreach
                </h3>
                <p className="text-gray-600">
                  Did I already message this person? What was their response?
                  Spreadsheets get messy fast.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600">
                Three steps to your next referral
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Set Up Your Free SerpApi Key & Add Target Company
                  </h3>
                  <p className="text-gray-600">
                    First, add your free SerpApi key in settings (takes 2
                    minutes to get one). Then enter the company name and the
                    role you're targeting. That's it. No complex filters or
                    boolean searches.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Get Relevant Profiles Instantly
                  </h3>
                  <p className="text-gray-600 mb-2">
                    We search the web using your SerpApi key and return LinkedIn
                    profiles of people who match your criteria. Software
                    Engineers at Google? Recruiters at Meta? Done.
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    ✓ Uses your free SerpApi key (250 searches/month included)
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Track Your Outreach
                  </h3>
                  <p className="text-gray-600">
                    Keep track of who you've contacted, who replied, and who's
                    pending. Never lose track of a potential referral again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Built for Job Seekers
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to land referrals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Instant Results
                </h3>
                <p className="text-gray-600 text-sm">
                  Get profiles in seconds, not hours of searching
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Status Tracking
                </h3>
                <p className="text-gray-600 text-sm">
                  Track contacted, pending, replied status for each profile
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Notes & Messages
                </h3>
                <p className="text-gray-600 text-sm">
                  Add notes and generate personalized outreach messages
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to find your next referral?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Stop wasting time with LinkedIn's search limits. Start finding the
              right people today.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Get Started for Free
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 fixed bottom-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col items-center gap-3">
            {/* <div className="text-center">
              <p className="text-sm font-semibold text-gray-900">
                Built by Nauman Hussain
              </p>
              <p className="text-xs text-gray-600">Backend Developer</p>
              <p className="text-xs text-gray-500">
                B. Tech. in Computer Science & Engg
              </p>
            </div> */}
            <div className="flex justify-center items-center gap-6">
              {/* <a
                href="https://buymeacoffee.com/naumcoffee"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="Buy me a Coffee"
              >
                <img
                  src="/coffee-yellow-button.png"
                  alt="Buy me a Coffee"
                  className="h-20 w-25"
                />
              </a> */}
              <div className="text-center">
              <p className="text-sm font-semibold text-gray-900">
                Support this Project Built by Nauman Hussain
              </p>
              <p className="text-xs text-gray-600">Backend Developer</p>
              <p className="text-xs text-gray-500">
                B. Tech. in Computer Science & Engg
              </p>
            </div>

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
    </>
  );
};

export default Landing;
