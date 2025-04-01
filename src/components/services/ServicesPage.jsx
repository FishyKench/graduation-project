import React from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";
import { GraduationCap, Briefcase, Users, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const ServicesPage = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("services.coop.title"),
      description: t("services.coop.desc"),
      icon: GraduationCap,
      features: [
        t("Hands-on industry experience"),
        t("Professional mentorship"),
        t("Skill development workshops"),
        t("Project-based learning"),
      ],
    },
    {
      title: t("services.internships.title"),
      description: t("services.internships.desc"),
      icon: Briefcase,
      features: [
        t("Diverse industry placements"),
        t("Flexible duration options"),
        t("Career guidance"),
        t("Performance evaluation"),
      ],
    },
    {
      title: t("services.volunteer.title"),
      description: t("services.volunteer.desc"),
      icon: Users,
      features: [
        t("Community impact projects"),
        t("Flexible schedules"),
        t("Team collaboration"),
        t("Leadership opportunities"),
      ],
    },
    {
      title: t("services.development.title"),
      description: t("services.development.desc"),
      icon: Award,
      features: [
        t("Industry certifications"),
        t("Soft skills training"),
        t("Networking events"),
        t("Career workshops"),
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("services.title")}
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            {t("services.subtitle")}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <service.icon className="w-12 h-12 text-purple-600 mb-6" />
                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-100 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {t("services.cta.title")}
              </h2>
            <p className="text-gray-600 mb-8 text-lg">
                {t("services.cta.subtitle")}
            </p>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                onClick={() => (window.location.href = "/register")}
              >
                {t("register")}
              </Button>
              <Button
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8"
                onClick={() => (window.location.href = "/contact")}
              >
                {t("contact")}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
