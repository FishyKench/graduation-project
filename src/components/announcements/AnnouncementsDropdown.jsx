import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Megaphone, GraduationCap, School, BookOpen } from "lucide-react";

const AnnouncementsDropdown = () => {
  const [selectedDegree, setSelectedDegree] = useState("all");

  const announcements = [
    {
      type: "internship",
      title: "Summer Internship Program",
      organization: "Tech Corp",
      degree: "undergraduate",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60",
    },
    {
      type: "volunteer",
      title: "Community Service Program",
      organization: "Local NGO",
      degree: "high-school",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=60",
    },
    {
      type: "internship",
      title: "Co-op Training Position",
      organization: "Engineering Firm",
      degree: "co-op",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60",
    },
  ];

  const filteredAnnouncements =
    selectedDegree === "all"
      ? announcements
      : announcements.filter((a) => a.degree === selectedDegree);

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
                className={`flex items-center gap-1 px-2 py-1 ${selectedDegree === filter.id ? "bg-purple-100 text-purple-600" : ""}`}
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
          {filteredAnnouncements.map((announcement, index) => (
            <DropdownMenuItem
              key={index}
              className="flex items-start gap-3 p-2 cursor-pointer hover:bg-gray-50"
            >
              <img
                src={announcement.image}
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
          ))}
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
