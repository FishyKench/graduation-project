import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Megaphone, GraduationCap, School, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../createClient";

const AnnouncementsDropdown = () => {
  const navigate = useNavigate();
  const [selectedDegree, setSelectedDegree] = useState("all");
  const [announcements, setAnnouncements] = useState([]);

  // ✅ Fetch announcements from Supabase
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("id, title, organization, degree, image_url")
        .limit(9);

      if (!error) {
        setAnnouncements(data);
      }
    };

    fetchAnnouncements();
  }, []);

  // ✅ Filtering logic
  let filteredAnnouncements = announcements.filter(
    (a) =>
      selectedDegree === "all" ||
      a.degree.trim().toLowerCase() === selectedDegree.trim().toLowerCase()
  );

  // ✅ Shuffle & limit to 3 when "All Programs" is selected
  if (selectedDegree === "all" && filteredAnnouncements.length > 3) {
    filteredAnnouncements = filteredAnnouncements
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }

  const degreeFilters = [
    { id: "all", label: "All Programs", icon: GraduationCap },
    { id: "High School", label: "High School", icon: School },
    { id: "Undergraduate", label: "Undergraduate", icon: BookOpen },
    { id: "CO-OP", label: "CO-OP", icon: GraduationCap },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Megaphone className="h-4 w-4" />
          Announcements
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[350px] p-2">
        
        {/* Degree Filters */}
        <div className="mb-2 p-2 bg-gray-50 rounded-md">
          <div className="text-sm font-medium text-gray-500 mb-2">
            Filter by Program:
          </div>
          <div className="flex gap-2 flex-wrap">
            {degreeFilters.map((filter) => (
              <Button
                key={filter.id}
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 px-2 py-1 ${
                  selectedDegree === filter.id ? "bg-purple-100 text-purple-600" : ""
                }`}
                onClick={() => setSelectedDegree(filter.id)}
              >
                <filter.icon className="h-3 w-3" />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Announcements List */}
        <div className="max-h-[400px] overflow-y-auto">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement, index) => (
              <DropdownMenuItem
                key={index}
                className="flex items-start gap-3 p-2 cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/opportunities/${announcement.id}`)} // ✅ Navigates to OpportunityDetails page
              >
                <img
                  src={announcement.image_url}
                  alt={announcement.title}
                  className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {announcement.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {announcement.organization}
                  </div>
                  <div className="text-xs text-purple-600 mt-1 capitalize">
                    {announcement.degree}
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm py-2">
              No announcements found.
            </p>
          )}
        </div>

        <DropdownMenuSeparator />

        {/* View All Link */}
        <DropdownMenuItem
          className="text-center text-sm text-purple-600 hover:text-purple-700 cursor-pointer"
          onClick={() => navigate("/announcements")} // ✅ Uses navigate instead of window.location.href
        >
          View All Announcements
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AnnouncementsDropdown;
