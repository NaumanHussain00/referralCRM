import { useState } from "react";

const STATUSES = [
  { value: "not_sent", label: "Not Sent", color: "bg-gray-500" },
  { value: "sent", label: "Sent", color: "bg-blue-500" },
  { value: "accepted", label: "Accepted", color: "bg-green-500" },
  { value: "messaged", label: "Messaged", color: "bg-purple-500" },
  { value: "referred", label: "Referred", color: "bg-amber-500" },
];

function StatusDropdown({ status, onChange, disabled }) {
  const [isOpen, setIsOpen] = useState(false);

  const currentStatus = STATUSES.find((s) => s.value === status) || STATUSES[0];

  const handleSelect = (newStatus) => {
    onChange(newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium text-white ${currentStatus.color} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-90"}`}
      >
        {currentStatus.label}
        {!disabled && (
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-1 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
            <div className="py-1">
              {STATUSES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => handleSelect(s.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${status === s.value ? "bg-gray-50" : ""}`}
                >
                  <span className={`w-2 h-2 rounded-full ${s.color}`} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StatusDropdown;
