import React, { useEffect, useState } from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import supabase from "../../../createClient";

const degreeOptions = ["High School", "Undergraduate", "CO-OP"];

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    phone: "",
    region: "",
    city: "",
    degree: "",
    interest: "",
    age: "",
    cv: "",
  });

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setMessage(null);

      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) {
        console.error("❌ Auth Error:", authError?.message);
        setLoading(false);
        return;
      }

      const userId = authData.user.id;

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("fname, mname, lname, phone_number, region, city, email, degree, interest, age, cv")
        .eq("id", userId)
        .single();

      if (userError) {
        console.error("❌ Error fetching user data:", userError.message);
      } else {
        setFormData({
          email: userData.email || "",
          first_name: userData.fname || "",
          middle_name: userData.mname || "",
          last_name: userData.lname || "",
          phone: userData.phone_number || "",
          region: userData.region || "",
          city: userData.city || "",
          degree: userData.degree || "High School",
          interest: userData.interest || "",
          age: userData.age || "",
          cv: userData.cv || "",
        });
      }

      setLoading(false);
    };

    const fetchRegionsAndCities = async () => {
      const { data: regionData, error: regionError } = await supabase.from("regions").select("id, name");
      if (!regionError) setRegions(regionData);

      const { data: cityData, error: cityError } = await supabase.from("cities").select("id, name, region_id");
      if (!cityError) setCities(cityData);
    };

    fetchUserData();
    fetchRegionsAndCities();
  }, []);

  const handleRegionChange = (selectedRegionId) => {
    setFormData(prev => ({ ...prev, region: selectedRegionId, city: "" }));
    setFilteredCities(cities.filter(city => city.region_id.toString() === selectedRegionId));
  };

  const handleCityChange = (selectedCityId) => {
    setFormData(prev => ({ ...prev, city: selectedCityId }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      setMessage({ type: "error", text: "Authentication error. Please log in again." });
      return;
    }

    const userId = authData.user.id;

    const { error } = await supabase
      .from("users")
      .update({
        fname: formData.first_name,
        mname: formData.middle_name,
        lname: formData.last_name,
        phone_number: formData.phone,
        region: formData.region,
        city: formData.city,
        degree: formData.degree,
        interest: formData.interest,
        age: formData.age,
        cv: formData.cv,
      })
      .eq("id", userId);

    if (error) {
      setMessage({ type: "error", text: "Error updating profile. Try again later." });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully!" });
    }
  };

  if (loading) return <p className="text-center py-10">Loading settings...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Settings</h1>

          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-center ${
                message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input type="email" name="email" value={formData.email} disabled />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <Input name="first_name" value={formData.first_name} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                  <Input name="middle_name" value={formData.middle_name} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <Input name="last_name" value={formData.last_name} onChange={handleInputChange} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input name="phone" value={formData.phone} onChange={handleInputChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, degree: value }))} value={formData.degree}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your degree" />
                  </SelectTrigger>
                  <SelectContent>
                    {degreeOptions.map((deg) => (
                      <SelectItem key={deg} value={deg}>{deg}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
                <textarea
                  name="interest"
                  value={formData.interest}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <Input type="number" name="age" value={formData.age} onChange={handleInputChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CV Link</label>
                <Input type="url" name="cv" value={formData.cv} onChange={handleInputChange} />
              </div>

              <Button type="submit" className="w-full">Save Changes</Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;
