export interface Project {
  id: string;
  title: { en: string; zh: string };
  category: { en: string; zh: string };
  location: { en: string; zh: string };
  year: string;
  area: string;
  image: string;
  concept: { en: string; zh: string };
  specs: {
    materials: { en: string[]; zh: string[] };
    co2Footprint: string;
    solarRating: string;
    windLoad: string;
    structuralType: { en: string; zh: string };
  };
  blueprintLines: { x1: number; y1: number; x2: number; y2: number; label?: string }[];
}

export const translationStore = {
  en: {
    navProjects: "Portfolio",
    navLab: "Design Lab",
    navPhilosophy: "Philosophy",
    navAwards: "Milestones",
    navContact: "Inquire",
    heroTitle: "Tectonic Logic Meets Machine Intelligence",
    heroSub: "The professional portfolio of Lee Jay ZHOU. An architectural AI R&D designer and product manager synthesizing 985 academic rigor, advanced generative workflows (Stable Diffusion, ComfyUI), and real-world construction delivery.",
    viewProject: "Explore Study",
    specsTitle: "Tectonic Specs",
    specArea: "Footprint Area",
    specLocation: "Site Coordinates",
    specMaterials: "Primary Tectonics",
    specFootprint: "CO2 Offset",
    specSolar: "Solar Lux Index",
    backToList: "Back to Gallery",
    
    // Lab Translations
    labTitle: "Architectural CAD Lab",
    labSub: "Interact with our real-time volumetric modeler. Select structural typologies, dial environmental constraints, and view responsive physics telemetry.",
    labMassType: "Mass Typology",
    labMaterialOptions: "Material Palette",
    labCantilever: "Cantilever Projection",
    labSkyOpening: "Oculus Aperture",
    labElevation: "Sub-grade Elevation",
    labBlueprintView: "Tectonic Blueprint Live Analysis",
    labStatsInt: "Structural Integrity",
    labStatsLux: "Daylight Lux Density",
    labStatsWind: "Aerodynamic Drag Coefficient",
    labStatsCarbon: "Environmental Impact Rating",
    
    // Philosophy
    philTitle: "Design Manifesto",
    philIntro: "We believe architecture is not the decoration of a surface, but the direct carving of space out of deep silence. By bridging human spatial intuition, structural constraints, and generative AI systems, true design achieves optimal physical and semantic synthesis.",
    philStep1: "0.1 Environmental Scan",
    philStep1Desc: "Simulating geothermal, wind patterns, and geological bedrock to program localized thermal massing.",
    philStep2: "0.2 Dynamic Prompt Optimization",
    philStep2Desc: "Utilizing highly targeted semantic guidelines to automate compliance, spacing, and daylight constraints.",
    philStep3: "0.3 Honest Materiality",
    philStep3Desc: "Exposing raw cast-in-place concrete, natural structural cedar, sandblasted steel, and ironless low-emissivity glass.",
    philStep4: "0.4 Passive Solar Orbit",
    philStep4Desc: "Directing sunlight to score linear sundials on limestone floors throughout seasons and daily cycles.",
    
    // Awards / Milestones
    milestonesTitle: "Professional Credentials & Academic Milestones",
    milestone1: "First-Class Registered Architect & CET-6 English Certified",
    milestone2: "Nanjing University — M.Arch (Excellent Graduate & Outstanding Thesis Award)",
    milestone3: "Hefei University of Technology — B.Arch (Provincial Outstanding Graduate & Top Capstone Honor)",
    milestone4: "Shanghai Du She Design R&D Lead — Coordinated 120,000 m² full-cycle AI projects",
    
    // Contact
    contactTitle: "Commission a Structure",
    contactSub: "Begin a spatial dialogue. Let us study your site, geology, and atmospheric qualities to outline a bespoke master design layout.",
    clientName: "Your Name / Organization",
    clientEmail: "Secure Email",
    projectSite: "Site Topography",
    siteCliff: "Ocean Cliffside",
    siteForest: "Deep Forestry",
    siteDesert: "Arid Desert Plateau",
    siteUrban: "High-density Metropolis",
    projectScope: "Structure Typology",
    scopeVilla: "Bespoke Residential Dwelling",
    scopePavilion: "Cultural Gallery / Pavilion",
    scopeLibrary: "Public/Institutional Atrium",
    scopeTower: "Parametric Monumental Feature",
    fundingScale: "Budget Boundary Scale",
    submitBtn: "Transmit Design Brief",
    submitSuccess: "Brief Transmitted Successfully. Our chief strategist will examine your terrain coordinates shortly.",
    weatherActive: "Shanghai HQ Live",
    weatherTemp: "24°C • Breeze Clean",
  },
  zh: {
    navProjects: "作品画廊",
    navLab: "数字设计实验室",
    navPhilosophy: "空间宣言",
    navAwards: "学术与里程碑",
    navContact: "项目洽谈",
    heroTitle: "重塑人机协同的设计美学",
    heroSub: "周理洁 (Lee Jay ZHOU) 的建筑 AI 研发设计与产品化作品集。融合南京大学建筑学学术底蕴与顶级设计院研发实力，深度应用 ComfyUI, Stable Diffusion, Midjourney 等全链路工具，自主搭建全业态标准化设计工作流，为您探索参数化建构与 AI 技术落地的新范式。",
    viewProject: "探讨个案",
    specsTitle: "建构工程参数",
    specArea: "建筑面积",
    specLocation: "项目场址",
    specMaterials: "主力建构材质",
    specFootprint: "碳中和指数",
    specSolar: "采光Lux密度",
    backToList: "返回画廊",
    
    // Lab Translations
    labTitle: "空间数字模拟器",
    labSub: "实时交互结构体量模型。选择建筑构型、微调力学参数、获取高精度力学与环保遥测数据。",
    labMassType: "体态空间形态",
    labMaterialOptions: "主力材质质感",
    labCantilever: "悬挑外伸比例",
    labSkyOpening: "穹顶采光圈口",
    labElevation: "架空结构高程",
    labBlueprintView: "动态工程图纸物理遥测",
    labStatsInt: "整体构型力学冗余",
    labStatsLux: "照度穿透性能",
    labStatsWind: "流体力学风洞阻力",
    labStatsCarbon: "全生命周期环保能效",
    
    // Philosophy
    philTitle: "空间美学宣言",
    philIntro: "我们坚信，建筑绝非虚浮的表皮装饰，而是从无尽静默中裁切出光的容器。真正的设计源于对重力的诚实表达、日照轨道的精准解算以及人行走憩停的节奏规律。在 AI 时代，我们通过人机协同重新赋能传统建构科学，实现效率与艺术的臻善平衡。",
    philStep1: "0.1 环境微气候测绘",
    philStep1Desc: "细致模拟地热、主导风向与岩石厚度，从而确立低建筑能耗的高效热工体量布局。",
    philStep2: "0.2 动态提示词与逻辑编排",
    philStep2Desc: "自主搭建高复用 AI 模型提示词底库与控制网络（ControlNet），实现层高退界及户型对齐的快速自动化算法验证。",
    philStep3: "0.3 真实肌理与力学",
    philStep3Desc: "展现无覆面一次成型清水混凝土、原切防腐香杉木、喷砂不锈钢及超低铁超白隔热安全玻璃。",
    philStep4: "0.4 动态日轨光影对齐",
    philStep4Desc: "引导黄金自然光，在浅色石灰石地面上，随四季及日光周转，徐徐描画精确的线性日晷刻度。",
    
    // Awards / Milestones
    milestonesTitle: "专业资质与学术里程碑",
    milestone1: "中华人民共和国一级注册建筑师 & 大学英语六级 (CET-6)",
    milestone2: "南京大学建筑学硕士 (校级优秀毕业生、校级优秀毕业论文奖)",
    milestone3: "合肥工业大学建筑学学士 (安徽省优秀毕业生、校级优秀毕业设计奖)",
    milestone4: "上海都设营造研发中心主创 (年度优秀员工、大奖落地、AI全链路实地践行)",
    
    // Contact
    contactTitle: "启动私属高定设计",
    contactSub: "开启一场关于空间与灵性的对话。我们将深度研究您的项目地貌、微气候及人本诉求，定制一份具有永恒典藏价值的设计方案。",
    clientName: "贵方姓名 / 机构名称",
    clientEmail: "联系电邮 / 密级信道",
    projectSite: "项目基地地貌",
    siteCliff: "峭壁悬崖海岸",
    siteForest: "原始温带山林",
    siteDesert: "干旱荒原台地",
    siteUrban: "高密度未来都市",
    projectScope: "建筑功能类别",
    scopeVilla: "定制式奢华私人别墅",
    scopePavilion: "文化艺术雕塑级美术馆",
    scopeLibrary: "大空间生态中庭公共建筑",
    scopeTower: "参数化海岸纪念性雕塑塔",
    fundingScale: "项目投资规模估值",
    submitBtn: "呈送项目概念简报",
    submitSuccess: "简报已安全呈送。我们的首席合伙建筑师将在24小时内开启地质和空间模型预审。",
    weatherActive: "上海研发中心",
    weatherTemp: "24°C • 清风微拂",
  }
};

export const projectsData: Project[] = [
  {
    id: "villa",
    title: { en: "Nanjing Jiangbei G13 Yingxiang Xinchao Residential R&D & Demonstration Area Design", zh: "南京江北新区G13映像新潮住宅研发与示范区设计" },
    category: { en: "Residential R&D & Demonstration Area", zh: "住宅研发 & 示范区设计 / 金陵风貌系列" },
    location: { en: "Jiangbei, Nanjing", zh: "中国 南京" },
    year: "2023 - 2024",
    area: "32,500 m²",
    image: "https://raw.githubusercontent.com/leochou123/-/main/04%E6%B2%BF%E8%A1%97%E7%AB%8B%E9%9D%A2-%E5%A4%9C%E6%99%AF5.jpg",
    concept: {
      en: "Located in the core area of Jiangbei, Nanjing, the residential facade design is deeply inspired by the essence of the 'Jinling Tu' scroll painting, delicately depicting the historic charm of the ancient city as a micro-scroll of life. Drawing directly from the aesthetics of the famous scroll, fluent and curving facade lines evoke Nanjing's historical spirit while harmoniously mingling with the surrounding nature. The pavilion behaves like unfolded painting scrolls displaying art collections, presenting a rhythmic sequence of Nanjing's heritage.",
      zh: "住宅区位于南京江北核心区，其住宅立面设计深受金陵图之精髓启发，细腻描绘金陵古城风貌，宛如南京生活艺术的微缩长卷。建筑立面的灵感直接汲取自那幅脍炙人口的画卷长轴，以线条之美勾勒金陵神韵，立面线条流畅而富有弧度，不仅展现了建筑的艺术美感，更与周边的自然环境和谐共生，融为一体。建筑立面如一幅幅翻开的画卷，展示生活艺术藏品，呈现具有南京历史风貌特色的建筑序列感。"
    },
    specs: {
      materials: {
        en: ["Reinforced High-Tac Textured Granite", "Acoustic Triple-Pane Vacuum Glass", "Seamless Lightweight Cladding Boards"],
        zh: ["抗酸蚀干挂白麻石英质花岗岩", "超致密三层中空隔音真空玻璃", "高强度抗震轻质矿物复合纤维板"]
      },
      co2Footprint: "高标能效近净零排 / Net-Zero Energy Active",
      solarRating: "动态日照最大化解算 (Maximum Heliotrope Align)",
      windLoad: "防风防潮一体化高防抗 (Sea-Breeze and Wind Guard)",
      structuralType: { en: "TOD Box-Column Mass Cantilever Structural System", zh: "轨道交通转换层箱梁框筒梁柱抗倾覆高刚架结构" }
    },
    blueprintLines: [
      { x1: 20, y1: 240, x2: 280, y2: 240, label: "Subterranean Transit Connection Core" },
      { x1: 50, y1: 240, x2: 80, y2: 190, label: "Low-Density Residential Pod B-3" },
      { x1: 80, y1: 190, x2: 130, y2: 190, label: "Landscape Scenic Sky-bridge" },
      { x1: 130, y1: 190, x2: 160, y2: 140, label: "Seismic Base Isolation Joints" },
      { x1: 160, y1: 140, x2: 210, y2: 140, label: "Solar-Tracking Atrium Lightwell" },
      { x1: 210, y1: 140, x2: 240, y2: 50, label: "Lightweight High-strength Mullion" },
      { x1: 240, y1: 50, x2: 50, y2: 50, label: "Automated Micro-Climate Roof" }
    ]
  },
  {
    id: "workflow",
    title: { en: "Xiamen Yanqu Global Headquarters", zh: "厦门延趣全球总部大厦" },
    category: { en: "Iconic Corporate Headquarters", zh: "标志性总部办公" },
    location: { en: "Siming, Xiamen, Fujian", zh: "福建，厦门" },
    year: "2024",
    area: "43,990 m²",
    image: "https://raw.githubusercontent.com/leochou123/-/main/04%E6%B2%BF%E8%A1%97%E7%AB%8B%E9%9D%A2-%E5%A4%9C%E6%99%AF5.jpg",
    concept: {
      en: "Total Building Area: 43,990 m²\nAbove Ground: 30,990 m²\nBelow Ground: 13,000 m²\n\nLocated in Siming District, Xiamen, the design commences from the values of headquarters image display, ground-level landscape utilization, and internal function organization. Integrated with the exploration core of gaming, with the design concept of 'Yanqu Valley, Sky Flower Island', we built an ecological, high-tech, and playful headquarters office building for Yanqu Games, innovatively transforming the tower building into a vertically integrated headquarters campus.",
      zh: "总建筑面积：43990\n地上：30990\n地下：13000\n\n项目位于厦门市思明区，设计从总部形象展示、底层景观运用和内部功能的价值出发，结合游戏的探索内核，以“延趣之谷、空中花屿”的设计概念，为延趣游戏打造了一个生态、科技、趣味的总部办公建筑。将塔楼建筑创新的转变为竖向集合的总部园区。"
    },
    specs: {
      materials: {
        en: ["Ultra-Clear Low-E Glass Curtain Wall", "Integrated Rooftop Photovoltaic Array", "Precast Terraced Planters & Sky-gardens"],
        zh: ["超白 Low-E 双银钢化玻璃群幕墙", "屋顶一体化高效单晶光伏发电阵列", "预制挂板阶梯种植池与生态空中花屿"]
      },
      co2Footprint: "国家二星级绿色建筑标准 / Green Building 2-Star",
      solarRating: "日光感应自适应智能外遮阳 / Daylight-Responsive Smart Louvers",
      windLoad: "12级超强台风安全结构设计 / Typhoon Grade-12 Wind Resistance",
      structuralType: { en: "Concrete Core Tube & Steel Cantilever Truss", zh: "钢筋混凝土核心筒 + 外围异形悬挑钢桁架" }
    },
    blueprintLines: [
      { x1: 20, y1: 50, x2: 280, y2: 50, label: "Sky-Garden Outrigger Truss Section" },
      { x1: 50, y1: 90, x2: 250, y2: 90, label: "Vertical 'Yanqu Valley' Internal Circulation" },
      { x1: 80, y1: 130, x2: 220, y2: 130, label: "Eco-Atrium Smart Daylight Ventilation" },
      { x1: 110, y1: 170, x2: 190, y2: 170, label: "Ground Shared Landscape & Plaza Connection" },
      { x1: 150, y1: 170, x2: 150, y2: 240, label: "Basement Dynamic Game Exploration Center" }
    ]
  },
  {
    id: "library",
    title: { en: "Xi'an Digital Photovoltaic Tech Innovation Base", zh: "西安数字光伏技术创新产业基地" },
    category: { en: "Industrial Innovation Park", zh: "产业园区 / 科创办公空间" },
    location: { en: "Chang'an, Xi'an", zh: "陕西，西安" },
    year: "2023 - 2024",
    area: "37,280 m²",
    image: "https://raw.githubusercontent.com/leochou123/-/main/B02.jpg",
    concept: {
      en: "Total Building Area: 37,280 m²\nAbove Ground (13 Floors): 24,000 m²\n\nLocated in Xi'an Aerospace Base, the project is guided by the industry innovation of 'Geographic Information + Digital Twin'. It constructs an industrial chain map of spatial-temporal data collection, digital twin and application, and enterprise incubation platform services, aiming to build a next-generation industrial park development highland and high-quality scientific and technological innovation office space in Xi'an. The building is cube-shaped with a total construction area of about 37,280 square meters, of which 13 floors are above ground with a construction area of 24,000 square meters, including incubators, office spaces for medium, large and leading enterprises, as well as some office-supporting shared functions. The first floor is integrated with the front landscape plaza and features supporting commercial services to provide a place for business relaxation and interactive sharing. The top floor is equipped with a roof garden and private terrace, offering a bird's-eye view of East Changan Street.",
      zh: "总建筑面积：37280\n地上：24000\n地上13层\n\n项目位于西安市航天基地，以“地理信息+数字孪生”产业创新为导向，构建的时空数据采集、数字孪生与 application、企业孵化平台服务的产业链图谱，打造西安新一代产业园区发展高地及高品质科创办公空间。建筑成立方体状，总建筑面积约37280平方米，其中地上13层，建筑面积24000平方米，包含孵化器，中大型和头部企业办公空间，以及部分办公配套共享功能。首层结合前区景观广场设置有生活配套商业，为区域提供了一个商务休憩和交流共享的场所空间。顶层设置有屋顶花园和私享露台，可鸟瞰东长安街。"
    },
    specs: {
      materials: {
        en: ["Low-Emissivity Structural Glazing", "Durable Monolithic Cast Concrete", "Intelligent Louver Ventilation Grid"],
        zh: ["双钢超白低辐射阻热安全玻璃", "一次成型高密现浇清水混凝土", "多维度多孔智能自控排风吊顶"]
      },
      co2Footprint: "碳中和优选环保级 / High Eco-Redundancy",
      solarRating: "92% 采光Lux覆盖 (92% Solar Lux Rating)",
      windLoad: "12级超强台风安全防抗 (Typhoon Grade-12 Safe)",
      structuralType: { en: "Frame-Core Tube Shear Structural Tube System", zh: "框架-核心筒抗震大跨度空间剪力墙传力体系" }
    },
    blueprintLines: [
      { x1: 50, y1: 50, x2: 250, y2: 50, label: "HQ-01: Triple Glazing Air Tight Facade" },
      { x1: 50, y1: 50, x2: 50, y2: 180, label: "Reinforced Structural Core" },
      { x1: 50, y1: 180, x2: 250, y2: 180, label: "Multi-Hub Ceiling Truss" },
      { x1: 250, y1: 50, x2: 250, y2: 180 },
      { x1: 130, y1: 180, x2: 130, y2: 250, label: "Core-Tube Concrete Slab B-2" },
      { x1: 170, y1: 180, x2: 170, y2: 250 },
      { x1: 10, y1: 250, x2: 290, y2: 250, label: "Fujian Marine Solid Bedrock Line" }
    ]
  },
  {
    id: "pavilion",
    title: { en: "Concept Design of North Commercial Plot of Tangya Light Rail Station", zh: "塘雅轻轨站北商业地块概念设计说明" },
    category: { en: "TOD+POD Transit Hub & Youth Landmark Complex", zh: "TOD+POD 核心区枢纽与青年活力综合体" },
    location: { en: "Jinyi New Area, Jinhua, Zhejiang", zh: "浙江金华，金义新区" },
    year: "2024",
    area: "259,600 m²",
    image: "https://raw.githubusercontent.com/leochou123/-/main/C02.jpg",
    concept: {
      en: "Located at the gateway of the Jinyihu Sci-Tech Innovation Area, the project uses the TOD+POD concept to construct an urban landmark complex and a youth commercial hub. With a total construction area of approximately 259,600 m², it seamlessly integrates commercial retail, apartments, hotels, and a public transit hub.\n\nIn the early stages, our team combined big data models with customer group analysis to scientifically plan trade mix distribution, targeting college students and local residents for night economy and fashion retail layouts. This layout optimizes spatial experience and rental returns through multi-ground-floor walking blocks, waterfront promenades, and scenic rooftops.\n\nThe transit hub forms the base of the design, lifting public spaces above the city noise. Cascading stepped commercial terraces, roof lawns, and active water plazas are interconnected through an endless walkway system, achieving a seamless transition between station and city. The apartment component is categorized into three formats with specialized public facilities, and the premium hotel elevates its competitive edge with unique sky spaces. Phased in two chapters (Phase I for transit and retail hub, Phase II for high-density apartment towers), the masterplan balances urban aesthetics, district vitality, and sustainable operation.",
      zh: "本项目位于金漪湖科创片区门户，以 TOD+POD 理念打造城市地标综合体与青年活力商业核，总建筑面积约 25.96 万㎡，集商业、公寓、酒店、公交枢纽于一体。\n\n设计前期结合数据模型与客群分析，科学规划业态配比，针对高校学生、周边居民等多元客群，布局夜经济、潮流零售等业态，通过多首层街区、滨水及屋顶空间，优化空间体验与租金体系。\n\n建筑以公交枢纽为底盘抬升公共空间，层叠退台商业、屋顶草坪与滨水广场串联步行系统，实现站城无缝衔接。公寓分三类产品配套差异化公共空间，酒店以特色空中空间提升竞争力。项目分两期建设，一期打造门户商业与枢纽，二期落地公寓塔楼，整体坚持运营前置思路，兼顾城市形象、片区活力与经济效益，打造金义新区门户商业标杆。"
    },
    specs: {
      materials: {
        en: ["Low-E Curved Guardrails", "Vibrant Aluminum Extrusions", "Eco-Friendly Engineered Terratect Concrete"],
        zh: ["超白低辐射弧面玻璃护栏", "彩色阳极特制氧化热弯铝挂板", "活性再生生态建筑大骨料免涂料混凝土"]
      },
      co2Footprint: "近零排站城生态示范 / Net-Zero Transit Benchmark",
      solarRating: "屋顶绿化自然微气候调节 (Microclimate Roof Decouple)",
      windLoad: "流体抗风阻性能验证 (Fluent CFD Wind Load Validated)",
      structuralType: { en: "Multi-Grid Overlaid Frame & Transit Support Structural System", zh: "立体叠合框架与轨道站房整体大跨度减震受力构架" }
    },
    blueprintLines: [
      { x1: 10, y1: 230, x2: 290, y2: 230, label: "Eco-Friendly Atrium Base Basin" },
      { x1: 40, y1: 60, x2: 120, y2: 60, label: "Glulam Vault Structural Beam" },
      { x1: 40, y1: 60, x2: 40, y2: 230, label: "Anodized Sheared Brackets" },
      { x1: 120, y1: 60, x2: 120, y2: 150 },
      { x1: 120, y1: 150, x2: 220, y2: 150, label: "Horizontal Ventilation Core" },
      { x1: 220, y1: 150, x2: 220, y2: 230, label: "Triple-Skin Shadow Reveal Guard" },
      { x1: 260, y1: 80, x2: 260, y2: 230, label: "Civic Spine Grid Access Portal" }
    ]
  },
  {
    id: "tower",
    title: { en: "Saudi Medina Resort", zh: "沙特麦地那度假村" },
    category: { en: "Luxury Eco-Resort & Wellness Retreat", zh: "高端野奢疗愈型度假村" },
    location: { en: "Medina, Saudi Arabia", zh: "沙特阿拉伯，麦地那" },
    year: "2024",
    area: "12,900 m² (Site: 37,000 m²)",
    image: "https://raw.githubusercontent.com/leochou123/-/main/F02.jpg",
    concept: {
      en: "Located in Medina, Saudi Arabia, nestled against mountains and overlooking a river valley, this luxury wellness resort covers 37,000 m² with a total floor area of 12,900 m² and a plot ratio of 0.35. Designed as a high-end wild luxury healing getaway, it creates a differentiated world-class resort destination.\n\nThe project is divided into three functional zones: hotel, private villas, and commercial amenities, each featuring independent entrances while sharing premium amenities. The hotel forms the core, providing various guestroom suites, wellness gym, swimming pool, and public lounge. The private villas offer styled layout typologies prioritized at waterfront nodes to maximize scenic outlooks. Complemented by restaurants, leisure bars, and convenience grocers.\n\nIntegrating with mountain and creek features, the layout builds scenic observatories, capsule cabins at mountain peaks, and flowing landscape pathways. Steering away from commercialized family hubs, the design builds an ultra-calm, refined wellness retreat.",
      zh: "本项目位于沙特麦地那，背靠山体、前临河谷，占地 37000㎡，总建筑面积 12900㎡，容积率 0.35，定位高端野奢疗愈型度假村，打造差异化世界级度假目的地。\n\n项目整体划分为酒店、独栋别墅、配套商业三大功能板块，分区设置独立出入口，同时共享公共配套。酒店为核心业态，配置多种规格客房及健身、泳池、大堂等公区；别墅分多类户型，优先布局滨水位置，最大化景观价值；商业配套餐饮、休闲吧、商超等服务设施。\n\n场地结合山地、河谷地貌规划动线与景观，在山顶设置观景台、胶囊客房等特色空间，丰富休闲体验。设计摒弃大型奢华酒店与亲子度假模式，依托自然环境营造静谧雅致的度假氛围。"
    },
    specs: {
      materials: {
        en: ["Local Raw Sandstone Masonry", "Triple-pane Low-E Insulated Glazing", "High-Performance Weatherproof Timber"],
        zh: ["当地原产粗砺砂岩切石砌体", "双中空三超白防紫外线耐热玻璃", "天然防腐高耐久户外重竹木地板"]
      },
      co2Footprint: "原土循环与超低容积率 / Low Ratio Eco-Conscious",
      solarRating: "天然山口对流通风与遮阳 (Valley Passive Wind & Shade)",
      windLoad: "抗沙尘暴高耐久防风围护 (Desert Sandstorm & Wind Resistant)",
      structuralType: { en: "Mountain-Anchored Light Steel & Stone Structure", zh: "依山重力式挡墙与轻钢木构错层框架抗剪结构" }
    },
    blueprintLines: [
      { x1: 20, y1: 240, x2: 280, y2: 240, label: "River Valley Oasis Creek Waterline" },
      { x1: 50, y1: 190, x2: 120, y2: 190, label: "Luxury Waterfront Villas Zone" },
      { x1: 120, y1: 190, x2: 180, y2: 150, label: "Core Lobby & Wellness Wing" },
      { x1: 180, y1: 150, x2: 240, y2: 100, label: "Mountain Stepped Public Terraces" },
      { x1: 240, y1: 100, x2: 280, y2: 40, label: "Peak Observatory & Capsule Cabins" },
      { x1: 50, y1: 240, x2: 50, y2: 190 },
      { x1: 150, y1: 250, x2: 150, y2: 150, label: "Valley Gravity Retaining Wall" }
    ]
  },
  {
    id: "factory",
    title: { en: "Singera New Energy Headquarters Factory", zh: "星辰新能总部工厂" },
    category: { en: "Modern Headquarters Base", zh: "现代总部基地" },
    location: { en: "Keqiao, Shaoxing", zh: "中国 绍兴柯桥" },
    year: "2024",
    area: "85,600 m²",
    image: "https://raw.githubusercontent.com/leochou123/-/main/D07.jpg",
    concept: {
      en: "Located in Keqiao, Shaoxing, as a future factory of emerging energy enterprise, the design is based on GIGABASE concept, aimed to construct a modern headquarters base with industrial manufacturing space as the core. The overall factory planning is tight and unified, presenting a landmark and modern brand new generational industrial park. Different from traditional factories, the design places headquarters office space on top of the building, and the exhibition hall on the 1st and 2nd floors, forming a production, office, and exhibition integrated complex. The top office area draws from traditional Shaoxing courtyard form, meticulously designed to create a work environment with humanistic care and modern functions.",
      zh: "项目基地位于绍兴柯桥，作为新兴能源企业的未来工厂，设计以GIGABASE为理念，旨在为企业打造一个以工业制造空间为核心的现代总部基地。整体厂区规划紧凑统一，呈现出一座充满标志性与现代感的全新一代产业园区。建筑外形大气而完整，与传统厂房不同，设计将总部办公空间置于建筑顶部，展厅则位于首层与二层，形成一个生产、办公、展示功能有机融合的综合体。顶部办公区汲取绍兴传统合院形式，精心设计，营造一个兼具人文关怀与现代功能的工作环境，既体现了历史文化的深度，又满足现代企业对创新与效率的需求。"
    },
    specs: {
      materials: {
        en: ["Recycled Low-Carbon Aluminum Cladding", "High-Performance Double-Silver Low-E Glazing", "Photovoltaic Self-Cleaning Roof Tiles"],
        zh: ["高复用低碳阳极氧化铝板幕墙", "超白双银 Low-E 高性能断热玻璃", "BIPV 一体开合自清洁光伏屋面瓦"]
      },
      co2Footprint: "高能效绿色未来工厂 / High-Efficiency Green Factory",
      solarRating: "屋顶日照最大化光伏覆盖 (Maximum Photovoltaic Coverage)",
      windLoad: "抗风阻低阻流体化体量 (Low-Drag Aerodynamic Form)",
      structuralType: { en: "Large-Span Steel Truss & Portal Frame Structure", zh: "大跨度预应力钢桁架与门式钢架轻量化网格结构" }
    },
    blueprintLines: [
      { x1: 20, y1: 220, x2: 280, y2: 220, label: "Advanced Industrial Production Floor" },
      { x1: 60, y1: 170, x2: 240, y2: 170, label: "Integrated Exhibition & Showroom Center" },
      { x1: 100, y1: 100, x2: 200, y2: 100, label: "Courtyard Office Block with Traditional Canopy" },
      { x1: 150, y1: 100, x2: 150, y2: 50, label: "Modern HVAC Air Purification & Energy Hub" }
    ]
  }
];
