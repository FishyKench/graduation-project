import { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./lib/theme-provider"; // Importing ThemeProvider
import { useTranslation } from "react-i18next";
import Home from "./components/home";
import LandingPage from "./components/landing/LandingPage";
import Register from "./components/auth/Register";
import AnnouncementsPage from "./components/announcements/AnnouncementsPage";
import AboutPage from "./components/about/AboutPage";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import TermsOfService from "./components/legal/TermsOfService";
import ContactPage from "./components/contact/ContactPage";
import ServicesPage from "./components/services/ServicesPage";
import ProfilePage from "./components/Profile/ProfilePage";
import ApplicationStatus from "./components/applications/ApplicationStatus";
import ApplicationsManagement from "./components/applications/ApplicationsManagement";
import ApplicationTracker from "./components/applications/ApplicationTracker";
import OpportunityDetails from "./components/announcements/OpportunityDetails";
import SettingsPage from "./components/settings/SettingsPage";
import ApplicationSuccess from "./components/applications/ApplicationSuccess";
import NewAnnouncement from "./components/applications/NewAnnouncement";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial direction based on language
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ThemeProvider> {/* Wrapping the app in ThemeProvider */}
        <div className="min-h-screen bg-background text-foreground"> {/* Adding background and text classes */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/application-success" element={<ApplicationSuccess />} />
            <Route path="/profile/:id" element={<ProfilePage />} />

            {/* ✅ Application Routes */}
            <Route path="/applications/status" element={<ApplicationStatus />} />
            <Route path="/applications/manage" element={<ApplicationsManagement />} />
            <Route path="/applications/new" element={<NewAnnouncement />} />
            <Route path="/applications/tracker" element={<ApplicationTracker />} />

            {/* ✅ Opportunity Details Route (Fixed to match navigation) */}
            <Route path="/opportunities/:id" element={<OpportunityDetails />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
