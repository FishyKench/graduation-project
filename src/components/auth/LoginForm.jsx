import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import supabase from "../../../createClient"; // Go up 3 directories

const LoginForm = ({ onSubmit = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset error messages

    console.log("🔵 Attempting login for:", email);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("❌ Login failed:", error.message);
      setMessage(error.message);
    } else {
      console.log("✅ Login successful:", data.user);
      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/"); // ✅ Redirect to LandingPage after login
      }, 1000); // Short delay to show success message
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
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
