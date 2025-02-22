import React, { useState } from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    email: "john.doe@example.com",
    type: "personal", // or "organization"
    name: "Tech Company Inc.",
    first_name: "John",
    last_name: "Doe",
    phone: "+1234567890",
    location: "San Francisco",
    notifications: true
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = () => {
    setFormData(prev => ({
      ...prev,
      notifications: !prev.notifications
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile data to save:", formData);
    // Add your save logic here
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password data to save:", passwords);
    // Add your password update logic here
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Settings</h1>

          <div className="space-y-6">
            {/* Profile Settings */}
            <form onSubmit={handleProfileSubmit} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email} 
                    disabled 
                  />
                </div>

                {formData.type === "organization" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organization Name
                      </label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <Input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <Input 
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <Input 
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <Input 
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <Input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}

                <Button type="submit" className="w-full">Save Changes</Button>
              </div>
            </form>

            {/* Password Settings */}
            <form onSubmit={handlePasswordSubmit} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium mb-4">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <Input 
                    type="password"
                    name="current"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <Input 
                    type="password"
                    name="new"
                    value={passwords.new}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <Input 
                    type="password"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                  />
                </div>
                <Button type="submit" variant="outline" className="w-full">
                  Update Password
                </Button>
              </div>
            </form>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium mb-4">
                Notification Settings
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Receive updates about new opportunities
                    </p>
                  </div>
                  <input 
                    type="checkbox" 
                    className="toggle" 
                    checked={formData.notifications}
                    onChange={handleNotificationToggle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;