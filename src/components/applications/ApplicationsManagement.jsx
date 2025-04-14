import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import supabase from "../../../createClient";
import { Button } from "../ui/button";
import { ArrowLeft, ClipboardList, PlusCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";


const ApplicationsManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmedHours, setConfirmedHours] = useState({});
  const [confirmingIds, setConfirmingIds] = useState(new Set());
  const [filterDegree, setFilterDegree] = useState("");
const [sortBy, setSortBy] = useState("");


  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) {
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
          id, fname, mname, lname, gender, degree, age, cv, email,
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
        prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
      );
  
      if (newStatus === "approved") {
        const announcementHours = getAnnouncementHours();
        setConfirmedHours((prev) => ({
          ...prev,
          [appId]: announcementHours,
        }));
  
        const approvedApp = applications.find((a) => a.id === appId);
        const announcement = announcements.find((a) => a.id === selectedAnnouncement);
  
        if (approvedApp) {
          console.log("📤 Attempting to send email...");
  
          const payload = {
            to_name: `${approvedApp.users?.fname || "Unknown"} ${approvedApp.users?.lname || ""}`,
            to_email: approvedApp.users?.email || "",
            announcement_title: announcement?.title || "an opportunity",
          };
  
          console.log("📧 Payload to EmailJS:", payload);
  
          if (payload.to_email && payload.to_email.includes("@")) {
            emailjs
              .send("service_yhjmnef", "template_khmyg9u", payload, "O8BXGQavAHmhgqeeL")
              .then(
                (res) => {
                  console.log("✅ EmailJS sent:", res.status, res.text);
                },
                (err) => {
                  console.error("❌ EmailJS failed:", err);
                }
              );
          } else {
            console.warn("⚠️ No valid email found. Skipping email send.");
          }
        }
      }
    } else {
      console.error("❌ Supabase status update failed:", error);
    }
  };
  

  const confirmHours = async (appId, hours) => {
    const app = applications.find((a) => a.id === appId);
    if (!app || !app.users?.id || app.confirmed || confirmingIds.has(appId)) return;

    const volunteerId = app.users.id;
    const confirmed = parseInt(hours) || 0;

    setConfirmingIds((prev) => new Set(prev).add(appId));

    const { error: appErr } = await supabase
      .from("applications")
      .update({ completed_hours: confirmed, confirmed: true })
      .eq("id", appId);

    if (appErr) {
      setConfirmingIds((prev) => {
        const updated = new Set(prev);
        updated.delete(appId);
        return updated;
      });
      return;
    }

    const { error: userErr } = await supabase.rpc("increment_volunteer_hours", {
      user_id_input: volunteerId,
      added_hours: confirmed,
    });

    setConfirmingIds((prev) => {
      const updated = new Set(prev);
      updated.delete(appId);
      return updated;
    });

    if (!userErr) {
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
                  {t("admin.applications.title")}
                </h1>
                <Button
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  onClick={() => navigate("/applications/new")}
                >
                  <PlusCircle className="w-4 h-4" />
                  {t("admin.applications.new")}
                </Button>
              </div>

              {loading ? (
                <p className="text-center py-4 text-gray-600">{t("loading")}</p>
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
                          {t("applications.details.date")}:{" "}
                          {new Date(announcement.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        onClick={() => fetchApplications(announcement.id)}
                      >
                        {t("admin.applications.view")}
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
                <ArrowLeft className="w-4 h-4" /> {t("admin.applications.back")}
              </Button>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{t("applications.title")}</h2>
              {loading ? (
                <p className="text-center py-4 text-gray-600">{t("loading")}</p>
              ) : applications.length === 0 ? (
                <p className="text-center py-4 text-gray-600">{t("applications.none")}</p>
              ) : (
                
                <ul className="space-y-4">
                  <div className="flex flex-wrap gap-4 mb-4">
  {/* Degree Filter */}
  <select
    className="border rounded px-2 py-1 text-sm"
    value={filterDegree}
    onChange={(e) => setFilterDegree(e.target.value)}
  >
    <option value="">All Degrees</option>
    <option value="High School">High School</option>
    <option value="CO-OP">CO-OP</option>
    <option value="Undergraduate">Undergraduate</option>
  </select>

  {/* Hours Sort */}
  <select
    className="border rounded px-2 py-1 text-sm"
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="">Sort by</option>
    <option value="most">Most Hours</option>
    <option value="least">Least Hours</option>
  </select>
</div>

{applications
  .filter((app) => {
    if (filterDegree && app.users?.degree !== filterDegree) return false;
    return true;
  })
  .sort((a, b) => {
    if (sortBy === "most") return (b.completed_hours || 0) - (a.completed_hours || 0);
    if (sortBy === "least") return (a.completed_hours || 0) - (b.completed_hours || 0);
    return 0;
  })
  .map((app) => (

                    <li key={app.id} className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => navigate(`/profile/${app.users?.id}`)}
                          className="text-lg font-semibold text-blue-600 hover:underline"
                        >
                          {app.users?.fname} {app.users?.mname} {app.users?.lname}
                        </button>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusClass(app.status)}`}
                        >
                          {t(`applications.status.${app.status}`)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {t("profile.gender")}: {app.users?.gender || "N/A"} | {t("profile.age")}: {app.users?.age || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">{t("profile.degree")}: {app.users?.degree}</p>
                      <p className="text-sm text-gray-600">
                        {t("profile.location")}: {app.users?.cities?.regions?.name}, {app.users?.cities?.name}
                      </p>
                      {app.users?.cv && (
                        <a
                          href={app.users.cv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm block mt-2"
                        >
                          {t("profile.cv")}
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
                              className={`w-24 p-1 border rounded text-sm ${app.confirmed ? "bg-gray-100 text-gray-500" : "bg-white"}`}
                              disabled={app.confirmed}
                            />
                            {!app.confirmed ? (
                              <Button
                                className="bg-purple-600 hover:bg-purple-700 text-white text-sm"
                                onClick={() =>
                                  confirmHours(app.id, confirmedHours[app.id] ?? getAnnouncementHours())
                                }
                                disabled={confirmingIds.has(app.id)}
                              >
                                {t("admin.applications.confirm")}
                              </Button>
                            ) : (
                              <span className="text-green-700 text-sm font-medium">
                                ✔ {t("admin.applications.confirmed")}
                              </span>
                            )}
                          </>
                        )}

                        {app.status === "pending" && (
                          <>
                            <Button
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => updateApplicationStatus(app.id, "approved")}
                            >
                              {t("admin.applications.approve")}
                            </Button>
                            <Button
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => updateApplicationStatus(app.id, "rejected")}
                            >
                              {t("admin.applications.reject")}
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
