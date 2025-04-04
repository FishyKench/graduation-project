import React, { useEffect, useState } from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import supabase from "../../../createClient";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../lib/theme-provider";

const ApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchApplications = async () => {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      if (authError || !authData.user) return;

      const userId = authData.user.id;

      const { data, error } = await supabase
        .from("applications")
        .select(
          `
          id, status, created_at,
          announcements!applications_announcement_id_fkey ( title ),
          users!applications_organization_id_fkey ( fname )
        `,
        )
        .eq("user_id", userId);

      if (!error) {
        setApplications(data);
      } else {
        console.error("Error fetching applications:", error.message);
      }
    };

    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return theme === "dark"
          ? "text-yellow-400 bg-yellow-950/50"
          : "text-yellow-600 bg-yellow-100";
      case "approved":
        return theme === "dark"
          ? "text-green-400 bg-green-950/50"
          : "text-green-600 bg-green-100";
      case "rejected":
        return theme === "dark"
          ? "text-red-400 bg-red-950/50"
          : "text-red-600 bg-red-100";
      default:
        return theme === "dark"
          ? "text-gray-400 bg-gray-800/50"
          : "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">
            {t("applications.title")}
          </h2>

          <div className="bg-card text-card-foreground rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("applications.details")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("applications.org")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("applications.status")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("applications.submittedOn")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {applications.length > 0 ? (
                  applications.map((app, index) => (
                    <tr key={app.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {app.announcements?.title ||
                          t("applications.status.unknown")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {app.users?.fname || t("applications.status.unknown")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-sm rounded-lg ${getStatusColor(app.status)}`}
                        >
                          {t(`applications.status.${app.status}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-muted-foreground"
                    >
                      {t("applications.none")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationTracker;
