import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";
import { Calendar, MapPin, GraduationCap, Building2 } from "lucide-react";

const OpportunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const opportunity = {
    id: 1,
    type: "internship",
    title: "Summer Internship Program",
    organization: "Tech Corp",
    degree: "undergraduate",
    location: "Riyadh",
    deadline: "2024-06-01",
    description:
      "Join our dynamic team for a summer of learning and growth. This internship program offers hands-on experience in software development and project management.",
    requirements: [
      "Currently pursuing an undergraduate degree in Computer Science or related field",
      "Strong programming fundamentals",
      "Excellent communication skills",
      "Ability to work in a team environment",
    ],
    benefits: [
      "Competitive stipend",
      "Flexible working hours",
      "Mentorship program",
      "Potential for full-time employment",
    ],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60",
  };

  const handleApply = () => {
    navigate(`/applications/new?opportunity=${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-64 w-full">
              <img
                src={opportunity.image}
                alt={opportunity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-white text-center px-4">
                  {opportunity.title}
                </h1>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {opportunity.organization}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {opportunity.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600 capitalize">
                    {opportunity.degree}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {new Date(opportunity.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-600">{opportunity.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {opportunity.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Benefits</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {opportunity.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-600">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button */}
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleApply}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OpportunityDetails;