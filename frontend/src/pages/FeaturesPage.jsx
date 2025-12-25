import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { Leaf, CloudSun, Mic, TrendingUp, ShieldCheck, Sprout } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const featuresList = [
        {
            id: "crop-health",
            icon: Leaf,
            title: t("featurePage_cropHealthTitle") || "Advanced Crop Health Analysis",
            desc: t("featurePage_cropHealthDesc") || "Detect diseases instantly by simply taking a photo. Our AI analyzes leaf patterns to identify infections like blight, rust, or nutrient deficiencies and provides both organic and chemical treatment plans.",
            image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: "weather",
            icon: CloudSun,
            title: t("featurePage_weatherTitle") || "Hyper-Local Weather Insights",
            desc: t("featurePage_weatherDesc") || "Get precise weather forecasts for your exact farm location. Planning sowing, irrigation, and harvesting becomes easier with real-time alerts about rainfall, storms, or temperature spikes.",
            image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: "voice",
            icon: Mic,
            title: t("featurePage_voiceTitle") || "Multilingual Voice Assistant",
            desc: t("featurePage_voiceDesc") || "No typing needed! Just talk to AgroHelp in your local language—Hindi, Telugu, Kannada, or English. We built this specifically for farmers who prefer speaking over typing.",
            image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: "market",
            icon: TrendingUp,
            title: t("featurePage_marketTitle") || "Real-Time Market Prices",
            desc: t("featurePage_marketDesc") || "Stay updated with the latest Mandi prices for your crops. Compare prices across different markets to ensure you get the best profit for your hard work.",
            image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: "advisory",
            icon: Sprout,
            title: t("featurePage_advisoryTitle") || "Scientific Crop Advisory",
            desc: t("featurePage_advisoryDesc") || "Get week-by-week advisory for your specific crop variety. From soil preparation to harvesting, follow a scientific schedule to maximize yield.",
            image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: "secure",
            icon: ShieldCheck,
            title: t("featurePage_secureTitle") || "Secure & Private",
            desc: t("featurePage_secureDesc") || "Your farm data is safe with us. We respect your privacy and ensure that your data is used only to provide you with better recommendations.",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-body">
            <Header onCTA={() => navigate("/chat")} />

            <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900">
                        {t("featurePage_mainTitle") || "Explore Our Features"}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t("featurePage_mainSubtitle") || "Discover how AgroHelp uses cutting-edge AI to transform traditional farming into smart agriculture."}
                    </p>
                </motion.div>

                <div className="space-y-24">
                    {featuresList.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            {/* Image Section */}
                            <div className="w-full lg:w-1/2">
                                <motion.div
                                    className="relative group rounded-3xl overflow-hidden shadow-2xl hover:shadow-green-200 transition-shadow duration-500"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="absolute inset-0 bg-green-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-[300px] md:h-[400px] object-cover transform"
                                    />
                                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg lg:hidden">
                                        <div className="flex items-center gap-3 text-green-700 font-bold">
                                            <feature.icon size={24} />
                                            {feature.title}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Text Section */}
                            <div className="w-full lg:w-1/2 space-y-6">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4 hidden lg:flex">
                                    <feature.icon size={32} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 leading-tight hidden lg:block">
                                    {feature.title}
                                </h2>
                                <div className="h-1 w-20 bg-green-500 rounded-full"></div>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {feature.desc}
                                </p>
                                <button
                                    onClick={() => navigate("/chat")}
                                    className="text-green-600 font-semibold hover:text-green-700 flex items-center gap-2 group transition-all"
                                >
                                    {t("tryItNow") || "Try it now"} <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
