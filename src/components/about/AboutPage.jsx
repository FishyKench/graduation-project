import React from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import {
  Users,
  Building2,
  GraduationCap,
  Target,
  Award,
  Handshake,
} from "lucide-react";

const AboutPage = () => {
  const { t } = useTranslation();

  const stats = [
    { number: "1000+", label: t("stats.activeVolunteers"), icon: Users },
    { number: "100+", label: t("stats.partnerOrganizations"), icon: Building2 },
    { number: "500+", label: t("stats.opportunitiesPosted"), icon: Target },
  ];

  const benefits = [
    {
      title: t("benefits.talent.title"),
      description: t("benefits.talent.desc"),
      icon: GraduationCap,
    },
    {
      title: t("benefits.recruitment.title"),
      description: t("benefits.recruitment.desc"),
      icon: Target,
    },
    {
      title: t("benefits.quality.title"),
      description: t("benefits.quality.desc"),
      icon: Award,
    },
    {
      title: t("benefits.impact.title"),
      description: t("benefits.impact.desc"),
      icon: Handshake,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl">
              {t("about.hero.subtitle")}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center dark:bg-gray-800"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("about.mission")}
            </h2>
            <div className="prose lg:prose-lg mx-auto text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {t("about.mission.text1")}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t("about.mission.text2")}
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              {t("about.benefits.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              {t("about.benefits.subtitle")}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md flex gap-4 dark:bg-gray-800"
                >
                  <benefit.icon className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-purple-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{t("about.cta.title")}</h2>
            <p className="text-xl text-purple-100 mb-8">
              {t("about.cta.subtitle")}
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => (window.location.href = "/register")}
            >
              {t("about.cta.button")}
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
