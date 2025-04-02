import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import supabase from "../../../createClient";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Fetch profile data from Supabase
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);

      // Check if there is an ID in the URL
      if (!id) {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData.user) {
          setLoading(false);
          return;
        }
        const userId = authData.user.id;
        fetchUserById(userId);
      } else {
        fetchUserById(id);
      }
    };

    const fetchUserById = async (userId) => {
      const { data, error } = await supabase
        .from("users")
        .select("fname, mname, lname, email, phone_number, age, degree, gender, cv, volunteer_hours, description, interest, cities(name, regions(name))")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("❌ Error fetching user profile:", error.message);
      } else {
        setProfileData(data);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading profile...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profileData) return <p className="text-center py-8">User not found.</p>;

  const displayProfile = profileData;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayProfile.email}`}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-semibold">
                {`${displayProfile.fname} ${displayProfile.mname} ${displayProfile.lname}`}
              </h1>
              <p className="text-gray-500">{displayProfile.email}</p>
              <p className="text-gray-500">{displayProfile.phone_number}</p>
              {/* Volunteer Hours Badge */}
              {displayProfile.volunteer_hours >= 0 && (
                <div
                  className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 ${isArabic ? "flex-row-reverse" : ""
                    }`}
                >
                  <span className={`mx-1 ${isArabic ? "ml-2" : "mr-1"}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span>
                    {isArabic
                      ? `${t("dashboard.stats.hours")} ${displayProfile.volunteer_hours}`
                      : `${displayProfile.volunteer_hours} ${t("dashboard.stats.hours")}`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description Section */}
          {displayProfile.description && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-medium mb-2">{t("profile.about")}</h2>
              <p className="text-gray-700">{displayProfile.description}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-2">{t("profile.details")}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">{t("profile.fullName")}</label>
                  <p>{`${displayProfile.fname} ${displayProfile.mname} ${displayProfile.lname}`}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">{t("profile.age")}</label>
                  <p>{displayProfile.age || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">{t("profile.gender")}</label>
                  <p>{displayProfile.gender || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">{t("profile.degree")}</label>
                  <p>{displayProfile.degree || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">{t("profile.location")}</label>
                  <p>
                    {displayProfile.cities?.regions?.name || "Unknown"}, {displayProfile.cities?.name || "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            {/* CV Link (Only Show If Available) */}
            {displayProfile.cv && (
              <div>
                <h2 className="text-lg font-medium mb-2">{t("profile.cv")}</h2>
                <a
                  href={displayProfile.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700"
                >
                  View CV
                </a>
              </div>
            )}

            {/* Interest Section */}
            {displayProfile.interest && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-medium mb-2">{t("profile.interest")}</h2>
                <p className="text-gray-700">{displayProfile.interest}</p>
              </div>
            )}

            {/* Contact Information Section */}
            <div>
              <h2 className="text-lg font-medium mb-2">{t("profile.contact")}</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <a
                    href={`mailto:${displayProfile.email}`}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    {displayProfile.email}
                  </a>
                </div>
                {displayProfile.phone_number && (
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1"
                        />
                      </svg>
                    </span>
                    <a
                      href={`tel:${displayProfile.phone_number}`}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      {displayProfile.phone_number}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
