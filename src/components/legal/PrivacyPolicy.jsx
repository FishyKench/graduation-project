import React from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t("footer.privacy")}
          </h1>

          <div className="prose prose-purple max-w-none">
            <p className="text-gray-600 mb-6">
              {t("Last updated")}: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {t("Information We Collect")}
              </h2>
              <p className="mb-4">
                {t(
                  "We collect information that you provide directly to us when you",
                )}
                :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>{t("Create an account")}</li>
                <li>{t("Fill out your profile")}</li>
                <li>{t("Apply for opportunities")}</li>
                <li>{t("Contact us")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {t("How We Use Your Information")}
              </h2>
              <p className="mb-4">
                {t("We use the information we collect to")}:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>{t("Provide and improve our services")}</li>
                <li>{t("Match volunteers with opportunities")}</li>
                <li>{t("Communicate with you about opportunities")}</li>
                <li>{t("Ensure platform security")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {t("Information Sharing")}
              </h2>
              <p>
                {t(
                  "We do not sell your personal information. We share your information only with",
                )}
                :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>{t("Organizations you apply to volunteer with")}</li>
                <li>{t("Service providers who assist our operations")}</li>
                <li>{t("When required by law")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t("contact")}</h2>
              <p>
                {t(
                  "If you have any questions about this Privacy Policy, please contact us at",
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

export default PrivacyPolicy;
