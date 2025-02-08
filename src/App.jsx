import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Auth from "./Login-Register/Auth"; // Corrected path
import "./App.module.css"; // Assuming this exists

const supabase = createClient(
  "https://hbgtjdhhhtgyteetvyam.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZ3RqZGhoaHRneXRlZXR2eWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyOTE2NzEsImV4cCI6MjA1Mzg2NzY3MX0.CAFppOUVhLqLD6Fp44vKYn6MdhgFmgADjdZ8A7oLNTk"
);

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="container">
      {user ? (
        <div className="dashboard">
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}
