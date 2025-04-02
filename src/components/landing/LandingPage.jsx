import React from "react";
import { motion } from "framer-motion";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import supabase from "../../../createClient";

const LandingPage = () => {
  const { t } = useTranslation();

  const opportunities = [
    {
      title: t("services.coop.title"),
      description: t("services.coop.desc"),
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: t("High School Volunteering"),
      description: t("Perfect for students looking to make a difference"),
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: t("services.development.title"),
      description: t("services.development.desc"),
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60",
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartJourney = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      // If not logged in, redirect to register
      window.location.href = "/register";
    } else {
      // If logged in, redirect to announcements
      window.location.href = "/announcements";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-screen w-full overflow-hidden">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
          >
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60"
              alt={t("Training and Co-op Opportunities")}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center text-white px-4"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
                {t("hero.subtitle")}
              </p>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-lg text-lg"
                onClick={handleStartJourney}
              >
                {t("startJourney")}
              </Button>
            </motion.div>
          </div>
          <button
            onClick={scrollToAbout}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-10 h-10 text-white" />
            </motion.div>
          </button>
        </div>

        {/* About Section */}
        <section
          id="about"
          className="py-24 px-4 max-w-7xl mx-auto scroll-mt-20"
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("mission.text")}
              </p>
            </motion.div>
            <motion.div variants={fadeIn}>
              <h2 className="text-4xl font-bold mb-6">{t("whyChoose.title")}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("whyChoose.text")}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Opportunities Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-purple-50 to-white">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            <motion.h2
              variants={fadeIn}
              className="text-4xl font-bold text-center mb-16"
            >
              {t("discover.title")}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {opportunities.map((opp, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <img
                      src={opp.image}
                      alt={opp.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{opp.title}</h3>
                    <p className="text-gray-600 mb-4">{opp.description}</p>
                    <Button
                      variant="outline"
                      className="w-full hover:bg-purple-600 hover:text-white transition-colors"
                      onClick={() => (window.location.href = "/announcements")}
                    >
                      {t("learnMore")}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Join Us Section */}
        <section className="py-24 px-4 bg-purple-600">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto text-center text-white"
          >
            <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-6">
              {t("impact.title")}
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto"
            >
              {t("impact.subtitle")}
            </motion.p>
            <motion.div variants={fadeIn} className="flex justify-center gap-4">
              <Button
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg"
                onClick={() => (window.location.href = "/register")}
              >
                {t("getStarted")}
              </Button>
              <Button
                variant="outline"
                className="border-white text-purple-800 hover:bg-white/10 px-8 py-6 text-lg"
                onClick={() => (window.location.href = "/contact")}
              >
                {t("contactUs")}
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
