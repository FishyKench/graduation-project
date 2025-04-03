import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../createClient";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      setUser(authData?.user || null);
    };

    fetchUser();
  }, []);

  const socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  };

  const legalLinks = [
    { label: t("footer.privacy"), href: "/privacy" },
    { label: t("footer.terms"), href: "/terms" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <footer className="w-full bg-card border-t border-border py-8 px-4 text-foreground">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Volunteer CTA - Hidden if User is Logged In */}
        {!user && (
          <div className="flex items-center gap-2">
            <Button
              variant="link"
              className="text-purple-600 hover:text-purple-700 flex items-center gap-2"
              onClick={() => navigate("/register")}
            >
               {t("volunteer")}
            </Button>
          </div>
        )}

        {/* Social Media Links */}
        <div className="flex items-center gap-4">
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>

        {/* Legal Links */}
        <div className="flex items-center gap-6">
          {legalLinks.map((link, index) => (
            <Button
              key={index}
              variant="link"
              className="text-sm text-gray-600 hover:text-purple-600"
              onClick={() => navigate(link.href)}
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
