import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import supabase from "../../../createClient"; 
import { useTranslation } from "react-i18next";

const LoginForm = ({ onSubmit = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); 

    console.log("🔵 Attempting login for:", email);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("❌ Login failed:", error.message);
      setMessage(error.message);
    } else {
      console.log("✅ Login successful:", data.user);
      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/"); 
      }, 1000); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {message && <p className="text-red-500">{message}</p>} {/* ✅ Show messages */}

      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
      {t("signIn")}
      </Button>
    </form>
  );
};

export default LoginForm;
