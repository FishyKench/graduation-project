import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import supabase from "../../createClient"; // ✅ Import Supabase

const RegisterForm = ({ onSubmit = () => {} }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    region: "",
    city: "",
    age: "",
  });

  const [regions, setRegions] = useState([]); // ✅ Fetch from DB
  const [cities, setCities] = useState([]); // ✅ Fetch from DB
  const [loading, setLoading] = useState(true);

  // ✅ Fetch regions and cities from the database
  useEffect(() => {
    const fetchRegions = async () => {
      const { data, error } = await supabase.from("regions").select("id, name");
      if (!error) setRegions(data);
    };

    const fetchCities = async () => {
      const { data, error } = await supabase.from("cities").select("id, name");
      if (!error) setCities(data);
    };

    Promise.all([fetchRegions(), fetchCities()]).then(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>

      {/* ✅ Dynamically Loaded Regions */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Region <span className="text-red-500">*</span>
        </label>
        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Select a region</option>
          {loading ? (
            <option>Loading...</option>
          ) : (
            regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))
          )}
        </select>
      </div>

      {/* ✅ Dynamically Loaded Cities */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          City <span className="text-red-500">*</span>
        </label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Select a city</option>
          {loading ? (
            <option>Loading...</option>
          ) : (
            cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Age <span className="text-red-500">*</span>
        </label>
        <Input type="number" name="age" value={formData.age} onChange={handleChange} min="15" max="65" required />
      </div>

      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6">
        Verify Email
      </Button>
    </form>
  );
};

export default RegisterForm;
