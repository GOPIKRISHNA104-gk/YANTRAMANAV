import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import AchievementsExperience from './components/AchievementsExperience';
import ProjectsExperience from './components/ProjectsExperience';

// Custom Cinematic Styles & Keyframes
const cinematicStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

  .font-inter {
    font-family: 'Inter', sans-serif;
  }

  /* Core Cinematic Night Background - Very subtle deep blue/grey to black */
  .cinematic-bg {
    background: radial-gradient(circle at center, #0f131a 0%, #000000 60%, #000000 100%);
  }

  /* Soft Flash Effect (realistic power-on, not blinding) */
  @keyframes soft-flash {
    0% { opacity: 0; background-color: #ffffff; }
    10% { opacity: 0.5; }
    15% { opacity: 0.1; }
    20% { opacity: 0.3; }
    25% { opacity: 0; }
    100% { opacity: 0; }
  }
  .animate-flash {
    animation: soft-flash 0.6s ease-out forwards;
    mix-blend-mode: overlay;
  }

  /* Logo Animation (0.8 to 1 scale, very subtle rotation, NO glow) */
  @keyframes logo-reveal {
    0% { 
      transform: scale(0.8) rotate(-5deg); 
      opacity: 0; 
      filter: blur(4px); 
    }
    100% { 
      transform: scale(1) rotate(0deg); 
      opacity: 1; 
      filter: blur(0px); 
    }
  }
  .animate-logo {
    animation: logo-reveal 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  /* Letter by Letter Typewriter Animation (Clean, NO glow) */
  @keyframes type-letter {
    0% { 
      opacity: 0; 
      transform: translateY(12px); 
      filter: blur(3px); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0); 
      filter: blur(0); 
    }
  }
  .letter-anim {
    display: inline-block;
    opacity: 0; /* Starts hidden */
    color: #e5e5e5;
    animation: type-letter 0.5s ease-out forwards;
  }

  /* Subtle Scanner Line */
  @keyframes scan-line {
    0% { transform: translateY(-100vh); opacity: 0; }
    10% { opacity: 0.1; }
    50% { opacity: 0.15; }
    90% { opacity: 0.1; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
  .animate-scan {
    animation: scan-line 6s linear infinite;
    background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.15), transparent);
  }
`;

// Space / Dust Particle Background Component (Realistic dust, no glow)
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Init Particles (Floating dust, low opacity)
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.3,
        speedX: (Math.random() - 0.5) * 0.15, // Very slow horizontal drift
        speedY: (Math.random() - 0.5) * 0.15 - 0.05, // Very slow slight upward/downward drift
        opacity: Math.random() * 0.25, // Low max opacity
        pulseSpeed: Math.random() * 0.005 + 0.002
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around screen
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        p.opacity += p.pulseSpeed;
        if (p.opacity > 0.25 || p.opacity < 0) p.pulseSpeed *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Soft white/grey color, NO glow or shadow
        ctx.fillStyle = `rgba(220, 220, 220, ${Math.max(0, p.opacity)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />;
};

const JoinUsModal = ({ onClose }) => {
  const [formState, setFormState] = useState('filling');
  const [titleText, setTitleText] = useState("");
  const fullTitle = "Join Yantramanav";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullTitle.length) {
        setTitleText(fullTitle.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-[fadeIn_0.5s_ease-out]"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#050505]/90 backdrop-blur-2xl border border-[#00FFAA]/40 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 shadow-[0_0_60px_rgba(0,255,170,0.15)] animate-[scaleZoom_0.5s_cubic-bezier(0.2,1,0.3,1)] overflow-y-auto no-scrollbar">

        <style dangerouslySetInnerHTML={{
          __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        <div className="absolute inset-0 pointer-events-none opacity-30 fixed">
          <ParticleBackground />
        </div>

        {formState === 'success' ? (
          <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center animate-[fadeIn_0.8s_ease-out]">
            <div className="w-24 h-24 rounded-full bg-[#00FFAA]/10 border border-[#00FFAA]/50 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(0,255,170,0.4)] animate-[successPulse_2s_ease-in-out_infinite]">
              <svg className="w-12 h-12 text-[#00FFAA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="font-orbitron font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00FFAA] mb-4">
              Welcome to Yantramanav 🚀
            </h3>
            <p className="font-inter text-[#a0a0a0] text-lg">
              Our team will reach out to you soon.
            </p>
            <button
              onClick={onClose}
              className="mt-10 font-exo text-sm uppercase tracking-widest px-10 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Return Home
            </button>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col">
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFAA] to-[#00D9FF] mb-2 min-h-[40px]">
              {titleText}<span className="animate-pulse">_</span>
            </h2>
            <p className="font-inter text-[#a0a0a0] text-sm md:text-base mb-8 pt-2">
              Be a part of innovation, robotics, AI, and real-world problem solving.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="flex flex-col gap-1.5 focus-within:text-[#00FFAA] group">
                  <label className="font-exo text-xs uppercase tracking-widest text-[#cccccc] group-focus-within:text-[#00FFAA] pl-1 transition-colors">Full Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-inter placeholder-white/20 focus:outline-none focus:border-[#00FFAA]/60 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(0,255,170,0.2)] transition-all duration-300" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-1.5 focus-within:text-[#00FFAA] group">
                  <label className="font-exo text-xs uppercase tracking-widest text-[#cccccc] group-focus-within:text-[#00FFAA] pl-1 transition-colors">Email ID</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-inter placeholder-white/20 focus:outline-none focus:border-[#00FFAA]/60 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(0,255,170,0.2)] transition-all duration-300" placeholder="john@example.com" />
                </div>
                <div className="flex flex-col gap-1.5 focus-within:text-[#00FFAA] group">
                  <label className="font-exo text-xs uppercase tracking-widest text-[#cccccc] group-focus-within:text-[#00FFAA] pl-1 transition-colors">Phone Number</label>
                  <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-inter placeholder-white/20 focus:outline-none focus:border-[#00FFAA]/60 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(0,255,170,0.2)] transition-all duration-300" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="flex flex-col gap-1.5 focus-within:text-[#00FFAA] group">
                  <label className="font-exo text-xs uppercase tracking-widest text-[#cccccc] group-focus-within:text-[#00FFAA] pl-1 transition-colors">Department / Year</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-inter placeholder-white/20 focus:outline-none focus:border-[#00FFAA]/60 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(0,255,170,0.2)] transition-all duration-300" placeholder="CSE / 2nd Year" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 focus-within:text-[#00FFAA] group">
                <label className="font-exo text-xs uppercase tracking-widest text-[#cccccc] group-focus-within:text-[#00FFAA] pl-1 transition-colors">Area of Interest</label>
                <select required defaultValue="" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-inter focus:outline-none focus:border-[#00FFAA]/60 focus:bg-black focus:shadow-[0_0_15px_rgba(0,255,170,0.2)] transition-all duration-300">
                  <option value="" disabled>Select an area</option>
                  <option value="Drones">Drones</option>
                  <option value="Robotics">Robotics</option>
                  <option value="AI / ML">AI / ML</option>
                  <option value="IOT">IoT</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 focus-within:text-[#00FFAA] group">
                <label className="font-exo text-xs uppercase tracking-widest text-[#cccccc] group-focus-within:text-[#00FFAA] pl-1 transition-colors">Why do you want to join?</label>
                <textarea required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-inter placeholder-white/20 focus:outline-none focus:border-[#00FFAA]/60 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(0,255,170,0.2)] transition-all duration-300 resize-none" placeholder="Tell us about your passion..."></textarea>
              </div>

              <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full md:w-auto font-exo text-sm uppercase tracking-widest px-8 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full md:w-auto font-exo text-[13px] md:text-sm uppercase tracking-widest px-8 md:px-10 py-3 rounded-xl border border-[#00FFAA]/40 bg-[#00FFAA]/10 text-[#00FFAA] shadow-[0_0_20px_rgba(0,255,170,0.15)] hover:bg-[#00FFAA]/20 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(0,255,170,0.4)] transition-all duration-300 flex items-center justify-center font-semibold"
                >
                  {formState === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-[#00FFAA]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Processing...
                    </span>
                  ) : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState('black'); // 'black' -> 'flash' -> 'logo' -> 'text'

  const word = "YANTRAMANAV".split('');
  const logoUrl = "https://image2url.com/r2/default/images/1775380993207-3f99cbb1-e11c-472d-86ee-ae7ff98032ec.png";

  useEffect(() => {
    // Stage 1: Initial Black Screen -> Soft Flash Effect
    const flashTimer = setTimeout(() => {
      setPhase('flash');
    }, 300);

    // Stage 2: Reveal Logo smoothly after flash
    const logoTimer = setTimeout(() => {
      setPhase('logo');
    }, 800);

    // Stage 3: Elegant Typewriter Text Reveal
    const textTimer = setTimeout(() => {
      setPhase('text');
    }, 1500);

    // Stage 4: Fade out and transition to main app
    const finishTimer = setTimeout(() => {
      setPhase('fadeout');
      setTimeout(onComplete, 1000); // 1 second fade out before unmounting
    }, 4500);

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <>
      <style>{cinematicStyles}</style>

      {/* Main Container */}
      <div className={`fixed inset-0 z-[100] w-screen h-screen overflow-hidden bg-black flex flex-col items-center justify-center font-inter transition-opacity duration-1000 ${phase === 'fadeout' ? 'opacity-0' : 'opacity-100'}`}>

        {/* Subtle Film Grain Noise Overlay (Maintains cinematic realism) */}
        <div
          className="absolute inset-0 z-40 pointer-events-none opacity-[0.08] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* Background & Dust Particles */}
        {(phase === 'logo' || phase === 'text' || phase === 'fadeout') && (
          <div className="absolute inset-0 z-0 cinematic-bg transition-opacity duration-1000 opacity-100">
            <ParticleBackground />
          </div>
        )}

        {/* The Soft Power-on Flash Overlay */}
        {phase === 'flash' && (
          <div className="absolute inset-0 z-50 animate-flash pointer-events-none" />
        )}

        {/* Scanning Light Line Effect (Very Subtle) */}
        {(phase === 'logo' || phase === 'text' || phase === 'fadeout') && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <div className="w-full h-[1px] animate-scan" />
          </div>
        )}

        {/* Main Interface */}
        <div className="relative z-20 flex flex-col items-center justify-center space-y-12">

          {/* Logo Section */}
          {(phase === 'logo' || phase === 'text' || phase === 'fadeout') && (
            <div className="relative flex justify-center items-center">
              <img
                src={logoUrl}
                alt="YANTRAMANAV Core"
                className="w-32 h-32 md:w-48 md:h-48 object-contain animate-logo opacity-90"
              />
            </div>
          )}

          {/* Cinematic Typing Text Section */}
          <div className="h-20 flex items-center justify-center overflow-visible">
            {(phase === 'text' || phase === 'fadeout') && (
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-[0.35em] md:tracking-[0.5em] ml-2 md:ml-6 flex text-[#e5e5e5]">
                {word.map((letter, index) => (
                  <span
                    key={index}
                    className="letter-anim"
                    style={{ animationDelay: `${index * 0.12}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
            )}
          </div>

        </div>

        {/* Dark Cinematic Vignette */}
        <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.95)_100%)]" />
      </div>
    </>
  );
}

const ProjectCount = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = 20;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div ref={ref} className="mt-8 inline-flex items-center space-x-6 px-8 py-5 rounded-[24px] bg-white/[0.04] border border-white/10 transition-all duration-500 hover:bg-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:scale-[1.02]">
      <span className="font-inter text-4xl md:text-5xl font-bold text-white tracking-tight">{count}+</span>
      <span className="font-inter text-sm md:text-base text-white/70 uppercase tracking-widest leading-relaxed font-medium">Projects<br />Completed</span>
    </div>
  );
};

export default function App() {
  const [showMainApp, setShowMainApp] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dashVisible, setDashVisible] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const dashboardRef = useRef(null);

  // Trigger animations after initial mount
  useEffect(() => {
    if (showMainApp) {
      setMounted(true);

      // Observer for dashboard scroll animation
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setDashVisible(true);
        }
      }, { threshold: 0.15 });

      if (dashboardRef.current) {
        observer.observe(dashboardRef.current);
      }

      return () => observer.disconnect();
    }
  }, [showMainApp]);

  const navLinks = ['HOME', 'PROJECTS', 'ACHIEVEMENTS', 'TEAM', 'CONTACT'];

  return (
    <>
      {!showMainApp && <CinematicIntro onComplete={() => setShowMainApp(true)} />}

      {/* Main Website Structure - Hidden completely or faded in when ready */}
      {showMainApp && (
        <div className={`min-h-screen bg-[#050505] text-white font-sans relative overflow-x-hidden selection:bg-white/20 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          {/* Inject custom fonts and animations */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600&family=Orbitron:wght@500;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
            
            html {
              scroll-behavior: smooth;
            }
            body {
              overflow-x: hidden;
            }

            .font-exo { font-family: 'Exo 2', sans-serif; }
            .font-orbitron { font-family: 'Orbitron', sans-serif; }
            .font-inter { font-family: 'Inter', sans-serif; }

            /* Blueprint Grid Background */
            .bg-grid-pattern {
              background-size: 60px 60px;
              background-image: 
                linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
              mask-image: radial-gradient(ellipse at center, black 40%, transparent 100%);
              -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 100%);
            }

            /* Subtle Noise Overlay */
            .bg-noise {
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
            }

            /* Animations */
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-12px); }
              100% { transform: translateY(0px); }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }

            @keyframes pulse-glow {
              0%, 100% { opacity: 0.15; transform: scale(1) translate(-50%, -50%); }
              50% { opacity: 0.25; transform: scale(1.05) translate(-48%, -48%); }
            }
            .animate-pulse-glow {
              animation: pulse-glow 5s ease-in-out infinite;
            }

            .text-glow-fx {
              text-shadow: 0 0 15px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.1);
            }

            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleZoom {
              from { opacity: 0; transform: scale(0.95) translateY(10px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes successPulse {
              0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(0,255,170,0.4); border-color: rgba(0,255,170,0.5); }
              50% { transform: scale(1.05); box-shadow: 0 0 60px rgba(0,255,170,0.7); border-color: rgba(0,255,170,1); }
            }
          `}} />

          {/* Global Background Elements */}
          <div className="fixed inset-0 bg-grid-pattern pointer-events-none"></div>
          <div className="fixed inset-0 bg-noise pointer-events-none mix-blend-overlay"></div>

          {/* Top Navbar */}
          <nav className={`relative z-50 w-full px-6 py-6 md:px-12 flex items-center justify-between transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>

            {/* Left: Logo */}
            <div className="flex-shrink-0 cursor-pointer group">
              <img
                src="https://image2url.com/r2/default/images/1775380993207-3f99cbb1-e11c-472d-86ee-ae7ff98032ec.png"
                alt="Yantramanav Logo"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="font-exo text-[13px] uppercase tracking-[0.2em] text-[#a0a0a0] hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  onClick={(e) => {
                    if (link === 'ACHIEVEMENTS') { e.preventDefault(); setShowAchievements(true); }
                    else if (link === 'PROJECTS') { e.preventDefault(); setShowProjects(true); }
                  }}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Right: Join Us Button (Desktop) */}
            <div className="hidden lg:block">
              <button
                onClick={() => setShowJoinModal(true)}
                className="font-exo text-sm uppercase tracking-widest px-8 py-2.5 rounded-[20px] border border-white/20 bg-transparent text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] relative overflow-hidden group"
              >
                <span className="relative z-10">Join Us</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white/70 hover:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </nav>

          {/* Mobile Dropdown Menu */}
          <div className={`fixed top-[80px] right-0 h-[calc(100vh-80px)] w-[85%] max-w-[320px] bg-black/95 backdrop-blur-xl border-l border-white/10 flex flex-col items-center justify-start pt-12 space-y-8 overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.2,1,0.3,1)] z-40 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className="font-exo text-sm uppercase tracking-[0.2em] text-[#a0a0a0] hover:text-white transition-colors"
                onClick={(e) => { 
                  if (link === 'ACHIEVEMENTS') { e.preventDefault(); setShowAchievements(true); }
                  else if (link === 'PROJECTS') { e.preventDefault(); setShowProjects(true); }
                  setIsMobileMenuOpen(false); 
                }}
              >
                {link}
              </a>
            ))}
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setShowJoinModal(true); }}
              className="mt-4 font-exo text-[14px] uppercase tracking-widest px-[20px] py-[10px] w-auto rounded-[20px] border border-white/20 text-white hover:bg-white hover:text-black"
            >
              Join Us
            </button>
          </div>

          {/* Main Hero Section */}
          <main className="relative w-full h-[calc(100vh-100px)] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">

            {/* Central Visual Container */}
            <div className={`relative flex flex-col items-center justify-center w-full max-w-[1000px] mx-auto transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

              {/* Background Glows & HUD Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none top-[-10%]">

                {/* Core Intense Backlight */}
                <div className="absolute top-[45%] left-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-white rounded-full blur-[100px] md:blur-[130px] animate-pulse-glow origin-center"></div>

                {/* Faint HUD Circular Grid/Outline */}
                <svg className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[700px] opacity-[0.07]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.2" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.1" strokeDasharray="1 1" />
                  <circle cx="50" cy="50" r="32" fill="none" stroke="white" strokeWidth="0.3" strokeDasharray="4 8" />
                  {/* Crosshairs */}
                  <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.1" strokeDasharray="2 4" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.1" strokeDasharray="2 4" />
                </svg>
              </div>

              {/* Robot Image */}
              <div className="relative z-10 w-full flex justify-center items-center mt-[-10vh] md:mt-[-5vh]">
                <img 
                  src="https://image2url.com/r2/default/images/1775380931624-5d783315-40b4-406f-a280-8702d511a2e9.png" 
                  alt="Yantramanav Robot Head" 
                  className="w-[80%] max-w-[500px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-float m-auto"
                />
              </div>

              {/* Title Text */}
              <div className="relative z-20 mt-[-5%] md:mt-[-8%] w-full overflow-hidden text-center px-4">
                <h1 
                  className="font-orbitron font-bold text-white uppercase text-glow-fx break-words mx-auto tracking-[2px] md:tracking-[0.3em]"
                  style={{ fontSize: 'clamp(28px, 8vw, 120px)' }}
                >
                  Yantramanav
                </h1>
              </div>

            </div>
          </main>

          {/* Dashboard Section */}
          <section 
            id="dashboard"
            ref={dashboardRef}
            className={`relative z-20 w-full max-w-[1200px] mx-auto p-[20px] md:px-6 my-[10px] md:my-0 pb-24 md:pb-48 flex flex-col space-y-16 md:space-y-36 transition-all duration-1000 ${dashVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
          >
            {/* 1. ABOUT SECTION */}
            <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-20 items-center justify-between">
              {/* Left Side */}
              <div className="flex-1 w-full space-y-8 z-10">
                <h2 className="font-inter font-semibold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">About Yantramanav</h2>
                <div className="space-y-6 text-[#a0a0a0]">
                  <p className="font-inter leading-relaxed text-lg md:text-xl font-light max-w-2xl">
                    Yantramanav is a student-driven innovation and entrepreneurship society based at Prathyusha Engineering College. We focus on building impactful technology solutions and fostering innovation among students.
                  </p>
                  <p className="font-inter leading-relaxed text-lg md:text-xl font-light max-w-2xl">
                    We have successfully completed 20+ real-world projects across drones, robotics, agriculture, and AI systems.
                  </p>
                </div>
                <ProjectCount />
              </div>

              {/* Right Side */}
              <div className="w-full lg:w-[48%] relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group transition-transform duration-700 ease-out hover:scale-[1.02] border border-white/5 z-10">
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>
                <img
                  src="https://image2url.com/r2/default/images/1775392947511-fbe6f154-5324-49b5-ba58-f13a50e652ae.png"
                  alt="Yantramanav About"
                  className="w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
                />
              </div>
            </div>

            {/* 2. OUR COLLABORATIONS */}
            <div className="w-full flex flex-col items-center">

              {/* College Branding */}
              <div className="group flex flex-col items-center justify-center mb-20 md:mb-28 transition-all duration-700 hover:scale-[1.02]">
                <img
                  src="https://image2url.com/r2/default/images/1775393988163-ea4ad843-310d-4617-a605-5099cdf0e434.png"
                  alt="Prathyusha Engineering College"
                  className="h-[75px] md:h-[95px] w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] mb-5"
                />
                <span className="font-inter text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-[0.35em] group-hover:text-white/80 transition-colors duration-500 text-center px-4">
                  Powered by Prathyusha Engineering College
                </span>
              </div>

              <h3 className="font-inter font-medium text-lg md:text-xl text-white/70 uppercase tracking-[0.3em] mb-12 text-center">Our Collaborations</h3>
              <div className="w-full max-w-[1050px] rounded-[40px] md:rounded-[100px] bg-white p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-700">
                <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 lg:gap-32">
                  <img src="https://image2url.com/r2/default/images/1775391659889-d636d802-e78c-44e0-82e5-c06b0bf93fe0.png" alt="SAE India" className="h-[60px] md:h-[90px] w-auto opacity-90 hover:opacity-100 transition-all duration-500 hover:scale-[1.12] hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]" />
                  <img src="https://image2url.com/r2/default/images/1775391501299-d78d3414-f3fc-4f41-8999-5337506a54b4.png" alt="AICTE IDEA Lab" className="h-[75px] md:h-[110px] w-auto opacity-90 hover:opacity-100 transition-all duration-500 hover:scale-[1.12] hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]" />
                  <img src="https://image2url.com/r2/default/images/1775391906352-1b0a1848-d3a7-4560-9805-f59111b764d1.png" alt="PALS" className="h-[50px] md:h-[75px] w-auto opacity-90 hover:opacity-100 transition-all duration-500 hover:scale-[1.12] hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]" />
                </div>
              </div>
            </div>

            {/* 3. OUR WORK & 4. OUR COMMUNITY */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32">

              {/* OUR WORK */}
              <div className="flex flex-col space-y-6 md:space-y-8 bg-gradient-to-br from-white/[0.03] to-transparent p-10 md:p-12 rounded-[32px] border border-white/5 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.05]">
                <h3 className="font-inter font-semibold text-3xl md:text-4xl text-white tracking-tight">Our Work</h3>
                <div className="w-16 h-1 bg-white/30 rounded-full"></div>
                <p className="font-inter text-[#a0a0a0] leading-relaxed text-lg font-light">
                  We have successfully completed 20+ projects across multiple domains. Our work focuses on real-world impact, innovation, and practical solutions.
                </p>
              </div>

              {/* OUR COMMUNITY */}
              <div className="flex flex-col space-y-6 md:space-y-8 bg-gradient-to-bl from-white/[0.03] to-transparent p-10 md:p-12 rounded-[32px] border border-white/5 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.05]">
                <h3 className="font-inter font-semibold text-3xl md:text-4xl text-white tracking-tight">Our Community</h3>
                <div className="w-16 h-1 bg-white/30 rounded-full"></div>
                <p className="font-inter text-[#a0a0a0] leading-relaxed text-lg font-light">
                  Yantramanav has a strong and growing community of students, alumni, and mentors who support innovation, collaboration, and project development.
                </p>
              </div>

            </div>

          </section>

          {/* Footer / Contact Section */}
          <footer
            id="contact"
            className={`relative z-40 w-full py-12 flex flex-col items-center justify-center space-y-8 border-t border-white/5 bg-[#050505]/80 backdrop-blur-xl transition-all duration-1000 ${dashVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/yantramanav_._"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-[#a0a0a0] hover:text-[#00FFAA] transition-all duration-300 group hover:drop-shadow-[0_0_15px_rgba(0,255,170,0.5)]"
              >
                <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-[#00FFAA]/10 border border-transparent group-hover:border-[#00FFAA]/30 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                <span className="font-inter text-sm md:text-base font-medium tracking-wide">@yantramanav</span>
              </a>

              {/* Email */}
              <a
                href="mailto:support@yantramanav.co.in"
                className="flex items-center space-x-3 text-[#a0a0a0] hover:text-[#00D9FF] transition-all duration-300 group hover:drop-shadow-[0_0_15px_rgba(0,217,255,0.5)]"
              >
                <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-[#00D9FF]/10 border border-transparent group-hover:border-[#00D9FF]/30 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <span className="font-inter text-sm md:text-base font-medium tracking-wide">support@yantramanav.co.in</span>
              </a>
            </div>

            <div className="font-exo text-[10px] md:text-xs text-white/30 uppercase tracking-[0.3em] text-center px-6">
              © 2026 Yantramanav. All Rights Reserved.
            </div>
          </footer>

          {/* Bottom Fade Gradient for depth */}
          <div className="fixed bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-30"></div>

          {/* Overlays */}
          {showAchievements && <AchievementsExperience onClose={() => setShowAchievements(false)} />}
          {showProjects && <ProjectsExperience onClose={() => setShowProjects(false)} />}
          {showJoinModal && <JoinUsModal onClose={() => setShowJoinModal(false)} />}
        </div>
      )}
    </>
  );
}
