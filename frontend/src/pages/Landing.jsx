import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Footer from "../components/landing/Footer";
import FirstTimeModal from "../components/landing/FirstTimeModal";

export default function LandingPage() {
  const { setLanguage } = useLanguage();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLang = localStorage.getItem("agro_lang");
    if (savedLang) {
      setLanguage(savedLang);
      i18n.changeLanguage(savedLang);
    }
  }, [setLanguage, i18n]);

  const handleTry = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <FirstTimeModal />
      <Header onCTA={handleTry} />
      <main className="flex-1 w-full">
        <Hero onCTA={handleTry} />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
