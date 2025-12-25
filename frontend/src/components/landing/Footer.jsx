import React from "react";
import { Leaf, Twitter, Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-900/20">
                <Leaf size={20} fill="currentColor" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight">{t("appTitle")}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("heroSubtitle")}
            </p>
            <div className="flex gap-4">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">{t("product") || "Product"}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition-colors">{t("features") || "Features"}</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">{t("howItWorks") || "How it Works"}</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">{t("successStories") || "Success Stories"}</a></li>
              {/* <li><a href="#" className="hover:text-green-400 transition-colors">{t("pricing") || "Pricing"}</a></li> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">{t("contact") || "Contact"}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-green-500 mt-0.5" />
                <span>support@agrohelp.ai</span>
              </li>
              {/* <li className="flex items-start gap-3">
                <Phone size={18} className="text-green-500 mt-0.5" />
                <span>+91 98765 43210</span>
              </li> */}
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-green-500 mt-0.5" />
                <span>Bangalore,<br />Karnataka, India</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">{t("stayUpdated") || "Stay Updated"}</h4>
            <p className="text-gray-400 text-sm mb-4">{t("newsletterDesc") || "Get the latest agricultural trends and app updates."}</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t("yourEmail") || "Your email"}
                className="bg-gray-800 border-none rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-green-500 text-white placeholder-gray-500"
              />
              <button className="bg-green-600 px-4 rounded-lg hover:bg-green-700 transition-colors">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {year} {t("appTitle")}. {t("rightsReserved") || "All rights reserved."}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-green-400 transition-colors">{t("privacyPolicy") || "Privacy Policy"}</a>
            <a href="#" className="hover:text-green-400 transition-colors">{t("termsOfService") || "Terms of Service"}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
