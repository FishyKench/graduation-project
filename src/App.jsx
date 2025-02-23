import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="min-h-screen bg-background">
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

          {/* ✅ Application Status Route */}
          <Route path="/applications/status" element={<ApplicationStatus />} />
          <Route path="/applications/manage" element={<ApplicationsManagement />} /> 
          <Route path="/applications/tracker" element={<ApplicationTracker />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
