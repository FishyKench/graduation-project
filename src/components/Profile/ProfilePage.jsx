import React, { useEffect, useState } from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import supabase from "../../../createClient";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user) {
        console.error("❌ Auth Error:", authError?.message);
        setProfile(null);
        setLoading(false);
        return;
      }

      const userId = authData.user.id;

      // ✅ Fetch user details along with region & city names
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select(`
          id,
          fname,
          lname,
          phone_number,
          email,
          age,
          degree,
          interest,
          cv,
          level,
          region:regions(name),
          city:cities(name)
        `)
        .eq("id", userId)
        .single();

      console.log("📌 Full User Data:", userData); // ✅ Debugging line

      if (userError) {
        console.error("❌ Error fetching user profile:", userError.message);
        setProfile(null);
      } else {
        setProfile(userData);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center py-10">Loading profile...</p>;

  if (!profile) return <p className="text-center py-10">User not found.</p>;

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
                {profile.level === 2 // ✅ Check if it's an organization
                  ? profile.fname
                  : `${profile.fname} ${profile.lname || ""}`}
              </h1>
              <p className="text-gray-500">{profile.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            {profile.level === 2 ? (
              <>
                <h2 className="text-lg font-medium mb-2">Organization Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <p>{profile.fname}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p>{profile.phone_number}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Location</label>
                    <p>{profile.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Region</label>
                    <p>{profile.region?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">City</label>
                    <p>{profile.city?.name}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-medium mb-2">Personal Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <p>{profile.fname} {profile.lname || ""}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p>{profile.phone_number}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Age</label>
                    <p>{profile.age !== null && profile.age !== undefined ? profile.age : "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Location</label>
                    <p>{profile.city?.name}, {profile.region?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Degree</label>
                    <p>{profile.degree && profile.degree.trim() !== "" ? profile.degree : "N/A"}</p>
                  </div>
                </div>

                {profile.interest && profile.interest.trim() !== "" && (
                  <div>
                    <h2 className="text-lg font-medium mb-2">Interests</h2>
                    <p className="text-gray-700">{profile.interest}</p>
                  </div>
                )}

                {profile.cv && (
                  <div>
                    <h2 className="text-lg font-medium mb-2">CV</h2>
                    <a
                      href={profile.cv}
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
