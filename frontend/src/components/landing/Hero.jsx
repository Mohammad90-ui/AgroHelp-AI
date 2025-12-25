import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Leaf, Mic, ScanLine, CloudSun } from "lucide-react";

export default function Hero({ onCTA }) {
  const { t } = useTranslation();
  const [textIndex, setTextIndex] = useState(0);

  // Get rotating texts array from translations
  // We use a fallback array to prevent crashes if translation is missing/loading
  const rotatingTexts = t("rotatingTexts", { returnObjects: true }) || [
    "Crop Health",
    "Weather Alerts",
    "Market Prices",
    "Smart Recommendations"
  ];

  // Rotate text every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % (Array.isArray(rotatingTexts) ? rotatingTexts.length : 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [rotatingTexts]);

  // Floating background elements configuration
  const floatingElements = [
    { size: 64, x: "10%", y: "20%", duration: 25, delay: 0, opacity: 0.1 },
    { size: 96, x: "85%", y: "15%", duration: 30, delay: 2, opacity: 0.15 },
    { size: 48, x: "15%", y: "80%", duration: 20, delay: 1, opacity: 0.1 },
    { size: 72, x: "80%", y: "75%", duration: 28, delay: 3, opacity: 0.12 },
    { size: 32, x: "45%", y: "50%", duration: 22, delay: 0.5, opacity: 0.08 },
  ];

  // Safely handle if rotatingTexts is not an array (e.g. key missing)
  const currentText = Array.isArray(rotatingTexts) ? rotatingTexts[textIndex] : "";

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-b from-green-50/50 via-white to-green-100/30 pt-20">

      {/* Animated Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((el, i) => (
          <motion.div
            key={i}
            className="absolute bg-green-400 rounded-full blur-3xl"
            style={{
              width: el.size * 4,
              height: el.size * 4,
              left: el.x,
              top: el.y,
              opacity: el.opacity
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -50, 50, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: "linear",
              delay: el.delay
            }}
          />
        ))}

        {/* Dynamic Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#15803d 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-semibold mb-8 border border-green-200 shadow-sm"
        >
          <Leaf size={14} className="animate-pulse" />
          <span>AI-Powered Agriculture Assistant</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-5xl font-heading font-extrabold text-gray-900 leading-[1.1] mb-6"
        >
          {t("heroPrefix")} <br />
          <span className="text-transparent md:text-7xl bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
            {t("heroTitle")}
          </span>
        </motion.h1>

        {/* Rotating Text Container */}
        <div className="h-10 mb-10 overflow-hidden relative w-full flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={textIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-lg md:text-xl font-medium text-green-700 bg-green-50 px-6 py-2 rounded-full border border-green-200/50 shadow-sm absolute"
            >
              {currentText}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onCTA}
            className="group btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-green-500/30 flex items-center gap-2"
          >
            {t("tryCTA") || "Start Chatting Now"}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="px-8 py-4 rounded-full bg-white text-gray-700 font-semibold border border-gray-200 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
            <ScanLine size={20} />
            <span>Download App</span>
          </button>
        </motion.div>
      </div>

      {/* Floating Feature Icons - Orbiting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none hidden md:block opacity-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-full h-full relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-xl border border-green-100 flex flex-col items-center gap-2">
            <CloudSun className="text-orange-500" size={32} />
            <span className="text-xs font-bold text-gray-600">Weather</span>
          </div>
          <div className="absolute bottom-1/4 right-0 bg-white p-4 rounded-2xl shadow-xl border border-green-100 flex flex-col items-center gap-2">
            <ScanLine className="text-blue-500" size={32} />
            <span className="text-xs font-bold text-gray-600">Disease</span>
          </div>
          <div className="absolute bottom-1/4 left-0 bg-white p-4 rounded-2xl shadow-xl border border-green-100 flex flex-col items-center gap-2">
            <Mic className="text-purple-500" size={32} />
            <span className="text-xs font-bold text-gray-600">Voice</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
