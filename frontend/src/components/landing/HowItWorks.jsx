import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Camera, MessageSquare, CloudSun, CheckCircle } from "lucide-react";

export default function HowItWorks() {
    const { t } = useTranslation();

    const steps = [
        {
            icon: <Camera size={32} />,
            title: t("step1Title") || "Snap or Upload",
            desc: t("step1Desc") || "Take a photo of your crop or upload an image to identify diseases instantly."
        },
        {
            icon: <MessageSquare size={32} />,
            title: t("step2Title") || "Ask Questions",
            desc: t("step2Desc") || "Chat with our AI assistant in your local language (Hindi, Telugu, Kannada, etc)."
        },
        {
            icon: <CloudSun size={32} />,
            title: t("step3Title") || "Get Insights",
            desc: t("step3Desc") || "Receive weather-based advice and treatment recommendations tailored to your location."
        },
        {
            icon: <CheckCircle size={32} />,
            title: t("step4Title") || "Take Action",
            desc: t("step4Desc") || "Follow the organic or chemical treatment plans to save your harvest."
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">{t("simpleProcess") || "Simple Process"}</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mt-2">
                        {t("howItWorksTitle") || "How AgroHelp Works"}
                    </h2>
                </motion.div>

                <div className="relative grid gap-12 md:grid-cols-4">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-green-100 via-green-300 to-green-100 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative flex flex-col items-center text-center"
                        >
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-green-50 shadow-xl flex items-center justify-center text-green-600 mb-6 z-10 relative">
                                {step.icon}
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
