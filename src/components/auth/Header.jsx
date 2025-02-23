import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Globe, Menu, Search } from "lucide-react";
import AnnouncementsDropdown from "../announcements/AnnouncementsDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import supabase from "../../../createClient";

const Header = ({ onLanguageChange = () => { }, currentLanguage = "en" }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName") || "Guest");
  const [userLevel, setUserLevel] = useState(localStorage.getItem("userLevel") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const storedUser = localStorage.getItem("user");
      const storedFirstName = localStorage.getItem("firstName");
      const storedUserLevel = localStorage.getItem("userLevel");

      if (storedUser && storedFirstName && storedUserLevel) {
        setUser(JSON.parse(storedUser));
        setFirstName(storedFirstName);
        setUserLevel(parseInt(storedUserLevel)); // Ensure it's an integer
        setLoading(false);
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.getUser();

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
        .select("fname, level")
        .eq("id", userId)
        .single();

      if (!userError && userData) {
        setFirstName(userData.fname);
        setUserLevel(userData.level);
        localStorage.setItem("firstName", userData.fname);
        localStorage.setItem("userLevel", userData.level.toString());
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
    <header className="w-full h-20 px-4 md:px-6 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <span className="text-xl font-semibold text-purple-600">Volunect</span>
        </div>

        {/* Main Navigation */}
        <NavigationMenu className="hidden lg:flex flex-1 justify-center">
          <NavigationMenuList className="flex items-center gap-2">
            <NavigationMenuItem>
              <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost" onClick={() => navigate("/about")}>About Us</Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost" onClick={() => navigate("/services")}>Services</Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <AnnouncementsDropdown />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center relative w-64">
            <Input type="search" placeholder="Search..." className="pr-8" />
            <Search className="absolute right-2 h-4 w-4 text-gray-500" />
          </div>

          {/* User Auth Section */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                    alt="Profile"
                    className="rounded-full w-10 h-10"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem className="flex items-center gap-3">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{firstName || user.email}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                {/* ✅ Volunteers See "Application Status" */}
                {userLevel === 1 && (
                  <DropdownMenuItem onClick={() => navigate("/applications/tracker")}>
                    Application Tracker
                  </DropdownMenuItem>
                )}

                {/* ✅ Organizations See "Manage Applications" */}
                {userLevel === 2 && (
                  <DropdownMenuItem onClick={() => navigate("/applications/manage")}>
                    Manage Applications
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" className="text-purple-600" onClick={() => navigate("/login")}>Sign In</Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => navigate("/register")}>Register</Button>
            </div>
          )}

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onLanguageChange("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange("ar")}>العربية</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
