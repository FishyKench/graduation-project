import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home"; // Ensure correct path
import LandingPage from "./components/landing/LandingPage";
import Register from "./components/auth/Register";
import AnnouncementsPage from "./components/announcements/AnnouncementsPage";
import AboutPage from "./components/about/AboutPage";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import TermsOfService from "./components/legal/TermsOfService";
import ContactPage from "./components/contact/ContactPage";
import ServicesPage from "./components/services/ServicesPage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} /> {/* ✅ Added this line */}
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
