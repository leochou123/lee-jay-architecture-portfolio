import React, { useState } from "react";
import { Project } from "../data";
import { X, MapPin, Minimize2, MoveRight, Layers, Sun, Wind, ShieldAlert, FileCode } from "lucide-react";
import { motion } from "motion/react";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  lang: "en" | "zh";
  translations: any;
}

export default function ProjectDetail({
  project,
  onClose,
  lang,
  translations,
}: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<"render" | "blueprint">("render");

  return (
    <div
      id="project-expanded-detail"
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/45 backdrop-blur-md"
    >
      {/* Background click to close */}
      <div 
        id="project-modal-overlay"
        className="absolute inset-0" 
        onClick={onClose} 
      />

      <motion.div
        id="project-detail-panel"
        initial={{ x: "100%", opacity: 0.9 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0.9 }}
        transition={{ type: "spring", damping: 26, stiffness: 180 }}
        className="relative z-10 w-full max-w-4xl h-full bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left Side: Large Visuals Toggle */}
        <div className="w-full md:w-3/5 bg-gray-50 flex flex-col relative h-[45vh] md:h-full border-r border-gray-100">
          
          {/* Tab Selector */}
          <div className="absolute top-6 left-6 z-20 flex gap-2" id="detail-tab-container">
            <button
              id="detail-tab-render"
              onClick={() => setActiveTab("render")}
              className={`px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-300 ${
                activeTab === "render"
                  ? "bg-black text-white shadow-md shadow-black/10"
                  : "bg-white/70 text-gray-700 hover:bg-white"
              }`}
            >
              {lang === "en" ? "Photorealistic Render" : "三维摄影渲染"}
            </button>
            <button
              id="detail-tab-blueprint"
              onClick={() => setActiveTab("blueprint")}
              className={`px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 ${
                activeTab === "blueprint"
                  ? "bg-black text-white shadow-md shadow-black/10"
                  : "bg-white/70 text-gray-700 hover:bg-white"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              {lang === "en" ? "Interactive Blueprint CAD" : "实时建构图纸"}
            </button>
          </div>

          {/* Close button on panels */}
          <button
            id="close-detail-floating"
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-gray-200/50 shadow-sm transition-transform duration-200 hover:scale-105"
          >
            <X className="w-4 h-4 text-gray-800" />
          </button>

          {/* Mode Contents */}
          <div className="flex-1 w-full h-full relative" id="project-visual-stage">
            {activeTab === "render" ? (
              <div className="w-full h-full relative overflow-hidden" id="render-img-wrapper">
                <img
                  src={project.image}
                  alt={project.title[lang]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8 text-white">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#F5F5F7]/80">
                    {project.category[lang]}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight mt-1 font-sans">
                    {project.title[lang]}
                  </h3>
                </div>
              </div>
            ) : (
              <div 
                id="blueprint-stage"
                className="w-full h-full bg-slate-950 flex flex-col justify-between p-8 font-mono text-xs text-sky-400 select-none relative overflow-hidden"
              >
                {/* Simulated Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:24px_24px] opacity-75" />
                <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                {/* Technical blueprint details */}
                <div className="relative z-10 flex justify-between items-start mt-10">
                  <div>
                    <p className="text-sky-300 font-bold uppercase tracking-wider text-[11px]">// TEKTONIK INTERACTIVE GRID</p>
                    <p className="text-[9px] text-[#86868B] lowercase">system: x64_coord_model // s32</p>
                  </div>
                  <div className="text-right text-[10px] text-sky-500">
                    <p>SCALE: 1:125</p>
                    <p>DATUM: MSL (NAVD88)</p>
                  </div>
                </div>

                {/* SVG Drawing of structural blueprints */}
                <div className="relative z-10 flex-1 flex items-center justify-center p-4">
                  <svg
                    viewBox="0 0 300 280"
                    className="w-full max-w-[400px] h-full object-contain text-sky-400"
                    id="blueprint-vector-svg"
                  >
                    {/* Render helper grid circles */}
                    <circle cx="150" cy="140" r="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                    <circle cx="150" cy="140" r="80" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                    
                    {/* Render axes lines */}
                    <line x1="150" y1="10" x2="150" y2="270" stroke="#ff453a" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.4" />
                    <line x1="10" y1="140" x2="290" y2="140" stroke="#ff453a" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.4" />

                    {/* Plot standard blueprint lines */}
                    {project.blueprintLines.map((line, idx) => (
                      <g key={idx} className="group/line">
                        <line
                          x1={line.x1}
                          y1={line.y1}
                          x2={line.x2}
                          y2={line.y2}
                          stroke="#38bdf8"
                          strokeWidth="1.25"
                          strokeDasharray={idx % 2 === 0 ? "" : "3 1"}
                          className="hover:stroke-[#ff9f0a] transition-colors duration-200"
                        />
                        {/* Blueprint end ticks */}
                        <circle cx={line.x1} cy={line.y1} r="2" fill="#38bdf8" />
                        <circle cx={line.x2} cy={line.y2} r="2" fill="#38bdf8" />
                        
                        {/* Labels for blueprint segments */}
                        {line.label && (
                          <text
                            x={(line.x1 + line.x2) / 2}
                            y={(line.y1 + line.y2) / 2 - 6}
                            fill="#86868b"
                            fontSize="7"
                            textAnchor="middle"
                            className="font-mono bg-slate-950 p-1 opacity-80"
                          >
                            {line.label}
                          </text>
                        )}
                      </g>
                    ))}
                  </svg>
                </div>

                <div className="relative z-10 text-[9px] text-gray-500 flex justify-between border-t border-gray-800/80 pt-4 mb-4">
                  <span>LAT: {project.specs.windLoad}</span>
                  <span>CO2_INDEX: {project.specs.co2Footprint}</span>
                  <span>STRUCTURAL_ENGINEERING: PASS_v3.2</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Design parameters & specifications */}
        <div className="w-full md:w-2/5 flex flex-col justify-between p-8 md:p-10" id="project-specs-panel">
          <div className="flex flex-col gap-6 overflow-y-auto pr-2 flex-1">
            
            {/* Meta */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                {project.year} // SEC_D
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-black stroke-2" />
                <span className="font-medium">{project.location[lang]}</span>
              </div>
            </div>

            {/* Title / Bio */}
            <div>
              <span className="text-xs text-gray-400 font-mono tracking-wider">
                {project.category[lang]}
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mt-1 font-sans">
                {project.title[lang]}
              </h2>
              <p className="text-sm font-light text-gray-600 leading-relaxed mt-4">
                {project.concept[lang]}
              </p>
            </div>

            {/* Specifications Details */}
            <div className="space-y-4 pt-4 border-t border-gray-100" id="tectonic-specs-table">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1D1D1F] flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 stroke-[2.5]" />
                {translations.specsTitle}
              </h4>

              <div className="grid grid-cols-2 gap-4">
                {/* Area */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-mono hover:text-black transition-colors duration-150">
                    {translations.specArea}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 mt-1 block">
                    {project.area}
                  </span>
                </div>

                {/* Carbon footprint */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-mono">
                    {translations.specFootprint}
                  </span>
                  <span className="text-sm font-semibold text-emerald-600 mt-1 block flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {project.specs.co2Footprint}
                  </span>
                </div>

                {/* Solar capacity */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-mono">
                    {translations.specSolar}
                  </span>
                  <span className="text-sm font-semibold text-[#ff9f0a] mt-1 block flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 stroke-[2.5]" />
                    {project.specs.solarRating}
                  </span>
                </div>

                {/* Wind Rating */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-mono">
                    {lang === "en" ? "Aerodynamic Drag" : "流体力学风载"}
                  </span>
                  <span className="text-sm font-semibold text-indigo-600 mt-1 block flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5 stroke-[2.5]" />
                    {project.specs.windLoad}
                  </span>
                </div>
              </div>

              {/* Structural Frame */}
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 mt-2">
                <span className="text-[10px] text-gray-400 block font-mono">
                  {lang === "en" ? "Structural Topology System" : "重力与抗震结构体系"}
                </span>
                <span className="text-xs font-semibold text-gray-900 mt-1 block leading-relaxed">
                  {project.specs.structuralType[lang]}
                </span>
              </div>

              {/* Materials */}
              <div className="mt-4" id="materials-chips">
                <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider mb-2">
                  {translations.specMaterials}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.specs.materials[lang].map((mat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[11px] font-medium bg-white border border-gray-200 text-gray-700 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Button */}
          <button
            id="detail-inquire-direct"
            onClick={() => {
              onClose();
              const contactEl = document.getElementById("contact");
              if (contactEl) {
                contactEl.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="w-full mt-6 py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center gap-2 group"
          >
            {translations.navContact} {project.title[lang]}
            <MoveRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
