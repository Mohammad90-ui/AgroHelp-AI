import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { MapPin, Globe, Check, ChevronRight, Loader2, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FirstTimeModal() {
  const { language, setLanguage } = useLanguage();
  const { t, i18n } = useTranslation();

  // Steps: 0 = Loading check, 1 = Language, 2 = Location, 3 = Done (close)
  const [step, setStep] = useState(0);
  const [locationName, setLocationName] = useState("");
  const [loadingLoc, setLoadingLoc] = useState(false);

  useEffect(() => {
    // Check if user has already completed onboarding
    const hasCompleted = localStorage.getItem("agro_onboarding_complete");

    // If NOT completed, start at step 1. If completed, stay at 0 (hidden).
    if (hasCompleted !== "true") {
      setStep(1);
    }
  }, []);

  // --- Handlers ---

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
    // Don't auto advance, let them confirm visual change
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const finishOnboarding = () => {
    localStorage.setItem("agro_onboarding_complete", "true");
    localStorage.setItem("agro_lang", language);
    setStep(0); // Close modal
  };

  const askLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        // Save to LocalStorage
        localStorage.setItem("agro_coords", JSON.stringify({ latitude, longitude }));

        try {
          // Attempt reverse geocoding for UI feedback
          const res = await fetch(`http://127.0.0.1:8000/get-location-name?lat=${latitude}&lon=${longitude}`);
          if (res.ok) {
            const data = await res.json();
            if (data.locationName) setLocationName(data.locationName);
          }
        } catch (err) {
          console.error("Reverse geocoding failed", err);
        } finally {
          setLoadingLoc(false);
          // Auto-advance to finish after location found
          setTimeout(() => finishOnboarding(), 1000);
        }
      },
      (err) => {
        console.error("Location permission error:", err);
        setLoadingLoc(false);
        // If denied, we still finish but without location
        alert("Location access denied. You can enable it anytime in settings.");
      }
    );
  };

  // --- Render Helpers ---

  if (step === 0) return null; // Hidden

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिन्दी" },
    { code: "te", name: "Telugu", native: "తెలుగు" },
    { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        layout
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 w-full">
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: "0%" }}
            animate={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">

            {/* STEP 1: LANGUAGE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4">
                    <Globe size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading">Choose your language</h2>
                  <p className="text-gray-500">भाषा चुनें / భాషను ఎంచుకోండి / ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`
                                        relative p-4 rounded-xl border-2 text-left transition-all duration-200 group
                                        ${language === lang.code
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-200 hover:bg-gray-50"}
                                    `}
                    >
                      <span className={`block font-bold text-lg ${language === lang.code ? "text-green-800" : "text-gray-800"}`}>
                        {lang.native}
                      </span>
                      <span className="text-sm text-gray-500 group-hover:text-green-600">{lang.name}</span>

                      {language === lang.code && (
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-green-600 bg-white rounded-full p-1 shadow-sm">
                          <Check size={16} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextStep}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Next Step <ChevronRight size={20} />
                </button>
              </motion.div>
            )}

            {/* STEP 2: LOCATION */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 text-center"
              >
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-500 mb-4 relative">
                  <MapPin size={40} />
                  <div className="absolute inset-0 border-4 border-blue-100 rounded-full animate-ping opacity-20"></div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-900 font-heading">
                    {t("locationPrompt") || "Enable Location"}
                  </h2>
                  <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">
                    Allow access to give you accurate weather updates and crop advice for your specific region.
                  </p>
                </div>

                {locationName ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    <span className="font-semibold">Located: {locationName}</span>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={askLocation}
                      disabled={loadingLoc}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loadingLoc ? (
                        <> <Loader2 size={20} className="animate-spin" /> Detecting... </>
                      ) : (
                        <> <Leaf size={20} /> Allow Access </>
                      )}
                    </button>

                    <button
                      onClick={finishOnboarding}
                      className="text-gray-400 text-sm hover:text-gray-600 py-2 underline decoration-gray-300 underline-offset-4"
                    >
                      Skip for now
                    </button>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

