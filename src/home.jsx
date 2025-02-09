import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./createClient";
import "./home.css"; // ✅ Ensure this import is correct

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session?.session) {
        const { data: userData, error } = await supabase
          .from("users")
          .select("fname")
          .eq("email", session.session.user.email)
          .single();

        if (!error) setUser(userData);
      } else {
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="home-container">
      {/* ✅ NAVBAR */}
      <nav className="navbar">
        <h1>Voulnect</h1>
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* ✅ MAIN CONTENT - Pushes down to avoid navbar overlap */}
      <div className="page-content">
        {/* ✅ HERO SECTION */}
        <header className="hero-section">
          <h2 className="hero-title">Welcome, {user?.fname ? user.fname : "User"}!</h2>
          <p className="hero-text">Explore our platform and discover amazing features.</p>
        </header>

        {/* ✅ FEATURES SECTION */}
        <main className="main-content">
          <h3>Discover Our Features</h3>
          <p>We're constantly working to improve your experience.</p>

          <div className="features-container">
            <div className="feature-box">
              <h4>Feature 1</h4>
              <p>Description of Feature 1</p>
            </div>
            <div className="feature-box">
              <h4>Feature 2</h4>
              <p>Description of Feature 2</p>
            </div>
            <div className="feature-box">
              <h4>Feature 3</h4>
              <p>Description of Feature 3</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
