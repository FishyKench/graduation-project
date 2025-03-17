import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";
import {
  Search,
  Briefcase,
  Users,
  GraduationCap,
  School,
  BookOpen,
  DollarSign,
} from "lucide-react";
import supabase from "../../../createClient";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDegree, setSelectedDegree] = useState("all");
  const [selectedPaid, setSelectedPaid] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: announcementsData, error: announcementsError } = await supabase
        .from("announcements")
        .select("*");

      if (!announcementsError) {
        setAnnouncements(announcementsData);
        console.log("📢 Fetched announcements:", announcementsData);
      } else {
        console.error("❌ Error fetching announcements:", announcementsError);
      }

      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData?.user) {
        console.warn("⚠️ No active session found. Announcements will be general.");
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("degree, cities ( name, regions ( name ) )")
        .eq("id", userData.user.id)
        .single();

      if (!profileError) {
        setUserInfo(profileData);
        console.log("👤 User profile fetched:", profileData);
      } else {
        console.error("❌ Error fetching user profile:", profileError);
      }
    };

    fetchData();
  }, []);

  const typeFilters = [
    { id: "all", label: "All Opportunities", icon: Users },
    { id: "internship", label: "Internships", icon: Briefcase },
    { id: "volunteer", label: "Volunteer", icon: Users },
  ];

  const degreeFilters = [
    { id: "all", label: "All Programs", icon: GraduationCap },
    { id: "High School", label: "High School", icon: School },
    { id: "Undergraduate", label: "Undergraduate", icon: BookOpen },
    { id: "CO-OP", label: "CO-OP", icon: GraduationCap },
  ];

  const paidFilters = [
    { id: "all", label: "All", icon: DollarSign },
    { id: "paid", label: "Paid", icon: DollarSign },
    { id: "unpaid", label: "Unpaid", icon: DollarSign },
  ];

  // ✅ Sort by location first, then degree
  const filteredAnnouncements = announcements
    .filter((announcement) => {
      const matchesType = selectedType === "all" || announcement.type === selectedType;
      const matchesDegree = selectedDegree === "all" || announcement.degree === selectedDegree;
      const matchesSearch =
        searchQuery === "" ||
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.organization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPaid =
        selectedPaid === "all" ||
        (selectedPaid === "paid" && announcement.paid) ||
        (selectedPaid === "unpaid" && !announcement.paid);

      return matchesType && matchesDegree && matchesSearch && matchesPaid;
    })
    .sort((a, b) => {
      let aScore = 0;
      let bScore = 0;
      if (userInfo) {
        // Location priority
        if (a.location === userInfo.cities?.name || a.location === userInfo.cities?.regions?.name) aScore += 2;
        if (b.location === userInfo.cities?.name || b.location === userInfo.cities?.regions?.name) bScore += 2;

        // Degree priority
        if (a.degree === userInfo.degree) aScore += 1;
        if (b.degree === userInfo.degree) bScore += 1;
      }
      return bScore - aScore; // Higher score comes first
    });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-8 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Opportunities</h1>

        {/* 🔍 Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search opportunities..."
            className="w-full px-4 py-2 pl-10 pr-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        {/* Filters */}
        {[{ title: "Filter by Type", filters: typeFilters, selected: selectedType, setSelected: setSelectedType },
          { title: "Filter by Degree", filters: degreeFilters, selected: selectedDegree, setSelected: setSelectedDegree },
          { title: "Filter by Payment", filters: paidFilters, selected: selectedPaid, setSelected: setSelectedPaid }
        ].map(({ title, filters, selected, setSelected }) => (
          <div className="mb-4" key={title}>
            <h2 className="text-sm font-medium text-gray-700 mb-2">{title}</h2>
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant="outline"
                  className={`flex items-center gap-2 ${
                    selected === filter.id ? "bg-purple-50 text-purple-600 border-purple-200" : ""
                  }`}
                  onClick={() => setSelected(filter.id)}
                >
                  <filter.icon className="h-4 w-4" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        ))}

        {/* 📢 Announcements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <div key={announcement.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={announcement.image_url} alt={announcement.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${announcement.type === "internship" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                      {announcement.type === "internship" ? "Internship" : "Volunteer"}
                    </span>
                    <span className="text-xs text-gray-500">{announcement.location}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{announcement.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{announcement.organization}</p>
                  <p className={`text-sm font-medium ${announcement.paid ? "text-green-600" : "text-gray-600"}`}>
                    {announcement.paid ? `💰 Paid - ${announcement.salary || "Amount Not Specified"}` : "Unpaid"}
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => navigate(`/opportunities/${announcement.id}`)}>
                    Learn More
                  </Button>
                </div>
              </div>
            ))
          ) : <p className="text-center py-12 text-gray-500">No opportunities found.</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnnouncementsPage;
