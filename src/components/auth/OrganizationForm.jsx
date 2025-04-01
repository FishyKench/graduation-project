import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import supabase from "../../../createClient"; // ✅ Ensure correct import
import { useTranslation } from "react-i18next";

const OrganizationForm = ({ onSubmit = () => {} }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "", // ✅ This will be stored in fname
    phone: "",
    location: "",
    region: "",
    city: "",
  });

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Added navigation

  // ✅ Fetch Regions & Cities from Supabase
  useEffect(() => {
    const fetchRegions = async () => {
      const { data, error } = await supabase.from("regions").select("id, name");
      if (!error) setRegions(data);
    };

    const fetchCities = async () => {
      const { data, error } = await supabase.from("cities").select("id, name, region_id");
      if (!error) setCities(data);
    };

    fetchRegions();
    fetchCities();
  }, []);

  // ✅ Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "region" ? { city: "" } : {}),
    }));
  };

  // ✅ Register organization & store name in fname
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    console.log("🔵 Attempting signup for:", formData.email);

    // ✅ Step 1: Register user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (authError) {
      console.error("❌ Supabase Auth Error:", authError.message);
      alert(authError.message);
      setLoading(false);
      return;
    }

    console.log("✅ Auth Signup Successful:", authData);

    const userId = authData.user.id;

    // ✅ Step 2: Insert organization into `users` table with fname
    const { data, error } = await supabase.from("users").insert([
      {
        id: userId,
        fname: formData.name, // ✅ Store organization name in fname
        phone_number: formData.phone,
        location: formData.location,
        region: parseInt(formData.region),
        city: parseInt(formData.city),
        level: 2, // ✅ Level 2 for organizations
        email: formData.email,
      },
    ]);

    if (error) {
      console.error("❌ Database Insert Error:", error.message);
      alert(error.message);
      setLoading(false);
      return;
    }

    console.log("✅ Organization Registered Successfully:", data);
    setLoading(false);
    
    navigate("/"); // ✅ Redirect to home after signup
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {/* Email */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
        {t("email")} <span className="text-red-500">*</span>
        </label>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
        {t("password")} <span className="text-red-500">*</span>
        </label>
        <Input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={8} />
      </div>

      {/* Organization Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
        {t("settings.org.name")} <span className="text-red-500">*</span>
        </label>
        <Input name="name" value={formData.name} onChange={handleChange} required />
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
        {t("profile.phone")} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-[100px_1fr] gap-2">
          <div className="flex items-center space-x-2 border rounded-md px-3 py-2">
            <img src="https://flagcdn.com/w20/sa.png" alt="Saudi Flag" className="w-5" />
            <span className="text-sm">+966</span>
          </div>
          <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="5XXXXXXXX" pattern="[0-9]{9}" required />
        </div>
      </div>

      {/* Location Address */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
        {t("profile.location")} <span className="text-red-500">*</span>
        </label>
        <Input name="location" value={formData.location} onChange={handleChange} placeholder={t("Street address")} required />
      </div>

      {/* Region & City Dropdowns */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Region <span className="text-red-500">*</span>
          </label>
          <select name="region" value={formData.region} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
            <option value="">{t("settings.selectRegion")}</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
          {t("settings.city")} <span className="text-red-500">*</span>
          </label>
          <select name="city" value={formData.city} onChange={handleChange} required disabled={!formData.region} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
            <option value="">{t("settings.selectCity")}</option>
            {cities
              .filter((city) => city.region_id === parseInt(formData.region))
              .map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6">
      {t("createAccount")}
      </Button>
    </form>
  );
};

export default OrganizationForm;
