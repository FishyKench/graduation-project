import React from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>

          <div className="prose prose-purple max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="mb-4">
                By accessing and using Volunect, you agree to be bound by these
                Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. User Responsibilities
              </h2>
              <p className="mb-4">You agree to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Not misuse the platform or its services</li>
                <li>Comply with all local laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                3. Organization Guidelines
              </h2>
              <p className="mb-4">Organizations using Volunect must:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate opportunity descriptions</li>
                <li>Maintain professional conduct with volunteers</li>
                <li>Comply with all applicable labor laws</li>
                <li>Respect volunteer privacy and data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                4. Intellectual Property
              </h2>
              <p className="mb-4">
                All content and materials available on Volunect are protected by
                intellectual property rights. You may not use, reproduce, or
                distribute any content without our express permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Contact</h2>
              <p>
                For any questions regarding these Terms of Service, please
                contact us at:{" "}
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
