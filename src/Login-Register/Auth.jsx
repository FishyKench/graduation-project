import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "./Auth.css";

const supabase = createClient(
  "https://hbgtjdhhhtgyteetvyam.supabase.co/",
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
  const [userType, setUserType] = useState("volunteer");
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      const { data, error } = await supabase.from("regions").select("id, name");
      if (!error) setRegions(data);
    };

    const fetchCities = async () => {
      const { data, error } = await supabase.from("cities").select("id, name");
      if (!error) setCities(data);
    };

    fetchRegions();
    fetchCities();
  }, []);

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

      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("📩 Inserting user metadata:", email);

      const { error: userError } = await supabase.from("users").insert([
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
          level: userType === "volunteer" ? 1 : 2,
          created_at: new Date().toISOString(),
        },
      ]);

      if (userError) {
        setMessage("Error saving user info: " + userError.message);
      } else {
        console.log("✅ Metadata Inserted");
        setMessage("Registration successful! Check your email.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {message && <p className="message">{message}</p>}

      {/* Volunteer/Organization Selection - Only in Register Mode */}
      {!isLogin && (
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="volunteer"
              checked={userType === "volunteer"}
              onChange={() => setUserType("volunteer")}
            />
            Volunteer
          </label>
          <label>
            <input
              type="radio"
              value="organization"
              checked={userType === "organization"}
              onChange={() => setUserType("organization")}
            />
            Organization
          </label>
        </div>
      )}

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
            <select value={region} onChange={(e) => setRegion(e.target.value)} required>
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
            <select value={city} onChange={(e) => setCity(e.target.value)} required>
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
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
