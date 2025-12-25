import React, { useState, useEffect } from "react";
import { Leaf, Menu, X, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";

export default function Header({ onCTA }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "te", name: "తెలుగు" },
    { code: "kn", name: "ಕನ್ನಡ" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4 md:py-6"
        }`}
    >
      <div className={`max-w-7xl mx-auto px-4 md:px-6 transition-all duration-300 ${scrolled ? "w-full" : "w-[95%] md:w-[90%]"
        }`}>
        <div className={`
          flex items-center justify-between px-6 py-3 rounded-full 
          ${scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-white/40 backdrop-blur-sm border border-white/40 shadow-sm"}
          transition-all duration-300
        `}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg">
              <Leaf size={20} fill="currentColor" />
            </div>
            <span className="font-heading font-bold text-xl md:text-2xl text-green-900 tracking-tight">
              {t("appTitle")}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-gray-700 hover:text-green-700 transition">{t("features")}</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-green-700 transition">{t("howItWorks")}</a>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2 outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            <button
              onClick={onCTA}
              className="btn-primary py-2 px-5 text-sm flex items-center gap-2"
            >
              {t("tryCTA")} <ArrowRight size={16} />
            </button>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg p-1.5 outline-none"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            <button className="text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full p-4 md:hidden">
          <div className="glass-panel rounded-2xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
            <a href="#features" className="p-2 hover:bg-green-50 rounded-lg transition" onClick={() => setMenuOpen(false)}>{t("features")}</a>
            <a href="#how-it-works" className="p-2 hover:bg-green-50 rounded-lg transition" onClick={() => setMenuOpen(false)}>{t("howItWorks")}</a>
            <button onClick={() => { onCTA(); setMenuOpen(false); }} className="btn-primary w-full justify-center">
              {t("tryCTA")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
