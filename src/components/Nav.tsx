import React, { useState, useEffect } from "react";
import { Globe, Clock, Sparkles } from "lucide-react";

interface NavProps {
  currentLang: "en" | "zh";
  onLangToggle: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  translations: any;
}

export default function Nav({
  currentLang,
  onLangToggle,
  activeSection,
  setActiveSection,
  translations,
}: NavProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(currentLang === "en" ? "en-US" : "zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [currentLang]);

  const navItems = [
    { id: "projects", label: translations.navProjects },
    { id: "lab", label: translations.navLab },
    { id: "philosophy", label: translations.navPhilosophy },
    { id: "awards", label: translations.navAwards },
    { id: "contact", label: translations.navContact },
  ];

  return (
    <nav
      id="top-floating-nav"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4"
    >
      <div className="flex items-center justify-between bg-white/70 backdrop-blur-xl border border-gray-100/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-full px-6 py-3.5 transition-all duration-300 hover:bg-white/80">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => {
            const el = document.getElementById("hero-top");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center gap-2 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
            <span className="text-[10px] font-mono text-white select-none">▲</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-wider text-gray-900 font-sans uppercase">
              LEE JAY ZHOU
            </span>
            <span className="text-[9px] text-gray-400 font-mono tracking-widest uppercase">
              TECTONIC AI ATELIER
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1" id="nav-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setActiveSection(item.id);
                  const el = document.getElementById(item.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 font-sans ${
                  isActive
                    ? "text-black bg-gray-50 font-semibold"
                    : "text-gray-500 hover:text-black hover:bg-gray-50/50"
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black"
                    style={{ content: '""' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Telemetry / Actions */}
        <div className="flex items-center gap-4" id="nav-actions">
          {/* Live Studio Clock */}
          <div className="hidden lg:flex items-center gap-1.5 font-mono text-[10px] text-gray-400 border-r border-gray-100 pr-4">
            <Clock className="w-3.5 h-3.5 stroke-1" />
            <span className="font-semibold text-gray-600">{time}</span>
            <span className="text-gray-300">|</span>
            <span className="animate-pulse flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {translations.weatherTemp}
            </span>
          </div>

          {/* Lang Toggle */}
          <button
            id="lang-toggle-button"
            onClick={onLangToggle}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-all duration-200 text-xs text-gray-700 hover:text-black"
          >
            <Globe className="w-3 h-3 stroke-1 text-gray-400" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
              {currentLang === "en" ? "CN" : "EN"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
