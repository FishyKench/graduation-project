import React from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { useAuth } from "../../lib/auth-context";

const ProfilePage = () => {
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-semibold">
                {profile?.name ||
                  `${profile?.first_name} ${profile?.last_name}` ||
                  "Your Profile"}
              </h1>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            {profile?.type === "organization" ? (
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
                      <p>{profile?.username}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p>
                        {profile?.first_name} {profile?.middle_name}{" "}
                        {profile?.last_name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p>{profile?.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Location</label>
                      <p>
                        {profile?.city}, {profile?.region}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Degree</label>
                      <p>{profile?.degree}</p>
                    </div>
                  </div>
                </div>

                {profile?.interests && (
                  <div>
                    <h2 className="text-lg font-medium mb-2">Interests</h2>
                    <p className="text-gray-700">{profile.interests}</p>
                  </div>
                )}

                <div>
                  <h2 className="text-lg font-medium mb-2">CV</h2>
                  {profile?.cv_link ? (
                    <div className="flex items-center gap-4">
                      <a
                        href={profile.cv_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700"
                      >
                        View Current CV
                      </a>
                      <label className="cursor-pointer bg-purple-50 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-100 transition-colors">
                        Update CV
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            try {
                              const fileExt = file.name.split(".").pop();
                              const fileName = `${user.id}-${Math.random().toString(36).slice(2)}.${fileExt}`;

                              const { error: uploadError } =
                                await supabase.storage
                                  .from("cvs")
                                  .upload(fileName, file);

                              if (uploadError) throw uploadError;

                              const {
                                data: { publicUrl },
                              } = supabase.storage
                                .from("cvs")
                                .getPublicUrl(fileName);

                              const { error: updateError } = await supabase
                                .from("volunteers")
                                .update({ cv_link: publicUrl })
                                .eq("id", user.id);

                              if (updateError) throw updateError;

                              window.location.reload();
                            } catch (error) {
                              console.error("Error uploading file:", error);
                              alert("Error uploading file");
                            }
                          }}
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                      Upload CV
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;

                          try {
                            const fileExt = file.name.split(".").pop();
                            const fileName = `${user.id}-${Math.random().toString(36).slice(2)}.${fileExt}`;

                            const { error: uploadError } =
                              await supabase.storage
                                .from("cvs")
                                .upload(fileName, file);

                            if (uploadError) throw uploadError;

                            const {
                              data: { publicUrl },
                            } = supabase.storage
                              .from("cvs")
                              .getPublicUrl(fileName);

                            const { error: updateError } = await supabase
                              .from("volunteers")
                              .update({ cv_link: publicUrl })
                              .eq("id", user.id);

                            if (updateError) throw updateError;

                            window.location.reload();
                          } catch (error) {
                            console.error("Error uploading file:", error);
                            alert("Error uploading file");
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
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
