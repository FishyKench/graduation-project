import React from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";
import {
  Users,
  Building2,
  GraduationCap,
  Target,
  Award,
  Handshake,
} from "lucide-react";

const AboutPage = () => {
  const stats = [
    { number: "1000+", label: "Active Volunteers", icon: Users },
    { number: "100+", label: "Partner Organizations", icon: Building2 },
    { number: "500+", label: "Opportunities Posted", icon: Target },
  ];

  const benefits = [
    {
      title: "Access to Qualified Talent",
      description:
        "Connect with motivated students and graduates from top Saudi institutions.",
      icon: GraduationCap,
    },
    {
      title: "Streamlined Recruitment",
      description:
        "Easy-to-use platform for posting opportunities and managing applications.",
      icon: Target,
    },
    {
      title: "Quality Assurance",
      description:
        "All volunteers are verified and pre-screened for their skills and commitment.",
      icon: Award,
    },
    {
      title: "Community Impact",
      description:
        "Make a difference while developing future talent for your organization.",
      icon: Handshake,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connecting Organizations with Passionate Volunteers
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl">
              Volunect is Saudi Arabia's premier platform bridging the gap
              between organizations and motivated volunteers.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Mission
            </h2>
            <div className="prose lg:prose-lg mx-auto text-center">
              <p className="text-lg text-gray-600 mb-6">
                At Volunect, we're dedicated to fostering meaningful connections
                between organizations and volunteers. Our platform serves as a
                bridge, helping organizations find dedicated volunteers while
                providing valuable opportunities for personal and professional
                growth.
              </p>
              <p className="text-lg text-gray-600">
                We believe in the power of volunteerism to transform both
                individuals and communities, creating lasting positive impact
                across Saudi Arabia.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Why Organizations Choose Volunect
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Join hundreds of organizations already benefiting from our
              platform
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md flex gap-4"
                >
                  <benefit.icon className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-purple-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join our growing community of organizations making a difference
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => (window.location.href = "/register")}
            >
              Register Your Organization
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
