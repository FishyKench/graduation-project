import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const NewApplicationForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    fieldOfStudy: "Computer Science",
    contactNumber: "",
    city: "Dammam",
    age: "",
    program_type: "High School",
    cv: null,
    status: "pending"
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the success callback with the form data
      onSuccess?.(formData);
      onClose?.();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, cv: file }));
  };

  const cities = ["Dammam", "Riyadh", "Jeddah", "Mecca", "Medina"];
  const fields = [
    "Computer Science",
    "Engineering",
    "Business",
    "Medicine",
    "Arts",
  ];
  const programs = ["High School", "Undergraduate", "CO-OP"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg">
      <div className="text-2xl font-semibold mb-6">Application Form</div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Middle Name
          </label>
          <Input
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Field of Study
        </label>
        <select
          name="fieldOfStudy"
          value={formData.fieldOfStudy}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Contact Number <span className="text-red-500">*</span>
        </label>
        <Input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="05XXXXXXXX"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            City <span className="text-red-500">*</span>
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Age <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="15"
            max="65"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Program Type <span className="text-red-500">*</span>
        </label>
        <select
          name="program_type"
          value={formData.program_type}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          required
        >
          {programs.map((program) => (
            <option key={program} value={program}>
              {program}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Upload Additional File
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-500">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-sm text-gray-600">
              Click to upload or drag and drop
            </div>
            <div className="text-xs text-gray-500 mt-1">Max file size 25MB</div>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default NewApplicationForm;