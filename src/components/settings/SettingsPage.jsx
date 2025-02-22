import React, { useEffect, useState } from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import supabase from "../../../createClient";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    phone: "",
    region: "",
    city: "",
  });

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) {
        console.error("❌ Auth Error:", authError?.message);
        setLoading(false);
        return;
      }

      const userId = authData.user.id;
      console.log("📌 Logged-in User ID:", userId);

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("fname, mname, lname, phone_number, region, city, email")
        .eq("id", userId)
        .single();

      console.log("📌 User Data:", userData);

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
        });
      }

      setLoading(false);
    };

    const fetchRegionsAndCities = async () => {
      const { data: regionData, error: regionError } = await supabase.from("regions").select("id, name");
      if (regionError) {
        console.error("❌ Error fetching regions:", regionError.message);
      } else {
        setRegions(regionData);
      }

      const { data: cityData, error: cityError } = await supabase.from("cities").select("id, name, region_id");
      if (cityError) {
        console.error("❌ Error fetching cities:", cityError.message);
      } else {
        setCities(cityData);
      }
    };

    fetchUserData();
    fetchRegionsAndCities();
  }, []);

  const handleRegionChange = (selectedRegionId) => {
    setFormData(prev => ({
      ...prev,
      region: selectedRegionId,
      city: "",
    }));

    setFilteredCities(cities.filter(city => city.region_id.toString() === selectedRegionId));
  };

  const handleCityChange = (selectedCityId) => {
    setFormData(prev => ({
      ...prev,
      city: selectedCityId,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    console.log("Profile data to save:", formData);

    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      console.error("❌ Auth Error:", authError?.message);
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
      })
      .eq("id", userId);

    if (error) {
      console.error("❌ Error updating profile:", error.message);
    } else {
      console.log("✅ Profile updated successfully!");
    }
  };

  if (loading) return <p className="text-center py-10">Loading settings...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Settings</h1>

          <form onSubmit={handleProfileSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input type="email" name="email" value={formData.email} disabled />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Input name="first_name" value={formData.first_name} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Middle Name
                  </label>
                  <Input name="middle_name" value={formData.middle_name} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Input name="last_name" value={formData.last_name} onChange={handleInputChange} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <Input name="phone" value={formData.phone} onChange={handleInputChange} />
              </div>

              {/* Region & City Dropdowns Side by Side */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <Select onValueChange={handleRegionChange} value={formData.region}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(region => (
                        <SelectItem key={region.id} value={region.id.toString()}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <Select onValueChange={handleCityChange} value={formData.city} disabled={!formData.region}>
                    <SelectTrigger>
                      <SelectValue placeholder={formData.region ? "Select your city" : "Select a region first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCities.map(city => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
