import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import supabase from "../../../createClient";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const NewAnnouncement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "volunteer",
    title: "",
    degree: "highschool",
    location: "",
    deadline: "",
    picture: "",
    description: "",
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
      },
    ]);

    if (error) {
      console.error("❌ Error submitting announcement:", error.message);
    } else {
      navigate("/applications/manage"); // ✅ Go back after submission
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
          <h1 className="text-2xl font-semibold mb-6">New Announcement</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="volunteer">Volunteer</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <Input name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <select
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="highschool">High School</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="coop">CO-OP</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <Input name="location" value={formData.location} onChange={handleChange} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <Input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Picture URL</label>
              <Input
                type="url"
                name="picture"
                value={formData.picture}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a description..."
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button type="button" variant="outline" onClick={() => navigate("/applications/manage")}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewAnnouncement;
