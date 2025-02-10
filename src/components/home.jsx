import React from "react";
import Header from "./auth/Header";
import LoginContainer from "./auth/LoginContainer";
import Footer from "./auth/Footer";

const Home = ({
  onLanguageChange = () => console.log("Language changed"),
  onLogin = () => console.log("Login attempted"),
  onGoogleLogin = () => console.log("Google login clicked"),
  onAppleLogin = () => console.log("Apple login clicked"),
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onLanguageChange={onLanguageChange} />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <LoginContainer
          onLogin={onLogin}
          onGoogleLogin={onGoogleLogin}
          onAppleLogin={onAppleLogin}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
