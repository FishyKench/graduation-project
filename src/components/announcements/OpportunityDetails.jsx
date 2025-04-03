import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";
import { Calendar, MapPin, GraduationCap, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import supabase from "../../../createClient";

const OpportunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [user, setUser] = useState(null);
  const [userLevel, setUserLevel] = useState(() => {
    return localStorage.getItem("userLevel") ? parseInt(localStorage.getItem("userLevel")) : null;
  });

  useEffect(() => {
    const fetchOpportunity = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("announcements")
        .select(`
          id, title, type, location, degree, deadline, image_url, description,
          paid, salary, hours,
          organization_id,
          users:organization_id (fname)
        `)
        .eq("id", id)
        .single();

      if (!error) {
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

      let storedLevel = localStorage.getItem("userLevel");
      if (storedLevel) {
        setUserLevel(parseInt(storedLevel));
      } else {
        const { data: userData } = await supabase
          .from("users")
          .select("level")
          .eq("id", authData.user.id)
          .single();

        if (userData) {
          setUserLevel(userData.level);
          localStorage.setItem("userLevel", userData.level);
        }
      }

      if (!opportunity) return;

      const localApplied = localStorage.getItem(`applied_${authData.user.id}_${id}`);
      if (localApplied) {
        const { data, error } = await supabase
          .from("applications")
          .select("id")
          .eq("user_id", authData.user.id)
          .eq("announcement_id", id)
          .single();

        if (!error && data) {
          setAlreadyApplied(true);
        } else {
          localStorage.removeItem(`applied_${authData.user.id}_${id}`);
          setAlreadyApplied(false);
        }
        return;
      }

      const { data } = await supabase
        .from("applications")
        .select("id")
        .eq("user_id", authData.user.id)
        .eq("announcement_id", id)
        .single();

      if (data) {
        setAlreadyApplied(true);
        localStorage.setItem(`applied_${authData.user.id}_${id}`, "true");
      } else {
        setAlreadyApplied(false);
      }
    };

    if (opportunity) {
      fetchUserAndCheckApplication();
    }
  }, [opportunity, id]);

  const handleApply = async () => {
    if (!user || !opportunity || userLevel === 2 || alreadyApplied) return;

    const localApplied = localStorage.getItem(`applied_${user.id}_${id}`);
    if (localApplied) return;

    setAlreadyApplied(true);
    localStorage.setItem(`applied_${user.id}_${id}`, "true");

    const { error } = await supabase.from("applications").insert([
      {
        user_id: user.id,
        organization_id: opportunity.organization_id,
        announcement_id: opportunity.id,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      setAlreadyApplied(false);
      localStorage.removeItem(`applied_${user.id}_${id}`);
    } else {
      navigate("/application-success");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{t("loading")}</p>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{t("opportunities.details.notfound")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
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

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {opportunity.users?.fname || t("profile.org.details")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">{opportunity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600 capitalize">{opportunity.degree}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {new Date(opportunity.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">{t("opportunities.details.compensation")}</h2>
                <p className="text-gray-600">
                  {opportunity.paid === true || opportunity.paid === "paid"
                    ? `💰 ${t("opportunities.details.paid")} - ${
                        opportunity.salary ? `${opportunity.salary} SAR` : t("opportunities.details.salaryNotSpecified")
                      }`
                    : t("opportunities.details.unpaid")}
                </p>
                <p className="text-gray-600">
                  🕒 {t("opportunities.details.hours")}:{" "}
                  {opportunity.hours ? `${opportunity.hours} ${t("dashboard.stats.hours")}` : t("opportunities.details.notSpecified")}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">{t("opportunities.details.description")}</h2>
                <p className="text-gray-600">{opportunity.description || t("opportunities.details.noDescription")}</p>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleApply}
                  disabled={alreadyApplied || userLevel === 2}
                  className={`px-8 py-3 text-lg ${
                    alreadyApplied || userLevel === 2
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {alreadyApplied
                    ? t("opportunities.details.alreadyApplied")
                    : userLevel === 2
                    ? t("opportunities.details.orgCantApply")
                    : t("opportunities.details.apply")}
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
