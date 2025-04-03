import React from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { useTranslation } from "react-i18next";

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t("footer.terms")}
          </h1>

          <div className="prose prose-purple max-w-none">
            <p className="text-gray-600 mb-6">
              {t("Last updated")}: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {t("1. Acceptance of Terms")}
              </h2>
              <p className="mb-4">
                {t(
                  "By accessing and using Volunect, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
                )}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {t("2. User Responsibilities")}
              </h2>
              <p className="mb-4">{t("You agree to")}:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>{t("Provide accurate and complete information")}</li>
                <li>{t("Maintain the security of your account")}</li>
                <li>{t("Not misuse the platform or its services")}</li>
                <li>{t("Comply with all local laws and regulations")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {t("3. Organization Guidelines")}
              </h2>
              <p className="mb-4">{t("Organizations using Volunect must")}:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>{t("Provide accurate opportunity descriptions")}</li>
                <li>{t("Maintain professional conduct with volunteers")}</li>
                <li>{t("Comply with all applicable labor laws")}</li>
                <li>{t("Respect volunteer privacy and data")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {t("4. Intellectual Property")}
              </h2>
              <p className="mb-4">
                {t(
                  "All content and materials available on Volunect are protected by intellectual property rights. You may not use, reproduce, or distribute any content without our express permission.",
                )}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t("5. Contact")}</h2>
              <p>
                {t(
                  "For any questions regarding these Terms of Service, please contact us at",
                )}
                :{" "}
                <a
                  href="mailto:info@volunect.com"
                  className="text-purple-600 hover:text-purple-700"
                >
                  info@volunect.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
