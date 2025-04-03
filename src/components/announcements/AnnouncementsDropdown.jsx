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
import { useTranslation } from "react-i18next";

const AnnouncementsDropdown = () => {
  const navigate = useNavigate();
  const [selectedDegree, setSelectedDegree] = useState("all");
  const [announcements, setAnnouncements] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select(
          "id, title, degree, image_url, users!announcements_organization_id_fkey(fname)"
        )
        .limit(9);

      if (!error) {
        setAnnouncements(data);
      }
    };

    fetchAnnouncements();
  }, []);

  let filteredAnnouncements = announcements.filter(
    (a) =>
      selectedDegree === "all" ||
      a.degree.trim().toLowerCase() === selectedDegree.trim().toLowerCase()
  );

  if (selectedDegree === "all" && filteredAnnouncements.length > 3) {
    filteredAnnouncements = filteredAnnouncements
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }

  const degreeFilters = [
    { id: "all", label: t("program.all"), icon: GraduationCap },
    { id: "High School", label: t("program.highschool"), icon: School },
    { id: "Undergraduate", label: t("program.undergraduate"), icon: BookOpen },
    { id: "CO-OP", label: t("program.coop"), icon: GraduationCap },
  ];

  const getTranslatedDegree = (degree) => {
    if (!degree) return "";
    const key = degree.replace(/\s+/g, "").toLowerCase(); 
    return t(`program.${key}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Megaphone className="h-4 w-4" />
          {t("announcements")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[350px] p-2">
        <div className="mb-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
            {t("filter.byProgram")}
          </div>
          <div className="flex gap-2 flex-wrap">
            {degreeFilters.map((filter) => (
              <Button
                key={filter.id}
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 px-2 py-1 ${selectedDegree === filter.id ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300" : ""}`}
                onClick={() => setSelectedDegree(filter.id)}
              >
                <filter.icon className="h-3 w-3" />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="max-h-[400px] overflow-y-auto">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement, index) => (
              <DropdownMenuItem
                key={index}
                className="flex items-start gap-3 p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => navigate(`/opportunities/${announcement.id}`)}
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
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {announcement.users?.fname || t("profile.unknown")}
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-400 mt-1 capitalize">
                    {getTranslatedDegree(announcement.degree)}
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 capitalize">
              {t("announcements.none")}
            </p>
          )}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer"
          onClick={() => navigate("/announcements")}
        >
          {t("announcements.viewAll")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AnnouncementsDropdown;
