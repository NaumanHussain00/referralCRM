import { useState } from "react";

function AddCompanyModal({ isOpen, onClose, onSubmit }) {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName.trim() || !role.trim()) return;

    setLoading(true);
    try {
      await onSubmit({ companyName, role, location });
      setCompanyName("");
      setRole("");
      setLocation("");
      onClose();
    } finally {
      setLoading(false);
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

        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-left">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Add Target Company
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

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="label">Company Name *</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Google"
                className="input"
                required
              />
            </div>

            <div className="mb-4">
              <label className="label">Role *</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Software Engineer, SDE, Talent Acquisition"
                className="input"
                required
              />
            </div>

            <div className="mb-6">
              <label className="label">Location (Optional)</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., San Francisco, CA"
                className="input"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !companyName.trim() || !role.trim()}
                className="btn btn-primary disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Company"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCompanyModal;
