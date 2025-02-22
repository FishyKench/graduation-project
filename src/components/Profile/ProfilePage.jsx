import React from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";

const ProfilePage = () => {
  // Sample static profile data - replace with your data management solution
  const sampleProfile = {
    id: "123",
    email: "john.doe@example.com",
    type: "personal", // or "organization"
    first_name: "John",
    middle_name: "William",
    last_name: "Doe",
    username: "johndoe",
    phone: "+1234567890",
    city: "New York",
    region: "NY",
    degree: "Bachelor of Science",
    interests: "Technology, Programming, AI",
    cv_link: "#",
  };

  const sampleOrgProfile = {
    id: "456",
    email: "contact@company.com",
    type: "organization",
    name: "Tech Company Inc.",
    phone: "+1234567890",
    location: "Downtown",
    region: "CA",
    city: "San Francisco",
  };

  // Use either profile based on type
  const profile = sampleProfile;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-semibold">
                {profile.type === "organization" 
                  ? profile.name 
                  : `${profile.first_name} ${profile.last_name}`}
              </h1>
              <p className="text-gray-500">{profile.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            {profile.type === "organization" ? (
              <>
                <div>
                  <h2 className="text-lg font-medium mb-2">
                    Organization Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Name</label>
                      <p>{profile.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p>{profile.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Location</label>
                      <p>{profile.location}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Region</label>
                      <p>{profile.region}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">City</label>
                      <p>{profile.city}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-lg font-medium mb-2">Personal Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Username</label>
                      <p>{profile.username}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p>
                        {profile.first_name} {profile.middle_name} {profile.last_name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p>{profile.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Location</label>
                      <p>
                        {profile.city}, {profile.region}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Degree</label>
                      <p>{profile.degree}</p>
                    </div>
                  </div>
                </div>

                {profile.interests && (
                  <div>
                    <h2 className="text-lg font-medium mb-2">Interests</h2>
                    <p className="text-gray-700">{profile.interests}</p>
                  </div>
                )}

                {profile.cv_link && (
                  <div>
                    <h2 className="text-lg font-medium mb-2">CV</h2>
                    <a
                      href={profile.cv_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      View CV
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;