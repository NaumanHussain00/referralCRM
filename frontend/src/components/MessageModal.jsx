import { useState, useEffect } from "react";
import { messagesApi } from "../api/api";
import toast from "react-hot-toast";

function MessageModal({ isOpen, onClose, profile, companyName, role }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && profile) {
      generateMessage();
    }
  }, [isOpen, profile]);

  const generateMessage = async () => {
    setLoading(true);
    try {
      const response = await messagesApi.generate({
        name: profile.name,
        companyName,
        role,
        tag: profile.tag,
      });
      setMessage(response.data.data.message);
    } catch (error) {
      toast.error("Failed to generate message");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Message copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy message");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6 text-left">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Message for {profile?.name}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <span
              className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                profile?.tag === "Recruiter"
                  ? "bg-blue-100 text-blue-800"
                  : profile?.tag === "HR"
                    ? "bg-purple-100 text-purple-800"
                    : profile?.tag === "Engineer"
                      ? "bg-green-100 text-green-800"
                      : profile?.tag === "Hiring Manager"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-gray-100 text-gray-800"
              }`}
            >
              {profile?.tag}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="mb-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="input font-mono text-sm"
              />
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <button onClick={onClose} className="btn btn-secondary">
              Close
            </button>
            <button
              onClick={copyToClipboard}
              disabled={loading}
              className="btn btn-primary flex items-center gap-2"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;
