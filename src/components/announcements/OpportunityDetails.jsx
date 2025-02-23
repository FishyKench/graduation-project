import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";
import { Calendar, MapPin, GraduationCap, Building2 } from "lucide-react";
import supabase from "../../../createClient"; // Ensure correct import

const OpportunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchOpportunity = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("id", id)
        .single(); // Fetch specific opportunity by ID

      if (error) {
        console.error("❌ Error fetching opportunity:", error.message);
      } else {
        setOpportunity(data);
      }

      setLoading(false);
    };

    fetchOpportunity();
  }, [id]);

  useEffect(() => {
    const fetchUserAndCheckApplication = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) return;

      setUser(authData.user);

      if (!opportunity) return;

      // ✅ Check if the user has already applied to THIS specific announcement
      const { data, error } = await supabase
        .from("applications")
        .select("id")
        .eq("user_id", authData.user.id) // Check for THIS user
        .eq("id", id) // ✅ Check for THIS specific announcement ID, NOT organization_id
        .single();

      if (!error && data) {
        setAlreadyApplied(true);
      } else {
        setAlreadyApplied(false);
      }
    };

    if (opportunity) {
      fetchUserAndCheckApplication();
    }
  }, [opportunity, id]);

  const handleApply = async () => {
    if (!user || !opportunity) return;

    const { error } = await supabase.from("applications").insert([
      {
        user_id: user.id,
        organization_id: opportunity.organization_id,
        id: id, // ✅ Correctly insert the announcement ID
        status: "pending",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("❌ Error submitting application:", error.message);
    } else {
      navigate("/application-success"); // Redirect to success page
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading opportunity details...</p>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Opportunity not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-64 w-full">
              <img
                src={opportunity.image_url}
                alt={opportunity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-white text-center px-4">
                  {opportunity.title}
                </h1>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {opportunity.organization}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {opportunity.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600 capitalize">
                    {opportunity.degree}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {new Date(opportunity.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-600">{opportunity.description || "No description available."}</p>
              </div>

              {/* Apply Button */}
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleApply}
                  disabled={alreadyApplied}
                  className={`px-8 py-3 text-lg ${
                    alreadyApplied
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {alreadyApplied ? "Already Applied" : "Apply Now"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OpportunityDetails;
