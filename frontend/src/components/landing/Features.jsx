import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Sprout, CloudSun, LineChart, ShoppingCart, Mic } from "lucide-react";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    { icon: Sprout, title: t("cropHealthTitle") || "AI Disease Detection", desc: t("cropHealthDesc") || "Instantly identify crop diseases by exploring photos. Get organic and chemical treatment plans." },
    { icon: CloudSun, title: t("weatherTitle") || "Smart Weather", desc: t("weatherDesc") || "Hyper-local weather forecasts tailored for agriculture to help you plan sowing and harvesting." },
    { icon: Mic, title: t("voiceAssistantTitle") || "Voice Assistant", desc: t("voiceAssistantDesc") || "Interact with the app in your local language specifically designed for farmers' ease of use." },
    { icon: LineChart, title: t("marketTitle") || "Market Trends", desc: t("marketDesc") || "Stay updated with real-time mandi prices and historical price trends." },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-gradient-to-b from-gray-900 via-green-950 to-black text-white relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-green-400 font-bold tracking-widest uppercase text-sm border border-green-800 bg-green-900/30 px-3 py-1 rounded-full">{t("featuresBadge") || "Powerful Features"}</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            {t("featuresTitlePrefix") || "Everything You Need to"} <br /> <span className="text-green-500">{t("featuresTitleHighlight") || "Grow Better"}</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-green-500/50 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-500/20 transition-all"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center mb-6 shadow-lg shadow-green-900/50 group-hover:scale-110 transition-transform duration-500">
                  <Icon size={32} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 font-heading group-hover:text-green-400 transition-colors">{title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{desc}</p>

                <Link
                  to="/features"
                  className="mt-6 flex items-center text-green-500 font-semibold text-sm hover:text-green-400 transition-colors duration-300 cursor-pointer"
                >
                  {t("learnMore") || "Learn more"} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
