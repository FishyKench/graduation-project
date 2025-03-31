import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import supabase from "../../../createClient";
import { Button } from "../ui/button";
import { ArrowLeft, ClipboardList, PlusCircle } from "lucide-react";

const ApplicationsManagement = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmedHours, setConfirmedHours] = useState({});

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);

      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) {
        console.error("❌ Authentication error:", authError?.message);
        setLoading(false);
        return;
      }

      const userId = authData.user.id;

      const { data, error } = await supabase
        .from("announcements")
        .select("id, title, created_at, hours")
        .eq("organization_id", userId);

      if (!error) setAnnouncements(data);
      setLoading(false);
    };

    fetchAnnouncements();
  }, []);

  const fetchApplications = async (announcementId) => {
    setSelectedAnnouncement(announcementId);
    setLoading(true);

    const { data, error } = await supabase
      .from("applications")
      .select(`
        id, status, created_at, completed_hours, confirmed,
        users!applications_user_id_fkey (
          id, fname, mname, lname, gender, degree, age, cv,
          cities ( name, regions ( name ) )
        )
      `)
      .eq("announcement_id", announcementId);

    if (!error) setApplications(data);
    setLoading(false);
  };

  const updateApplicationStatus = async (appId, newStatus) => {
    const { error } = await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", appId);

    if (!error) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === appId ? { ...app, status: newStatus } : app
        )
      );

      if (newStatus === "approved") {
        const announcementHours = getAnnouncementHours();
        setConfirmedHours((prev) => ({
          ...prev,
          [appId]: announcementHours,
        }));
      }
    }
  };

  const confirmHours = async (appId, hours) => {
    const app = applications.find((a) => a.id === appId);
    if (!app || !app.users?.id) return;

    const volunteerId = app.users.id;
    const confirmed = parseInt(hours) || 0;

    const { error: appErr } = await supabase
      .from("applications")
      .update({ completed_hours: confirmed, confirmed: true })
      .eq("id", appId);

    const { error: userErr } = await supabase.rpc("increment_volunteer_hours", {
      user_id_input: volunteerId,
      added_hours: confirmed,
    });

    if (!appErr && !userErr) {
      setApplications((prev) =>
        prev.map((a) =>
          a.id === appId ? { ...a, completed_hours: confirmed, confirmed: true } : a
        )
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-400";
      case "approved":
        return "bg-green-100 text-green-800 border-green-400";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-400";
    }
  };

  const getAnnouncementHours = () => {
    const current = announcements.find((a) => a.id === selectedAnnouncement);
    return current?.hours || 0;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {!selectedAnnouncement ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <ClipboardList className="w-6 h-6 text-blue-600" />
                  Your Announcements
                </h1>
                <Button
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  onClick={() => navigate("/applications/new")}
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Announcement
                </Button>
              </div>

              {loading ? (
                <p className="text-center py-4 text-gray-600">Loading...</p>
              ) : (
                <div className="grid gap-4">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="p-4 bg-blue-50 border border-blue-300 rounded-lg shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <button
                          onClick={() => navigate(`/opportunities/${announcement.id}`)}
                          className="text-lg font-semibold text-blue-700 hover:underline"
                        >
                          {announcement.title}
                        </button>
                        <p className="text-sm text-gray-600">
                          Posted: {new Date(announcement.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        onClick={() => fetchApplications(announcement.id)}
                      >
                        View Applications
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <Button
                className="mb-6 flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                onClick={() => setSelectedAnnouncement(null)}
              >
                <ArrowLeft className="w-4 h-4" /> Back to Announcements
              </Button>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Volunteer Applications</h2>
              {loading ? (
                <p className="text-center py-4 text-gray-600">Loading...</p>
              ) : applications.length === 0 ? (
                <p className="text-center py-4 text-gray-600">No applications found.</p>
              ) : (
                <ul className="space-y-4">
                  {applications.map((app) => (
                    <li key={app.id} className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => navigate(`/profile/${app.users?.id}`)}
                          className="text-lg font-semibold text-blue-600 hover:underline"
                        >
                          {app.users?.fname} {app.users?.mname} {app.users?.lname}
                        </button>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusClass(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Gender: {app.users?.gender || "N/A"} | Age: {app.users?.age || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">Degree: {app.users?.degree}</p>
                      <p className="text-sm text-gray-600">
                        Location: {app.users?.cities?.regions?.name}, {app.users?.cities?.name}
                      </p>
                      {app.users?.cv && (
                        <a
                          href={app.users.cv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm block mt-2"
                        >
                          View CV
                        </a>
                      )}

                      <div className="flex gap-2 mt-3 items-center flex-wrap">
                        {app.status === "approved" && (
                          <>
                            <input
                              type="number"
                              min={0}
                              value={confirmedHours[app.id] ?? getAnnouncementHours()}
                              onChange={(e) => {
                                if (!app.confirmed) {
                                  setConfirmedHours({
                                    ...confirmedHours,
                                    [app.id]: e.target.value,
                                  });
                                }
                              }}
                              className={`w-24 p-1 border rounded text-sm ${
                                app.confirmed ? "bg-gray-100 text-gray-500" : "bg-white"
                              }`}
                              disabled={app.confirmed}
                            />
                            {!app.confirmed ? (
                              <Button
                                className="bg-purple-600 hover:bg-purple-700 text-white text-sm"
                                onClick={() =>
                                  confirmHours(app.id, confirmedHours[app.id] ?? getAnnouncementHours())
                                }
                              >
                                Confirm
                              </Button>
                            ) : (
                              <span className="text-green-700 text-sm font-medium">✔ Confirmed</span>
                            )}
                          </>
                        )}

                        {app.status === "pending" && (
                          <>
                            <Button
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => updateApplicationStatus(app.id, "approved")}
                            >
                              Approve
                            </Button>
                            <Button
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => updateApplicationStatus(app.id, "rejected")}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationsManagement;
