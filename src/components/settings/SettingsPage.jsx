import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import supabase from "../../../createClient";

const SettingsPage = () => {
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
    cv: "",
    description: "",
    interest: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // Try to get the user ID from Supabase auth if not provided in the URL
        let userId = id;
        if (!userId) {
          const { data: authData, error: authError } = await supabase.auth.getUser();
          if (authError || !authData.user) {
            setLoading(false);
            return;
          }
          userId = authData.user.id;
        }

        const { data, error } = await supabase
          .from("users")
          .select(
            "email, fname, mname, lname, phone_number, region, city, degree, cv, description, interest"
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
      const { data: authData, error: authError } = await supabase.auth.getUser();
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="block font-medium">Email</label>
              <input
                className="w-full p-2 border rounded"
                type="email"
                name="email"
                value={formData.email}
                disabled
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">First Name</label>
                <input
                  className="w-full p-2 border rounded"
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block font-medium">Middle Name</label>
                <input
                  className="w-full p-2 border rounded"
                  type="text"
                  name="mname"
                  value={formData.mname}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block font-medium">Last Name</label>
                <input
                  className="w-full p-2 border rounded"
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Region</label>
                <select
                  className="w-full p-2 border rounded"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                >
                  <option value="">Select a region</option>
                  <option value="1">Eastern Province</option>
                  <option value="2">Riyadh Province</option>
                  <option value="3">Makkah Province</option>
                  <option value="4">Madinah Province</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">City</label>
                <select
                  className="w-full p-2 border rounded"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                >
                  <option value="">Select a city</option>
                  <option value="1">Dammam</option>
                  <option value="2">Riyadh</option>
                  <option value="3">Jeddah</option>
                  <option value="4">Medina</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium">Phone Number</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block font-medium">Degree</label>
              <select
                className="w-full p-2 border rounded"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
              >
                <option value="">Select your degree</option>
                <option value="High School">High School</option>
                <option value="CO-OP">CO-OP</option>
                <option value="Undergraduate">Undergraduate</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">CV Link</label>
              <input
                className="w-full p-2 border rounded"
                type="url"
                name="cv"
                value={formData.cv}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block font-medium">Description</label>
              <textarea
                className="w-full p-2 border rounded"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block font-medium">Interest</label>
              <textarea
                className="w-full p-2 border rounded"
                name="interest"
                value={formData.interest}
                onChange={handleInputChange}
              />
            </div>

            <button
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;
