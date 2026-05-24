import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowRight, ChevronRight, Menu, X, Lightbulb, Target, Zap, Search, ExternalLink, Activity, CheckCircle2, Loader2, MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const WHATSAPP_NUMBER = "919084531323";

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
    
    :root {
      --bg-light: #FDFDFD;
      --bg-dark: #050505;
      --text-main: #0A0A0A;
      --text-muted: #737373;
      --accent: #C9A84C;
      --accent-glow: rgba(201, 168, 76, 0.15);
      --easing-premium: cubic-bezier(0.16, 1, 0.3, 1);
    }

    html {
      scroll-behavior: smooth;
      background-color: var(--bg-light);
    }
    
    body { 
      font-family: 'Inter', sans-serif; 
      background-color: var(--bg-light); 
      color: var(--text-main); 
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    
    /* Cinematic Fade Up */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(40px) scale(0.97); filter: blur(10px); }
      to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    }
    
    .animate-on-scroll {
      opacity: 0;
      will-change: opacity, transform, filter;
    }
    
    .is-visible {
      animation: fadeUp 1.2s var(--easing-premium) forwards;
    }

    /* Subliminal Engineering Grid */
    .bg-grid {
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
      mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
    }

    /* Tactile Noise Texture */
    .noise-bg {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      opacity: 0.04; pointer-events: none; z-index: 9999;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    /* High-end Underline */
    .hover-underline { position: relative; }
    .hover-underline::after {
      content: ''; position: absolute; width: 100%; height: 1px;
      bottom: -2px; left: 0; background-color: currentColor;
      transform: scaleX(0); transform-origin: right;
      transition: transform 0.6s var(--easing-premium);
    }
    .hover-underline:hover::after {
      transform: scaleX(1); transform-origin: left;
    }

    ::selection { background: var(--text-main); color: var(--bg-light); }
    
    /* Glassmorphism utilities */
    .glass-panel {
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02), inset 0 0 0 1px rgba(255,255,255,0.5);
    }
  `}} />
);

const PROJECTS = [
  {
    id: 1, category: "Work Experience", year: "2026",
    title: "Exhibition Performance Analytics Dashboard", company: "VSKY Expo",
    desc: "Built an interactive Power BI dashboard analyzing exhibition performance across 15+ Indian cities for a 5-member operations team. Transformed raw datasets with missing values into geographic cluster visualizations that directly informed regional expansion strategy.",
    insights: ["Identified 20% NCR growth opportunity vs other regions", "15% increase in data-driven decision speed", "Geographic cluster dashboards across 15+ cities"],
    tags: ["Power BI", "DAX", "Power Query", "Excel", "Geo Analytics"]
  },
  {
    id: 2, category: "Work Experience", year: "2025",
    title: "MSP/HCT Job Requisition Analytics", company: "Tata Consultancy Services",
    desc: "End-to-end HR analytics system analyzing 400+ live requisitions across MSP and HCT portfolios. Built a 7-page report with KPIs, trend analysis, and hiring intelligence.",
    insights: ["25+ critical roles closed via data-driven prioritization", "15% reduction in average time-to-fill", "Chennai identified as 50% hiring hub — budget reallocated"],
    tags: ["Python", "Dash", "Plotly", "Matplotlib", "Seaborn", "EDA", "HR Analytics"]
  },
  {
    id: 3, category: "Analytics & BI", year: "2026",
    title: "Insurance Claims & Sentiment Analytics",
    desc: "Two-page Power BI dashboard analyzing 10,000 insurance policies across Auto, Health, Home, Life, and Travel — combining claims performance analytics with NLP-powered customer sentiment analysis.",
    insights: ["44% of claims rejected — highest of any status", "54 Needs Improvement vs 43 Excellent reviews", "Customer complaints concentrated around process friction — not product dissatisfaction"],
    tags: ["Power BI", "DAX", "NLP", "Sentiment Analysis", "Power Query"],
    link: "https://github.com/NavyaKuchhal14/Insurance-Analytics-PowerBI"
  },
  {
    id: 4, category: "Analytics & BI", year: "2025",
    title: "ElectroHub Sales Performance Dashboard",
    desc: "5-page interactive Power BI dashboard analyzing 3,500+ orders and ₹122M in sales across 14 Indian cities from 2020–2024. Tracks revenue, profit margins, promotional ROI, and product performance with dual-date comparison capability.",
    insights: ["Apple iPhone 14 dominated all three rankings — sales (₹21.4M), quantity (281), and profit (₹2.14M)", "Weekend Flash Sales generated ₹23K average discount — highest of all promotions but questionable ROI", "Bottom 5 products collectively earned under ₹0.6M — candidates for delisting"],
    tags: ["Power BI", "DAX", "Power Query", "Sales Analytics"],
    link: "https://github.com/NavyaKuchhal14/ElectroHub-Sales-Performance-Dashboard"
  },
  {
    id: 5, category: "Analytics & BI", year: "2025",
    title: "Swiggy Food Delivery — EDA & Demand Forecasting",
    desc: "Exploratory data analysis on 197,430 food delivery records across 28 cities, 993 restaurants, and 4,972 dish categories — uncovering ₹5.3 Crore in total revenue patterns, demand peaks, and Veg vs Non-Veg revenue dynamics.",
    insights: [" Bengaluru generated ₹54.5L in revenue — 75% more than the #2 city Lucknow", "Weekend evenings showed significantly higher order volumes — informing shift scheduling and promotional timing", "Swiggy's 'Recommended' category drove 24,100 orders — 8x more than any other category"],
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Plotly", "EDA"],
    link: "https://github.com/NavyaKuchhal14/Swiggy-Sales-Analysis"
  },
  {
    id: 6, category: "Machine Learning", year: "2024",
    title: "District-Wise Crime Against Women — Clustering",
    desc: "K-Means clustering on 4,700+ district-level crime records segmenting all of India into 4 risk categories for targeted law enforcement resource allocation. Built an interactive Flask + Plotly dashboard for non-technical policymakers",
    insights: ["4 risk clusters identified across Indian districts", "Interactive Flask dashboard with scatter plots, heatmaps, and distribution charts for non-technical users", "Policy brief published on LinkedIn and ResearchGate"],
    tags: ["Python", "Scikit-learn", "K-Means", "Flask", "Plotly"],
    link: "https://github.com/NavyaKuchhal14/Districtwise-crime-against-women"
  },
  {
    id: 7, category: "Machine Learning", year: "2024",
    title: "Early Breast Cancer Detection System",
    desc: "Multi-model ML pipeline on Wisconsin Breast Cancer dataset (569 records, 30+ features). Evaluated 6 algorithms and achieved 98.6% peak accuracy.",
    insights: ["98.6% accuracy via Bagging Classifier + Decision Tree", "6 ML models built and benchmarked", "Full F1-score, confusion matrix, feature importance analysis"],
    tags: ["Python", "Scikit-learn", "XGBoost", "Bagging", "Seaborn"]
  },
  {
    id: 8, category: "Machine Learning", year: "2025",
    title: "TriDrobe — AI Virtual Try-On System",
    desc: "Browser-based virtual try-on platform for fashion using AI image segmentation and garment draping. Built with modern full-stack architecture.",
    insights: ["AI segmentation + realistic garment rendering", "Responsive interactive UI", "Modular and scalable architecture"],
    tags: ["Next.js", "React 18", "TypeScript", "Three.js", "AI Vision"]
  },
  {
    id: 9, category: "AI Automation", year: "2026",
    title: "AI Data Analyst Chatbot",
    desc: "Conversational AI chatbot acting as an on-demand data analyst. Ask a business question, get structured analysis and insights — demonstrating AI-augmented analytics.",
    insights: ["Natural language to structured data insights", "Conversational interface for non-technical users", "AI-augmented analytics workflow"],
    tags: ["Python", "LLM", "AI Agents", "Automation"]
  },
  {
    id: 10, category: "AI Automation", year: "2026",
    title: "Local Intelligence Agent",
    desc: "AI agent taking natural language location queries and returning structured ranked recommendations. Foundation for AI-powered local intelligence pipelines.",
    insights: ["Natural language query to structured recommendations", "Multi-step AI agent workflow", "Demonstrates AI pipeline architecture"],
    tags: ["Python", "AI Agents", "LLM", "Automation"]
  }
];

const SKILLS = {
  "Business Intelligence": [
    { name: "Power BI + DAX", percent: 92 },
    { name: "Excel Modeling", percent: 90 },
    { name: "Power Query", percent: 88 },
    { name: "Tableau", percent: 75 }
  ],
  "Programming & Data": [
    { name: "Python (Pandas/NumPy)", percent: 85 },
    { name: "SQL", percent: 82 },
    { name: "Plotly + Matplotlib", percent: 80 },
    { name: "Flask", percent: 70 }
  ],
  "Machine Learning": [
    { name: "EDA + Feature Eng.", percent: 85 },
    { name: "K-Means Clustering", percent: 80 },
    { name: "Scikit-learn", percent: 78 },
    { name: "TensorFlow + Keras", percent: 72 }
  ],
  "Infrastructure": [
    { name: "GitHub", percent: 80 },
    { name: "Snowflake", percent: 65 },
    { name: "MongoDB", percent: 62 },
    { name: "AWS Fundamentals", percent: 60 }
  ]
};

const useScrollObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const currentRef = domRef.current;
    if (!currentRef) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -5% 0px', threshold }
    );
    observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [threshold]);

  return [domRef, isVisible];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useScrollObserver();
  return (
    <div ref={ref} className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// Elite Magnetic Button with smooth dampening
const Magnetic = ({ children, className, onClick, href }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });
  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={ref} href={href} onClick={onClick} onMouseMove={handleMouse} onMouseLeave={reset}
      className={`relative inline-block transition-transform ease-out duration-700 cursor-pointer ${className}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      target={href && href.startsWith('http') ? '_blank' : undefined}
      rel={href && href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Component>
  );
};

const SkillBar = ({ name, percent, delay }) => {
  const [ref, isVisible] = useScrollObserver();
  return (
    <div ref={ref} className="mb-6 group cursor-crosshair">
      <div className="flex justify-between text-sm mb-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
        <span className="text-[#0A0A0A] font-semibold tracking-tight">{name}</span>
        <span className="text-[#C9A84C] font-mono text-xs opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-y-2 group-hover:translate-y-0">{percent}%</span>
      </div>
      <div className="h-[2px] w-full bg-black/5 rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-[#0A0A0A] transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: isVisible ? `${percent}%` : '0%', transitionDelay: `${delay}ms` }}
        />
        {/* Soft Gold Sweeping Highlight */}
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full ease-in-out"
          style={{ width: '60%', transitionDuration: '1.2s' }}
        />
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl p-8 bg-white flex flex-col h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 ring-1 ring-black/5 hover:ring-transparent"
    >
      <div 
        className="absolute pointer-events-none transition-opacity duration-700 ease-out mix-blend-soft-light"
        style={{
          top: mousePos.y, left: mousePos.x,
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(201, 168, 76, 0.4) 0%, transparent 50%)',
          opacity: isHovered ? 1 : 0,
          zIndex: 0
        }}
      />
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10 box-shadow-[inset_0_0_0_1px_rgba(201,168,76,0.2)]" />

      <div className="relative z-20 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <span className="text-[10px] font-mono text-[#0A0A0A] font-bold uppercase tracking-widest bg-gray-50/80 px-3 py-1.5 rounded-full ring-1 ring-black/5 group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C] group-hover:ring-[#C9A84C]/20 transition-all duration-500">
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-[#A3A3A3] tracking-widest font-medium">{project.year}</span>
        </div>
        
        <h3 className="text-2xl font-extrabold tracking-tight text-[#0A0A0A] mb-2 leading-tight group-hover:text-[#C9A84C] transition-colors duration-500">
          {project.title}
        </h3>
        {project.company && (
          <p className="text-sm font-semibold text-[#0A0A0A] mb-5">{project.company}</p>
        )}
        
        <p className="text-[#737373] text-sm leading-relaxed mb-8 flex-grow font-medium">
          {project.desc}
        </p>
        
        <div className="mb-8 space-y-3 p-5 rounded-2xl bg-gray-50/50 group-hover:bg-white transition-colors duration-500 relative">
          {project.insights.map((insight, idx) => (
            <div key={idx} className="flex items-start text-sm text-[#0A0A0A] group/insight">
              <ChevronRight className="w-4 h-4 text-[#C9A84C] mr-3 mt-0.5 flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/insight:translate-x-1" />
              <span className="leading-snug font-medium text-gray-700 group-hover/insight:text-black transition-colors">{insight}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-auto pt-6 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0,3).map((tag, idx) => (
              <span key={idx} className="text-[10px] font-mono font-semibold text-[#737373] bg-gray-50 px-2.5 py-1 rounded-md ring-1 ring-black/5">
                {tag}
              </span>
            ))}
          </div>
          <a href={project.link || "https://github.com/NavyaKuchhal14"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-[#0A0A0A] uppercase tracking-widest hover-underline flex-shrink-0 group/link">
            Examine
            <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1 group-hover/link:opacity-100" />
          </a>
        </div>
      </div>
    </div>
  );
};

const DiagnosticModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [answers, setAnswers] = useState({ pain: '', setup: '', timeline: '' });

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setStep(1); setIsProcessing(false); setAnswers({ pain: '', setup: '', timeline: '' }); }, 500);
    }
  }, [isOpen]);

  const questions = [
    {
      id: 'pain',
      title: "Identify the Bottleneck.",
      subtitle: "What is currently causing the most friction in your data operations?",
      options: [
        "We have dashboards, but executives don't trust or use them.",
        "We are drowning in fragmented spreadsheets and manual exports.",
        "We can't confidently calculate true profit margins by segment.",
        "Other / Just exploring system capabilities."
      ]
    },
    {
      id: 'setup',
      title: "Assess Current Architecture.",
      subtitle: "How is your data infrastructure currently structured?",
      options: [
        "Mostly Excel / Google Sheets holding the company together.",
        "We have tools (Power BI, Tableau) but the models are broken/slow.",
        "Legacy systems that take hours to generate a single report.",
        "Starting entirely from scratch."
      ]
    },
    {
      id: 'timeline',
      title: "Determine Urgency.",
      subtitle: "How quickly do you need to stop this operational margin bleed?",
      options: [
        "ASAP. We are losing money and time daily.",
        "Within 30 days. We need a solid operational foundation.",
        "No rush, mapping out future architecture."
      ]
    }
  ];

  const handleSelect = (answer) => {
    const currentQ = questions[step - 1].id;
    setAnswers(prev => ({ ...prev, [currentQ]: answer }));
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Trigger Labor Illusion
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(4); // Success step
      }, 1500);
    }
  };

  const submitToWhatsApp = () => {
    const text = `*Executive Data Audit Request*%0A%0A*Identified Bottleneck:*%0A${answers.pain}%0A%0A*Current Architecture:*%0A${answers.setup}%0A%0A*Urgency Level:*%0A${answers.timeline}%0A%0A*Next Steps:*%0AHi Navya, I just completed the diagnostic. Let's schedule a call to discuss stopping the margin bleed.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Modal Content */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[101] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 scale-100 translate-y-[-50%]' : 'opacity-0 scale-95 translate-y-[-40%] pointer-events-none'}`}>
        <div className="bg-white rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] ring-1 ring-black/5 overflow-hidden mx-4">
          
          {/* Header */}
          <div className="px-8 py-6 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center">
                <Activity className="w-4 h-4 text-[#C9A84C]" />
              </div>
              <span className="font-extrabold tracking-tight text-lg text-[#0A0A0A]">Diagnostic Engine</span>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-black hover:bg-black/5 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 min-h-[360px] flex flex-col justify-center">
            {step <= 3 && !isProcessing && (
              <div className="animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                <div className="flex gap-1 mb-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-[#C9A84C]' : 'bg-gray-100'}`} />
                  ))}
                </div>
                <h3 className="text-2xl font-extrabold text-[#0A0A0A] mb-2 tracking-tight">{questions[step - 1].title}</h3>
                <p className="text-[#737373] text-sm font-medium mb-8 leading-relaxed">{questions[step - 1].subtitle}</p>
                
                <div className="space-y-3">
                  {questions[step - 1].options.map((opt, i) => (
                    <button 
                      key={i} onClick={() => handleSelect(opt)}
                      className="w-full text-left p-4 rounded-xl border border-black/10 hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-300 text-sm font-medium text-gray-800 hover:text-black group flex justify-between items-center"
                    >
                      {opt}
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#C9A84C] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="flex flex-col items-center justify-center text-center animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                <Loader2 className="w-10 h-10 text-[#C9A84C] animate-spin mb-6" />
                <h3 className="text-xl font-extrabold text-[#0A0A0A] tracking-tight mb-2">Compiling Diagnostics...</h3>
                <p className="text-[#737373] text-sm font-medium">Analyzing parameters to formulate executive strategy.</p>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center justify-center text-center animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-3">Diagnostic Complete.</h3>
                <p className="text-[#737373] text-sm font-medium mb-8 max-w-sm">
                  Your executive summary is ready. Send it directly to my secure WhatsApp to initiate the audit protocol.
                </p>
                <button 
                  onClick={submitToWhatsApp}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold tracking-wide transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  Transfer to WhatsApp
                </button>
                <button onClick={onClose} className="mt-4 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest hover-underline">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filters = ["All", "Work Experience", "Analytics & BI", "Machine Learning", "AI Automation"];
  const filteredProjects = activeFilter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);

  const navLinks = [
    { name: "Philosophy", href: "#approach" },
    { name: "Proof of Work", href: "#projects" },
    { name: "Arsenal", href: "#skills" },
    { name: "Experience", href: "#experience" },
  ];

  // Highly optimized scroll listener using requestAnimationFrame to prevent layout thrashing
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollTop;
          const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          setScrollProgress(`${(totalScroll / windowHeight) * 100}`);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] relative text-base selection:bg-[#C9A84C]/20 selection:text-[#0A0A0A]">
      <GlobalStyles />
      <div className="noise-bg" />
      <DiagnosticModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Engineering Subliminal Grid - only in the hero */}
      <div className="absolute top-0 left-0 w-full h-screen bg-grid z-0 pointer-events-none opacity-[0.8]" />
      
      {/* Premium Zeigarnik Progress Bar */}
      <div className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-transparent via-[#C9A84C] to-[#C9A84C] z-[60] origin-left ease-out transition-transform duration-100" style={{ transform: `scaleX(${scrollProgress / 100})`, width: '100%' }} />

      {/* Glassmorphic Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-black/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); }} className="text-2xl font-extrabold tracking-tighter text-[#0A0A0A] group relative">
            NK<span className="text-[#C9A84C]">.</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-10 text-sm font-semibold">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-[#737373] hover:text-[#0A0A0A] transition-colors hover-underline py-2">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Magnetic onClick={() => setIsModalOpen(true)} className="px-7 py-3 bg-[#0A0A0A] text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#C9A84C] transition-colors duration-500 shadow-xl shadow-black/10 overflow-hidden group">
              <span className="relative z-10">Book Audit</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#C9A84C] to-[#E5A93B] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            </Magnetic>
          </div>

          <button className="md:hidden text-[#0A0A0A] p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white/90 backdrop-blur-xl border-b border-black/5 px-6 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'max-h-80 py-6' : 'max-h-0'}`}>
          <div className="space-y-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold text-[#0A0A0A] tracking-tight">
                {link.name}
              </a>
            ))}
            <button onClick={() => { setIsMobileMenuOpen(false); setIsModalOpen(true); }} className="block w-full text-left text-lg font-bold text-[#C9A84C] tracking-tight">
              Book Audit
            </button>
          </div>
        </div>
      </nav>

      {}
      <main className="pt-20">
        <section className="min-h-[92vh] flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
          <FadeIn delay={100} className="mb-8">
            <div className="inline-flex items-center space-x-3 glass-panel px-4 py-2 rounded-full shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A84C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C9A84C]"></span>
              </span>
              <p className="font-mono text-xs text-[#0A0A0A] font-bold tracking-widest uppercase mt-0.5">
                Actively Interviewing · Noida
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={200} className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/60 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
            <h1 className="text-[4.5rem] md:text-8xl lg:text-[9rem] font-extrabold tracking-tighter text-[#0A0A0A] mb-8 leading-[0.85] py-2">
              Navya Kuchhal.
            </h1>
          </FadeIn>
          
          <FadeIn delay={300}>
            <p className="text-xl md:text-3xl text-[#737373] font-medium max-w-4xl leading-relaxed mb-14 tracking-tight">
              You call yourself a data-driven company, but you're running on fragmented spreadsheets. I architect <strong className="font-bold text-[#0A0A0A]">executive intelligence systems</strong> that stop margin bleed and force decisive action.
            </p>
          </FadeIn>

          <FadeIn delay={400} className="flex flex-wrap gap-5 mb-24">
            <Magnetic href="#projects" className="px-9 py-4 bg-[#0A0A0A] text-white rounded-2xl font-bold tracking-wide shadow-2xl shadow-black/20 flex items-center group transition-all hover:bg-[#1a1a1a]">
              View Architecture
              <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2" />
            </Magnetic>
            <Magnetic href="#approach" className="px-9 py-4 bg-white text-[#0A0A0A] border border-black/10 rounded-2xl font-bold tracking-wide hover:border-black/30 transition-colors flex items-center shadow-sm">
              The Philosophy
            </Magnetic>
          </FadeIn>

          {/* Social Proof Anchoring */}
          <FadeIn delay={600} className="grid grid-cols-2 md:grid-cols-4 gap-12 py-12 border-t border-black/5">
            {[
              { num: "10+", label: "Products Built" },
              { num: "2", label: "IEEE Publications" },
              { num: "400+", label: "Reqs Analyzed" },
              { num: "197K+", label: "Records Processed" }
            ].map((stat, i) => (
              <div key={i} className="group cursor-default">
                <h4 className="text-4xl md:text-5xl font-extrabold text-[#0A0A0A] mb-3 tracking-tighter transition-colors duration-500 group-hover:text-[#C9A84C]">{stat.num}</h4>
                <p className="text-[11px] text-[#A3A3A3] font-mono font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </FadeIn>
        </section>

        {}
        <section id="approach" className="py-40 bg-white relative z-10 border-t border-black/5 rounded-[3rem] -mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <FadeIn>
              <h2 className="text-xs font-mono font-bold tracking-widest text-[#C9A84C] mb-6 uppercase">Methodology</h2>
              <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-[#0A0A0A] mb-24 max-w-3xl leading-tight">
                Data without behavioral context is just noise.
              </h3>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { icon: <Search/>, title: "Uncovering Incentives", desc: "People respond to incentives, not charts. I look past vanity metrics to find the root behaviors driving your operational bottlenecks." },
                { icon: <Target/>, title: "Habit-Forming BI", desc: "A dashboard is useless if ignored. I engineer tools using behavioral loops—triggers and variable rewards—ensuring high executive adoption." },
                { icon: <Lightbulb/>, title: "The Power of 'I Don't Know'", desc: "I don't force data to fit a narrative. I start with an unbiased slate, test strict hypotheses, and let the mathematics dictate strategy." },
                { icon: <Zap/>, title: "Narrative Persuasion", desc: "The human brain remembers stories, not spreadsheets. I transform cold analytics into compelling data narratives that are impossible to ignore." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 100} className="group p-12 rounded-[2.5rem] bg-[#FDFDFD] border border-black/5 hover:border-transparent hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-10 border border-black/5 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {React.cloneElement(item.icon, { className: "w-7 h-7 text-[#0A0A0A]" })}
                  </div>
                  <h4 className="text-2xl font-bold tracking-tight text-[#0A0A0A] mb-5">{item.title}</h4>
                  <p className="text-[#737373] leading-relaxed font-medium text-lg">{item.desc}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {}
        <section id="projects" className="py-40 relative z-10 bg-[#050505] text-white rounded-[3rem] -mt-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C9A84C]/5 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
              <FadeIn>
                <h2 className="text-xs font-mono font-bold tracking-widest text-[#C9A84C] mb-6 uppercase">Proof of Work</h2>
                <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white leading-tight">
                  Selected Engineering<br/>Artifacts.
                </h3>
              </FadeIn>
              
              <FadeIn delay={200} className="flex flex-wrap gap-3">
                {filters.slice(0,4).map(filter => (
                  <button
                    key={filter} onClick={() => setActiveFilter(filter)}
                    className={`px-7 py-3 rounded-full text-xs font-bold tracking-wide transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeFilter === filter 
                        ? 'bg-white text-[#0A0A0A] shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105' 
                        : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {filteredProjects.slice(0,6).map((project, idx) => (
                <FadeIn key={project.id} delay={idx * 100}>
                  <div className="group relative rounded-3xl p-10 bg-white/5 flex flex-col h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden hover:-translate-y-2 ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/[0.07]">
                     <div className="flex justify-between items-start mb-8">
                        <span className="text-[10px] font-mono text-white font-bold uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full group-hover:bg-[#C9A84C]/20 group-hover:text-[#C9A84C] transition-colors duration-500">
                          {project.category}
                        </span>
                        <span className="text-[11px] font-mono text-white/40 tracking-widest font-medium">{project.year}</span>
                      </div>
                      
                      <h3 className="text-2xl font-extrabold tracking-tight text-white mb-3 leading-tight group-hover:text-[#C9A84C] transition-colors duration-500">
                        {project.title}
                      </h3>
                      {project.company && (
                        <p className="text-sm font-semibold text-white/70 mb-5">{project.company}</p>
                      )}
                      
                      <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow font-medium">
                        {project.desc}
                      </p>
                      
                      <div className="mb-10 space-y-4">
                        {project.insights.map((insight, idx) => (
                          <div key={idx} className="flex items-start text-sm text-white/80 group/insight">
                            <ChevronRight className="w-4 h-4 text-[#C9A84C] mr-3 mt-0.5 flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/insight:translate-x-1" />
                            <span className="leading-snug font-medium">{insight}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0,3).map((tag, idx) => (
                            <span key={idx} className="text-[10px] font-mono font-semibold text-white/50 bg-white/5 px-2.5 py-1 rounded-md ring-1 ring-white/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a href={project.link || "https://github.com/NavyaKuchhal14"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-white uppercase tracking-widest hover-underline flex-shrink-0 group/link">
                          Examine
                          <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1 group-hover/link:opacity-100" />
                        </a>
                      </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {}
        <section id="skills" className="py-40 bg-[#FDFDFD] relative z-10 rounded-[3rem] -mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-24">
            <div className="lg:w-1/3">
              <FadeIn className="sticky top-40">
                <h2 className="text-xs font-mono font-bold tracking-widest text-[#C9A84C] mb-6 uppercase">The Arsenal</h2>
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#0A0A0A] mb-8 leading-tight">
                  Technical Stack & Capabilities.
                </h3>
                <p className="text-[#737373] font-medium leading-relaxed mb-12 text-lg">
                  A curated selection of tools I use to extract signal from noise and build scalable, high-margin data solutions. Constantly evolving, deeply specialized.
                </p>
                <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden relative">
                   <div className="absolute inset-0 bg-[#C9A84C] w-1/2 rounded-full animate-[slide_2.5s_cubic-bezier(0.4,0,0.2,1)_infinite_alternate]"></div>
                </div>
              </FadeIn>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20">
              {Object.entries(SKILLS).map(([category, skills], catIdx) => (
                <FadeIn key={category} delay={catIdx * 100}>
                  <h4 className="text-xl font-extrabold tracking-tight text-[#0A0A0A] mb-10 pb-4 border-b border-black/5 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-[#C9A84C] mr-4 shadow-[0_0_10px_rgba(201,168,76,0.5)]"></div>
                    {category}
                  </h4>
                  <div className="space-y-2">
                    {skills.map((skill, idx) => (
                      <SkillBar key={skill.name} name={skill.name} percent={skill.percent} delay={idx * 100 + 100} />
                    ))}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `@keyframes slide { 0% { transform: translateX(0); } 100% { transform: translateX(100%); } }`}} />
        </section>

        {}
        <section id="experience" className="py-40 bg-[#0A0A0A] text-white relative z-10 selection:bg-[#C9A84C]/30 selection:text-white rounded-[3rem] -mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <FadeIn>
              <h2 className="text-xs font-mono font-bold tracking-widest text-[#C9A84C] mb-6 uppercase">Track Record</h2>
              <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-32 leading-tight">
                Operational Experience.
              </h3>
            </FadeIn>
            
            <div className="space-y-24 relative before:absolute before:inset-0 before:ml-[5.5rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              
              <FadeIn className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-[4px] border-[#0A0A0A] bg-[#C9A84C] shadow-[0_0_30px_rgba(201,168,76,0.3)] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-[#C9A84C]/50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
                    <h4 className="text-2xl font-extrabold tracking-tight text-white">Data Analyst Intern</h4>
                    <span className="text-[#C9A84C] font-mono text-xs font-bold tracking-widest uppercase bg-[#C9A84C]/10 px-4 py-1.5 rounded-full w-fit">2026—Present</span>
                  </div>
                  <p className="text-white/40 mb-8 font-mono text-sm tracking-widest uppercase font-semibold">VSKY Expo</p>
                  <ul className="space-y-4">
                    <li className="flex items-start text-white/70 group/bullet">
                      <ChevronRight className="w-5 h-5 text-[#C9A84C] mr-4 mt-0.5 flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/bullet:translate-x-1" />
                      <span className="leading-relaxed font-medium">Transformed raw exhibition datasets for 15+ cities improving reporting accuracy.</span>
                    </li>
                    <li className="flex items-start text-white/70 group/bullet">
                      <ChevronRight className="w-5 h-5 text-[#C9A84C] mr-4 mt-0.5 flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/bullet:translate-x-1" />
                      <span className="leading-relaxed font-medium">Designed Power BI dashboard identifying 20% NCR growth opportunity.</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={200} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-[4px] border-[#0A0A0A] bg-white/10 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[#C9A84C] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                  <Activity className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-[#C9A84C]/50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
                    <h4 className="text-2xl font-extrabold tracking-tight text-white">Data Analyst Intern</h4>
                    <span className="text-white/40 font-mono text-xs font-bold tracking-widest uppercase bg-white/5 px-4 py-1.5 rounded-full w-fit group-hover:text-[#C9A84C] group-hover:bg-[#C9A84C]/10 transition-colors duration-500">Jun—Aug 2025</span>
                  </div>
                  <p className="text-white/40 mb-8 font-mono text-sm tracking-widest uppercase font-semibold">Tata Consultancy Services</p>
                  <ul className="space-y-4">
                    <li className="flex items-start text-white/70 group/bullet">
                      <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-[#C9A84C] mr-4 mt-0.5 flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/bullet:translate-x-1" />
                      <span className="leading-relaxed font-medium">Analyzed 400+ job requisitions across MSP/HCT portfolios in a 10-member pod.</span>
                    </li>
                    <li className="flex items-start text-white/70 group/bullet">
                      <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-[#C9A84C] mr-4 mt-0.5 flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/bullet:translate-x-1" />
                      <span className="leading-relaxed font-medium">Identified Chennai as 50% hiring hub enabling targeted budget reallocation.</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>
              
            </div>
          </div>
        </section>

        <section className="py-40 relative z-10 bg-[#FDFDFD] rounded-[3rem] -mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <FadeIn>
              <h2 className="text-xs font-mono font-bold tracking-widest text-[#C9A84C] mb-6 uppercase">Academic Rigor</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#0A0A0A] mb-20 leading-tight">
                Research & Publications.
              </h3>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <FadeIn delay={100} className="group bg-white p-12 rounded-[2rem] border border-black/5 hover:border-black/20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] cursor-default hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-md text-[10px] font-extrabold tracking-widest mb-10 uppercase shadow-sm">
                    <span>IEEE Published</span>
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-[#0A0A0A] mb-5 leading-snug">
                    Convolutional Neural Network for Maths Handwritten Digit Categorization
                  </h3>
                  <p className="text-[#A3A3A3] font-mono text-sm tracking-widest font-bold uppercase mt-8">IC3I 2023</p>
                </div>
              </FadeIn>

              <FadeIn delay={200} className="group bg-white p-12 rounded-[2rem] border border-black/5 hover:border-black/20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] cursor-default hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-md text-[10px] font-extrabold tracking-widest mb-10 uppercase shadow-sm">
                    <span>IEEE Published</span>
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-[#0A0A0A] mb-5 leading-snug">
                    An Enhanced Version of YouTube Video Download Using Python
                  </h3>
                  <p className="text-[#A3A3A3] font-mono text-sm tracking-widest font-bold uppercase mt-8">CSET 2023 · 100+ Attendees</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {}
        <section id="contact" className="py-48 bg-white border-t border-black/5 relative z-10">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#0A0A0A] mb-10 tracking-tight leading-tight">
                Every month you delay unifying your data, you bleed <span className="text-[#C9A84C] font-extrabold">hidden operational margin.</span> Let's stop the bleed.
              </h2>
            </FadeIn>
            
            <FadeIn delay={100}>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="relative inline-block text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter text-[#0A0A0A] hover:text-[#C9A84C] transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] break-words mb-8 group py-4 cursor-pointer"
              >
                Initiate System Audit
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-[#C9A84C] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"></span>
              </button>
              <div className="text-[#737373] text-lg font-medium mb-24">
                or email directly at <a href="mailto:kuchhalnavya2002@gmail.com" className="text-[#0A0A0A] hover-underline font-bold">kuchhalnavya2002@gmail.com</a>
              </div>
            </FadeIn>
            
            <FadeIn delay={200} className="flex justify-center gap-8">
              <Magnetic href="https://www.linkedin.com/in/navya-kuchhal-76a1601b8" className="p-6 bg-[#FDFDFD] border border-black/5 rounded-full hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-[#0A0A0A] shadow-sm">
                <FaLinkedin className="w-6 h-6" />
              </Magnetic>
              <Magnetic href="https://github.com/NavyaKuchhal14" className="p-6 bg-[#FDFDFD] border border-black/5 rounded-full hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-[#0A0A0A] shadow-sm">
                <FaGithub className="w-6 h-6" />
              </Magnetic>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#050505] py-16 relative z-10 text-white selection:bg-[#C9A84C]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-mono font-bold uppercase tracking-widest text-white/50">
          <div>© 2026 Navya Kuchhal</div>
          <div className="text-center">Data & BI Analyst · Noida, IN</div>
          <div className="flex items-center space-x-3 text-white/80 group cursor-default">
            <Zap className="w-4 h-4 text-[#C9A84C] transition-transform duration-500 group-hover:rotate-12" />
            <span className="group-hover:text-white transition-colors duration-300">Engineered with intention</span>
          </div>
        </div>
      </footer>
    </div>
  );
}