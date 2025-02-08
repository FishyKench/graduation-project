import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./Auth.css";

const supabase = createClient(
  "https://hbgtjdhhhtgyteetvyam.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZ3RqZGhoaHRneXRlZXR2eWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyOTE2NzEsImV4cCI6MjA1Mzg2NzY3MX0.CAFppOUVhLqLD6Fp44vKYn6MdhgFmgADjdZ8A7oLNTk"
);

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [degree, setDegree] = useState("");
  const [interest, setInterest] = useState("");
  const [cv, setCv] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isLogin) {
      console.log("🔵 Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setMessage(error.message);
      } else {
        console.log("✅ Login Successful:", data.user);
        fetchUserData(data.user.id);
        setMessage("Login successful!");
      }
    } else {
      console.log("🔵 Attempting registration for:", email);
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setMessage(error.message);
        return;
      }

      console.log("✅ User created in auth.users:", data.user);

      // Ensure Supabase syncs the new user before inserting metadata
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log("📩 Inserting user metadata:", email);

      const { data: insertData, error: userError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          email,
          fname,
          mname,
          lname,
          phone_number: phone,
          location: location ? location.toString() : null,
          region: parseInt(region) || null,
          city: parseInt(city) || null,
          degree: degree ? degree.toString() : null,
          interest: interest ? interest.toString() : null,
          cv: cv || null,
          created_at: new Date().toISOString(),
        },
      ]).select();

      if (userError) {
        setMessage("Error saving user info: " + userError.message);
      } else {
        console.log("✅ Metadata Inserted:", insertData);
        setMessage("Registration successful! Check your email.");
      }
    }
  };

  const fetchUserData = async (userId) => {
    console.log("🔍 Fetching user data for ID:", userId);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("❌ Fetch Error:", error);
    } else {
      console.log("✅ User Data:", data);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleAuth}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        {!isLogin && (
          <>
            <input type="text" placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)} required />
            <input type="text" placeholder="Middle Name" value={mname} onChange={(e) => setMname(e.target.value)} />
            <input type="text" placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} required />
            <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <input type="number" placeholder="Region ID" value={region} onChange={(e) => setRegion(e.target.value)} required />
            <input type="number" placeholder="City ID" value={city} onChange={(e) => setCity(e.target.value)} required />
            <input type="text" placeholder="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} required />
            <input type="text" placeholder="Interest" value={interest} onChange={(e) => setInterest(e.target.value)} required />
            <input type="text" placeholder="CV Link (Optional)" value={cv} onChange={(e) => setCv(e.target.value)} />
          </>
        )}

        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} className="toggle">
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
}
