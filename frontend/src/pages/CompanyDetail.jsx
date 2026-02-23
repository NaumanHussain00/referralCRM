import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { companiesApi, profilesApi } from "../api/api";
import { useAuth } from "../context/AuthContext";
import ProfileTable from "../components/ProfileTable";
import AnalyticsCards from "../components/AnalyticsCards";
import MessageModal from "../components/MessageModal";
import toast from "react-hot-toast";

const MAX_UNVERIFIED_SEARCHES = 3;

function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  const [company, setCompany] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingProfiles, setFetchingProfiles] = useState(false);
  const [profilesLoading, setProfilesLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const profilesTableRef = useRef(null);

  useEffect(() => {
    fetchCompany();
    fetchProfiles();
  }, [id]);

  const fetchCompany = async () => {
    try {
      const response = await companiesApi.getById(id);
      setCompany(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch company");
      console.error(error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchProfiles = async () => {
    setProfilesLoading(true);
    try {
      const response = await profilesApi.getByCompany(id);
      setProfiles(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch profiles");
      console.error(error);
    } finally {
      setProfilesLoading(false);
    }
  };

  const handleFetchProfiles = async () => {
    // Check search limit for unverified users
    if (
      user &&
      !user.isEmailVerified &&
      (user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES
    ) {
      toast.error(
        "Search limit reached. Please verify your email for unlimited searches.",
      );
      return;
    }

    setFetchingProfiles(true);
    try {
      const response = await companiesApi.fetchProfiles(id);
      toast.success(response.data.message);
      fetchProfiles();
      fetchCompany(); // Refresh stats
      refreshUser(); // Refresh user to get updated searchCount

      // Scroll to profiles table after a brief delay
      setTimeout(() => {
        profilesTableRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch profiles";
      toast.error(errorMessage);

      // Refresh user if limit was reached
      if (error.response?.data?.searchLimitReached) {
        refreshUser();
      }
      console.error(error);
    } finally {
      setFetchingProfiles(false);
    }
  };

  const handleGenerateMessage = (profile) => {
    setSelectedProfile(profile);
    setShowMessageModal(true);
  };

  const handleProfileUpdate = () => {
    fetchProfiles();
    fetchCompany(); // Refresh stats
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Company not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </button>

      {/* Unverified Email Search Limit Banner */}
      {user && !user.isEmailVerified && (
        <div
          className={`rounded-lg border p-4 mb-6 ${(user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES ? "bg-gradient-to-r from-red-50 to-orange-50 border-red-200" : "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200"}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${(user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES ? "bg-red-100" : "bg-yellow-100"}`}
              >
                <svg
                  className={`w-5 h-5 ${(user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES ? "text-red-600" : "text-yellow-600"}`}
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
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {(user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES
                    ? "Search limit reached"
                    : "Unverified email - Limited searches"}
                </p>
                <p
                  className={`text-xl font-bold ${(user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES ? "text-red-600" : "text-yellow-700"}`}
                >
                  {user.searchCount || 0} / {MAX_UNVERIFIED_SEARCHES} searches
                  used
                </p>
              </div>
            </div>
            <div className="text-right">
              <Link
                to="/settings"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline"
              >
                Verify your email
              </Link>
              <p className="text-xs text-gray-500 mt-1">
                for unlimited searches
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Company Info */}
      <div className="card mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {company.companyName}
            </h2>
            <p className="text-lg text-gray-600">{company.role}</p>
            {company.location && (
              <p className="text-sm text-gray-500 mt-1">{company.location}</p>
            )}
          </div>
          <button
            onClick={handleFetchProfiles}
            disabled={
              fetchingProfiles ||
              (user &&
                !user.isEmailVerified &&
                (user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES)
            }
            className="btn btn-primary flex items-center gap-2"
          >
            {fetchingProfiles ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Fetching...
              </>
            ) : user &&
              !user.isEmailVerified &&
              (user.searchCount || 0) >= MAX_UNVERIFIED_SEARCHES ? (
              <>Limit Reached</>
            ) : (
              <>
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Fetch Profiles
                {user && !user.isEmailVerified
                  ? ` (${MAX_UNVERIFIED_SEARCHES - (user.searchCount || 0)} left)`
                  : ""}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analytics */}
      <AnalyticsCards stats={company.stats} />

      {/* Profiles Table */}
      <div ref={profilesTableRef} className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Profiles ({profiles.length})
          </h3>
        </div>

        <ProfileTable
          profiles={profiles}
          onProfileUpdate={handleProfileUpdate}
          onGenerateMessage={handleGenerateMessage}
          loading={profilesLoading}
        />
      </div>

      {/* Message Modal */}
      <MessageModal
        isOpen={showMessageModal}
        onClose={() => {
          setShowMessageModal(false);
          setSelectedProfile(null);
        }}
        profile={selectedProfile}
        companyName={company.companyName}
        role={company.role}
      />
    </div>
  );
}

export default CompanyDetail;
