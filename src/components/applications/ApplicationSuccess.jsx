import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

const ApplicationSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md">
          <h1 className="text-2xl font-semibold text-green-600">
            🎉 {t("application.success.title")}
          </h1>
          <p className="text-gray-600 mt-2">{t("application.success.message")}</p>
          <p className="text-gray-600 mt-2">
            {t("application.success.check")} <strong>{t("application.success.statusLink")}</strong>
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Button onClick={() => navigate("/applications/tracker")} className="bg-purple-600 text-white">
              {t("application.success.view")}
            </Button>
            <Button variant="outline" onClick={() => navigate("/announcements")}>
              {t("application.success.explore")}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationSuccess;
