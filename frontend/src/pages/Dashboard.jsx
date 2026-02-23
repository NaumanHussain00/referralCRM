import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { companiesApi, authApi } from "../api/api";
import AddCompanyModal from "../components/AddCompanyModal";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const MAX_UNVERIFIED_SEARCHES = 3;

function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleResendVerification = async () => {
    setResendLoading(true);
    try {
      await authApi.resendVerification();
      toast.success("Verification email sent! Please check your inbox.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send verification email",
      );
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await companiesApi.getAll();
      setCompanies(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch companies");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = async (data) => {
    try {
      await companiesApi.create(data);
      toast.success("Company added successfully");
      fetchCompanies();
    } catch (error) {
      toast.error("Failed to add company");
      throw error;
    }
  };

  const handleDeleteCompany = async (id, e) => {
    e.stopPropagation();
    if (
      !window.confirm(
        "Are you sure you want to delete this company and all its profiles?",
      )
    ) {
      return;
    }

    try {
      await companiesApi.delete(id);
      toast.success("Company deleted");
      fetchCompanies();
    } catch (error) {
      toast.error("Failed to delete company");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Email Verification Banner */}
      {user && !user.isEmailVerified && (
        <div
          className={`rounded-lg p-4 mb-6 ${(user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES ? "bg-red-50 border border-red-200" : "bg-blue-50 border border-blue-200"}`}
        >
          <div className="flex items-start gap-3">
            <svg
              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${(user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES ? "text-red-600" : "text-blue-600"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3
                  className={`text-sm font-medium ${(user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES ? "text-red-800" : "text-blue-800"}`}
                >
                  {(user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES
                    ? "Search limit reached - Please verify your email"
                    : "Please verify your email address"}
                </h3>
                <span
                  className={`text-sm font-semibold px-2 py-0.5 rounded ${(user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}
                >
                  {user.searchCount || 0} / {MAX_UNVERIFIED_SEARCHES} searches
                  used
                </span>
              </div>
              <p
                className={`text-sm mt-1 ${(user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES ? "text-red-700" : "text-blue-700"}`}
              >
                We sent a verification email to <strong>{user.email}</strong>.
                {(user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES
                  ? " Verify to unlock unlimited searches."
                  : ` You have ${MAX_UNVERIFIED_SEARCHES - (user.searchCount || 0)} search${MAX_UNVERIFIED_SEARCHES - (user.searchCount || 0) !== 1 ? "es" : ""} remaining without email verification.`}
              </p>
              <button
                onClick={handleResendVerification}
                disabled={resendLoading}
                className={`mt-2 text-sm font-medium underline disabled:opacity-50 ${(user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES ? "text-red-800 hover:text-red-900" : "text-blue-800 hover:text-blue-900"}`}
              >
                {resendLoading ? "Sending..." : "Resend verification email"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Target Companies
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Company
        </button>
      </div>

      {companies.length === 0 ? (
        <div className="card text-center py-12">
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No companies yet
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by adding a target company to track.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
          >
            Add Your First Company
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <div
              key={company._id}
              className="card cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => navigate(`/company/${company._id}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {company.companyName}
                  </h3>
                  <p className="text-sm text-gray-600">{company.role}</p>
                  {company.location && (
                    <p className="text-xs text-gray-500 mt-1">
                      {company.location}
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => handleDeleteCompany(company._id, e)}
                  className="text-gray-400 hover:text-red-600 p-1"
                  title="Delete company"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {company.totalProfiles || 0}
                    </div>
                    <div className="text-gray-500">Total</div>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-600">
                      {company.sent || 0}
                    </div>
                    <div className="text-gray-500">Sent</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-600">
                      {company.accepted || 0}
                    </div>
                    <div className="text-gray-500">Accepted</div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-600">
                      {company.messaged || 0}
                    </div>
                    <div className="text-gray-500">Messaged</div>
                  </div>
                  <div>
                    <div className="font-semibold text-amber-600">
                      {company.referred || 0}
                    </div>
                    <div className="text-gray-500">Referred</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button className="btn btn-secondary w-full text-sm">
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddCompanyModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCompany}
      />
    </div>
  );
}

export default Dashboard;
