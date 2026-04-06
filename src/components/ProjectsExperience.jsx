import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const projectData = {
  Drones: [
    {
      title: "Spray Drone",
      desc: "Advanced agricultural drone designed for precision spraying of fertilizers and pesticides. It ensures uniform coverage, reduces chemical usage, and improves farming efficiency.",
      tag: "DRONE",
      image: "https://image2url.com/r2/default/images/1775440190249-0200873e-f908-4abb-8a4e-7288dc8261f7.png",
      overview: {
        problem: "Traditional farming methods result in uneven pesticide spraying, excessive chemical usage, and high labor dependency.",
        solution: "The Spray Drone is designed to automate agricultural spraying using precision-controlled flight systems. It ensures uniform distribution of fertilizers and pesticides across crops using intelligent spraying mechanisms.",
        impact: [
          "Reduces chemical wastage",
          "Improves crop yield",
          "Saves time and labor",
          "Enables smart and sustainable farming"
        ]
      },
      features: ["Precision spraying technology", "Uniform crop coverage", "Reduced chemical wastage", "Smart farming integration"],
      tech: ["ArduPilot", "Raspberry Pi", "Carbon Fiber Frame"]
    },
    {
      title: "Delivery Drone",
      desc: "Autonomous drone built for intelligent payload delivery across urban and rural areas with high accuracy and reliability.",
      tag: "DRONE",
      image: "https://image2url.com/r2/default/images/1775438999434-1f0231ea-88dd-4d2c-ba8f-45309275d35c.png",
      overview: {
        problem: "Delivery in remote or congested areas is slow, inefficient, and often inaccessible.",
        solution: "The Delivery Drone provides an autonomous aerial logistics system capable of transporting goods quickly and accurately across distances.",
        impact: [
          "Faster delivery times",
          "Access to remote areas",
          "Useful in medical emergencies",
          "Scalable logistics solution"
        ]
      },
      features: ["Autonomous navigation", "Payload delivery system", "Real-time tracking", "Medical & logistics support"],
      tech: ["Pixhawk", "GPS RTK", "Computer Vision"]
    },
    {
      title: "Scout Drone",
      desc: "High-performance surveillance drone designed for terrain mapping, monitoring, and real-time reconnaissance.",
      tag: "DRONE",
      image: "https://image2url.com/r2/default/images/1775438903778-71658b9d-d594-493e-9701-72cc0951f26d.png",
      overview: {
        problem: "Manual monitoring and terrain analysis are time-consuming and lack real-time data.",
        solution: "The Scout Drone enables real-time surveillance and mapping using high-resolution imaging and intelligent monitoring systems.",
        impact: [
          "Improved decision making",
          "Real-time monitoring",
          "Enhanced security and analysis",
          "Efficient terrain mapping"
        ]
      },
      features: ["Real-time surveillance", "Terrain mapping", "AI-based monitoring", "High-resolution imaging"],
      tech: ["LiDAR", "ROS", "Python"]
    },
    {
      title: "Fixed Wing Drone",
      desc: "Long-range aerial monitoring and endurance-based applications.",
      tag: "DRONE",
      image: "https://image2url.com/r2/default/images/1775447525734-30c786db-d65a-4a05-902b-ff63be9cbfaa.png",
      overview: {
        problem: "In aerial surveillance and long-range missions, traditional multi-rotor drones have limited flight time and range, making them inefficient for endurance-based applications.",
        solution: "The Fixed Wing Drone was developed by the Yantramanav team for the SAE Drone Development Challenge (DDC). Built using lightweight balsa wood, the drone is designed for long-endurance flight, aerodynamic efficiency, and stability over extended distances.\n\nThe structure ensures minimal weight while maintaining strength, enabling better lift and longer flight duration compared to conventional drones.",
        impact: [
          "Increased flight endurance",
          "Efficient long-range surveillance",
          "Lightweight and cost-effective design",
          "Successfully developed for SAE DDC competition"
        ],
        highlights: [
          "SAE DDC Project",
          "Built with Balsa Wood",
          "Long Endurance Drone"
        ]
      },
      features: ["Long range flight", "High speed monitoring", "Large payload"],
      tech: ["VTOL Tech", "Telemetry", "OpenCV"]
    }
  ],
  Robotics: [
    {
      title: "Unmanned Water Cleaning Vehicle",
      desc: "Automated autonomous surface vehicle designed to combat water pollution through AI vision and sustainable energy.",
      tag: "ROBOTICS",
      image: "https://image2url.com/r2/default/images/1775450662605-5c2744bc-b158-4f06-a193-0b3bd25a6d8c.png",
      overview: {
        problem: "Water bodies such as lakes and rivers are increasingly polluted with floating waste, affecting aquatic life and human health. Traditional cleaning methods rely heavily on manual labor, making them inefficient, unsafe, and not scalable.",
        solution: "The Unmanned Surface Vehicle (USV) is an autonomous system designed to detect, collect, and remove floating waste from water surfaces. Built with a stable catamaran structure, the system operates with minimal human intervention and is capable of continuous environmental cleaning.\n\nIt integrates AI-based vision and navigation systems to identify garbage and efficiently clean water bodies in both urban and rural environments.\n\nSYSTEM WORKFLOW:\n• Detects floating garbage using AI vision\n• Plans optimal route using path planning algorithm\n• Navigates autonomously across water\n• Collects waste using motorized scooping mechanism\n• Transfers waste into onboard storage",
        impact: [
          "Reduces water pollution",
          "Protects aquatic ecosystems",
          "Minimizes human effort",
          "Cost-effective solution",
          "Enables sustainable management"
        ],
        highlights: [
          "YOLOv11 AI Vision",
          "Solar Hybrid Power",
          "Automated Docking",
          "A* Path Planning"
        ]
      },
      features: ["Autonomous operation", "Modular catamaran design", "Obstacle avoidance", "Remote control capability"],
      tech: ["Raspberry Pi", "APM Flight Controller", "Ultrasonic Sensors", "Li-Po Batteries"]
    }
  ],
  Applications: [
    {
      title: "Uzhavan AI",
      desc: "Smart AI-based farming assistant.",
      tag: "APP",
      image: "https://image2url.com/r2/default/images/1775450826002-1a03e686-41d5-4c0a-ab9d-a509ca601db9.png",
      overview: {
        problem: "Farmers often struggle with unpredictable weather, pest attacks, soil conditions, and lack of data-driven insights, leading to reduced yield and losses.",
        solution: "Uzhavan AI provides a digital assistant that analyzes crop health, weather patterns, and soil data to guide farmers with actionable recommendations.\n\nKEY FEATURES:\n• AI-based crop disease detection\n• Smart irrigation recommendations\n• Weather prediction insights\n• Soil health analysis\n• Fertilizer optimization guidance",
        impact: [
          "Increased crop yield",
          "Reduced farming risks",
          "Data-driven agriculture",
          "Supports sustainable farming"
        ],
        highlights: [
          "AI",
          "Agriculture",
          "Smart Farming",
          "Sustainability"
        ]
      },
      features: ["AI-based crop disease detection", "Smart irrigation recommendations", "Weather prediction insights", "Soil health analysis", "Fertilizer optimization guidance"],
      tech: ["Machine Learning models", "Computer Vision for crop analysis", "Cloud-based data processing", "Mobile/Web interface"]
    },
    {
      title: "Uzhavan Bazaar",
      desc: "Digital marketplace for farmers.",
      tag: "APP",
      image: "https://image2url.com/r2/default/images/1775450922606-e8895f37-7de7-4558-9f6d-e42df4912fd9.png",
      overview: {
        problem: "Farmers often face low profits due to middlemen, lack of market access, and price manipulation.",
        solution: "Uzhavan Bazaar provides a transparent marketplace where farmers can directly list and sell their products to consumers and businesses.\n\nKEY FEATURES:\n• Direct farmer-to-buyer connection\n• Real-time pricing system\n• Product listing and inventory management\n• Order tracking system\n• Secure digital transactions",
        impact: [
          "Increased farmer income",
          "Transparent pricing",
          "Market accessibility",
          "Digital transformation in agriculture"
        ],
        highlights: [
          "E-Commerce",
          "Agriculture",
          "Marketplace",
          "Digital India"
        ]
      },
      features: ["Direct farmer-to-buyer connection", "Real-time pricing system", "Product listing and inventory management", "Order tracking system", "Secure digital transactions"],
      tech: ["Full-stack web/mobile application", "Secure payment integration", "Cloud-based backend", "Database-driven product system"]
    }
  ]
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animation: `float ${Math.random() * 5 + 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

export default function ProjectsExperience({ onClose }) {
  const [activeTab, setActiveTab] = useState('Drones');
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Trigger entrance animation
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setIsLoaded(true), 100);

    // Keydown escape
    const escListener = (e) => {
      if (e.key === 'Escape') {
        if (selectedProject) setSelectedProject(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', escListener);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', escListener);
    };
  }, [onClose, selectedProject]);

  return (
    <div
      className={`fixed inset-0 z-[100] w-full h-full bg-[#050505] text-white flex flex-col font-sans transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none mix-blend-overlay opacity-30"></div>
      <div className="absolute inset-0 bg-noise pointer-events-none mix-blend-overlay opacity-10"></div>
      <ParticleBackground />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-50 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
      >
        <X size={28} />
      </button>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full overflow-y-auto px-6 py-16 md:px-12 md:py-20 no-scrollbar">
        <div className="max-w-[1200px] mx-auto flex flex-col space-y-16">

          {/* Header */}
          <div className="flex flex-col items-center justify-center text-center space-y-4 pt-10">
            <h1 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFAA] to-[#00D9FF] tracking-tight text-glow-fx drop-shadow-[0_0_25px_rgba(0,255,170,0.4)]">
              Projects of Yantramanav
            </h1>
            <p className="font-inter text-[#a0a0a0] leading-relaxed text-lg md:text-xl font-light max-w-3xl">
              Innovating across multiple domains to solve real-world problems
            </p>
          </div>

          {/* Categories Tab */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {Object.keys(projectData).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`font-exo text-sm md:text-base uppercase tracking-widest px-8 py-3 rounded-full border transition-all duration-300 ${activeTab === category
                  ? 'border-[#00FFAA] bg-[#00FFAA]/10 text-white shadow-[0_0_20px_rgba(0,255,170,0.3)] scale-105'
                  : 'border-white/20 text-[#a0a0a0] hover:border-[#00D9FF]/50 hover:text-white hover:bg-[#00D9FF]/5 hover:scale-105'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24 transition-opacity duration-300">
            {projectData[activeTab].map((project, index) => (
              <div
                key={`${project.title}-${index}`}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer flex flex-col justify-between space-y-6 bg-white/[0.02] p-8 rounded-[24px] border border-white/5 backdrop-blur-md transition-all duration-500 hover:scale-[1.03] hover:border-[#00D9FF]/40 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(0,217,255,0.15)] overflow-hidden"
                style={{
                  animation: isLoaded ? `fade-slide-up 0.6s ease-out ${index * 0.15}s forwards` : 'none',
                  opacity: 0,
                  transform: 'translateY(30px)'
                }}
              >
                {/* Light reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Glowing accent line top */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FFAA]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col space-y-4">
                  <span className="font-exo text-xs uppercase tracking-widest text-[#00FFAA] font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00FFAA] animate-pulse"></span>
                    {project.tag}
                  </span>
                  <h3 className="font-inter font-semibold text-2xl text-white group-hover:text-[#00D9FF] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-inter text-[#a0a0a0] font-light leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Many More Card */}
            <div
              className="group relative flex flex-col justify-center items-center space-y-4 bg-transparent p-8 rounded-[24px] border border-dashed border-white/20 transition-all duration-500 hover:scale-[1.03] hover:border-[#00FFAA]/50 hover:bg-white/[0.02]"
              style={{
                animation: isLoaded ? `fade-slide-up 0.6s ease-out ${(projectData[activeTab].length) * 0.15}s forwards` : 'none',
                opacity: 0,
                transform: 'translateY(30px)'
              }}
            >
              <h3 className="font-inter font-medium text-xl text-[#a0a0a0] group-hover:text-white transition-colors duration-300">
                Many More...
              </h3>
              <p className="font-inter text-sm text-[#a0a0a0]/60 text-center">
                Discover our full repository of innovations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Project Detail Page */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] bg-[#050505] overflow-y-auto overflow-x-hidden no-scrollbar transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] animate-[fade-zoom-in_0.6s_ease-out] text-white">
          <div className="absolute inset-0 bg-grid-pattern pointer-events-none mix-blend-overlay opacity-30 fixed animate-[bg-pan_30s_linear_infinite]"></div>
          <div className="absolute inset-0 bg-noise pointer-events-none mix-blend-overlay opacity-10 fixed"></div>
          <div className="fixed inset-0 pointer-events-none">
            <ParticleBackground />
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            className="fixed top-6 left-6 md:top-8 md:left-8 z-[210] flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#00FFAA]/50 transition-all font-exo text-xs md:text-sm tracking-widest group backdrop-blur-md hover:shadow-[0_0_20px_rgba(0,255,170,0.2)]"
          >
            <X size={18} className="group-hover:text-[#00FFAA] transition-colors" /> RETURN TO PROJECTS
          </button>

          <div className="relative z-10 w-full min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 2xl:px-24">

            <div className="flex flex-col-reverse lg:flex-row min-h-[80vh] items-center gap-12 lg:gap-16 pt-24 pb-20 max-w-[1400px] mx-auto w-full">

              {/* LEFT SIDE (60%) */}
              <div className="w-full lg:w-[60%] flex flex-col justify-center space-y-12 pr-0 lg:pr-8">

                {/* Title & Tag */}
                <div className="space-y-4" style={{ animation: 'fade-slide-up 0.8s ease-out 0.2s forwards', opacity: 0 }}>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#00FFAA] animate-pulse"></span>
                    <span className="font-exo text-sm uppercase tracking-[0.3em] text-[#00FFAA] leading-none mt-1">{selectedProject.tag}</span>
                  </div>
                  <h1 className="font-orbitron font-bold text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFAA] to-[#00D9FF] tracking-tight drop-shadow-[0_0_30px_rgba(0,255,170,0.3)] pb-2 leading-tight">
                    {selectedProject.title}
                  </h1>
                </div>

                {/* Main Content: Overview */}
                <div className="space-y-8" style={{ animation: 'fade-slide-up 0.8s ease-out 0.4s forwards', opacity: 0 }}>
                  <h2 className="font-orbitron text-3xl md:text-4xl text-white font-bold border-l-4 border-[#00FFAA] pl-4 inline-block bg-gradient-to-r from-[#00FFAA]/20 to-transparent pr-8 py-1">
                    Project Overview
                  </h2>

                  {selectedProject.overview ? (
                    <div className="space-y-10 font-inter text-[#a0a0a0] text-lg lg:text-xl font-light leading-[1.8] max-w-3xl">
                      {selectedProject.overview.problem && (
                        <div className="space-y-3">
                          <h3 className="text-white font-medium text-xl font-exo tracking-wider uppercase">Problem</h3>
                          <p className="text-[#cccccc]">{selectedProject.overview.problem}</p>
                        </div>
                      )}

                      {selectedProject.overview.solution && (
                        <div className="space-y-3">
                          <h3 className="text-white font-medium text-xl font-exo tracking-wider uppercase">Solution</h3>
                          <p className="text-[#00FFAA]/90 whitespace-pre-wrap">{selectedProject.overview.solution}</p>
                        </div>
                      )}

                      {selectedProject.overview.impact && (
                        <div className="space-y-4">
                          <h3 className="text-white font-medium text-xl font-exo tracking-wider uppercase">Impact</h3>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                            {selectedProject.overview.impact.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-[#00D9FF] shrink-0 mt-1.5">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedProject.overview.highlights && (
                        <div className="pt-4 flex flex-wrap gap-4">
                          {selectedProject.overview.highlights.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="px-4 py-2 bg-white/[0.03] border border-[#00FFAA]/30 text-[#00FFAA] rounded-full font-exo text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,170,0.15)] hover:bg-[#00FFAA]/10 hover:shadow-[0_0_25px_rgba(0,255,170,0.3)] transition-all duration-300 backdrop-blur-md"
                              style={{ animation: `fade-zoom-in 0.5s ease-out ${0.6 + idx * 0.1}s forwards`, opacity: 0 }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="font-inter text-[#a0a0a0] text-lg lg:text-xl font-light leading-[1.8] max-w-3xl">
                      {selectedProject.desc}
                    </p>
                  )}
                </div>

              </div>

              {/* RIGHT SIDE (40%) */}
              <div className="w-full lg:w-[40%] flex items-center justify-center relative perspective-[1500px] mt-10 lg:mt-0" style={{ animation: 'fade-zoom-in 1s ease-out 0.6s forwards', opacity: 0 }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-br from-[#00FFAA]/20 to-[#00D9FF]/20 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-[3/4] rounded-[40px] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-2xl group transition-all duration-700 ease-out hover:rotate-[1deg] hover:rotate-x-[5deg] hover:rotate-y-[-8deg] hover:scale-[1.05] hover:border-[#00FFAA]/40 hover:shadow-[0_0_80px_rgba(0,255,170,0.2)] shadow-2xl flex items-center justify-center transform-style-3d">

                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent mix-blend-overlay"></div>

                  {selectedProject.image ? (
                    <div className="w-full h-full relative flex items-center justify-center" style={{ transformStyle: 'preserve-3d', animation: 'float 8s ease-in-out infinite' }}>
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-[85%] h-[85%] object-contain p-4 md:p-8 transform group-hover:scale-[1.12] group-hover:translate-z-[40px] transition-transform duration-1000 relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        style={{ filter: 'drop-shadow(0 0 30px rgba(0,255,170,0.3))' }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center opacity-30 space-y-4 relative z-10">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      <p className="font-exo tracking-widest text-sm">3D MODEL UNAVAILABLE</p>
                    </div>
                  )}

                  <div className="absolute inset-0 z-20 pointer-events-none rounded-[40px] shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fade-slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-zoom-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        @keyframes bg-pan {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .animate-scanline {
          animation: scanline 3s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}} />
    </div>
  );
}
