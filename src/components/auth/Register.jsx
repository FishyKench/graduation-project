import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import VolunteerForm from "./VolunteerForm";
import OrganizationForm from "./OrganizationForm";
import supabase from "../../../createClient"; 
import { useTranslation } from "react-i18next";

const Register = () => {
  const [userType, setUserType] = useState("volunteer");
  const [regions, setRegions] = useState([]); 
  const [cities, setCities] = useState([]); 
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  
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

  const handleRegister = async (formData) => {
    setMessage("");
    console.log("🔵 Registration data:", { type: userType, ...formData });
  
    // Step 1: Register in Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
  
    if (signUpError) {
      console.error("❌ Registration failed:", signUpError.message);
      setMessage(signUpError.message);
      return;
    }
  
    console.log("✅ User created:", signUpData.user);
  
    // Step 2: Prepare metadata for database
    let userMetadata = {
      id: signUpData.user.id,
      email: formData.email,
      fname: formData.firstName,
      mname: formData.middleName, 
      lname: formData.lastName,
      age: formData.age,
      phone_number: formData.phone,
      region: parseInt(formData.region) || null,
      city: parseInt(formData.city) || null,
      level: userType === "volunteer" ? 1 : 2, // 1 = volunteer, 2 = org
      created_at: new Date().toISOString(),
      gender: formData.gender,
    };
  
    // Add extra fields for volunteers
    if (userType === "volunteer") {
      userMetadata = {
        ...userMetadata,
        degree: formData.degree, 
        interest: formData.interest, 
        cv: formData.cvLink, 
        description: formData.description, 
      };
    }
  
    // Step 3: Insert into users table
    const { error: userError } = await supabase.from("users").insert([userMetadata]);
  
    if (userError) {
      console.error("❌ Error saving user info:", userError.message);
      setMessage("Error saving user info: " + userError.message);
      return;
    }
  
    console.log("✅ Metadata Inserted into users table");
  
    // Step 4: Auto-login after registration
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
  
    if (loginError) {
      setMessage("Error logging in after registration: " + loginError.message);
    } else {
      console.log("✅ Auto-login successful:", loginData.user);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px] bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t("createAccount")}</h2>
            <p className="text-gray-500 mt-2">{t("joinCommunity")}</p>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === "volunteer" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setUserType("volunteer")}
            >
              {t("volunteer")}
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === "organization" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setUserType("organization")}
            >
              {t("organization")}
            </button>
          </div>

          {/* Pass userType to determine which form to render */}
          {userType === "volunteer" ? (
            <VolunteerForm regions={regions} cities={cities} onSubmit={handleRegister} />
          ) : (
            <OrganizationForm regions={regions} cities={cities} onSubmit={handleRegister} />
          )}

          {/* Show error messages if any */}
          {message && <p className="text-red-500 mt-4 text-center">{message}</p>}

          <div className="mt-6 text-center text-sm text-gray-500">
            <span>{t("alreadyAccount")} </span>
            <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
            {t("signIn")}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
