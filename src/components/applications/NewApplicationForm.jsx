import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import supabase from "../../../createClient";
import { useTranslation } from "react-i18next";

const NewApplicationForm = ({ onClose, onSuccess }) => {
  const { t } = useTranslation();

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
        salary: formData.paid ? formData.salary : null,
      },
    ]);

    if (error) {
      console.error("❌ Error submitting announcement:", error.message);
    } else {
      onSuccess?.(formData);
      onClose?.();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg">
      <div className="text-2xl font-semibold mb-6">{t("announcementForm.title")}</div>

      <div className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("announcementForm.name")}
          </label>
          <Input name="title" value={formData.title} onChange={handleChange} required />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("announcementForm.location")}
          </label>
          <Input name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("announcementForm.deadline")}
          </label>
          <Input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
        </div>

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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="paid"
            checked={formData.paid}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="text-sm font-medium text-gray-700">
            {t("announcementForm.paid")}
          </label>
        </div>

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
              min="1"
              required
            />
          </div>
        )}

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
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button type="button" variant="outline" onClick={onClose}>
          {t("announcementForm.cancel")}
        </Button>
        <Button type="submit">{t("announcementForm.submit")}</Button>
      </div>
    </form>
  );
};

export default NewApplicationForm;
