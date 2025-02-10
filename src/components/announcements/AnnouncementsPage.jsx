import React, { useState } from "react";
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
} from "lucide-react";

const AnnouncementsPage = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDegree, setSelectedDegree] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const announcements = [
    {
      id: 1,
      type: "internship",
      title: "Summer Internship Program",
      organization: "Tech Corp",
      degree: "undergraduate",
      location: "Riyadh",
      deadline: "2024-06-01",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      type: "volunteer",
      title: "Community Service Program",
      organization: "Local NGO",
      degree: "high-school",
      location: "Jeddah",
      deadline: "2024-05-15",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      type: "internship",
      title: "Co-op Training Position",
      organization: "Engineering Firm",
      degree: "co-op",
      location: "Dammam",
      deadline: "2024-07-01",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60",
    },
    // Add more announcements as needed
  ];

  const typeFilters = [
    { id: "all", label: "All Opportunities", icon: Users },
    { id: "internship", label: "Internships", icon: Briefcase },
    { id: "volunteer", label: "Volunteer", icon: Users },
  ];

  const degreeFilters = [
    { id: "all", label: "All Programs", icon: GraduationCap },
    { id: "high-school", label: "High School", icon: School },
    { id: "undergraduate", label: "Undergraduate", icon: BookOpen },
    { id: "co-op", label: "CO-OP", icon: GraduationCap },
  ];

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesType =
      selectedType === "all" || announcement.type === selectedType;
    const matchesDegree =
      selectedDegree === "all" || announcement.degree === selectedDegree;
    const matchesSearch =
      searchQuery === "" ||
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.organization
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesType && matchesDegree && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-8 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Opportunities
          </h1>
          <p className="text-gray-600">
            Find the perfect internship or volunteer opportunity
          </p>
        </div>

        {/* Search Bar */}
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
        <div className="mb-8 space-y-4">
          {/* Type Filters */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2">Type</h2>
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant="outline"
                  className={`flex items-center gap-2 ${selectedType === filter.id ? "bg-purple-50 text-purple-600 border-purple-200" : ""}`}
                  onClick={() => setSelectedType(filter.id)}
                >
                  <filter.icon className="h-4 w-4" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Degree Filters */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2">Program</h2>
            <div className="flex flex-wrap gap-2">
              {degreeFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant="outline"
                  className={`flex items-center gap-2 ${selectedDegree === filter.id ? "bg-purple-50 text-purple-600 border-purple-200" : ""}`}
                  onClick={() => setSelectedDegree(filter.id)}
                >
                  <filter.icon className="h-4 w-4" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={announcement.image}
                alt={announcement.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${announcement.type === "internship" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
                  >
                    {announcement.type === "internship"
                      ? "Internship"
                      : "Volunteer"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {announcement.location}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {announcement.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {announcement.organization}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Deadline:{" "}
                    {new Date(announcement.deadline).toLocaleDateString()}
                  </span>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No opportunities found matching your criteria.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AnnouncementsPage;
