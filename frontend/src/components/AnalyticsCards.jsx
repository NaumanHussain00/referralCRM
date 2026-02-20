function AnalyticsCards({ stats }) {
  const items = [
    { label: "Total Profiles", value: stats?.total || 0, color: "bg-gray-600" },
    { label: "Sent", value: stats?.sent || 0, color: "bg-blue-500" },
    { label: "Accepted", value: stats?.accepted || 0, color: "bg-green-500" },
    { label: "Messaged", value: stats?.messaged || 0, color: "bg-purple-500" },
    { label: "Referred", value: stats?.referred || 0, color: "bg-amber-500" },
  ];

  const total = stats?.total || 1; // Prevent division by zero

  return (
    <div className="card mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Outreach Analytics
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <div
              className={`text-3xl font-bold ${item.color.replace("bg-", "text-")}`}
            >
              {item.value}
            </div>
            <div className="text-sm text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bars */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Sent</span>
            <span className="text-gray-500">
              {Math.round(((stats?.sent || 0) / total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((stats?.sent || 0) / total) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Accepted</span>
            <span className="text-gray-500">
              {Math.round(((stats?.accepted || 0) / total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((stats?.accepted || 0) / total) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Messaged</span>
            <span className="text-gray-500">
              {Math.round(((stats?.messaged || 0) / total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((stats?.messaged || 0) / total) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Referred</span>
            <span className="text-gray-500">
              {Math.round(((stats?.referred || 0) / total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((stats?.referred || 0) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCards;
