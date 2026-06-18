import React, { useState, useEffect, useRef } from "react";
import { 
  Palette, 
  Layers, 
  MapPin, 
  MoveRight, 
  Sun, 
  Wind, 
  ArrowLeft, 
  Clock, 
  Globe, 
  Award, 
  Compass, 
  Cpu, 
  Sparkles,
  ChevronRight,
  BookOpen,
  Activity,
  Maximize2,
  Mail,
  MessageSquare,
  AtSign,
  Phone,
  MessageCircle,
  Send,
  User
} from "lucide-react";
import { projectsData, translationStore } from "./data";
import { BeforeAfterSlider } from "./components/BeforeAfterSlider";

const coverImages = [
  {
    id: "analysis",
    title: { en: "Xiamen Yanqu Global Headquarters", zh: "厦门延趣全球总部大厦" },
    category: { en: "Iconic Corporate Headquarters", zh: "标志性总部办公" },
    image: "https://raw.githubusercontent.com/leochou123/-/main/04%E6%B2%BF%E8%A1%97%E7%AB%8B%E9%9D%A2-%E5%A4%9C%E6%99%AF5.jpg",
    staggerClass: "translate-y-12 md:translate-y-16",
    projectId: "workflow"
  },
  {
    id: "section",
    title: { en: "Xi'an Digital Photovoltaic Base", zh: "西安数字光伏技术创新基地" },
    category: { en: "Industrial Innovation Park", zh: "产业园区科创办公" },
    image: "https://raw.githubusercontent.com/leochou123/-/main/A03.jpg",
    staggerClass: "-translate-y-4 md:-translate-y-6",
    projectId: "library"
  },
  {
    id: "south",
    title: { en: "Nanjing Jiangbei G13 Residential", zh: "南京江北新区G13住宅研发" },
    category: { en: "Residential R&D", zh: "住宅研发 & 金陵风貌" },
    image: "https://raw.githubusercontent.com/leochou123/-/main/B02.jpg",
    staggerClass: "translate-y-16 md:translate-y-24",
    projectId: "villa"
  },
  {
    id: "street",
    title: { en: "Tangya Light Rail Station North Plot", zh: "塘雅轻轨站北商业地块概念设计" },
    category: { en: "TOD+POD Transit Hub", zh: "TOD+POD 核心区枢纽" },
    image: "https://raw.githubusercontent.com/leochou123/-/main/C02.jpg",
    staggerClass: "-translate-y-8 md:-translate-y-12",
    projectId: "pavilion"
  },
  {
    id: "aerial",
    title: { en: "Saudi Medina Eco-Resort", zh: "沙特麦地那野奢度假村" },
    category: { en: "Luxury Eco-Resort", zh: "高端野奢疗愈型度假村" },
    image: "https://raw.githubusercontent.com/leochou123/-/main/F02.jpg",
    staggerClass: "translate-y-6 md:translate-y-8",
    projectId: "tower"
  }
];

export default function App() {
  // Navigation & Language States
  const [lang, setLang] = useState<"en" | "zh">("zh");
  const [isPassedIntro, setIsPassedIntro] = useState(false);
  const [activeSection, setActiveSection] = useState("cover");
  const [activeView, setActiveView] = useState<"home" | "live_project">("home");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("villa");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCoverImageURL, setSelectedCoverImageURL] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  // AI Chat Butler States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: lang === "en" 
        ? "Hello space explorers! 🌟 I am Lee Jay ZHOU's AI Tectonic Butler, an incredibly cheerful and ecstatic E-person! ✨\n\nI know all about his premium Nanjing University M.Arch academic highlights, First-Class Registered Architect credentials, and revolutionary ComfyUI / Stable Diffusion pipelines!\n\nAsk me anything! For example, 'What are Lee Jay's academic awards?', 'Brief me on Xiamen Yanqu Corporate HQ', or 'How do I contact him?'! Let's build something grand together! 🚀📐"
        : "哈喽！🌟 我是周理洁的 AI 智能建构管家！一个元气满满的 e 人！✨\n\n我对理洁的学术底蕴（南大学霸硕士！）、一级注册建筑师资质、以及超实用的 ComfyUI & Stable Diffusion 建筑设计全链路工作流程都了如指掌！\n\n有什么想了解的，比如“理洁的学位与奖项”、“怎么联系他”、“代表作品厦门延趣企业总部”等等，尽管狂轰滥炸地提问我吧！🚀📐"
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen]);

  // Handle setting active chat message dynamically matching language changes
  useEffect(() => {
    setChatMessages([
      {
        role: "assistant",
        content: lang === "en" 
          ? "Hello space explorers! 🌟 I am Lee Jay ZHOU's AI Tectonic Butler, an incredibly cheerful and ecstatic E-person! ✨\n\nI know all about his premium Nanjing University M.Arch academic highlights, First-Class Registered Architect credentials, and revolutionary ComfyUI / Stable Diffusion pipelines!\n\nAsk me anything! For example, 'What are Lee Jay's academic awards?', 'Brief me on Xiamen Yanqu Corporate HQ', or 'How do I contact him?'! Let's build something grand together! 🚀📐"
          : "哈喽！🌟 我是周理洁的 AI 智能建构管家！一个元气满满的 e 人！✨\n\n我对理洁的学术底蕴（南大学霸硕士！）、一级注册建筑师资质、以及超实用的 ComfyUI & Stable Diffusion 建筑设计全链路工作流程都了如指掌！\n\n有什么想了解的，比如“理洁的学位与奖项”、“怎么联系他”、“代表作品厦门延趣企业总部”等等，尽管狂轰滥炸地提问我吧！🚀📐"
      }
    ]);
  }, [lang]);

  const handleSendChatMessage = async (textToSend?: string) => {
    const messageText = textToSend || chatInput;
    if (!messageText.trim() || isChatLoading) return;
    
    if (!textToSend) {
      setChatInput("");
    }

    const updatedMessages = [...chatMessages, { role: "user" as const, content: messageText }];
    setChatMessages(updatedMessages);
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await response.json();
      setChatMessages(prev => [
        ...prev,
        { role: "assistant" as const, content: data.text || "好像有些信号微调偏振了，再试一次哦！✨" }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [
        ...prev,
        { 
          role: "assistant" as const, 
          content: "哎呀呀！信号发生了一点点高频抖动，但我依然在！可以直接联系理洁微信/电话 15967319642 畅聊空间智能哦！🚀✨" 
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Intro states
  const [introStep, setIntroStep] = useState(0);

  // Home works carousel rotation angle
  const [carouselAngle, setCarouselAngle] = useState(0);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  // Responsive window resize state
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Timeline 3D scroll factors for right timeline column
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const [timelineProps, setTimelineProps] = useState<number[]>(new Array(5).fill(0));

  // Horizontal scroll gallery ref for standalone details view
  const horizScrollRef = useRef<HTMLDivElement>(null);

  // Ref for works carousel mousewheel zone to prevent default document scroll
  const worksCarouselRef = useRef<HTMLDivElement>(null);

  const t = translationStore[lang];

  // Digital Live clock update
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString(lang === "en" ? "en-US" : "zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [lang]);

  // Intro sequential animation timer
  useEffect(() => {
    const p1 = setTimeout(() => setIntroStep(1), 600);   // Line grow begins
    const p2 = setTimeout(() => setIntroStep(2), 1600);  // Text fades in
    const p3 = setTimeout(() => {
      setIntroStep(3);
      setIsPassedIntro(true); // Smooth transition to cover Page
    }, 4200);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
    };
  }, []);

  // Quick navigation scroll-to function
  const scrollToSection = (id: string) => {
    setActiveView("home");
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
      }
    }, 50);
  };

  // Timeline Scroll Listener to compute 3D rotating angle for timeline cards
  const handleTimelineContainerScroll = () => {
    if (!timelineContainerRef.current) return;
    const container = timelineContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;

    const cards = container.querySelectorAll(".timeline-card");
    const newProps: number[] = [];

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.top + cardRect.height / 2;
      // Calculate normalized offset from viewport center (-1 to 1)
      const offset = (cardCenter - containerCenter) / (containerRect.height / 1.5);
      // Clamp between -1 and 1
      const clampedOffset = Math.max(-1, Math.min(1, offset));
      newProps.push(clampedOffset);
    });

    setTimelineProps(newProps);
  };

  // Support non-passive native mouse-wheel scroll control for Works Carousel on the left panel to prevent main page scrolling
  useEffect(() => {
    const container = worksCarouselRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Smooth angle progression
      const direction = e.deltaY > 0 ? 1 : -1;
      setCarouselAngle(prev => prev + direction * 10);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isPassedIntro]);

  // Project select helper based on the closest card in circular wheel
  useEffect(() => {
    // 9-item arrangement with 40-degree spacing (since 360 / 9 = 40)
    const targetAngle = -carouselAngle;
    const normalizedTarget = ((targetAngle % 360) + 360) % 360;
    const rawIndex = Math.round(normalizedTarget / 40) % 9;
    setActiveCarouselIndex(rawIndex);
    
    // Exactly maps the active index output 01 to 09 to the corresponding cover-linked project IDs
    const repeatedSequence = [
      "workflow",  // 01: Xiamen Yanqu Global Headquarters (workflow)
      "library",   // 02: Xi'an Digital Photovoltaic Base (library)
      "villa",     // 03: Nanjing Jiangbei G13 (villa)
      "pavilion",  // 04: Tangya Light Rail TOD (pavilion)
      "tower",     // 05: Saudi Medina Resort (tower)
      "factory",   // 06: Singera New Energy HQ Factory (factory)
      "library",   // 07: Xi'an Digital Photovoltaic Base (library)
      "villa",     // 08: Nanjing Jiangbei G13 (villa)
      "pavilion"   // 09: Tangya Light Rail TOD (pavilion)
    ];
    setSelectedProjectId(repeatedSequence[rawIndex]);
  }, [carouselAngle]);

  const spinCarousel = (direction: "prev" | "next") => {
    const shift = direction === "prev" ? 40 : -40;
    setCarouselAngle(prev => prev + shift);
  };

  // Attach horizontal mousewheel scroll listener to Standalone Details page
  useEffect(() => {
    const container = horizScrollRef.current;
    if (!container) return;

    const horizontalScrollHandler = (e: WheelEvent) => {
      // Intercept vertical scroll and shift horizontally
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY * 1.5,
          behavior: "auto" // inertial
        });
      }
    };

    container.addEventListener("wheel", horizontalScrollHandler, { passive: false });
    return () => {
      container.removeEventListener("wheel", horizontalScrollHandler);
    };
  }, [activeView, selectedProjectId]);

  const activeProject = projectsData.find(p => p.id === selectedProjectId) || projectsData[0];

  // Define 6 highly tailored, bespoke architectural details for each project to complete the "View Live Project" highly staggered cards layout.
  const activeDetailsMap: Record<string, { title: string; image: string; desc: string; isTall: boolean }[]> = {
    villa: [
      {
        title: lang === "en" ? "01 / Integrated Floating Eaves & Seamless Glass Entrance" : "01 / 一体化飞檐与通透晶体玻璃门廊",
        image: "https://raw.githubusercontent.com/leochou123/-/main/B01.jpg",
        desc: lang === "en" 
          ? "The dramatic cantilevered metal trellis eave redirects sunlight gently onto the entrance zone, blending with expansive floor-to-ceiling ultra-clear glazing."
          : "飞挑的斜坡金属格栅挑檐将日光均匀引向入口，并与大面极致剔透的高透玻璃幕墙紧密交叠，彰显低调奢华的气度。",
        isTall: true,
      },
      {
        title: lang === "en" ? "02 / Reflective Entrance Pool & Welcoming Portal" : "02 / 社区主入口温润迎宾水景气度",
        image: "https://raw.githubusercontent.com/leochou123/-/main/B02.jpg",
        desc: lang === "en"
          ? "The precisely engineered terraced granite waterfall reflects clouds, majestic pines, and atmospheric light to evoke an unhurried, ceremonial entry experience."
          : "精心构筑的层叠叠水理石小景，将天光山影、苍秀树木在镜面水中幽然映照，勾勒空灵文雅的归家入口礼序。",
        isTall: false,
      },
      {
        title: lang === "en" ? "03 / Intricate Bronze Screen Overlay & Corner Grout Details" : "03 / 雅致格栅光影与精细收边大样",
        image: "https://raw.githubusercontent.com/leochou123/-/main/B03.jpg",
        desc: lang === "en"
          ? "The custom bronze sunscreen screen filters glare to cast intricate daylight patterns across surfaces, trimmed with dark anodized outlines for tectonic purity."
          : "南向高品质金属仿木遮阳格栅在日光流转中投射出微妙的百页光影，配以古雅沉静的深色涂装收边，演绎经典建构语言。",
        isTall: true,
      },
      {
        title: lang === "en" ? "04 / Unfolding Art Screen & Stepped Stone Terraces" : "04 / “翻开的画卷”漂浮感屋面线条",
        image: "https://raw.githubusercontent.com/leochou123/-/main/B04.jpg",
        desc: lang === "en"
          ? "Guided by the 'Unfolding Scroll' manifesto, the screens and masonry layers act like hand-carved pavilions displaying local life art collections."
          : "设计秉持‘舒展长卷’的立意规划，让立面次级结构如翻开的精雕画屏在院落中依次舒展开来，并借由多向步行走廊融建筑于园林之中。",
        isTall: false,
      },
      {
        title: lang === "en" ? "05 / Double-Height Curated Interior Art Pavilion" : "05 / 双层挑高生活美学艺术馆中庭",
        image: "https://raw.githubusercontent.com/leochou123/-/main/B05.png",
        desc: lang === "en"
          ? "The light-steel framed glass showcase harmoniously bridges indoor custom art galleries with active cascading landscape cascades."
          : "宽敞明亮的美学长廊配备大面积轻钢结构隔断，将室内高雅陈展作品与室外精巧重叠的花园景致立体联袂呈现。",
        isTall: true,
      },
      {
        title: lang === "en" ? "06 / Dusk Light-Up Symphony & Crystalline Horizon" : "06 / 示范区日暮全景光影唯美亮灯",
        image: "https://raw.githubusercontent.com/leochou123/-/main/B06.png",
        desc: lang === "en"
          ? "At twilight, soft horizontal wash-lights combine with cozy interior illumination to transform the crystalline pavilion into a warm, inviting canvas."
          : "暮色下柔和细腻的侧向投光与室内暖白投光相互浸润，令整体建筑更显飘逸温润，完美交付具有金陵特色的建筑画卷。",
        isTall: false,
      }
    ],
    pavilion: [
      {
        title: lang === "en" ? "01 / Masterplan Concept Aerial & Jinyi Landmark" : "01 / 综合体规划概念鸟瞰与金义封面",
        image: "https://raw.githubusercontent.com/leochou123/-/main/C01.jpg",
        desc: lang === "en"
          ? "The masterplan leverages cutting-edge TOD+POD design, carving out an inspiring lakeside civic gateway."
          : "规划以前沿的TOD+POD理念打造，在金满湖畔勾勒出极具未来张力与活力的城市会客厅地标。",
        isTall: true,
      },
      {
        title: lang === "en" ? "02 / Microscopic TOD Light Rail Platform Integration" : "02 / 轻轨TOD站城融合微观物理底盘",
        image: "https://raw.githubusercontent.com/leochou123/-/main/C02.jpg",
        desc: lang === "en"
          ? "High-frequency light rail tracks seamlessly interface with multi-tier public pathways to host vibrant civic experiences."
          : "轻轨线与多功能公交枢纽站有机结合，通过空中庭院与漫步连廊实现零距离的站城无缝接驳。",
        isTall: false,
      },
      {
        title: lang === "en" ? "03 / Multi-ground Terraced Commercial Walkways" : "03 / 多首层退台商业与步行系统网络",
        image: "https://raw.githubusercontent.com/leochou123/-/main/C03.jpg",
        desc: lang === "en"
          ? "Sweeping pedestrian stairs and floating pathways integrate lush sky lawns with modern retail layouts."
          : "错落有致的阶梯退台释放出大量怡人的绿色公共露台，将人性化的人流立体引向滨水开放绿轴。",
        isTall: true,
      },
      {
        title: lang === "en" ? "04 / Youth Co-living Apartment Towers" : "04 / 青年乐活公寓与创意社交中庭",
        image: "https://raw.githubusercontent.com/leochou123/-/main/C04.jpg",
        desc: lang === "en"
          ? "Sleek high-density residential towers prioritize modern communal features for inspiring creative exchange."
          : "专为科创青年群落打造的高品质塔楼，配合立体共享大平层释放无限的都市社交与共创魅力。",
        isTall: false,
      },
      {
        title: lang === "en" ? "05 / Waterfront Promenades & High-Density Ecology" : "05 / 滨水漫步休闲区与人性生态走廊",
        image: "https://raw.githubusercontent.com/leochou123/-/main/C05.jpg",
        desc: lang === "en"
          ? "Responsive water-facing green ribbons create continuous public parks and microclimate wellness spots."
          : "水岸边缘通过生态缓坡与多功能运动场结合，在城市临水界面处营建大片富氧生态缓冲地带。",
        isTall: true,
      },
      {
        title: lang === "en" ? "06 / High-Performance Solar Harvesting & Massing Logic" : "06 / 全生命周期智慧园区光能采集推演",
        image: "https://raw.githubusercontent.com/leochou123/-/main/C06.jpg",
        desc: lang === "en"
          ? "Advanced solar orientation models optimize dynamic shading elements and high-yield integrated photovoltaic surfaces."
          : "通过光伏屋面及自适应格栅对日光辐射热进行模拟，实现高自主产能、高溢价的零碳办公蓝图。",
        isTall: false,
      },
      {
        title: lang === "en" ? "07 / Custom Tectonic Facades & Fine Masonry Work" : "07 / 枢纽商务中心精细立面石材收边",
        image: "https://raw.githubusercontent.com/leochou123/-/main/C07.jpg",
        desc: lang === "en"
          ? "Elegant modular stonework is contrasted with high-precision metallic lattices to ensure timeless facade aesthetics."
          : "挺拔干练的石材幕墙交接以雅致的深色阳极氧化铝板，在强烈的光影变化下展现理性的工业建构美感。",
        isTall: true,
      },
      {
        title: lang === "en" ? "08 / Dusk Glowing Atmosphere & Iconic Skybridge" : "08 / 日暮未来地标星空连廊交汇盛景",
        image: "https://raw.githubusercontent.com/leochou123/-/main/C08.jpg",
        desc: lang === "en"
          ? "Under dynamic starry night illuminations, the futuristic skybridge stands out as the ultimate glowing landmark."
          : "夜幕低垂，交织跃动的建筑轮廓线与室内的温润光感交相辉映，地标连廊光影谱写出无限商业活力。",
        isTall: false,
      }
    ],
    library: [
      {
        title: lang === "en" ? "01 / ComfyUI Parameter Node Grid" : "01 / ComfyUI 智能生成逻辑体系",
        image: "https://raw.githubusercontent.com/leochou123/-/main/A01.png",
        desc: lang === "en" 
          ? "Deep parameter-driven ComfyUI node network ensuring seamless alignment of design pipelines with actual project requirements." 
          : "自主研发的 ComfyUI 参数化逻辑控制网，确保智能化生图管线与实际项目建构要求紧密对齐。",
        isTall: true,
      },
      {
        title: lang === "en" ? "02 / ControlNet Structural Massing Control" : "02 / ControlNet 多视角精确体量控制",
        image: "https://raw.githubusercontent.com/leochou123/-/main/A02.jpg",
        desc: lang === "en" 
          ? "Using ControlNet nodes to secure strict structural volume constraints, maintaining ideal relationships with surrounding urban edges."
          : "利用 ControlNet 进行多视角骨架对齐，精确锁定建筑轮廓、退界及城市界面的对立关系。",
        isTall: false,
      },
      {
        title: lang === "en" ? "03 / Photorealistic Glass Cladding Material" : "03 / 高保真实体材质纹样仿真",
        image: "https://raw.githubusercontent.com/leochou123/-/main/A03.jpg",
        desc: lang === "en" 
          ? "Ultra-high-fidelity daytime render simulating exact reflections of the Low-E double-silver glazed curtain wall."
          : "写实材质日间效果大样，高保真微气候与日光辐射环境下的超白玻璃幕墙肌理仿真。",
        isTall: true,
      },
      {
        title: lang === "en" ? "04 / Rapid Non-Destructive Multi-Option Exploration" : "04 / 极速敏捷拼图与意向性打样",
        image: "https://raw.githubusercontent.com/leochou123/-/main/A04.jpg",
        desc: lang === "en" 
          ? "Leveraging proprietary prompt strings to explore multiple cladding configurations non-destructively within seconds."
          : "基于自建提示词库实现多意向方案的无损极速打样，轻量、敏捷、大批量推进方案寻优。",
        isTall: false,
      },
      {
        title: lang === "en" ? "05 / Fine Architectural Joinery Details" : "05 / 次级构件细部交接节点精雕",
        image: "https://raw.githubusercontent.com/leochou123/-/main/A05.jpg",
        desc: lang === "en" 
          ? "Secondary refinement detail checks verifying seamless connection interfaces of anodized panels and glazing grids."
          : "立面次级细节深化，无损还原阳极氧化铝板、不锈钢肋与玻璃幕墙交接处的纯粹美学。",
        isTall: true,
      },
      {
        title: lang === "en" ? "06 / Completed High-Rise PV Base Delivery" : "06 / 全生命周期智慧科创园景完美交付",
        image: "https://raw.githubusercontent.com/leochou123/-/main/A06.jpg",
        desc: lang === "en" 
          ? "Full dusk panorama showcase celebrating the digital-twin PV innovation campus in its high-performance urban setting."
          : "全景日暮地标夜景融合，以“地标晶体、绿野底色”为轴心的高画质全案设计成果交付。",
        isTall: false,
      }
    ],
    tower: [
      {
        title: lang === "en" ? "01 / Oasis Palace Main Entrance & Welcoming Gate" : "01 / 度假村奢华主入口与迎宾院落",
        image: "https://raw.githubusercontent.com/leochou123/-/main/F01.jpg",
        desc: lang === "en"
          ? "A grand, symmetrical arrival portal blending modern structural frames with ancient sand-colored stone finishes."
          : "建筑呈中轴对称式宏阔布局，以当代斜坡金属挑檐与温润肌理天然砂岩墙体有机交接，彰显奢华而谦逊的入口气度。",
        isTall: true,
      },
      {
        title: lang === "en" ? "02 / Mirror Water Courtyard & Shaded Terraces" : "02 / 镜面静水庭院与序列仿木格栅",
        image: "https://raw.githubusercontent.com/leochou123/-/main/F02.jpg",
        desc: lang === "en"
          ? "A central reflective pool capturing dramatic sky elements, framed by delicate timber screen louvers that cool the space naturally."
          : "水波不兴的静水大平层如洗炼镜面将孤挺棕榈与纯净天光完美收纳，配合周边精致仿木遮阳格栅，勾勒静谧奢美意境。",
        isTall: false,
      },
      {
        title: lang === "en" ? "03 / Sanctuary Guest Suite & Intimate Interiors" : "03 / 戈壁野奢特色野趣套房内装",
        image: "https://raw.githubusercontent.com/leochou123/-/main/F03.jpg",
        desc: lang === "en"
          ? "Immersive dual-view private suites designed with native earthy textiles, warm light overlays, and seamless window portals."
          : "客房内部采用极致温润细腻的人文色系，超宽大板定制落地窗搭配通透采光，让粗犷风沙印记与柔和高贵居住体验完美相融。",
        isTall: true,
      },
      {
        title: lang === "en" ? "04 / Panoramic Infinity Pool & Sunbathing Deck" : "04 / 悬崖无边叠水泳池与日光躺椅",
        image: "https://raw.githubusercontent.com/leochou123/-/main/F04.jpg",
        desc: lang === "en"
          ? "An oasis-style pool overlooking the sweeping valley, featuring natural local stone decks and cozy shaded daybeds."
          : "依傍自然起伏崖壁层叠而下的无边界观景泳池，池水由高处轻缓泻落，在极高规格遮阳亭下打造忘忧避世的沁凉体验。",
        isTall: false,
      },
      {
        title: lang === "en" ? "05 / Canyon-Framed Desert Luxury Villas" : "05 / 峭壁环抱底盘下的孤品别墅群",
        image: "https://raw.githubusercontent.com/leochou123/-/main/F05.jpg",
        desc: lang === "en"
          ? "Low-density residential clusters lining the valley edge, carefully positioned to capture panoramic sunset views."
          : "依山就势匍匐在粗砺硬石基底上的独栋别墅，低垂的屋面板与山峦同色，在漫无边际的红海荒漠中绽放静谧永恒之力。",
        isTall: true,
      },
      {
        title: lang === "en" ? "06 / Mystical Twilight Lights & Cosmic Nightscape" : "06 / 暮色微光亮灯与星空度假美学",
        image: "https://raw.githubusercontent.com/leochou123/-/main/F06.jpg",
        desc: lang === "en"
          ? "As twilight colors the sky, subtle recessed warm lights convert the resort into a glowing crown in the heart of the desert."
          : "当紫红色的日暮在黄沙天际交融，建筑外置暖白线脚藏光隐然亮起。光影雕琢出建筑绝美立面轮廓，仿若沙漠深沉眼眸。",
        isTall: false,
      }
    ],
    factory: [
      {
        title: lang === "en" ? "01 / GIGABASE Concept Aerial Exploration" : "01 / GIGABASE 概念空中规划透视",
        image: "https://raw.githubusercontent.com/leochou123/-/main/D01.jpg",
        desc: lang === "en"
          ? "An overview of the compact and highly unified factory campus, introducing a brand-new generation of iconic industrial parks."
          : "规划紧凑统一的高效特色园区，打破了传统产业对于地表机能的撕裂，建立起全新一代的标志性绿色地标。",
        isTall: true,
      },
      {
        title: lang === "en" ? "02 / Integrated Production & Exhibition Center" : "02 / 综合首层展厅与展示中心前厅",
        image: "https://raw.githubusercontent.com/leochou123/-/main/D02.jpg",
        desc: lang === "en"
          ? "The double-height public showroom integrating high-tech product showcase with clean structural lines."
          : "超高挑空的综合展示前厅，将未来先进制造产品展陈和现代极简钢构线脚生动交织，构建兼具工业美感与未来主义的开放场域。",
        isTall: false,
      },
      {
        title: lang === "en" ? "03 / Traditional Courtyard Reimagined on Mountain Top" : "03 / 顶部江南合院式总部办公格局",
        image: "https://raw.githubusercontent.com/leochou123/-/main/D03.jpg",
        desc: lang === "en"
          ? "The headquarters office mimics the local traditional Shaoxing courtyard on the top level, featuring serene wooden structures."
          : "顶楼办公空间借鉴了绍兴传统的合院规制，配合悬空露台与微型中庭景观，为入驻企业员工营造出充满东方雅致的人文关怀。",
        isTall: true,
      },
      {
        title: lang === "en" ? "04 / Panoramic Rooftop Garden Walkway" : "04 / 顶层全视野空中连廊休憩带",
        image: "https://raw.githubusercontent.com/leochou123/-/main/D04.jpg",
        desc: lang === "en"
          ? "A suspended roof platform framing pristine views of Keqiao's landscape, fostering interactive workspaces."
          : "悬浮于工业制造厂区上空的步行回廊，打破了普通办公空间的沉闷，让企业领航者与漫步员工在此深入对话。",
        isTall: false,
      },
      {
        title: lang === "en" ? "05 / Flexible Smart Assembly Workshop" : "05 / 预应力高承载模块化制造车间",
        image: "https://raw.githubusercontent.com/leochou123/-/main/D05.jpg",
        desc: lang === "en"
          ? "The core production space utilizing long-span steel frames for high efficiency and adaptive layouts."
          : "主跨度空间采用抗剪大跨度钢结构托梁，不仅满足高精度自动智能组装线布局，亦为远期扩容带来极致的韧性弹性。",
        isTall: true,
      },
      {
        title: lang === "en" ? "06 / Monumental Tectonic Facade & Sunset Glow" : "06 / 巨型挺拔金属立面与主广场夜合景",
        image: "https://raw.githubusercontent.com/leochou123/-/main/D07.jpg",
        desc: lang === "en"
          ? "The prominent headquarters exterior showing how the elevated office volume sits perfectly balanced above the production block."
          : "大气完整的标志性主立面夜景。高置的合院总部体量完美地卧在生产与展厅裙楼之上，在夜色中焕发出雄浑庄重的雕塑感。",
        isTall: false,
      }
    ],
    workflow: [
      {
        title: lang === "en" ? "01 / Micro-Climate Wind & Solar Path Analysis" : "01 / 生态风解析与建筑体型模拟",
        image: "https://raw.githubusercontent.com/leochou123/-/main/01%E5%88%86%E6%9E%90%E5%9B%BE.jpg",
        desc: lang === "en"
          ? "Using physical microclimate modeling to simulate solar paths, air flows, and setback slopes, establishing are most rational and high-performing ecological massing basis."
          : "利用微气候物理模型，对基地的太阳辐射热、空气流场以及退界斜率进行全数字模拟，从而奠定了建筑最科学的生态形体基础。",
        isTall: true,
      },
      {
        title: lang === "en" ? "02 / Spatial Cross-Section & Internal Atrium View" : "02 / 竖向空间功能错叠剖解",
        image: "https://raw.githubusercontent.com/leochou123/-/main/02%E5%89%96%E9%9D%A2.jpg",
        desc: lang === "en"
          ? "Detailed architectural section showcasing the multi-level glass atrium, elevator core, integrated sky gardens, and spacious corporate meeting platforms."
          : "深入剖解主楼底部的共享生态中庭与挑高大堂内部格局，呈现了竖向集合式总部中立体交通、空中花园和高效办公的完美协同。",
        isTall: false,
      },
      {
        title: lang === "en" ? "03 / Iconic South Elevation Perspective" : "03 / 主南立面日光自适应感应外廓",
        image: "https://raw.githubusercontent.com/leochou123/-/main/03%E5%8D%97%E7%AB%8B%E9%9D%A2%E9%80%8F%E8%A7%8601.jpg",
        desc: lang === "en"
          ? "An elegant daytime perspective of the landmark south facade, where geometric curtain wall grids blend with layered greenery to celebrate modern tectonic language."
          : "南向主体视角的挺拔日景。设计结合大跨度现代格栅，将“空中花屿”和阶梯绿化挑台细腻地融入晶莹剔透的高品质 Low-E 玻璃实体之中。",
        isTall: true,
      },
      {
        title: lang === "en" ? "04 / Glowing Active Street Nightscape Corridor" : "04 / 延趣街区活力地标夜色美学",
        image: "https://raw.githubusercontent.com/leochou123/-/main/04%E6%B2%BF%E8%A1%97%E7%AB%8B%E9%9D%A2-%E5%A4%9C%E6%99%AF5.jpg",
        desc: lang === "en"
          ? "The spectacular nocturnal expression from the primary road. Ambient uplights glorify the cascading foliage zones and evoke an inviting playfulness inspired by the game-exploration core."
          : "夜幕降临时沿街主视角的温润晚景。灯光设计衬托着建筑如“空中花屿”般层层错置的漂浮感，形成了富有探索乐趣的城市商业地标形象。",
        isTall: false,
      },
      {
        title: lang === "en" ? "05 / Pedestrian West Green Axis & Creative Bazaar Plaza" : "05 / 共享市集与人性化底层绿轴空间",
        image: "https://raw.githubusercontent.com/leochou123/-/main/05%E8%A5%BF%E4%BE%A7%E7%BB%BF%E8%BD%B4-%E5%B8%82%E9%9B%86%E6%A8%A1%E5%BC%8F.jpg",
        desc: lang === "en"
          ? "The shared ground-floor plaza flowing together with the west green corridor, designed to support lively weekend markets, creative forums, and outdoor gaming expos."
          : "底层全开放的活动广场，与西侧城市绿化廊道浑然融为一体，能便捷转换为文化创意市集与游戏快闪空间，激发强大的城际社交活力。",
        isTall: true,
      },
      {
        title: lang === "en" ? "06 / Master-planned Eco-Valley Aerial Panorama" : "06 / 城市生态之谷总部综合鸟瞰",
        image: "https://raw.githubusercontent.com/leochou123/-/main/06-%E9%B8%9F%E7%9E%B0.jpg",
        desc: lang === "en"
          ? "A comprehensive birds-eye perspective highlighting the spatial relationship of the twin towers, the active podium, and the central natural canyon."
          : "宏阔的整体规划鸟瞰展示，塔楼与绿谷、空中露台巧妙交织为竖向集合的立体总部园区，完美诠释生态、科技与趣味的融合姿态。",
        isTall: false,
      }
    ]
  };

  const projectDetails = activeDetailsMap[selectedProjectId] || activeDetailsMap.villa;

  // Render Intro Overlay Screen
  if (!isPassedIntro) {
    return (
      <div 
        id="intro-animation-screen"
        className="fixed inset-0 bg-[#faf9f6] z-50 flex flex-col items-center justify-center font-sans select-none"
      >
        <div className="w-[80%] max-w-4xl relative">
          
          {/* Centered growing line */}
          <div className="h-[1px] bg-neutral-900/60 overflow-hidden mb-6 relative">
            <div 
              className={`h-full bg-neutral-900 transition-all duration-[2000ms] ease-out`}
              style={{ width: introStep >= 1 ? "100%" : "0%" }}
            />
          </div>

          {/* Elegant typographic fade-in */}
          <div 
            className={`flex flex-col md:flex-row justify-between items-start transition-all duration-[1200ms] ease-out ${
              introStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <div>
              <p className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">// ARCHITECTURAL AI ATELIER</p>
              <h1 className="text-xl md:text-3xl font-light text-neutral-900 tracking-widest mt-2 uppercase">
                LEE JAY ZHOU
              </h1>
            </div>
            
            <div className="text-left md:text-right mt-4 md:mt-0 font-mono text-[10px] tracking-widest text-[#86868B]">
              <p>TECTONIC AI & DESIGN // 2026</p>
              <p className="mt-1">INTELLIGENT SPACE EXPO</p>
            </div>
          </div>
        </div>

        {/* Dynamic skip cue */}
        <button 
          id="skip-intro-btn"
          onClick={() => setIsPassedIntro(true)}
          className="absolute bottom-12 text-[10px] tracking-[0.2em] uppercase font-mono text-neutral-400 hover:text-black transition-colors duration-200"
        >
          [ Skip Setup / 直接进入 ]
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] selection:bg-neutral-900 selection:text-white relative">
      
      {/* 1. Header Navigation System */}
      <nav id="top-sticky-header" className="fixed top-0 left-0 w-full z-40 bg-[#faf9f6]/80 backdrop-blur-md border-b border-neutral-200/40 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Atelier Logo / Signature */}
          <div 
            onClick={() => scrollToSection("cover")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
              <span className="text-[10px] text-white">▲</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-wider text-neutral-900 uppercase">
                LEE JAY ZHOU
              </span>
              <span className="text-[9px] text-[#86868B] font-mono tracking-widest leading-none">
                TECTONIC AI ATELIER
              </span>
            </div>
          </div>

          {/* Navigation Links (Home view anchor jump) */}
          {activeView === "home" ? (
            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => scrollToSection("cover")}
                className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  activeSection === "cover" ? "bg-neutral-950 text-white" : "text-neutral-500 hover:text-black hover:bg-neutral-100"
                }`}
              >
                {lang === "en" ? "Cover" : "封面"}
              </button>
              <button 
                onClick={() => scrollToSection("personal")}
                className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  activeSection === "personal" ? "bg-neutral-950 text-white" : "text-neutral-500 hover:text-black hover:bg-neutral-100"
                }`}
              >
                {lang === "en" ? "Architect Profile" : "个人故事"}
              </button>
              <button 
                onClick={() => scrollToSection("works")}
                className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  activeSection === "works" ? "bg-neutral-950 text-white" : "text-neutral-500 hover:text-black hover:bg-neutral-100"
                }`}
              >
                {lang === "en" ? "Carousel Works" : "作品展示"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveView("home")}
              className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black font-semibold border border-neutral-300 bg-white px-3 py-1.5 rounded-full shadow-sm transition-all duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Back to Main Screen" : "返回主展厅"}</span>
            </button>
          )}

          {/* Telemetry Actions (Language & UTC status) */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] text-[#86868B] border-r border-neutral-200 pr-4">
              <Clock className="w-3.5 h-3.5 stroke-1" />
              <span className="font-semibold text-neutral-800">{currentTime}</span>
              <span className="text-neutral-300"> | </span>
              <span className="flex items-center gap-1 bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-md font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {t.weatherTemp}
              </span>
            </div>

            {/* Language switch toggle */}
            <button
              id="global-lang-toggler"
              onClick={() => setLang(prev => prev === "en" ? "zh" : "en")}
              className="flex items-center gap-1 bg-white hover:bg-neutral-100 border border-neutral-200 px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-mono text-[10px] font-bold uppercase">
                {lang === "en" ? "中文 / ZH" : "ENGLISH / EN"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* VIEW 1: HOME VIEW WITH FLUID SEQUENTIAL PORTFOLIO */}
      {activeView === "home" && (
        <div id="home-view-sections" className="pt-20">
          
          {/* SECTION A: COVER PAGE (封面页) */}
          <section 
            id="cover" 
            className="min-h-[92vh] flex flex-col justify-center relative px-6 md:px-12 overflow-hidden border-b border-neutral-200/40 bg-[#faf9f6] select-none"
          >
            {/* Fine Dotted Engineering Grid Overlay */}
            <div className="absolute inset-0 engineering-grid opacity-[0.8] pointer-events-none" />

            {/* Background design matrix parameters */}
            <div className="absolute top-10 right-10 flex flex-col font-mono text-[9px] text-neutral-400 text-right pointer-events-none">
              <span>REF_GRID_SYSTEM: AI-05 // PARAMETRIC</span>
              <span>SITE_AZM_ALIGNMENT: PASSIVE_HELIOROT_23.5°</span>
              <span>LEE_JAY_ZHOU_STUDIO_COORDINATES: lat31.230_lng121.473</span>
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10 py-12">
              
              {/* Left Column: Big Grid Text PORTFOLIO */}
              <div className="lg:col-span-6 flex flex-col justify-between" id="cover-caption-col">
                <div className="relative">
                  {/* Subtle alignment markers */}
                  <div className="absolute -top-7 -left-1 font-mono text-[9px] text-[#86868B] tracking-widest uppercase">
                    [ ATELIER_DESIGN_COMTEMPORARY_v3.2 ]
                  </div>
                  
                  {/* Giant 3x3 Text Grid arrangement */}
                  <div className="flex flex-col font-mono tracking-widest leading-none text-neutral-900 uppercase font-black">
                    <div className="flex justify-between w-full max-w-sm md:max-w-md text-[18vw] md:text-[6.5vw] py-1 border-b border-dashed border-neutral-200 mt-2">
                      <span className="hover:text-amber-500 transition-colors duration-200">P</span>
                      <span className="text-neutral-300 hover:text-amber-500 transition-colors duration-200">•</span>
                      <span className="hover:text-amber-500 transition-colors duration-200">O</span>
                      <span className="text-neutral-300 hover:text-amber-500 transition-colors duration-200">•</span>
                      <span className="hover:text-amber-500 transition-colors duration-200">R</span>
                    </div>
                    <div className="flex justify-between w-full max-w-sm md:max-w-md text-[18vw] md:text-[6.5vw] py-1 border-b border-dashed border-neutral-200">
                      <span className="hover:text-indigo-500 transition-colors duration-200">T</span>
                      <span className="text-neutral-300 hover:text-indigo-500 transition-colors duration-200">•</span>
                      <span className="hover:text-indigo-500 transition-colors duration-200">F</span>
                      <span className="text-neutral-300 hover:text-indigo-500 transition-colors duration-200">•</span>
                      <span className="hover:text-indigo-500 transition-colors duration-200">O</span>
                    </div>
                    <div className="flex justify-between w-full max-w-sm md:max-w-md text-[18vw] md:text-[6.5vw] py-1 border-b border-neutral-200">
                      <span className="hover:text-emerald-500 transition-colors duration-200">L</span>
                      <span className="text-neutral-300 hover:text-emerald-500 transition-colors duration-200">•</span>
                      <span className="hover:text-emerald-500 transition-colors duration-200">I</span>
                      <span className="text-neutral-300 hover:text-emerald-500 transition-colors duration-200">•</span>
                      <span className="hover:text-emerald-500 transition-colors duration-200">O</span>
                    </div>
                  </div>
                </div>

                {/* Subtext captions mapped exactly to picture layout */}
                <div className="mt-8 md:mt-16 border-l-2 border-neutral-900 pl-6 py-2">
                  <p className="text-sm font-semibold tracking-wider text-neutral-800">
                    {lang === "en" ? "Architecture & Spatial Design, AI Toolchain Integration System" : "建筑与空间设计、AI工具流搭建体系"}
                  </p>
                  <p className="text-lg font-bold text-neutral-950 mt-1 uppercase">
                    {lang === "en" ? "Digital Portfolio of Lee Jay ZHOU" : "周理洁 (Lee Jay ZHOU) 建筑 AI 与产品数字作品集"}
                  </p>
                  <p className="text-xs font-mono text-[#86868B] tracking-widest mt-2">
                    CROSSING THE ATELIER / {lang === "en" ? "SHANGHAI & NANJING" : "上海建筑AI设计创新中心"} // 2026
                  </p>
                </div>
              </div>

              {/* Right Column: 5 Tall Vertical Column Images with staggered heights/offsets (封面灰度转彩色、轻微放大、错层排列) */}
              <div className="lg:col-span-6 grid grid-cols-5 gap-2 md:gap-3 bg-[#faf9f6]/40 h-[440px] md:h-[580px] items-center relative py-12 overflow-visible" id="cover-photo-cols">
                {coverImages.map((item, index) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setSelectedProjectId(item.projectId);
                      setSelectedCoverImageURL(item.image);
                      setIsDetailModalOpen(true);
                    }}
                    className={`group relative h-full w-full rounded-2xl overflow-hidden cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-neutral-200/50 transition-all duration-[600ms] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:scale-[1.02] ${item.staggerClass}`}
                    id={`image-column-${item.id}`}
                  >
                    {/* Grayscale turns color, scales up gently */}
                    <img 
                      src={item.image}
                      alt={item.title[lang]}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.07] transition-all duration-[800ms] ease-out"
                    />
                    
                    {/* Column number index banner */}
                    <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md px-1.5 py-0.5 rounded-full font-mono text-[9px] text-neutral-800 border border-neutral-200/50">
                      0{index + 1}
                    </div>

                    {/* Left absolute line descriptor overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-2 md:p-3 flex flex-col justify-end h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="text-[8px] md:text-[9px] font-mono text-neutral-300 uppercase leading-none">
                        {item.category[lang]}
                      </span>
                      <h4 className="text-[10px] md:text-[11px] font-bold text-white mt-1 leading-normal tracking-tight">
                        {item.title[lang]}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom-right Corner Guide with breathing animation */}
            <div 
              onClick={() => scrollToSection("personal")}
              className="absolute bottom-8 right-12 z-20 flex flex-col items-center gap-1 cursor-pointer pointer-events-auto"
              id="downward-magnetic-guide"
            >
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#86868B] uppercase select-none pb-1 font-semibold block [writing-mode:vertical-lr]">
                {lang === "en" ? "EXPLORE DOWNWARD" : "向下滚动探索"}
              </span>
              
              {/* Dynamic 90-degree corner breathing guide */}
              <div className="w-10 h-10 border-r-2 border-b-2 border-neutral-900/60 flex items-end justify-end p-1 animate-breath-guide">
                <span className="text-[10px] text-neutral-800 font-bold select-none leading-none tracking-widest pl-2 transform rotate-45">↓</span>
              </div>
            </div>

            {/* Left absolute telemetry strip */}
            <div className="absolute bottom-10 left-10 font-mono text-[10px] text-neutral-400 hidden md:block select-none pointer-events-none">
              <span>ENGINE: v3.2_active</span>
            </div>
          </section>          {/* SECTION B: PERSONAL PROFILE & TIMELINE (个人页 - 完美对应图一极简排版) */}
          <section id="personal" className="py-24 bg-zinc-50/50 border-b border-neutral-200/30 relative">
            
            {/* Fine grid lines decoration matching high-class blueprint style */}
            <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
                
                {/* LEFT COLUMN: STICKY PROFILE PANEL (图一左侧：头像、标题关于我、职业描述和专业标签) */}
                <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit flex flex-col items-center lg:items-start text-center lg:text-left" id="profile-sticky-card">
                  
                  {/* Circular Portrait with overlapping small badge exactly as shown in screenshot */}
                  <div className="relative w-44 h-44 md:w-52 md:h-52" id="portrait-avatar-wrapper">
                    <div className="w-full h-full rounded-full overflow-hidden bg-black border-[3px] border-white shadow-xl">
                      <img 
                        src="https://raw.githubusercontent.com/leochou123/-/main/%E4%B8%AA%E4%BA%BA%E7%85%A7%E7%89%87.jpg"
                        alt="Zhou Lijie Portrait"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    {/* Small circular overlapping badge with Web/Global design icon */}
                    <div 
                      id="avatar-mini-badge" 
                      className="absolute bottom-1 right-3 w-10 h-10 rounded-full bg-neutral-950 border-2 border-white flex items-center justify-center text-white shadow-md cursor-pointer hover:scale-110 transition-transform duration-200"
                    >
                      <Globe className="w-5 h-5 text-sky-450 stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Heading Title "关于我 / Lee Jay ZHOU" */}
                  <h3 className="text-3xl font-serif text-neutral-900 mt-8 tracking-tight font-medium" id="avatar-bio-title">
                    关于我 / 周理洁
                  </h3>

                  {/* High fidelity literal description paragraph from image */}
                  <p className="text-neutral-500 text-xs md:text-[13px] font-light leading-relaxed mt-4 max-w-md">
                    {lang === "en" 
                      ? "Hello! I am an architectural AI researcher and product manager with a rigorous background in Class-985 architectural academia. While spearheading traditional and multi-scale building research, I specialize in establishing standardized AI design workflows and delivering real-world installations. I am passionate about pioneering human-machine synergy."
                      : "你好！我是一名拥有985建筑学背景的复合型建筑 AI 研发人与产品经理。热衷于在设计院研发部门进行传统建筑、多业态建筑基础研发的同时，主攻建筑 AI 流程搭建、标准化沉淀与应用落地，探索并重塑人机协同的设计美学。"}
                  </p>

                  {/* Pills skill-badges exactly as in figure 1 layout */}
                  <div className="flex flex-wrap gap-2 mt-8 justify-center lg:justify-start" id="bio-skills-pills">
                    {["BUILDING AI", "COMFYUI", "STABLE DIFFUSION", "AI PRODUCT", "GEMINI", "SUAPP AI", "REG. ARCHITECT"].map((badge, bidx) => (
                      <span 
                        key={bidx} 
                        className="px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-wider text-neutral-600 bg-white border border-neutral-200 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 rounded-md transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.015)] cursor-pointer"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* MIDDLE COLUMN: FINE ALIGNING TIMELINE HARNESS (图一中间细垂线及触点) */}
                <div className="hidden lg:flex lg:col-span-1 justify-center relative" id="timeline-divider-rail">
                  <div className="absolute top-4 bottom-4 w-[1px] bg-neutral-200/80" />
                  
                  {/* Bullets precisely offset to balance top heading positions */}
                  <div className="absolute top-[8%] w-3.5 h-3.5 rounded-full bg-neutral-300 border-4 border-white shadow-sm z-10" />
                  <div className="absolute top-[48%] w-3.5 h-3.5 rounded-full bg-neutral-300 border-4 border-white shadow-sm z-10" />
                </div>

                {/* RIGHT COLUMN: SCROLLABLE RESUME CV MAP (图一右侧：EDUCATION及EXPERIENCES极简卡片) */}
                <div className="lg:col-span-6 space-y-12 pl-2" id="profile-detailed-resume">
                  
                  {/* EDUCATION BLOCK */}
                  <div className="space-y-6">
                    <h4 className="text-2xl md:text-3xl font-serif text-neutral-800 tracking-wide font-light uppercase flex items-center gap-2">
                      Education
                    </h4>

                    {/* Card 1: NJU Graduate */}
                    <div className="bg-white border border-neutral-150/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_45px_rgba(0,0,0,0.04)] hover:border-neutral-250 transition-all duration-300 p-6 md:p-8 rounded-3xl relative">
                      <span className="font-serif italic text-lg md:text-xl text-[#86868B] font-extralight block mb-3">
                        2020.09 - 2023.06
                      </span>

                      <h5 className="text-neutral-950 font-serif font-bold text-xl md:text-2xl leading-none">
                        南京大学
                      </h5>
                      <p className="text-[10px] md:text-xs font-mono text-[#86868B] uppercase tracking-wider mt-1.5 mb-5 font-bold">
                        {lang === "en" ? "Master of Architecture" : "硕士 | 建筑学专业"}
                      </p>

                      <div className="space-y-4 pt-5 border-t border-neutral-100 text-xs md:text-[13px] text-neutral-600 leading-relaxed font-light">
                        <div>
                          <strong className="font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-neutral-400 block mb-0.5">Qualifications & Honors</strong>
                          <p className="text-neutral-900 font-semibold">校级优秀毕业生、优秀毕业论文奖</p>
                        </div>
                        <div>
                          <strong className="font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-neutral-400 block mb-0.5">Academic Rigor</strong>
                          <p className="text-neutral-700 leading-relaxed">
                            {lang === "en" 
                              ? "Deeply engaged in the practice of full-cycle architectural design methodology, building systematic approaches from early planning and concept generation to real-world execution control; while exploring integrated design workflows driven by AI for spatial layout optimization, parametric form generation, and performance simulation."
                              : "深耕建筑设计方法论全流程实践，从前期策划、方案生成到落地管控的系统性方法构建；并探索 AI 驱动的平面布局优化、参数化形态推演与性能模拟的集成设计流程。"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: HFUT Undergraduate */}
                    <div className="bg-white border border-neutral-150/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_45px_rgba(0,0,0,0.04)] hover:border-neutral-250 transition-all duration-300 p-6 md:p-8 rounded-3xl relative">
                      <span className="font-serif italic text-lg md:text-xl text-[#86868B] font-extralight block mb-3">
                        2015.09 - 2020.06
                      </span>

                      <h5 className="text-neutral-950 font-serif font-bold text-xl md:text-2xl leading-none">
                        合肥工业大学
                      </h5>
                      <p className="text-[10px] md:text-xs font-mono text-[#86868B] uppercase tracking-wider mt-1.5 mb-5 font-bold">
                        {lang === "en" ? "Bachelor of Architecture (5-Year)" : "学士 | 建筑学专业 (五年制)"}
                      </p>

                      <div className="space-y-4 pt-5 border-t border-neutral-100 text-xs md:text-[13px] text-neutral-600 leading-relaxed font-light">
                        <div>
                          <strong className="font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-neutral-400 block mb-0.5">Qualifications & Honors</strong>
                          <p className="text-neutral-900 font-semibold">安徽省优秀毕业生、校级优秀毕业设计奖</p>
                        </div>
                        <div>
                          <strong className="font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-neutral-400 block mb-0.5">Foundational Training</strong>
                          <p className="text-neutral-700 leading-relaxed">
                            {lang === "en" 
                              ? "Received premium comprehensive 5-year professional system training in geometry, structural mechanics, architectural design regulations, and practical project planning."
                              : "接受全面系统的五年制建筑专业训练，在力学建构、规范退界、总规选型、细部节点及数字图纸设计方面打下深厚专业底阀。"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EXPERIENCES BLOCK */}
                  <div className="space-y-6">
                    <h4 className="text-2xl md:text-3xl font-serif text-neutral-800 tracking-wide font-light uppercase flex items-center gap-2">
                      Experiences
                    </h4>

                    {/* Card 1: Du She Design */}
                    <div className="bg-white border border-neutral-150/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_45px_rgba(0,0,0,0.04)] hover:border-neutral-250 transition-all duration-300 p-6 md:p-8 rounded-3xl relative">
                      <span className="font-serif italic text-lg md:text-xl text-[#86868B] font-extralight block mb-3">
                        2023.07 - 至今
                      </span>

                      <h5 className="text-neutral-950 font-serif font-bold text-xl md:text-2xl leading-none">
                        上海都设营造建筑设计事务所
                      </h5>
                      <p className="text-[10px] md:text-xs font-mono text-sky-500 uppercase tracking-wider mt-1.5 mb-5 font-bold">
                        {lang === "en" ? "Lead Architect & AI R&D Lead (R&D Dept)" : "研发部门 | 主创建筑师兼 AI 研发负责人"}
                      </p>

                      <div className="space-y-4 pt-5 border-t border-neutral-100 text-xs md:text-[13px] text-neutral-600 leading-relaxed font-light">
                        <div>
                          <strong className="font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-neutral-400 block mb-0.5">Core R&D Position</strong>
                          <p className="text-neutral-950 font-semibold">{lang === "en" ? "AI Pipeline Design & Productization" : "AI 赋能设计流程创新 & AI 体系研发沉淀"}</p>
                          <p className="text-neutral-700 mt-1 leading-relaxed">
                            {lang === "en"
                              ? "Adept at applying SUAPP AI, ComfyUI, Stable Diffusion, and Midjourney to configure full-link pipelines (Analytical phase - Concept massing - Facade details - Virtual renders - Video briefs), reducing test cycles by 30%-50% and capturing premium prizes."
                              : "擅长针对办公、豪宅、酒店、文化公建、厂房多业态，深度运用 SUAPP AI, Stable Diffusion, ComfyUI, Midjourney 等工具搭建标准化 AI 设计工作流，打通概念至立面深化及高质量多媒体动画宣传，自建高复用提示词库和精细模版。"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Intership */}
                    <div className="bg-white border border-neutral-150/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_45px_rgba(0,0,0,0.04)] hover:border-neutral-250 transition-all duration-300 p-6 md:p-8 rounded-3xl relative">
                      <span className="font-serif italic text-lg md:text-xl text-[#86868B] font-extralight block mb-3">
                        2022.01 - 2023.01
                      </span>

                      <h5 className="text-neutral-950 font-serif font-bold text-xl md:text-2xl leading-none">
                        杭州 GOA & 上海 HKS 美国设计集团
                      </h5>
                      <p className="text-[10px] md:text-xs font-mono text-[#86868B] uppercase tracking-wider mt-1.5 mb-5 font-bold">
                        {lang === "en" ? "Architectural Intern" : "建筑设计实习生"}
                      </p>

                      <div className="space-y-4 pt-5 border-t border-neutral-100 text-xs md:text-[13px] text-neutral-600 leading-relaxed font-light">
                        <div>
                          <strong className="font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-neutral-400 block mb-0.5">Foundational Insights</strong>
                          <p className="text-neutral-700 leading-relaxed">
                            {lang === "en"
                              ? "Participated in full-cycle designs for large high-end residential, landmarks, and public complexes. Familiarized with real-world industry pain points and design regulations, establishing solid roots for backend model design."
                              : "两段头部设计院方案全流程实习，深度参与大型公共建筑、品牌住宅开发推演，熟悉一线业务痛点与协作链条，从而为 AI 工作流落地提供了坚实、敏锐的行业本底。"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </section>

          {/* SECTION C: CIRCULAR ROTATING WORKS WHEEL (目录页巨大圆盘旋转木马) */}
          <section id="works" className="min-h-screen flex flex-col justify-center relative bg-[#09090b] py-16 overflow-hidden">
            
            {/* Dark abstract backlights */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-neutral-900/30 via-transparent to-transparent rounded-full filter blur-3xl pointer-events-none" />
            <div className="absolute bottom-12 left-12 w-[350px] h-[350px] bg-sky-950/10 rounded-full filter blur-3xl pointer-events-none" />

            {(() => {
              const repeatedProjects = [
                { id: coverImages[0].projectId, title: coverImages[0].title, category: coverImages[0].category, image: coverImages[0].image, uniqKey: "analysis-1", label: "01" },
                { id: coverImages[1].projectId, title: coverImages[1].title, category: coverImages[1].category, image: coverImages[1].image, uniqKey: "section-1", label: "02" },
                { id: coverImages[2].projectId, title: coverImages[2].title, category: coverImages[2].category, image: coverImages[2].image, uniqKey: "south-1", label: "03" },
                { id: coverImages[3].projectId, title: coverImages[3].title, category: coverImages[3].category, image: coverImages[3].image, uniqKey: "street-1", label: "04" },
                { id: coverImages[4].projectId, title: coverImages[4].title, category: coverImages[4].category, image: coverImages[4].image, uniqKey: "aerial-1", label: "05" },
                { id: "factory", title: { en: "Singera New Energy HQ Factory", zh: "星辰新能总部工厂" }, category: { en: "Modern Headquarters Base", zh: "现代总部基地" }, image: "https://raw.githubusercontent.com/leochou123/-/main/D07.jpg", uniqKey: "factory-2", label: "06" },
                { id: coverImages[1].projectId, title: coverImages[1].title, category: coverImages[1].category, image: coverImages[1].image, uniqKey: "section-2", label: "07" },
                { id: coverImages[2].projectId, title: coverImages[2].title, category: coverImages[2].category, image: coverImages[2].image, uniqKey: "south-2", label: "08" },
                { id: coverImages[3].projectId, title: coverImages[3].title, category: coverImages[3].category, image: coverImages[3].image, uniqKey: "street-2", label: "09" }
              ];
              // Radius parameters mapping visual arc on left edge
              const isDesktop = windowWidth >= 1024;
              const cx = isDesktop ? 150 : -40;
              const cy = 290;
              const orbitR = 340;

              return (
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
                  
                   {/* LEFT ZONE: GIANT CIRCULAR CAROUSEL WHEEL (半圆卡片区、顺滑旋转) */}
                   <div 
                     ref={worksCarouselRef}
                     className="lg:col-span-7 flex flex-col items-center justify-center relative h-[520px] md:h-[600px] overflow-hidden rounded-3xl" 
                     id="circular-works-container"
                   >
                     
                     {/* Navigation label overlay */}
                     <div className="absolute top-4 left-4 z-20 font-mono text-[9px] text-neutral-400 tracking-wider uppercase bg-[#18181b]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-800/50">
                       {lang === "en" ? "[ SCROLL MOUSEWHEEL OR CLICK TO ROTATE ]" : "[ 慢速滚动鼠标中轮 或 点击卡片可交互旋转切换 ]"}
                     </div>
  
                      <div 
                        className="w-full h-full relative flex items-center justify-center cursor-ns-resize"
                        id="mousewheel-active-carousel-zone"
                      >
                       {/* Compass/Arc guide circles matching architectural schema */}
                       <div 
                         className="absolute border border-dashed border-neutral-800 rounded-full pointer-events-none flex items-center justify-center"
                         style={{
                           width: `${orbitR * 2}px`,
                           height: `${orbitR * 2}px`,
                           left: `${cx}px`,
                           top: `${cy}px`,
                           transform: "translate(-50%, -50%)",
                         }}
                       >
                         <div className="w-[450px] h-[450px] border border-neutral-900 rounded-full" />
                         <div className="absolute right-4 w-4 h-4 bg-sky-500/20 border border-sky-500/40 rounded-full flex items-center justify-center animate-ping" />
                       </div>

                      {/* Render 9 cards, absolute positioned by trigonometry */}
                      <div className="absolute inset-0 pointer-events-none">
                        {repeatedProjects.map((project, i) => {
                          const angle = i * 40 + carouselAngle;
                          
                          // Normalize to (-180, 180] for proximity calculations
                          let normAngle = angle % 360;
                          if (normAngle > 180) normAngle -= 360;
                          if (normAngle < -185) normAngle += 360; // safe bounding

                          const distFromFocus = Math.abs(normAngle);
                          // Only render visible semicircular card portion on the right of circle (e.g. within -100 ~ 100 degrees)
                          const isVisibleInArc = distFromFocus <= 100;
                          
                          if (!isVisibleInArc) return null;

                          const rad = (angle * Math.PI) / 180;
                          const topPos = cy + orbitR * Math.sin(rad);
                          const leftPos = cx + orbitR * Math.cos(rad);

                          const isCurrentActive = activeCarouselIndex === i;

                          // Scaling & fading formulas based on angular distance
                          const scale = 1 - (distFromFocus / 250);
                          const opacity = 1 - (distFromFocus / 115);

                          return (
                            <div
                              key={project.uniqKey}
                              onClick={() => {
                                setCarouselAngle(-i * 40);
                                setSelectedProjectId(project.id);
                                setSelectedCoverImageURL(project.image);
                                setIsDetailModalOpen(true);
                              }}
                              className={`absolute w-[145px] h-[200px] md:w-[165px] md:h-[235px] pointer-events-auto transition-all duration-[500ms] cursor-pointer select-none rounded-2xl overflow-hidden ${
                                isCurrentActive 
                                  ? "border border-white ring-2 ring-white/10 shadow-[0_0_30px_rgba(255,255,255,0.12)] z-10" 
                                  : "border border-neutral-800/80 hover:border-neutral-700 shadow-md hover:scale-[1.03] z-0 opacity-60"
                              }`}
                              style={{
                                top: `${topPos}px`,
                                left: `${leftPos}px`,
                                transform: "translate(-50%, -50%)",
                                opacity: Math.max(0, Math.min(1, opacity)),
                                scale: `${Math.max(0.4, scale)}`,
                                transitionProperty: "top, left, transform, opacity, scale, border, ring",
                                backgroundColor: "#121214",
                              }}
                            >
                              <div className="w-full h-full relative" id={`orbit-card-${project.uniqKey}`}>
                                <img 
                                  src={project.image} 
                                  alt={project.title[lang]} 
                                  referrerPolicy="no-referrer"
                                  className="w-full h-2/3 object-cover grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                
                                {/* Details caption at the bottom of the card */}
                                <div className="p-3 bg-neutral-900 h-1/3 flex flex-col justify-center border-t border-neutral-800">
                                  <span className="text-[8px] font-mono font-bold text-neutral-400 block tracking-widest uppercase">
                                    {project.label} // {project.category[lang]}
                                  </span>
                                  <span className="text-[10px] md:text-[11px] font-bold text-neutral-100 tracking-tight block truncate mt-0.5">
                                    {project.title[lang]}
                                  </span>
                                </div>
                                
                                {isCurrentActive && (
                                  <div className="absolute top-2.5 right-2.5 bg-white text-neutral-900 px-2 py-0.5 rounded-full text-[7px] font-mono uppercase tracking-widest font-bold">
                                    [ ACTIVE ]
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Manual Arrow override switches */}
                      <div className="absolute bottom-4 left-4 flex gap-1.5 z-20">
                        <button 
                          onClick={() => spinCarousel("prev")}
                          className="w-10 h-10 border border-neutral-800 rounded-full flex items-center justify-center bg-neutral-900 text-neutral-300 hover:bg-neutral-800 transition-colors duration-200 text-sm shadow-md font-mono"
                        >
                          ←
                        </button>
                        <button 
                          onClick={() => spinCarousel("next")}
                          className="w-10 h-10 border border-neutral-800 rounded-full flex items-center justify-center bg-neutral-900 text-neutral-300 hover:bg-neutral-800 transition-colors duration-200 text-sm shadow-md font-mono"
                        >
                          →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT ZONE: WORKS INTRO NARRATIVE (Modern high-class editorial layout as requested in Figure 1, removing metrics) */}
                  <div className="lg:col-span-5 flex flex-col gap-6" id="works-narrative-panel">
                    <div className="p-4 md:p-6 relative text-neutral-250">
                      
                      {/* Active Project Category & Label above Works, styled elegantly in italic serif */}
                      <div className="mb-8" id="active-project-category-header">
                        <span className="font-serif italic text-3xl md:text-4xl text-neutral-100 font-extralight block tracking-normal">
                          {activeProject.category[lang]}
                        </span>
                        <span className="font-mono text-[9px] text-[#86868B] uppercase tracking-[0.2em] block mt-1">
                          [0{activeCarouselIndex + 1}] {activeProject.category[lang === "en" ? "en" : "zh"].toUpperCase()}
                        </span>
                      </div>
                      
                      {/* Big "Works." heading */}
                      <h3 className="text-4xl md:text-6xl font-serif font-normal tracking-tight text-white mb-6">
                        Works<span className="text-sky-500 font-sans font-semibold">.</span>
                      </h3>

                      {/* Decoupled description - general introductory copy followed by active project descriptive text */}
                      <div className="space-y-4 text-neutral-400 text-xs md:text-[13px] leading-relaxed font-light">
                        <p>
                          {lang === "en" 
                            ? "A curated selection of my recent projects, spanning architectural visioning, adaptive material designs, and intelligent digital structures. Each concept resolves a bespoke geographic constraint through advanced spatial systems." 
                            : "主创代表方案系列集，涵盖低碳绿色计算、参数化立体表皮及未来人居实验。每一项概念设计均紧密结合严苛的地理气候条件与先进的空间工程学。"}
                        </p>
                        
                        <div className="border-l border-neutral-800/80 pl-4 py-1 text-neutral-300 italic text-[11px] md:text-xs">
                          <p className="font-medium text-neutral-200 mb-1">
                            {lang === "en" ? "Active Selected Study:" : "当前选中方案："}
                          </p>
                          {activeProject.concept[lang]}
                        </div>
                      </div>

                      {/* Scroll cue matching visual Figure 1 bottom signature line */}
                      <div className="mt-12 pt-6 border-t border-neutral-900 flex items-center justify-between font-mono text-[8px] md:text-[9px] text-neutral-500 tracking-[0.25em]">
                        <span>SCROLL LEFT AREA TO EXPLORE</span>
                        <span className="text-neutral-600 animate-pulse">→</span>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })()}
          </section>

          {/* SECTION D: PERSONAL INTRODUCTION & CONTACTS MARQUEE (LET'S CONNECT 个人介绍与缓慢移动联系卡片) */}
          <section id="contact" className="py-24 bg-white border-t border-neutral-200/50 relative overflow-hidden flex flex-col justify-center min-h-[90vh]">
            
            {/* Fine decorative grid background details matching design aesthetics */}
            <div className="absolute inset-0 engineering-grid opacity-15 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex-grow flex flex-col justify-between">
              
              {/* Header Zone: Big display font layout mirroring Image 1 */}
              <div className="mb-12 mt-8 md:mt-12" id="personal-intro-heading-block">
                
                {/* Big stacked title "LET'S CONNECT." in high-end editorial display serif */}
                <h2 className="text-6xl md:text-8xl font-serif font-semibold text-neutral-900 tracking-tight leading-[0.9] uppercase">
                  Let's <br />
                  <span className="text-neutral-950 font-serif italic font-normal text-6xl md:text-[5.5rem] tracking-tight relative">
                    Connect<span className="text-sky-500 font-sans font-black">.</span>
                  </span>
                </h2>

                {/* Subtitle below mirroring Chinese & English translations */}
                <p className="text-neutral-500 text-sm md:text-base font-light mt-8 max-w-2xl leading-relaxed">
                  {lang === "en" 
                    ? "Looking forward to meeting exceptional teams and visionary projects, creating designs with warmth and technical excellence together."
                    : "期待与优秀的团队和项目相遇，共同创造有温度的设计。"}
                </p>
              </div>

              {/* Ticker / Scrolling Marquee Area with ample padding to prevent hover zoom-scaling cutoffs */}
              <div className="py-12 my-6 relative w-full overflow-hidden animate-marquee-paused-on-hover" id="contacts-marquee-outer-container">
                
                {/* Fading side edges overlays for luxury look */}
                <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Moving track scroll container (translates X from 0% to -50% infinitely) */}
                <div className="flex w-max animate-marquee gap-6 pointer-events-auto">
                  {(() => {
                    const baseContacts = [
                      { label: "QQ Email", val: "200715357@qq.com", icon: Mail },
                      { label: "Google Email", val: "zhoulijie37@gmail.com", icon: AtSign },
                      { label: "WeChat", val: "15967319642", icon: MessageCircle },
                      { label: "QQ", val: "200715357", icon: MessageSquare },
                      { label: "Phone", val: "15967319642", icon: Phone },
                      { label: lang === "en" ? "Native Place" : "籍贯", val: lang === "en" ? "Zhejiang Jiaxing" : "浙江嘉兴", icon: Compass },
                      { label: lang === "en" ? "Residence" : "定居地", val: lang === "en" ? "Minhang, Shanghai" : "上海闵行区", icon: MapPin }
                    ];
                    
                    // Multiply base items array 6 times to form a long non-repeating chain of 30 cards
                    const marqueeItems = [...baseContacts, ...baseContacts, ...baseContacts, ...baseContacts, ...baseContacts, ...baseContacts];

                    return marqueeItems.map((item, idx) => {
                      const IconComp = item.icon;
                      return (
                        <div
                          key={`contact-marquee-card-${idx}`}
                          className="w-[240px] md:w-[280px] shrink-0 bg-white border border-neutral-200/90 hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/5 transition-all duration-300 ease-out p-4 md:p-5 rounded-2xl flex items-center space-x-4 cursor-pointer select-all select-none hover:scale-120 transform origin-center hover:z-30 relative"
                        >
                          {/* Left rounded small icon badge */}
                          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-850 border border-neutral-100 flex-shrink-0 group-hover:bg-neutral-100">
                            <IconComp className="w-5 h-5 text-neutral-900 stroke-[1.5]" />
                          </div>

                          {/* Right descriptions */}
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] md:text-[10px] font-mono text-[#86868B] uppercase tracking-widest block font-bold">
                              {item.label}
                            </span>
                            <span className="text-[12px] md:text-[13px] font-serif font-medium text-neutral-900 block truncate mt-0.5" title={item.val}>
                              {item.val}
                            </span>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

              </div>
              
              {/* Extra micro cue under the marquee slider */}
              <div className="text-center font-mono text-[8px] md:text-[9px] text-neutral-400 tracking-[0.3em] uppercase pb-4 mt-4">
                [ Hover on cards to pause scrolling and copy contact info ]
              </div>

            </div>
          </section>

          {/* Clean museum footer */}
          <footer className="bg-[#faf9f6] border-t border-neutral-200/50 py-12 text-center text-[10px] font-mono text-[#86868B] select-none">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p>© 2026 LEE JAY ZHOU. ALL RIGHTS RESERVED. TEKTONIC AI & ARCHITECTURE STUDY.</p>
              <div className="flex gap-4">
                <span>COORD: lat31.230 // lng121.473</span>
                <span>DAT_X11</span>
                <span>MUSEUM QUALITY STANDARD</span>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* VIEW 2: STANDALONE LIVE PROJECT DETAIL PAGE (高低错落画廊排版、横向吸附滚动、黑白色彩Parallax) */}
      {activeView === "live_project" && (
        <div id="live-project-standalone-view" className="h-screen flex flex-col md:flex-row overflow-hidden bg-black text-white relative select-none animate-fade-in">
          
          {/* Top-Right Close Button - Styled exactly like screenshot "CLOSE X" */}
          <button
            onClick={() => {
              setActiveView("home");
              setTimeout(() => {
                const el = document.getElementById("works");
                if (el) el.scrollIntoView();
              }, 50);
            }}
            className="absolute top-6 right-6 md:top-8 md:right-10 z-50 flex items-center gap-2.5 text-[10px] font-mono tracking-[0.25em] text-neutral-400 hover:text-white transition-all duration-200 uppercase cursor-pointer group"
          >
            <span>CLOSE</span>
            <span className="w-8 h-8 rounded-full border border-neutral-800 group-hover:border-white group-hover:bg-neutral-900 flex items-center justify-center text-xs transition-colors duration-200">
              ✕
            </span>
          </button>

          {/* STATIC LEFTMOST BRAND COLUMN: CHINESE WORK DESCRIPTION & SPECIFICATION TABLE */}
          <div 
            className="w-full md:w-[460px] bg-[#09090b] border-r border-neutral-900 p-8 md:p-12 h-screen flex flex-col justify-between flex-shrink-0 z-20 select-none pt-20 md:pt-28 overflow-y-auto no-scrollbar"
            id="standalone-left-narrative"
          >
            <div className="space-y-8">
              
              {/* Scroll down indicator */}
              <div className="flex items-center gap-2 text-[9px] md:text-[10px] uppercase font-mono tracking-[0.28em] text-neutral-500">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse"></span>
                <span>SCROLL DOWN</span>
              </div>

              {/* Title Header - Bold high impact */}
              <div className="pt-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-white leading-tight uppercase">
                  {activeProject.title[lang]}
                </h1>
              </div>

              {/* Horizontal elegant divider line exactly like layout */}
              <div className="border-t border-neutral-850 w-full" />

              {/* Narrative sub-grid layout based on design */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                
                {/* Left column: ABOUT THE PROJECT */}
                <div className="space-y-3.5 md:col-span-1">
                  <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-neutral-400 block font-bold">
                    ABOUT THE PROJECT
                  </span>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    {activeProject.concept.zh}
                  </p>
                  <p className="text-[11px] text-neutral-500 font-light leading-relaxed italic mt-2">
                    {activeProject.concept.en}
                  </p>
                </div>

                {/* Right column: Specs and tools */}
                <div className="space-y-6 md:col-span-1">
                  
                  {/* TOOLS */}
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 block font-bold">
                      TOOLS
                    </span>
                    <span className="text-neutral-300 text-xs font-mono block leading-snug">
                      {selectedProjectId === "villa" ? "Rhino / V-Ray / ComfyUI" : "Stable Diffusion / Midjourney"}
                    </span>
                  </div>

                  {/* KEYWORDS */}
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 block font-bold">
                      KEYWORDS
                    </span>
                    <span className="text-neutral-300 text-[11px] font-mono block leading-snug">
                      {activeProject.category.en.toUpperCase()} / {activeProject.location.en.toUpperCase()}
                    </span>
                  </div>

                  {/* YEAR */}
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 block font-bold">
                      YEAR
                    </span>
                    <span className="text-neutral-300 text-xs font-mono block">
                      {activeProject.year}
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* Bottom contact signature */}
            <div className="text-[9px] font-mono text-neutral-500 border-t border-neutral-900 pt-6 mt-12 leading-relaxed uppercase tracking-wider">
              <p>TANGSHUANG DESIGN LAB // SYSTEM V.2</p>
              <p className="mt-0.5 text-neutral-600">SCROLL MOUSEWHEEL VERTICALLY OR SWIPE TO DRIFT</p>
            </div>
          </div>

          {/* RIGHT HORIZONTALLY SCROLL ZONE - Solid Black themed background gallery */}
          <div 
            ref={horizScrollRef}
            className="flex-1 overflow-x-auto overflow-y-hidden select-none h-screen no-scrollbar flex items-center pr-48 pl-10 md:pl-16 bg-black"
            id="standalone-horizontal-gallery"
          >
            <div className="flex items-center gap-12 md:gap-14">
              
              {projectDetails.map((detail, idx) => {
                const heightClass = detail.isTall ? "h-[360px] md:h-[460px]" : "h-[300px] md:h-[380px]";

                return (
                  <div
                    key={idx}
                    id={`staggered-card-${idx}`}
                    className="flex-shrink-0 flex flex-col gap-5 transition-transform duration-300 w-auto max-w-[85vw]"
                  >
                    {/* High contrast visual image card container with uncropped aspect ratio */}
                    {detail.image === "slider-marker" ? (
                      <BeforeAfterSlider lang={lang} />
                    ) : (
                      <div className="overflow-hidden bg-neutral-950 relative group border border-neutral-900 w-fit">
                        <div className={`${heightClass} overflow-hidden relative flex items-center justify-center`}>
                          <img
                            src={detail.image}
                            alt={detail.title}
                            referrerPolicy="no-referrer"
                            className="h-full w-auto object-contain grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-[800ms] ease-out animate-fade-in"
                          />
                          {/* Elegant internal frame drawing cue */}
                          <div className="absolute inset-0 border border-white/5 pointer-events-none m-3" />
                        </div>
                      </div>
                    )}

                    {/* Aligned captions layout in complete harmony with layout */}
                    <div className="flex items-start space-x-4 max-w-[320px] md:max-w-[450px]">
                      {/* Big serial number on left */}
                      <span className="text-3xl md:text-4xl font-mono font-bold text-neutral-700/80 tracking-tighter shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      {/* Caption copy on right */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[12px] md:text-sm font-semibold text-neutral-200 tracking-tight leading-snug truncate">
                          {detail.title.includes(" / ") ? detail.title.split(" / ")[0] : detail.title}
                        </h4>
                        <p className="text-[11px] md:text-xs text-neutral-400 font-light leading-relaxed mt-1">
                          {detail.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      )}

      {/* 2. PROJECT DETAILED BLUEPRINT MODAL POPUP */}
      {isDetailModalOpen && (
        <div
          id="project-blueprint-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md"
        >
          {/* Overlay mask click closure */}
          <div 
            className="absolute inset-0" 
            onClick={() => setIsDetailModalOpen(false)} 
          />

          {/* Centered card-like modal panel (Figure 2 layout) */}
          <div
            className="relative z-10 w-full max-w-5xl h-[85vh] md:h-[600px] bg-[#111113] border border-neutral-800/85 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden transition-all duration-500 ease-out animate-fade-in"
            id="modal-centered-framework"
          >
            {/* Close button - Top-right */}
            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all duration-200 border border-neutral-800 shadow-md cursor-pointer"
            >
              ✕
            </button>

            {/* Left Column: Full-height Large Visual Cover (Figure 2 layout) */}
            <div className="w-full md:w-1/2 h-[48%] md:h-full relative overflow-hidden bg-neutral-950 flex flex-col justify-between items-center p-5 md:p-8">
              <div className="w-full flex-1 flex items-center justify-center min-h-0 relative">
                <img
                  src={selectedCoverImageURL || activeProject.image}
                  alt={activeProject.title[lang]}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain transition-transform duration-700 hover:scale-[1.05]"
                />
              </div>
              
              {/* Subtle elegant gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none z-10" />
              
              {/* Button relocated here on bottom-left column as requested */}
              <div className="w-full flex justify-center mt-3 z-20">
                <button
                  id="view-live-project-standalone-launcher"
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    setActiveView("live_project");
                  }}
                  className="px-8 py-3.5 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{lang === "en" ? "VIEW LIVE PROJECT" : "查看作品实况详情"}</span>
                  <Maximize2 className="w-3.5 h-3.5 text-neutral-950 transition-transform duration-300 group-hover:scale-110" />
                </button>
              </div>
            </div>

            {/* Right Column: Detailed Dual-language descriptions (Figure 2 layout) */}
            <div 
              className="w-full md:w-1/2 flex flex-col p-6 md:p-10 text-neutral-200 overflow-y-auto h-[52%] md:h-full bg-[#121214] no-scrollbar"
              id="modal-right-specs"
            >
              <div className="space-y-6">
                {/* ID & Category metadata header */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] md:text-xs text-sky-500/80 tracking-wider block font-bold">
                    {`[0${projectsData.indexOf(activeProject) + 1}]`} {activeProject.category.en.toUpperCase()}
                  </span>
                </div>

                {/* Big Title */}
                <h2 className="text-2xl md:text-3xl font-serif text-white tracking-tight leading-snug">
                  {activeProject.title[lang]}
                </h2>

                {/* Bilingual Text Descriptions (Chinese + English stacked elegantly like Figure 2) */}
                <div className="space-y-5 text-neutral-400 text-xs leading-relaxed font-light mt-4">
                  
                  {/* Chinese Text Body */}
                  <p className="text-neutral-300 pr-1 text-[12px] md:text-[13px] leading-relaxed border-l-2 border-sky-500/30 pl-3">
                    {activeProject.concept.zh}
                  </p>

                  {/* Divider line/gap */}
                  <div className="h-[1px] bg-neutral-800/60 w-32 my-4" />

                  {/* English Text Body */}
                  <p className="text-neutral-400 pr-1 text-[11px] md:text-[12px] leading-relaxed italic">
                    {activeProject.concept.en}
                  </p>

                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. FLOATING AI CHAT BUTLER WIDGET */}
      <div id="ai-chat-butler-container" className="fixed bottom-6 right-6 z-50 font-sans">
        
        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-[0_12px_40px_rgba(14,165,233,0.35)] hover:shadow-[0_16px_48px_rgba(14,165,233,0.5)] border border-sky-400/30 text-white transition-all duration-300 cursor-pointer group active:scale-95 ${
            isChatOpen 
              ? "bg-neutral-900 rotate-90" 
              : "bg-gradient-to-tr from-sky-600 via-sky-500 to-indigo-600"
          }`}
          title={lang === "en" ? "Chat with Lee Jay's AI Butler" : "和理洁的 AI 智能管家聊天"}
        >
          {isChatOpen ? (
            <span className="text-xl font-light">✕</span>
          ) : (
            <div className="relative">
              <Sparkles className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-ping" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
          )}
        </button>

        {/* Pulsing Text Guideline tooltip when bubble closed */}
        {!isChatOpen && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap hidden sm:block">
            <div className="bg-neutral-900/95 border border-neutral-800 text-neutral-100 text-[11px] font-medium tracking-wide px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md">
              <span className="mr-1 text-sky-400">✨ GPT-X</span>
              {lang === "en" ? "Lee Jay's AI Assistant" : "理洁的 AI 智能体在线"}
            </div>
          </div>
        )}

        {/* Chat Dialog Sheet */}
        {isChatOpen && (
          <div
            className="absolute bottom-16 right-0 w-[360px] sm:w-[410px] max-w-[92vw] h-[520px] max-h-[80vh] bg-white border border-neutral-200 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col z-50 text-neutral-800"
            id="ai-butler-chat-dialog"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center shadow-inner overflow-hidden border border-sky-300/20">
                  <Sparkles className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-[13px] font-bold tracking-wide">
                      {lang === "en" ? "LEE JAY's AI BUTLER" : "理洁意境 AI 助手"}
                    </h4>
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <p className="text-[9px] text-neutral-400 font-mono tracking-wider uppercase">
                    {lang === "en" ? "[ Extrovert e-Personality Agent ]" : "[ 热情洋溢 E 人智能体 ]"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm p-1 hover:bg-neutral-850 rounded-full cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Bubble Messages Display */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/50 no-scrollbar">
              {chatMessages.map((msg, idx) => {
                const isAI = msg.role === "assistant";
                return (
                  <div
                    key={idx}
                    className={`flex ${isAI ? "justify-start" : "justify-end"} items-start gap-2.5`}
                  >
                    {isAI && (
                      <div className="w-7 h-7 rounded-full bg-sky-100 border border-sky-200/40 flex items-center justify-center text-sky-600 shrink-0 text-xs shadow-sm shadow-sky-50">
                        🤖
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm transition-all duration-300 ${
                        isAI
                          ? "bg-white text-neutral-800 border border-neutral-100 rounded-tl-sm shadow-[0_4px_12px_rgba(0,0,0,0.015)]"
                          : "bg-slate-900 text-white rounded-tr-sm font-light shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
                      }`}
                    >
                      <p className="whitespace-pre-line font-normal">{msg.content}</p>
                    </div>
                    {!isAI && (
                      <div className="w-7 h-7 rounded-full bg-neutral-800 text-white shrink-0 flex items-center justify-center text-xs border border-neutral-700">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loading Indicator */}
              {isChatLoading && (
                <div className="flex justify-start items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 shrink-0 text-xs">
                    🤖
                  </div>
                  <div className="bg-white border border-neutral-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] text-[11px] text-neutral-400 italic font-mono flex items-center gap-2">
                    <span className="flex space-x-1">
                      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                    <span>{lang === "en" ? "Formulating response..." : "正在飞速拼装答卷..."}</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions Row */}
            <div className="bg-neutral-50 px-3.5 py-2.5 border-t border-neutral-150 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
              {(() => {
                const suggestions = lang === "en" ? [
                  { label: "🎓 Education Details", query: "What is Lee Jay's education background and academic awards?" },
                  { label: "🚀 AI Pipeline Flow", query: "Can you introduce his architectural design generative AI workflow?" },
                  { label: "🏢 Representative Projects", query: "Tell me about his Xiamen Yanqu Global HQ building and other premium projects." },
                  { label: "📞 How to Contact?", query: "How do I reach out or contact Lee Jay ZHOU?" }
                ] : [
                  { label: "🎓 学历背景与荣誉", query: "请介绍一下理洁的硕士学历背景与学术研究荣誉" },
                  { label: "🚀 建筑 AI 专业实力", query: "理洁是如何使用 ComfyUI, Stable Diffusion 搭建全链路 AI 流程的？" },
                  { label: "🏢 标志性代表作品", query: "介绍下他设计的厦门延趣全球总部大厦等标志性大型经典作品" },
                  { label: "📞 如何联系他？", query: "如何联系上高效率的理洁？他的电话微信还有邮箱是啥呀？" }
                ];
                return suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendChatMessage(sug.query)}
                    className="shrink-0 bg-white hover:bg-sky-50 border border-neutral-200 hover:border-sky-300 text-neutral-600 hover:text-sky-700 text-[11px] px-3.5 py-1.5 rounded-full shadow-sm transition-all duration-200 cursor-pointer text-left font-sans"
                  >
                    {sug.label}
                  </button>
                ));
              })()}
            </div>

            {/* Input Bar */}
            <div className="p-3.5 border-t border-neutral-150 bg-white flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendChatMessage();
                  }
                }}
                disabled={isChatLoading}
                placeholder={
                  lang === "en" 
                    ? "Ask Lee Jay's AI Butler..." 
                    : "热情提问理洁的 AI 智能管家..."
                }
                className="flex-1 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 focus:bg-white text-neutral-800 placeholder-neutral-400 h-9 transition-all duration-200 font-sans"
              />
              <button
                onClick={() => handleSendChatMessage()}
                disabled={!chatInput.trim() || isChatLoading}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 ${
                  chatInput.trim() && !isChatLoading
                    ? "bg-slate-900 hover:bg-sky-600 text-white shadow-md active:scale-95"
                    : "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                }`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Brand Credit */}
            <div className="bg-neutral-50 px-4 py-1.5 border-t border-neutral-100 text-[9px] text-neutral-400 font-mono tracking-wider text-center uppercase flex items-center justify-center gap-1">
              <span>DESIGNED BY LEE JAY ZHOU</span>
              <span>•</span>
              <span className="text-sky-500 font-bold">POWERED BY GEMINI AI</span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
