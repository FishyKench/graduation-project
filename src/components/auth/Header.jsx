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
} from "../ui/dropdown-menu";
import supabase from "../../../createClient";

const Header = ({ onLanguageChange = () => {}, currentLanguage = "en" }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || "Guest"
  ); // ✅ Get first name from localStorage
  const [loading, setLoading] = useState(true); // ✅ FIXED: Added missing state

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      // ✅ Check localStorage first
      const storedUser = localStorage.getItem("user");
      const storedFirstName = localStorage.getItem("firstName");

      if (storedUser && storedFirstName) {
        setUser(JSON.parse(storedUser));
        setFirstName(storedFirstName);
        setLoading(false);
        return;
      }

      // ✅ Fetch user from Supabase if not in localStorage
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user) {
        setUser(null);
        setFirstName("");
        localStorage.removeItem("user");
        localStorage.removeItem("firstName");
        setLoading(false);
        return;
      }

      setUser(authData.user);
      localStorage.setItem("user", JSON.stringify(authData.user));

      // ✅ Fetch first name from "users" table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("fname")
        .eq("id", authData.user.id)
        .single();

      if (!userError && userData) {
        setFirstName(userData.fname);
        localStorage.setItem("firstName", userData.fname);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("firstName");
    setUser(null);
    setFirstName("");
    navigate("/login"); // ✅ Redirect to login page after signing out
  };

  return (
    <header className="w-full h-20 px-4 md:px-6 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <span className="text-xl font-semibold text-purple-600">
            Volunect
          </span>
        </div>

        {/* Main Navigation */}
        <NavigationMenu className="hidden lg:flex flex-1 justify-center">
          <NavigationMenuList className="flex items-center gap-2">
            <NavigationMenuItem>
              <Button variant="ghost" onClick={() => navigate("/")}>
                Home
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost" onClick={() => navigate("/about")}>
                About Us
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost" onClick={() => navigate("/services")}>
                Services
              </Button>
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

          {/* ✅ Instantly show name from localStorage (No More Flickering!) */}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-purple-600 font-medium">
                Welcome, {firstName}!
              </span>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              {/* Sign In & Register (only if user is NOT logged in) */}
              <Button
                variant="ghost"
                className="text-purple-600"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
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
              <DropdownMenuItem onClick={() => onLanguageChange("en")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange("ar")}>
                العربية
              </DropdownMenuItem>
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
