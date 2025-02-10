import React from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600">
              Feel free to use the form or drop us an email. We'd love to hear
              from you.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-8 text-center">
              <a
                href="mailto:info@volunect.com"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                info@volunect.com
              </a>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 h-32"
                  required
                ></textarea>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
