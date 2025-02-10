import React from "react";
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

const Header = ({ onLanguageChange = () => {}, currentLanguage = "en" }) => {
  const navigate = useNavigate();
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

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
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
