import { Link } from "react-router-dom";

const Support = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-8 py-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mb-4">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>

            <h1 className="text-xl font-semibold text-white mb-1">
              Support This Project
            </h1>
            <p className="text-blue-100 text-sm">
              Your generosity keeps this tool free for everyone
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              If Referral CRM has helped you in your job search journey,
              consider buying me an attar as a token of appreciation.
            </p>

            {/* QR Code */}
            <div className="flex justify-center mb-5">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <img
                  src="/myQR.jpeg"
                  alt="Support QR Code"
                  className="w-64 rounded-lg object-contain"
                />
              </div>
            </div>

            {/* Scan instruction */}
            <p className="text-center text-sm text-gray-500 mb-6">
              Scan with any UPI app
            </p>

            {/* Thank you note */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <p className="text-center text-gray-700 text-sm font-medium">
                Thank you for your support 🙏
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Link
                to="/"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
              >
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back
              </Link>

              <Link
                to="/register"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
              >
                Get Started
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              Built with ❤️ by{" "}
              <span className="font-semibold text-gray-700">
                Nauman Hussain
              </span>{" "}
              · Backend Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
