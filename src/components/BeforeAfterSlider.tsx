import React, { useState, useRef, useEffect } from "react";
import { ChevronsLeftRight, Eye, Layers, Maximize } from "lucide-react";

interface BeforeAfterSliderProps {
  lang: "en" | "zh";
  imageSrc?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  lang,
  imageSrc = "https://raw.githubusercontent.com/leochou123/-/main/03%E5%8D%97%E7%AB%8B%E9%9D%A2%E9%80%8F%E8%A7%8601.jpg"
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [modelStyle, setModelStyle] = useState<"plaster" | "lineart">("plaster"); // style of the right wireframe
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Bind mouse/touch event listeners to window during active drag to ensure smoothness
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  const setManualPosition = (pct: number) => {
    setSliderPosition(pct);
  };

  // Right-side structural styling filters simulating a physical model / architectural white drawing
  const getRightStyleFilter = () => {
    if (modelStyle === "plaster") {
      // Warm white physical clay/plaster render model look
      return "grayscale(100%) brightness(1.4) contrast(1.1) sepia(5%) opacity(0.95)";
    } else {
      // High-contrast clean blueprint sketch style CAD look
      return "grayscale(100%) invert(0.95) contrast(200%) brightness(1.2)";
    }
  };

  return (
    <div 
      className="flex flex-col gap-4 font-sans max-w-[92vw] mx-auto select-none"
      id="before-after-slider-interactive-root"
    >
      
      {/* Dynamic Sub-selection bar to toggle wireframe styles */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-red-500" />
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            {lang === "en" ? "Wireframe Style Preset" : "底图形式切换"}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setModelStyle("plaster")}
            className={`px-3 py-1 rounded-full text-[9px] font-mono tracking-wider transition-all duration-200 cursor-pointer ${
              modelStyle === "plaster"
                ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            {lang === "en" ? "Plaster White-Model" : "石膏素色白模"}
          </button>
          <button
            onClick={() => setModelStyle("lineart")}
            className={`px-3 py-1 rounded-full text-[9px] font-mono tracking-wider transition-all duration-200 cursor-pointer ${
              modelStyle === "lineart"
                ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            {lang === "en" ? "CAD Linear Sketch" : "矢量纸本线稿"}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden w-[310px] sm:w-[560px] md:w-[740px] h-[320px] md:h-[460px] bg-neutral-950 border border-neutral-800 rounded-2xl group/slider-box flex items-center justify-center cursor-ew-resize select-none"
        id="slider-container-box"
      >
        
        {/* Layer 1 (Bottom): Right Wireframe Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ filter: getRightStyleFilter() }}
        >
          <img
            src={imageSrc}
            alt="Base Wireframe White Model"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

        {/* Dynamic Shadow / Grid Matrix Overlay to enhance architectural schema */}
        <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none" />

        {/* Text Guidelines labels at corners */}
        <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-2.5 py-1 text-[8px] font-mono uppercase tracking-widest text-neutral-400 rounded border border-neutral-800 z-20">
          {lang === "en" ? "Right: Original Draft" : "右：线稿草稿"}
        </div>
        <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-2.5 py-1 text-[8px] font-mono uppercase tracking-widest text-red-400 rounded border border-red-900/40 z-20">
          {lang === "en" ? "Left: AI Neural Render" : "左：AI 神经网络渲染"}
        </div>

        {/* Layer 2 (Top): Left Color Render (Clipped dynamically by slider position) */}
        <div 
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
          }}
        >
          <img
            src={imageSrc}
            alt="AI Finished Rendering"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

        {/* Layer 3: Red Handle Divider Line */}
        <div 
          className="absolute top-0 bottom-0 z-30 transition-shadow duration-200"
          style={{ 
            left: `${sliderPosition}%`,
            width: "2px",
            boxShadow: isDragging ? "0 0 16px #ef4444" : "0 0 8px rgba(239, 68, 68, 0.4)"
          }}
        >
          {/* Accent Line */}
          <div className="absolute inset-0 bg-red-500 w-full h-full" />

          {/* Slider Trigger Handle Bubble */}
          <div 
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-red-600 text-white shadow-[0_4px_20px_rgba(239,68,68,0.5)] border-2 border-white flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-transform duration-200 z-40 select-none`}
            id="drag-handle-bubble"
          >
            <ChevronsLeftRight className={`w-4 h-4 text-white ${isDragging ? "animate-pulse" : ""}`} />
          </div>
        </div>

        {/* Interactive hover instruction overlay in center when slider is in original state */}
        {sliderPosition === 50 && !isDragging && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-neutral-800 z-20 pointer-events-none text-[9px] font-mono uppercase tracking-widest text-neutral-300 shadow-xl flex items-center gap-2 animate-bounce">
            <ChevronsLeftRight className="w-3.5 h-3.5 text-red-500" />
            <span>{lang === "en" ? "Drag slider to morph" : "左右拖动查看渲染流"}</span>
          </div>
        )}

      </div>

      {/* Preset hotkeys under the slider box */}
      <div className="flex items-center justify-center gap-3 font-mono text-[9px] text-[#86868B] mt-1.5 uppercase">
        <span>{lang === "en" ? "Quick Jump:" : "快速对齐位置:"}</span>
        <button
          onClick={() => setManualPosition(0)}
          className="hover:text-white transition-colors cursor-pointer px-1.5 py-0.5 border border-neutral-800 rounded bg-neutral-900"
        >
          {lang === "en" ? "0% (Raw White Model)" : "0% (纯线稿)"}
        </button>
        <button
          onClick={() => setManualPosition(50)}
          className="hover:text-white transition-colors cursor-pointer px-1.5 py-0.5 border border-neutral-800 rounded bg-neutral-900"
        >
          50%
        </button>
        <button
          onClick={() => setManualPosition(100)}
          className="hover:text-white transition-colors cursor-pointer px-1.5 py-0.5 border border-neutral-800 rounded bg-neutral-900"
        >
          {lang === "en" ? "100% (Full AI Render)" : "100% (全渲染)"}
        </button>
      </div>

    </div>
  );
};
