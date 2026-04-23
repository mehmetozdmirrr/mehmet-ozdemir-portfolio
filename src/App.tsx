import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Github, Linkedin, ExternalLink, Globe, Smartphone, Database, Palette, Code2, Download, Mail, Phone, MapPin } from 'lucide-react';
import Scene from './components/Scene';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import SpotlightCard from './components/SpotlightCard';
import { cn } from './lib/utils';

// --- Localization Content ---
type Lang = 'tr' | 'en';

const translations = {
  tr: {
    role: "BİLGİSAYAR MÜHENDİSİ",
    nameFirstName: "MEHMET",
    nameLastName: "ÖZDEMİR",
    headline: "FULL-STACK ENGINEER & AI ENTHUSIAST",
    heroDesc: "Süleyman Demirel Üniversitesi Bilgisayar Mühendisliği mezunuyum. Ölçeklenebilir arka uç (backend) mimarilerini, akıcı kullanıcı arayüzleri ve modern Yapay Zeka (AI) entegrasyonları ile birleştirerek uçtan uca dijital ürünler geliştiriyorum.",
    downloadCV: "CV'Yİ GÖRÜNTÜLE / İNDİR",
    aboutTitle: "HAKKIMDA",
    aboutSubtitle: "01 / SİSTEM PROFİLİ",
    aboutText: "Merhaba, ben Mehmet Özdemir. Amacım sadece kod yazmak değil; karmaşık problemleri zarif, performanslı ve sürdürülebilir sistemlere dönüştürmek. Güçlü bilgisayar bilimleri altyapımı modern yapay zeka (AI/LLM) araçlarıyla harmanlayarak, kullanıcı odaklı uçtan uca dijital çözümler geliştiriyorum.",
    aboutHighlight: "Bir projeyi veritabanı mimarisinden canlı prodüksiyona kadar tek başına yürütebilen; yeniliklere hızla adapte olup geleceği bugünden kodlayan çözüm odaklı bir mühendisim.",
    skillsTitle: "Yetenekler",
    workTitle: "Sistemler",
    workSubtitle: "Seçili Projeler",
    contactTitle: "İletişim",
    contactDescTitle: "Benimle İletişime Geçin",
    contactDescText: "Yeni projeler, iş teklifleri veya sadece merhaba demek için aşağıdaki formu doldurabilir veya doğrudan iletişim bilgilerimden bana ulaşabilirsiniz.",
    contactEmail: "Email",
    contactPhone: "Telefon",
    contactLocation: "Konum",
    contactLocText: "Türkiye",
    formName: "Adınız",
    formEmail: "Email",
    formSubject: "Konu",
    formMessage: "Mesajınız",
    formSubmit: "Mesaj Gönder",
    footerText: "© 2026 Mehmet Özdemir / Mükemmellik için Senkronize Edildi",
    navAbout: "Hakkımda",
    navWork: "Sistemler",
    navContact: "İletişim",
    skills: [
      { cat: "AI & LLM", items: ["OpenAI API", "LangChain", "Gemini AI", "Prompt Engineering"], icon: Code2 },
      { cat: "Full-Stack", items: [".NET / C#", "Node.js", "React / Angular", "PostgreSQL"], icon: Database },
      { cat: "Mobil", items: ["Flutter / Dart", "Google Maps", "Firebase", "Real-time"], icon: Smartphone },
      { cat: "Mimari", items: ["Microservices", "Docker", "Redis", "RabbitMQ"], icon: Palette }
    ],
    projects: [
      {
        title: "PawLinker",
        category: "Location Based Mobile",
        description: "Flutter ve Firebase ile geliştirilen, Google Maps entegrasyonuna sahip, Redis ve RabbitMQ ile ölçeklenen karmaşık bir mobil ekosistem.",
        tags: ["Flutter", "Redis", "Docker", "RabbitMQ"],
        link: "https://github.com/mehmetozdmirrr/pawlinker"
      },
      {
        title: "ChatApp",
        category: "AI Communication",
        description: ".NET Core ve Angular tabanlı, OpenAI destekli akıllı chatbot entegrasyonuna sahip gerçek zamanlı mesajlaşma sistemi.",
        tags: [".NET", "Angular", "OpenAI", "SignalR"],
        link: "https://github.com/mehmetozdmirrr/chatapp"
      },
      {
        title: "Macro Tracker",
        category: "AI Health",
        description: "Yapay zeka kullanarak besin değerlerini otomatik takip eden ve kullanıcıya özel diyet planları sunan fitness asistanı.",
        tags: ["Flutter", "Gemini AI", "Dart", "Firebase"],
        link: "https://github.com/mehmetozdmirrr/flutter-ai-macro-tracker"
      },
      {
        title: "NeuroSync",
        category: "AI-Powered ERP",
        description: "Sistem kaynaklarını ve veri akışını izleyen, şirket içi ağlar için tasarlanmış uçtan uca kaynak yönetim sistemi. LLM modelleri ile otomatik raporlama ve öngörü analizleri oluşturur.",
        tags: [".NET 8", "React", "RabbitMQ", "PostgreSQL"]
      },
      {
        title: "OmniStream",
        category: "High-Concurrency FinTech",
        description: "Gerçek zamanlı piyasa verilerini işleyen, milisaniyelik gecikme süreleriyle (low-latency) çalışan dağıtık mimarili finansal takip uygulaması. Ticari gizlilik (NDA) kapsamında geliştirilmiştir.",
        tags: ["Node.js", "Redis", "Socket.io", "Docker"]
      },
      {
        title: "Aura Vision",
        category: "Computer Vision & Mobile",
        description: "Kamera görüntülerinden gerçek zamanlı nesne tanımlama ve analiz yapabilen sistem. Yüksek doğruluklu yapay zeka entegrasyonu ile kapalı beta sürecinde olan gelişmiş bir Flutter ekosistemi.",
        tags: ["Flutter", "Gemini API", "Dart", "Firebase"]
      }
    ]
  },
  en: {
    role: "COMPUTER ENGINEER",
    nameFirstName: "MEHMET",
    nameLastName: "ÖZDEMİR",
    headline: "FULL-STACK ENGINEER & AI ENTHUSIAST",
    heroDesc: "I hold a degree in Computer Engineering from Süleyman Demirel University. I develop end-to-end digital products by coupling scalable backend architectures with fluid user interfaces and modern AI integrations.",
    downloadCV: "VIEW / DOWNLOAD CV",
    aboutTitle: "ABOUT",
    aboutSubtitle: "01 / SYSTEM PROFILE",
    aboutText: "Hi, I'm Mehmet Özdemir. My goal goes beyond just writing code; I strive to transform complex problems into elegant, high-performance, and maintainable systems. I blend strong computer science fundamentals with modern AI tooling to develop edge-to-edge, user-centric digital solutions.",
    aboutHighlight: "A solution-driven engineer capable of taking a project from database architecture to live production; rapidly adapting to innovation and encoding the future today.",
    skillsTitle: "Core Tech",
    workTitle: "Systems",
    workSubtitle: "Featured Works",
    contactTitle: "Contact",
    contactDescTitle: "Get in Touch",
    contactDescText: "Feel free to reach out for new projects, job offers, or just to say hello by filling out the form below or using my direct contact information.",
    contactEmail: "Email",
    contactPhone: "Phone",
    contactLocation: "Location",
    contactLocText: "Turkey",
    formName: "Your Name",
    formEmail: "Email",
    formSubject: "Subject",
    formMessage: "Your Message",
    formSubmit: "Send Message",
    footerText: "© 2026 Mehmet Özdemir / Synchronized for Excellence",
    navAbout: "About",
    navWork: "Systems",
    navContact: "Contact",
    skills: [
      { cat: "AI & LLM", items: ["OpenAI API", "LangChain", "Gemini AI", "Prompt Engineering"], icon: Code2 },
      { cat: "Full-Stack", items: [".NET / C#", "Node.js", "React / Angular", "PostgreSQL"], icon: Database },
      { cat: "Mobile", items: ["Flutter / Dart", "Google Maps", "Firebase", "Real-time"], icon: Smartphone },
      { cat: "Architecture", items: ["Microservices", "Docker", "Redis", "RabbitMQ"], icon: Palette }
    ],
    projects: [
      {
        title: "PawLinker",
        category: "Location Based Mobile",
        description: "A flagship mobile ecosystem developed with Flutter and Firebase, featuring Google Maps integration and scaling with Redis and RabbitMQ.",
        tags: ["Flutter", "Redis", "Docker", "RabbitMQ"],
        link: "https://github.com/mehmetozdmirrr/pawlinker"
      },
      {
        title: "ChatApp",
        category: "AI Communication",
        description: "Real-time messaging system based on .NET Core and Angular, with OpenAI-powered smart chatbot integration.",
        tags: [".NET", "Angular", "OpenAI", "SignalR"],
        link: "https://github.com/mehmetozdmirrr/chatapp"
      },
      {
        title: "Macro Tracker",
        category: "AI Health",
        description: "Fitness assistant using AI to automatically track nutrition and provide personalized diet plans through computer vision.",
        tags: ["Flutter", "Gemini AI", "Dart", "Firebase"],
        link: "https://github.com/mehmetozdmirrr/flutter-ai-macro-tracker"
      },
      {
        title: "NeuroSync",
        category: "AI-Powered ERP",
        description: "End-to-end resource management system designed for internal corporate networks, monitoring system resources and data pipelines. Generates automated reports and predictive analytics via LLM models.",
        tags: [".NET 8", "React", "RabbitMQ", "PostgreSQL"]
      },
      {
        title: "OmniStream",
        category: "High-Concurrency FinTech",
        description: "Distributed financial tracking application processing real-time market data with low-latency constraints. Kept confidential under a strict commercial Non-Disclosure Agreement (NDA).",
        tags: ["Node.js", "Redis", "Socket.io", "Docker"]
      },
      {
        title: "Aura Vision",
        category: "Computer Vision & Mobile",
        description: "Mobile system capable of real-time object detection and analysis from camera feeds. An advanced Flutter ecosystem featuring high-accuracy AI integration, currently in closed beta.",
        tags: ["Flutter", "Gemini API", "Dart", "Firebase"]
      }
    ]
  }
};

function Hero({ t, lang }: { t: any, lang: string }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={container} className="relative h-screen flex flex-col justify-center px-8 md:px-20 lg:px-40">
      <motion.div style={{ y, opacity }} className="relative z-10 w-full space-y-6 md:space-y-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-accent mb-4 block font-black select-none">
            {lang === 'tr' ? 'Merhaba, ben' : 'Hello, I am'} {t.role}
          </span>
          <h1 className="text-[16vw] md:text-[140px] leading-[0.8] font-black uppercase select-none tracking-[-0.05em] hero-title-gradient">
            {t.nameFirstName}<br />
            <span className="text-white/20 italic">{t.nameLastName}</span>
          </h1>
          <div className="mt-4 text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-accent/60 italic">
            // {t.headline}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-12 mt-20"
        >
          <div className="flex flex-col gap-10 max-w-[500px]">
            <p className="text-[15px] md:text-[18px] leading-relaxed text-white/50 font-light border-l border-accent/20 pl-8 relative before:absolute before:left-0 before:top-0 before:h-8 before:w-[2px] before:bg-accent before:-translate-x-[1px]">
              {t.heroDesc}
            </p>
          </div>
          
          <div className="flex gap-16">
             <div className="flex flex-col relative group">
                <span className="text-[10px] uppercase tracking-widest text-accent mb-2 font-bold select-none flex items-center gap-2"><div className="w-1 h-1 bg-accent rounded-full animate-pulse" /> {lang === 'tr' ? 'ANA DİSİPLİN' : 'CORE DISCIPLINE'}</span>
                <span className="text-[28px] md:text-[32px] font-black uppercase leading-none tracking-tighter text-white/80 group-hover:text-white transition-colors">{lang === 'tr' ? 'YAZILIM MİMARİSİ' : 'SOFTWARE ARCHITECTURE'}</span>
             </div>
             <div className="flex flex-col relative group">
                <span className="text-[10px] uppercase tracking-widest text-accent mb-2 font-bold select-none flex items-center gap-2"><div className="w-1 h-1 bg-accent rounded-full animate-pulse" /> {lang === 'tr' ? 'UZMANLIK' : 'EXPERTISE'}</span>
                <span className="text-[28px] md:text-[32px] font-black uppercase leading-none tracking-tighter italic text-white/80 group-hover:text-white transition-colors">Full-Stack & AI</span>
             </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
        className="absolute bottom-40 left-0 w-1/3 h-[1px] bg-accent/20 origin-left"
      />
    </section>
  );
}

function SectionHeading({ title, subtitle, align = "left" }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={cn("mb-20 md:mb-32", align === "center" ? "text-center" : "text-left")}>
      <div className={cn("flex items-center gap-4 mb-4", align === "center" && "justify-center")}>
        <motion.div 
          initial={{ width: 0 }} animate={isInView ? { width: 30 } : {}} className="h-[1px] bg-accent"
        />
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 0.7, x: 0 } : {}}
          className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-accent font-bold"
        >
          {subtitle}
        </motion.p>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "anticipate" }}
        className="text-[10vw] md:text-[8vw] font-black uppercase leading-[0.8] tracking-tighter hero-title-gradient drop-shadow-2xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}

function About({ t }: { t: any }) {
  return (
    <section id="about" className="py-20 md:py-40 px-8 md:px-20 lg:px-40 bg-transparent relative z-10">
      <SectionHeading title={t.aboutTitle} subtitle={t.aboutSubtitle} />
      
      <div className="grid lg:grid-cols-12 gap-12 md:gap-24">
        <div className="lg:col-span-7 space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-[20px] md:text-[28px] font-light leading-[1.6] text-white/80 tracking-wide font-sans">
              {t.aboutText}
            </p>
            
            <SpotlightCard className="p-6 md:p-8 bg-accent/5 border-l-4 border-l-accent border-y border-y-white/5 border-r border-r-white/5 mt-8 shadow-[0_0_30px_rgba(0,240,255,0.05)]">
               <div className="flex gap-4">
                  <div className="text-accent mt-1 animate-pulse"><Code2 size={24} /></div>
                  <p className="text-[16px] md:text-[18px] font-mono text-white/90 leading-relaxed font-bold tracking-tight">
                    <span className="text-accent/50 mr-2">{'>_'}</span>
                    {t.aboutHighlight}
                  </p>
               </div>
            </SpotlightCard>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {t.skills.map((s: any, i: number) => (
               <SpotlightCard key={i} className="p-8 group cursor-default">
                 <s.icon className="w-8 h-8 text-white/30 group-hover:text-accent group-hover:-translate-y-1 transition-all duration-300 relative z-10 mb-6" />
                 <h4 className="text-xs uppercase tracking-[0.3em] text-white/90 mb-6 font-bold relative z-10">{s.cat}</h4>
                 <ul className="space-y-3 relative z-10">
                    {s.items.map((item: string) => (
                      <li key={item} className="text-[15px] font-light tracking-tight text-white/50 group-hover:text-white/80 transition-colors">
                        {item}
                      </li>
                    ))}
                 </ul>
               </SpotlightCard>
             ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative space-y-12 h-fit md:sticky md:top-32">
           <SpotlightCard className="aspect-[4/5] p-2 overflow-hidden group">
              <img 
                src="https://github.com/mehmetozdmirrr.png?size=1000" 
                className="w-full h-full object-cover grayscale opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 rounded-2xl" 
                alt="Mehmet Özdemir Profile" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000";
                }}
              />
           </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

function Resume({ t }: { t: any }) {
  return (
    <section id="resume" className="py-20 md:py-40 px-8 md:px-20 lg:px-40 relative z-10 bg-[#020205]">
      <SectionHeading title={t.resumeTitle} subtitle={t.resumeSubtitle} />
      
      <div className="grid md:grid-cols-12 gap-12 mt-20 md:mt-32">
        <div className="md:col-span-12 lg:col-span-10 lg:col-start-2 relative">
          <div className="absolute left-[20px] md:left-[27px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent/50 via-white/10 to-transparent" />
          
          <div className="space-y-16 md:space-y-24">
            {t.timeline.map((item: any, i: number) => (
              <div key={i} className="relative pl-16 md:pl-24 group">
                <div className="absolute left-0 top-0 w-[42px] h-[42px] md:w-[56px] md:h-[56px] rounded-full bg-[#020205] border border-white/5 flex items-center justify-center group-hover:border-accent/40 shadow-2xl transition-colors duration-500 z-10">
                   <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-accent group-hover:scale-150 transition-all duration-700 shadow-[0_0_10px_rgba(0,240,255,0)] group-hover:shadow-[0_0_20px_rgba(0,240,255,1)]" />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                >
                  <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-[10px] uppercase tracking-[0.3em] font-black text-accent bg-accent/5 border border-accent/20 rounded-full glass backdrop-blur-sm">
                    {item.year}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 group-hover:text-white text-white/90 transition-colors duration-500 shadow-sm leading-none drop-shadow-lg">
                    {item.role}
                  </h3>
                  <h4 className="text-sm md:text-[16px] text-white/50 font-bold tracking-widest uppercase mb-6 flex items-center gap-4 italic select-none">
                     <span className="w-4 md:w-8 h-[1px] bg-white/20 inline-block" /> {item.company}
                  </h4>
                  <p className="text-white/40 font-light leading-relaxed max-w-3xl text-sm md:text-lg group-hover:text-white/70 transition-colors">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Work({ t }: { t: any }) {
  const images = [
    "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800", // PawLinker (Network/Map)
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800", // ChatApp (AI/Chat)
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",  // Macro Tracker (Health/Data Dashboard)
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800", // NeuroSync (Data Earth)
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800", // OmniStream (Servers)
    "https://images.unsplash.com/photo-1620712948343-0056158a2d1d?auto=format&fit=crop&q=80&w=800"  // Aura Vision (Lens)
  ];

  return (
    <section id="work" className="py-20 md:py-40 bg-transparent relative z-10 overflow-hidden">
      <div className="px-8 md:px-20 lg:px-40">
        <SectionHeading title={t.workTitle} subtitle={t.workSubtitle} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-20 lg:px-40 pb-20">
        {t.projects.map((project: any, i: number) => (
          <SpotlightCard
            key={i} 
            className={cn(
              "group relative h-[500px] md:h-[600px] cursor-none",
              (i === 2 || i === 5) && "md:col-span-2 md:h-[600px]"
            )}
          >
            <div className="absolute inset-0 grayscale contrast-125 opacity-30 group-hover:opacity-50 group-hover:grayscale-[20%] transition-all duration-1000 bg-[#020205]">
               <img src={images[i]} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 mix-blend-lighten" alt={project.title} />
            </div>
            
            {/* Gradient overlay for perfect contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-1000" />
            
               <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
               {project.link && (
                 <div className="absolute top-8 right-8">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 hover:bg-white hover:text-black hover:border-transparent backdrop-blur-md">
                       <ArrowUpRight className="w-5 h-5" />
                    </a>
                 </div>
               )}

               <div className="space-y-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-accent block font-bold">{project.category}</span>
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed font-light max-w-xl group-hover:text-white/80 transition-colors">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-4">
                     {project.tags.map((tag: string) => (
                       <span key={tag} className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-white/10 rounded-full text-white/60 bg-white/5 group-hover:text-white group-hover:border-white/20 transition-all">
                         {tag}
                       </span>
                     ))}
                  </div>
               </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

function Contact({ t }: { t: any }) {
  return (
    <section id="contact" className="py-20 md:py-40 relative z-20 px-8 md:px-20 lg:px-40 bg-[#020205]">
      <div className="flex flex-col items-center mb-20 text-center">
         <h2 className="text-[10vw] md:text-[6vw] font-black uppercase hero-title-gradient drop-shadow-2xl mb-4 leading-none">{t.contactTitle}</h2>
         <div className="w-16 h-1 bg-accent rounded-full mt-4" />
      </div>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 w-full max-w-7xl mx-auto items-start pt-10">
        
        {/* Left Side: Contact Info */}
        <div className="space-y-12">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-white">{t.contactDescTitle}</h3>
            <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
              {t.contactDescText}
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group cursor-pointer">
              <Mail className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="font-bold text-sm tracking-widest text-white">{t.contactEmail}</h4>
                <a href="mailto:ozdemrr.mehmet@gmail.com" className="text-white/60 text-sm group-hover:text-accent transition-colors block mt-1">ozdemrr.mehmet@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-center gap-6 group cursor-pointer">
              <Phone className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="font-bold text-sm tracking-widest text-white">{t.contactPhone}</h4>
                <a href="tel:+905533890382" className="text-white/60 text-sm group-hover:text-accent transition-colors block mt-1">+90 553 389 03 82</a>
              </div>
            </div>
            
            <div className="flex items-center gap-6 group">
              <MapPin className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="font-bold text-sm tracking-widest text-white">{t.contactLocation}</h4>
                <p className="text-white/60 text-sm mt-1">{t.contactLocText}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <a href="https://github.com/mehmetozdmirrr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass bg-white/5 flex items-center justify-center hover:bg-accent hover:text-[#020205] transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/mehmet-%C3%B6zdemir-685340299" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass bg-white/5 flex items-center justify-center hover:bg-accent hover:text-[#020205] transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Download CV Button Integration */}
          <div className="pt-6">
             <a 
               href="/Mehmet_Ozdemir_CV.pdf" 
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center gap-4 px-6 py-3 md:px-8 md:py-4 glass bg-white/5 hover:bg-accent transition-all duration-500 group border border-white/5 hover:border-accent shadow-2xl relative overflow-hidden"
             >
                <div className="absolute inset-0 bg-accent/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] group-hover:text-[#020205] transition-colors relative z-10">CV'Yİ GÖRÜNTÜLE / İNDİR</span>
                <Download className="w-5 h-5 text-accent group-hover:text-[#020205] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500 relative z-10" />
             </a>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <SpotlightCard className="p-8 md:p-10 shadow-2xl relative overflow-hidden text-left bg-transparent border-white/5">
          <form 
            className="space-y-6 relative z-10" 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name');
              const email = formData.get('email');
              const subject = formData.get('subject');
              const message = formData.get('message');
              window.location.href = `mailto:ozdemrr.mehmet@gmail.com?subject=${subject}&body=Gönderen: ${name} (${email})%0D%0A%0D%0A${message}`;
            }}
          >
            <div className="space-y-2">
               <label className="text-[10px] tracking-[0.2em] font-bold text-white/50 uppercase">{t.formName}</label>
               <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-accent/50 focus:bg-white/10 transition-all duration-300 text-white text-sm" />
            </div>
            
            <div className="space-y-2">
               <label className="text-[10px] tracking-[0.2em] font-bold text-white/50 uppercase">{t.formEmail}</label>
               <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-accent/50 focus:bg-white/10 transition-all duration-300 text-white text-sm" />
            </div>
            
            <div className="space-y-2">
               <label className="text-[10px] tracking-[0.2em] font-bold text-white/50 uppercase">{t.formSubject}</label>
               <input name="subject" required type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-accent/50 focus:bg-white/10 transition-all duration-300 text-white text-sm" />
            </div>
            
            <div className="space-y-2">
               <label className="text-[10px] tracking-[0.2em] font-bold text-white/50 uppercase">{t.formMessage}</label>
               <textarea name="message" required rows={4} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-accent/50 focus:bg-white/10 transition-all duration-300 text-white text-sm resize-none"></textarea>
            </div>
            
            <button type="submit" className="w-full bg-transparent border border-white/10 text-white/80 font-bold py-4 rounded-xl hover:bg-accent hover:text-[#020205] hover:border-transparent transition-all duration-500 mt-4 uppercase tracking-[0.2em] text-[10px]">
              {t.formSubmit}
            </button>
          </form>
        </SpotlightCard>
        
      </div>
      
      {/* Footer minimal info */}
      <div className="mt-40 border-t border-white/5 pt-10 flex flex-col items-center">
         <p className="text-[10px] opacity-40 uppercase tracking-[0.5em] font-black italic">{t.footerText}</p>
      </div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>('tr');
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative bg-[#020205] selection:bg-accent selection:text-black">
      <div className="noise" />
      <div className="bg-glow left-1/4 -translate-x-1/2 top-1/4 -translate-y-1/2" />
      <div className="bg-glow bottom-0 right-0 opacity-40" />
      <div className="bg-accent-glow" />
      <div className="grid-overlay" />
      <div className="scan-line" />
      
      <Scene />
      <CustomCursor />
      
      {/* Dynamic Header */}
      <div className={cn(
        "fixed top-0 left-0 w-full z-[100] px-8 py-8 md:px-20 transition-all duration-700 font-black",
        scrolled ? "bg-[#020205]/80 backdrop-blur-xl py-4" : "bg-transparent"
      )}>
         <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-3 cursor-pointer group">
               <div className="w-2 h-2 rounded-full bg-accent animate-pulse group-hover:shadow-[0_0_15px_rgba(0,240,255,0.8)] transition-all duration-300" />
               <span className="text-xs font-mono uppercase tracking-[0.4em] font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                 M<span className="text-accent">_</span>ÖZDEMİR
               </span>
            </div>
            
            <div className="flex items-center gap-8">
               <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                  <a href="#about" className="hover:text-accent">{t.navAbout}</a>
                  <a href="#work" className="hover:text-accent">{t.navWork}</a>
                  <a href="#contact" className="hover:text-accent">{t.navContact}</a>
               </div>
               
               <div className="flex items-center gap-4 glass px-6 py-2 rounded-full border-accent/20">
                  <button onClick={() => setLang('tr')} className={cn("text-[10px] font-black tracking-widest transition-all", lang === 'tr' ? "text-accent" : "text-white/20 hover:text-white/60")}>TR</button>
                  <span className="text-white/10">|</span>
                  <button onClick={() => setLang('en')} className={cn("text-[10px] font-black tracking-widest transition-all", lang === 'en' ? "text-accent" : "text-white/20 hover:text-white/60")}>EN</button>
               </div>
            </div>
         </div>
      </div>
      
      <div className="relative z-10">
        <Hero t={t} lang={lang} />
        <About t={t} />
        <Work t={t} />
        <Contact t={t} />
      </div>

      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 group cursor-none pointer-events-none italic opacity-40">
        <div className="flex flex-col text-right">
          <span className="text-[8px] uppercase tracking-[0.3em] font-black">SYSTEM_PROTOCOL</span>
          <span className="text-[10px] uppercase tracking-widest text-accent font-black">SYNCHRONIZED_READY</span>
        </div>
        <div className="w-12 h-12 rounded-full glass border-accent/20 flex items-center justify-center">
           <div className="w-1 h-1 rounded-full bg-accent animate-ping" />
        </div>
      </div>
    </main>
  );
}
