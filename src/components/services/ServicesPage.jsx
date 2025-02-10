import React from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";
import { GraduationCap, Briefcase, Users, Award } from "lucide-react";

const ServicesPage = () => {
  const services = [
    {
      title: "CO-OP Training",
      description:
        "Gain practical experience through our comprehensive CO-OP training programs",
      icon: GraduationCap,
      features: [
        "Hands-on industry experience",
        "Professional mentorship",
        "Skill development workshops",
        "Project-based learning",
      ],
    },
    {
      title: "Internships",
      description:
        "Find the perfect internship opportunity to kickstart your career",
      icon: Briefcase,
      features: [
        "Diverse industry placements",
        "Flexible duration options",
        "Career guidance",
        "Performance evaluation",
      ],
    },
    {
      title: "Volunteer Programs",
      description:
        "Make a difference in your community through meaningful volunteer work",
      icon: Users,
      features: [
        "Community impact projects",
        "Flexible schedules",
        "Team collaboration",
        "Leadership opportunities",
      ],
    },
    {
      title: "Professional Development",
      description:
        "Enhance your skills with our professional development programs",
      icon: Award,
      features: [
        "Industry certifications",
        "Soft skills training",
        "Networking events",
        "Career workshops",
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
              Our Services
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Comprehensive solutions for students and organizations to connect,
              learn, and grow together
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
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Join our platform and discover opportunities that match your goals
            </p>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                onClick={() => (window.location.href = "/register")}
              >
                Register Now
              </Button>
              <Button
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8"
                onClick={() => (window.location.href = "/contact")}
              >
                Contact Us
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
