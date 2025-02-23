import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";

const ApplicationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md">
          <h1 className="text-2xl font-semibold text-green-600">🎉 Thank You!</h1>
          <p className="text-gray-600 mt-2">
            Your application has been submitted successfully.
          </p>
          <p className="text-gray-600 mt-2">
            You can check your application status in your profile under <strong>Application Status</strong>.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Button onClick={() => navigate("/applications/tracker")} className="bg-purple-600 text-white">
              View My Applications
            </Button>
            <Button variant="outline" onClick={() => navigate("/announcements")}>
              Explore More Opportunities
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationSuccess;
