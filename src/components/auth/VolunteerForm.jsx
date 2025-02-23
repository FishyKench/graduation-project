import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import supabase from "../../../createClient"; // ✅ Import Supabase

const VolunteerForm = ({ onSubmit = () => {} }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    middleName: "", // ✅ BACK AGAIN!
    lastName: "",
    age: "", // ✅ MOVED TO THE RIGHT SPOT
    phone: "",
    region: "",
    city: "",
    degree: "",
    interests: "",
    cvLink: "",
  });

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "region" ? { city: "" } : {}), // Reset city when region changes
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Middle Name <span className="text-red-500">*</span>
          </label>
          <Input name="middleName" value={formData.middleName} onChange={handleChange} required />
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
          Age <span className="text-red-500">*</span>
        </label>
        <Input type="number" name="age" value={formData.age} onChange={handleChange} min="15" max="65" required />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Password <span className="text-red-500">*</span>
        </label>
        <Input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={8} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>

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
          Degree <span className="text-red-500">*</span>
        </label>
        <select
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Select your degree</option>
          <option value="High School">High School</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="CO-OP">CO-OP</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Interests
        </label>
        <textarea
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[100px]"
          placeholder="Tell us about your interests and what kind of volunteer work you're looking for..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          CV Link
        </label>
        <Input
          type="url"
          name="cvLink"
          value={formData.cvLink}
          onChange={handleChange}
          placeholder="https://example.com/your-cv"
        />
      </div>

      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6">
        Create Account
      </Button>
    </form>
  );
};

export default VolunteerForm;
