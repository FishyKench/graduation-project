import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import supabase from "../../../createClient";

const ProfilePage = () => {
  const { id } = useParams(); // 🔥 Get user ID from URL if available
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);

      // ✅ If no ID is in the URL, load the logged-in user's profile
      if (!id) {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData.user) {
          setLoading(false);
          return;
        }
        const userId = authData.user.id;
        fetchUserById(userId);
      } else {
        // ✅ If there's an ID in the URL, load THAT user's profile
        fetchUserById(id);
      }
    };

    const fetchUserById = async (userId) => {
      const { data, error } = await supabase
        .from("users")
        .select("fname, mname, lname, email, age, degree, gender, cv, cities(name, regions(name))")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("❌ Error fetching user profile:", error.message);
      } else {
        setUser(data);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [id]);

  if (loading) return <p className="text-center py-8">Loading profile...</p>;
  if (!user) return <p className="text-center py-8">User not found.</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            {/* ✅ Profile Picture (Dynamic Avatar) */}
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
              alt="Profile"
              className="w-24 h-24 rounded-full border border-gray-300"
            />

            <div>
              <h1 className="text-2xl font-semibold">
                {user.fname} {user.mname} {user.lname}
              </h1>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* ✅ Profile Details */}
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="text-lg font-medium">{user.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-lg font-medium">{user.gender || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Degree</p>
                <p className="text-lg font-medium">{user.degree}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="text-lg font-medium">{user.cities?.regions?.name || "Unknown"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="text-lg font-medium">{user.cities?.name || "Unknown"}</p>
              </div>
            </div>

            {/* ✅ CV Link (Only Show If Available) */}
            {user.cv && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">CV</p>
                <a
                  href={user.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-lg"
                >
                  View CV
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
