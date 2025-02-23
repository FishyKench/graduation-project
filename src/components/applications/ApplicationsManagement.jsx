import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import supabase from "../../../createClient";
import { Button } from "../ui/button";

const ApplicationsManagement = () => {
  const navigate = useNavigate();
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

      // ✅ Check if user is an organization
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, level")
        .eq("id", userId)
        .single();

      if (userError) {
        console.error("❌ Error fetching user details:", userError.message);
        setLoading(false);
        return;
      }

      if (userData.level !== 2) {
        console.error("❌ User is not an organization");
        setLoading(false);
        return;
      }

      // ✅ Fetch applications with user details, including `gender`
      const { data, error } = await supabase
        .from("applications")
        .select(`
          id, user_id, status, created_at,
          users!applications_user_id_fkey (
            fname, mname, lname, age, gender, degree, cv,
            cities ( name, regions ( name ) )
          )
        `)
        .eq("organization_id", userId);

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

  const updateApplicationStatus = async (appId, newStatus) => {
    const { error } = await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", appId);

    if (error) {
      console.error("❌ Error updating status:", error.message);
    } else {
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-4">Manage Applications</h1>

          {loading ? (
            <p className="text-center py-4">Loading...</p>
          ) : applications.length === 0 ? (
            <p className="text-center py-4">No applications found.</p>
          ) : (
            <ul className="space-y-4">
              {applications.map((app) => (
                <li key={app.id} className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    {/* ✅ Applicant Name is now a Clickable Link */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/profile/${app.user_id}`)}
                        className="font-semibold text-lg text-blue-600 hover:underline"
                      >
                        {app.users?.fname} {app.users?.mname} {app.users?.lname}
                      </button>
                      <span className={`px-3 py-1 rounded-lg text-lg font-semibold ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                  </div>

                  {/* ✅ Extra Details */}
                  <p className="text-sm text-gray-600">Gender: {app.users?.gender || "N/A"}</p>
                  <p className="text-sm text-gray-600">Age: {app.users?.age || "N/A"}</p>
                  <p className="text-sm text-gray-600">Degree: {app.users?.degree}</p>
                  <p className="text-sm text-gray-600">
                    Location: {app.users?.cities?.regions?.name}, {app.users?.cities?.name}
                  </p>


                  {app.users?.cv && (
                    <a
                      href={app.users.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View CV
                    </a>
                  )}

                  {/* ✅ Status Update Buttons */}
                  <div className="flex gap-2 mt-3">
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => updateApplicationStatus(app.id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      onClick={() => updateApplicationStatus(app.id, "pending")}
                    >
                      Pending
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => updateApplicationStatus(app.id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationsManagement;
