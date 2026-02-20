import { useState } from "react";
import StatusDropdown from "./StatusDropdown";
import { profilesApi } from "../api/api";
import toast from "react-hot-toast";

function ProfileTable({
  profiles,
  onProfileUpdate,
  onGenerateMessage,
  loading,
}) {
  const [editingNotes, setEditingNotes] = useState(null);
  const [notesValue, setNotesValue] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const handleStatusChange = async (profileId, newStatus) => {
    setUpdatingStatus(profileId);
    try {
      await profilesApi.updateStatus(profileId, newStatus);
      onProfileUpdate();
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleNotesEdit = (profile) => {
    setEditingNotes(profile._id);
    setNotesValue(profile.notes || "");
  };

  const handleNotesSave = async (profileId) => {
    try {
      await profilesApi.updateNotes(profileId, notesValue);
      onProfileUpdate();
      setEditingNotes(null);
      toast.success("Notes updated");
    } catch (error) {
      toast.error("Failed to update notes");
      console.error(error);
    }
  };

  const handleNotesCancel = () => {
    setEditingNotes(null);
    setNotesValue("");
  };

  const getTagColor = (tag) => {
    switch (tag) {
      case "Recruiter":
        return "bg-blue-100 text-blue-800";
      case "HR":
        return "bg-purple-100 text-purple-800";
      case "Engineer":
        return "bg-green-100 text-green-800";
      case "Hiring Manager":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p>No profiles found</p>
        <p className="text-sm">
          Click "Fetch Profiles" to search for LinkedIn profiles
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tag
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {profiles.map((profile) => (
            <tr key={profile._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  {profile.name}
                </a>
              </td>
              <td className="px-6 py-4">
                <div
                  className="text-sm text-gray-900 max-w-xs truncate"
                  title={profile.title}
                >
                  {profile.title || "-"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTagColor(profile.tag)}`}
                >
                  {profile.tag}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusDropdown
                  status={profile.status}
                  onChange={(newStatus) =>
                    handleStatusChange(profile._id, newStatus)
                  }
                  disabled={updatingStatus === profile._id}
                />
              </td>
              <td className="px-6 py-4">
                {editingNotes === profile._id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={notesValue}
                      onChange={(e) => setNotesValue(e.target.value)}
                      className="input text-sm py-1 w-40"
                      autoFocus
                    />
                    <button
                      onClick={() => handleNotesSave(profile._id)}
                      className="text-green-600 hover:text-green-800"
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleNotesCancel}
                      className="text-red-600 hover:text-red-800"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => handleNotesEdit(profile)}
                    className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 max-w-xs truncate"
                    title={profile.notes || "Click to add notes"}
                  >
                    {profile.notes || (
                      <span className="text-gray-400 italic">Add notes...</span>
                    )}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onGenerateMessage(profile)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 ml-auto"
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
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  Message
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProfileTable;
