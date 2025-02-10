import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import supabase from "../../../createClient"; // ✅ Ensure this is correctly imported

const OrganizationForm = ({ onSubmit = () => {} }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    location: "",
    region: "",
    city: "",
  });

  const [regions, setRegions] = useState([]); // ✅ Dynamic regions
  const [cities, setCities] = useState([]); // ✅ Dynamic cities

  // Fetch Regions & Cities from Supabase
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "region" ? { city: "" } : {}), // Reset city when region changes
    }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4 w-full">
      {/* Email */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
        <Input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={8} />
      </div>

      {/* Organization Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Organization Name <span className="text-red-500">*</span></label>
        <Input name="name" value={formData.name} onChange={handleChange} required />
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
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
        <label className="block text-sm font-medium text-gray-700">Location Address <span className="text-red-500">*</span></label>
        <Input name="location" value={formData.location} onChange={handleChange} placeholder="Street address" required />
      </div>

      {/* Region & City Dropdowns */}
      <div className="grid grid-cols-2 gap-4">
        {/* Region Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Region <span className="text-red-500">*</span></label>
          <select name="region" value={formData.region} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
            <option value="">Select a region</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </select>
        </div>

        {/* City Dropdown (Filtered by Region) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">City <span className="text-red-500">*</span></label>
          <select name="city" value={formData.city} onChange={handleChange} required disabled={!formData.region} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
            <option value="">Select a city</option>
            {cities
              .filter((city) => city.region_id === parseInt(formData.region)) // ✅ Filter cities based on region
              .map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6">
        Create Account
      </Button>
    </form>
  );
};

export default OrganizationForm;
