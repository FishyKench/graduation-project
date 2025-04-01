import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import supabase from "../../../createClient";
import { useTranslation } from "react-i18next";

const VolunteerForm = ({ onSubmit = () => {} }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    region: "",
    city: "",
    degree: "",
    interest: "", 
    description: "",
    cvLink: "",
    gender: "",
    age: "",
  });

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const { data, error } = await supabase.from("regions").select("id, name");
        if (error) throw error;
        setRegions(data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.region) return;
      try {
        const { data, error } = await supabase.from("cities").select("id, name").eq("region_id", formData.region);
        if (error) throw error;
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [formData.region]);

  const degrees = ["High School", "Undergraduate", "CO-OP"];
  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.degree || !formData.region || !formData.city) {
      alert("Please select all required fields (degree, region, city)");
      return;
    }
    console.log("Form data before submission:", formData);
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "region" ? { city: "" } : {}),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{t("email")}</label>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{t("password")}</label>
        <Input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={8} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{t("settings.firstName")}</label>
          <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{t("settings.middleName")}</label>
          <Input name="middleName" value={formData.middleName} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{t("settings.lastName")}</label>
          <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{t("profile.phone")}</label>
        <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{t("profile.gender")}</label>
        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="" disabled>Select Gender</option>
          {genders.map((gender) => (
            <option key={gender.value} value={gender.value}>{gender.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{t("profile.age")}</label>
        <Input type="number" name="age" value={formData.age} onChange={handleChange} min={1} required />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Services Provided (Interests)</label>
        <textarea
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter your interests"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{t("settings.about.self")}</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Brief description about yourself"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{t("settings.region")}</label>
          <select name="region" value={formData.region} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="" disabled>{t("settings.selectRegion")}</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{t("settings.city")}</label>
          <select name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="" disabled>{t("settings.selectCity")}</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{t("profile.degree")}</label>
        <select name="degree" value={formData.degree} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="" disabled>{t("settings.selectDegree")}</option>
          {degrees.map((degree) => (
            <option key={degree} value={degree}>{degree}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{t("settings.cvLink")}</label>
        <Input type="url" name="cvLink" value={formData.cvLink} onChange={handleChange} placeholder="https://example.com/your-cv" />
      </div>

      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6">{t("createAccount")}</Button>
    </form>
  );
};

export default VolunteerForm;
