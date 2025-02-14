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
import supabase from "../../../createClient"; // ✅ Ensure correct import

const AnnouncementsDropdown = () => {
  const [selectedDegree, setSelectedDegree] = useState("all");
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      let query = supabase.from("announcements").select("*");

      if (selectedDegree !== "all") {
        query = query.eq("degree", selectedDegree);
      }

      const { data, error } = await query;
      if (error) {
        console.error("Error fetching announcements:", error);
        return;
      }

      let finalAnnouncements = data;

      if (selectedDegree === "all") {
        // ✅ Shuffle and get 3 random announcements
        finalAnnouncements = data.sort(() => 0.5 - Math.random()).slice(0, 3);
      }

      setAnnouncements(finalAnnouncements);
    };

    fetchAnnouncements();
  }, [selectedDegree]);

  const degreeFilters = [
    { id: "all", label: "All Programs", icon: GraduationCap },
    { id: "high-school", label: "High School", icon: School },
    { id: "undergraduate", label: "Undergraduate", icon: BookOpen },
    { id: "co-op", label: "CO-OP", icon: GraduationCap },
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
          {announcements.length > 0 ? (
            announcements.map((announcement, index) => (
              <DropdownMenuItem
                key={index}
                className="flex items-start gap-3 p-2 cursor-pointer hover:bg-gray-50"
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
                    {announcement.type}
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="text-center text-sm text-gray-500 py-4">
              No announcements found.
            </div>
          )}
        </div>

        <DropdownMenuSeparator />

        {/* View All Link */}
        <DropdownMenuItem
          className="text-center text-sm text-purple-600 hover:text-purple-700 cursor-pointer"
          onClick={() => (window.location.href = "/announcements")}
        >
          View All Announcements
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AnnouncementsDropdown;
