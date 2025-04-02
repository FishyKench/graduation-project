import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import supabase from "../../../createClient";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";

const NewAnnouncement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "volunteer",
    title: "",
    degree: "highschool",
    location: "",
    deadline: "",
    picture: "",
    description: "",
    paid: false,
    salary: "",
    hours: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      console.error("❌ Error getting user:", authError?.message);
      return;
    }

    const orgId = authData.user.id;

    const { error } = await supabase.from("announcements").insert([
      {
        organization_id: orgId,
        type: formData.type,
        title: formData.title,
        degree: formData.degree,
        location: formData.location,
        deadline: formData.deadline,
        image_url: formData.picture,
        description: formData.description || "No description provided.",
        paid: formData.paid,
        salary: formData.paid ? parseFloat(formData.salary) || null : null,
        hours: formData.type === "volunteer" ? parseInt(formData.hours) || null : null,
      },
    ]);

    if (error) {
      console.error("❌ Error submitting announcement:", error.message);
    } else {
      navigate("/applications/manage");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-6">
            {t("announcementForm.title")}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("announcementForm.type")}
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="volunteer">{t("announcementForm.type.volunteer")}</option>
                <option value="internship">{t("announcementForm.type.internship")}</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("announcementForm.name")}
              </label>
              <Input name="title" value={formData.title} onChange={handleChange} required />
            </div>

            {/* Degree */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("announcementForm.degree")}
              </label>
              <select
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="highschool">{t("announcementForm.degree.highschool")}</option>
                <option value="undergraduate">{t("announcementForm.degree.undergraduate")}</option>
                <option value="coop">{t("announcementForm.degree.coop")}</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("announcementForm.location")}
              </label>
              <Input name="location" value={formData.location} onChange={handleChange} required />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("announcementForm.deadline")}
              </label>
              <Input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>

            {/* Picture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("announcementForm.picture")}
              </label>
              <Input
                type="url"
                name="picture"
                value={formData.picture}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            {/* Paid */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("announcementForm.paid")}
              </label>
              <select
                name="paid"
                value={formData.paid ? "paid" : "unpaid"}
                onChange={(e) => setFormData({ ...formData, paid: e.target.value === "paid" })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="unpaid">{t("announcementForm.unpaid")}</option>
                <option value="paid">{t("announcementForm.paid")}</option>
              </select>
            </div>

            {/* Salary */}
            {formData.paid && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("announcementForm.salary")}
                </label>
                <Input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder={t("announcementForm.salary.placeholder")}
                  min="0"
                  required
                />
              </div>
            )}

            {/* Hours */}
            {formData.type === "volunteer" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("announcementForm.hours")}
                </label>
                <Input
                  type="number"
                  name="hours"
                  value={formData.hours}
                  onChange={handleChange}
                  placeholder={t("announcementForm.hours.placeholder")}
                  min="1"
                  required
                />
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("announcementForm.description")}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t("announcementForm.description.placeholder")}
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <Button type="button" variant="outline" onClick={() => navigate("/applications/manage")}>
                {t("announcementForm.cancel")}
              </Button>
              <Button type="submit">{t("announcementForm.submit")}</Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewAnnouncement;
