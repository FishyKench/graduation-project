import React, { useEffect, useState } from "react";
import supabase from "../../../createClient";

const ApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);

      // ✅ Get logged-in user
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) {
        console.error("❌ Authentication error:", authError?.message);
        setLoading(false);
        return;
      }

      const userId = authData.user.id;

      // ✅ Fetch applications & join with users to get organization name
      const { data, error } = await supabase
        .from("applications")
        .select("id, status, created_at, users!applications_organization_id_fkey(fname)")
        .eq("user_id", userId);

      if (error) {
        console.error("❌ Error fetching applications:", error.message);
      } else {
        setApplications(data);
      }

      setLoading(false);
    };

    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4">Application Status</h1>

        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : applications.length === 0 ? (
          <p className="text-center py-4">No applications found.</p>
        ) : (
          <ul className="space-y-4">
            {applications.map((app) => (
              <li key={app.id} className="p-4 bg-gray-100 rounded-lg">
                <p className="text-lg font-medium">
                  Organization: {app.users?.fname || "Unknown"}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    Submitted on: {new Date(app.created_at).toLocaleDateString()}
                  </span>
                  <span className={`px-3 py-1 rounded-lg ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;
