import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Globe, Menu, Search, Moon, Sun } from "lucide-react"; // Combined icons in one line
import AnnouncementsDropdown from "../announcements/AnnouncementsDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import supabase from "../../../createClient";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../lib/theme-provider";

const Header = ({ onLanguageChange = () => { }, currentLanguage = "en" }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || "Guest",
  );
  const [userLevel, setUserLevel] = useState(
    localStorage.getItem("userLevel") || null,
  );
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    onLanguageChange(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const storedUser = localStorage.getItem("user");
      const storedFirstName = localStorage.getItem("firstName");
      const storedUserLevel = localStorage.getItem("userLevel");
      const gender = localStorage.getItem("gender");


      if (storedUser && storedFirstName && storedUserLevel) {
        setUser(JSON.parse(storedUser));
        setFirstName(storedFirstName);
        setUserLevel(parseInt(storedUserLevel));
        setLoading(false);
        return;
      }

      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user) {
        setUser(null);
        setFirstName("");
        setUserLevel(null);
        localStorage.removeItem("user");
        localStorage.removeItem("firstName");
        localStorage.removeItem("userLevel");
        setLoading(false);
        return;
      }

      const userId = authData.user.id;
      setUser(authData.user);
      localStorage.setItem("user", JSON.stringify(authData.user));

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("fname, level, gender")

        .eq("id", userId)
        .single();

      if (!userError && userData) {
        setFirstName(userData.fname);
        setUserLevel(userData.level);
        localStorage.setItem("firstName", userData.fname);
        localStorage.setItem("userLevel", userData.level.toString());
        localStorage.setItem("gender", userData.gender);
      }


      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("firstName");
    localStorage.removeItem("userLevel");
    setUser(null);
    setFirstName("");
    setUserLevel(null);
    navigate("/login");
  };

  return (
    <header className="w-full h-20 px-4 md:px-6 bg-background border-b border-border relative header z-20">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
        {/* ✅ Left: Logo */}
        <div
          className="flex-shrink-0 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-xl font-semibold text-primary">Volunect</span>
        </div>

        {/* ✅ Center: Navigation */}
        <NavigationMenu className="hidden lg:flex flex-1 justify-center">
          <NavigationMenuList
            className={`flex items-center gap-2 ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
          >
            <NavigationMenuItem>
              <Button variant="ghost" onClick={() => navigate("/")}>
                {t("home")}
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost" onClick={() => navigate("/services")}>
                {t("services")}
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost" onClick={() => navigate("/about")}>
                {t("aboutUs")}
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <AnnouncementsDropdown />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* ✅ Right: Profile + Language */}
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0"
                >
                  <img
                    src={
                      localStorage.getItem("gender")?.toLowerCase() === "female"
                        ? "https://api.dicebear.com/9.x/miniavs/svg?seed=Liliana"
                        : "https://api.dicebear.com/9.x/miniavs/svg?seed=Mason"
                    }
                    alt="Profile"
                    className="rounded-full w-10 h-10"
                  />

                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  {t("profile")}
                </DropdownMenuItem>
                {userLevel === 1 && (
                  <DropdownMenuItem
                    onClick={() => navigate("/applications/tracker")}
                  >
                    {t("applications")}
                  </DropdownMenuItem>
                )}
                {userLevel === 2 && (
                  <DropdownMenuItem
                    onClick={() => navigate("/applications/manage")}
                  >
                    {t("admin.applications.title")}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  {t("settings")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  {t("logOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-primary"
                onClick={() => navigate("/login")}
              >
                {t("signIn")}
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => navigate("/register")}
              >
                {t("register")}
              </Button>
            </div>
          )}

          {/* 🌍 Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* 🌐 Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => changeLanguage("en")}>
                {t("english")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("ar")}>
                {t("arabic")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
