import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import supabase from "../../../createClient";
import { useTranslation } from "react-i18next";

const SettingsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    fname: "",
    mname: "",
    lname: "",
    phone_number: "",
    region: "",
    city: "",
    degree: "",
    gender: "",
    cv: "",
    description: "",
    interest: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        let userId = id;
        if (!userId) {
          const { data: authData, error: authError } =
            await supabase.auth.getUser();
          if (authError || !authData.user) {
            setLoading(false);
            return;
          }
          userId = authData.user.id;
        }

        const { data, error } = await supabase
          .from("users")
          .select(
            "email, fname, mname, lname, phone_number, region, city, degree, gender, cv, description, interest",
          )
          .eq("id", userId)
          .single();

        if (error) throw error;

        setFormData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      if (authError || !authData.user) {
        alert("User not authenticated");
        return;
      }

      const { error } = await supabase
        .from("users")
        .update(formData)
        .eq("id", authData.user.id);

      if (error) throw error;

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading)
    return <p className="text-center p-8 dark:text-white">{t("loading")}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 dark:text-white">
            {t("settings.title")}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-medium dark:text-gray-300">
                {t("email")}
              </label>
              <input
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                type="email"
                name="email"
                value={formData.email}
                disabled
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium dark:text-gray-300">
                  {t("settings.firstName")}
                </label>
                <input
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block font-medium dark:text-gray-300">
                  {t("settings.middleName")}
                </label>
                <input
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="text"
                  name="mname"
                  value={formData.mname}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block font-medium dark:text-gray-300">
                  {t("settings.lastName")}
                </label>
                <input
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block font-medium dark:text-gray-300">
                {t("settings.phone")}
              </label>
              <input
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block font-medium dark:text-gray-300">
                {t("profile.gender")}
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">{t("settings.selectGender")}</option>
                <option value="male">{t("gender.male")}</option>
                <option value="female">{t("gender.female")}</option>
                <option value="prefer_not_to_say">
                  {t("gender.prefernottosay")}
                </option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium dark:text-gray-300">
                  {t("settings.region")}
                </label>
                <select
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                >
                  <option value="">{t("settings.selectRegion")}</option>
                  <option value="1">{t("Eastern Province")}</option>
                  <option value="2">{t("Riyadh Province")}</option>
                  <option value="3">{t("Makkah Province")}</option>
                  <option value="4">{t("Madinah Province")}</option>
                </select>
              </div>

              <div>
                <label className="block font-medium dark:text-gray-300">
                  {t("settings.city")}
                </label>
                <select
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                >
                  <option value="">{t("settings.selectCity")}</option>
                  <option value="1">{t("Dammam")}</option>
                  <option value="2">{t("Riyadh")}</option>
                  <option value="3">{t("Jeddah")}</option>
                  <option value="4">{t("Medina")}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium dark:text-gray-300">
                {t("settings.degree")}
              </label>
              <select
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
              >
                <option value="">{t("settings.selectDegree")}</option>
                <option value="High School">{t("program.highschool")}</option>
                <option value="CO-OP">{t("program.coop")}</option>
                <option value="Undergraduate">
                  {t("program.undergraduate")}
                </option>
              </select>
            </div>

            <div>
              <label className="block font-medium dark:text-gray-300">
                {t("settings.cvLink")}
              </label>
              <input
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                type="url"
                name="cv"
                value={formData.cv}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block font-medium dark:text-gray-300">
                {t("settings.about")}
              </label>
              <textarea
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block font-medium dark:text-gray-300">
                {t("settings.services")}
              </label>
              <textarea
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                name="interest"
                value={formData.interest}
                onChange={handleInputChange}
                placeholder={t("settings.services.desc")}
              />
            </div>

            <button
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              onClick={handleSave}
            >
              {t("save")}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;

