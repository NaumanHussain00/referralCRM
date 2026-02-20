import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { companiesApi, profilesApi } from "../api/api";
import ProfileTable from "../components/ProfileTable";
import AnalyticsCards from "../components/AnalyticsCards";
import MessageModal from "../components/MessageModal";
import toast from "react-hot-toast";

function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingProfiles, setFetchingProfiles] = useState(false);
  const [profilesLoading, setProfilesLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

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
      navigate("/");
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
    setFetchingProfiles(true);
    try {
      const response = await companiesApi.fetchProfiles(id);
      toast.success(response.data.message);
      fetchProfiles();
      fetchCompany(); // Refresh stats
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profiles");
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
        onClick={() => navigate("/")}
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
            disabled={fetchingProfiles}
            className="btn btn-primary flex items-center gap-2"
          >
            {fetchingProfiles ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Fetching...
              </>
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
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analytics */}
      <AnalyticsCards stats={company.stats} />

      {/* Profiles Table */}
      <div className="card">
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
