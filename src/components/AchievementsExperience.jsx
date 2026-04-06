import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* ════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════ */
const achievements = [
  {
    title: "The Beginning", year: "2018", badge: "🌟",
    shortStory: "The journey of Yantramanav began with a vision — a group of passionate engineering students at Prathyusha Engineering College united to build something extraordinary.",
    detailExplanation: "What started as a spark of innovation grew into a movement that would redefine student entrepreneurship. The foundations were laid with late-night brainstorming sessions and endless determination to create technology that matters."
  },
  {
    title: "Smart India Hackathon 2019", year: "2019", badge: "🥇",
    shortStory: "Yantramanav made its mark on the national stage, emerging as winners at the prestigious Smart India Hackathon.",
    detailExplanation: "Competing against thousands of teams across India, our team delivered an innovative solution that captivated the judges. This was our first major validation that our ideas could compete at a national level."
  },
  {
    title: "Flipkart GRID – Winner", year: "2020", badge: "🏆",
    shortStory: "Our team conquered the Flipkart GRID challenge, one of India's most competitive e-commerce tech competitions.",
    detailExplanation: "This victory showcased our ability to solve real-world industry problems with cutting-edge technology, pushing the boundaries of e-commerce robotics and AI integrations."
  },
  {
    title: "Smart India Hackathon 2020", year: "2020", badge: "🎯",
    shortStory: "Continuing our legacy, Yantramanav participated with renewed vigor and innovative ideas.",
    detailExplanation: "We further established our presence in India's largest hackathon platform, gaining immense experience and networking with top talents and mentors across the nation."
  },
  {
    title: "Smart India Hackathon 2022", year: "2022", badge: "🚀",
    shortStory: "Victory once again! Yantramanav returned to SIH stronger than ever and clinched another remarkable win.",
    detailExplanation: "Proving that our innovation culture produces consistent excellence year after year. The project involved deep tech integrations and hardware-software synergism."
  },
  {
    title: "PALS ACDC", year: "2023", badge: "⚡",
    shortStory: "Yantramanav participated in the prestigious PALS ACDC (Pan IIT Alumni Leadership Series).",
    detailExplanation: "Gaining valuable exposure to industry-level challenges and mentorship from IIT alumni networks. The experience helped refine our leadership and technical roadmaps."
  },
  {
    title: "SAE DDC – Runner-up", year: "2024", badge: "🥈",
    shortStory: "At the SAE Design & Development Challenge, Yantramanav secured the prestigious Runner-Up position.",
    detailExplanation: "Demonstrating our engineering excellence in mechanical design innovation, aerokit modeling, and precision robotics under strict constraints."
  },
  {
    title: "PALS 2026 – Appreciation", year: "2026", badge: "🏅",
    shortStory: "Yantramanav received the Best Appreciation Award at PALS 2026.",
    detailExplanation: "Recognizing our outstanding contributions to innovation, entrepreneurship, and continuous student-driven development over the years."
  },
  {
    title: "NIDAR – Top 10 Team", year: "2026", badge: "🔥",
    shortStory: "Among 450+ competing teams, Yantramanav secured a position in the elite Top 10 at NIDAR.",
    detailExplanation: "Demonstrating our ability to compete at the highest levels of technological innovation with our advanced robotics architecture."
  },
];

const TOTAL_PAGES = 5; // 5 spreads to cover 9 items + cover/end

/* ════════════════════════════════════════════════════════════
   BACKGROUND
   ════════════════════════════════════════════════════════════ */

function MinimalBackground() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} color="#ffffff" castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} color="#f0f0f0" />
      {/* Matte dark background plane behind the book */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE COMPONENTS
   ════════════════════════════════════════════════════════════ */

const pageStyle = {
  position: 'absolute', inset: 0,
  background: '#fafafa',
  color: '#222',
  display: 'flex', flexDirection: 'column', 
  padding: '10% 12%',
  fontFamily: "'Inter', sans-serif",
  overflow: 'hidden',
  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.02)'
};

function CoverFront() {
  return (
    <div style={{ ...pageStyle, justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', borderRight: '1px solid #ddd' }}>
      <div style={{ width: 1, height: 60, background: '#ccc', marginBottom: 20 }} />
      <h1 className="cover-title-anim" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 600, color: '#111', letterSpacing: '0.05em', marginBottom: 16, textAlign: 'center' }}>
        The Journey of<br />Yantramanav
      </h1>
      <p className="cover-subtitle-anim" style={{ color: '#666', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.6 }}>
        A Story of Innovation, Growth<br />& Achievements
      </p>
      <div style={{ width: 1, height: 60, background: '#ccc', marginTop: 20 }} />
    </div>
  );
}

function CoverBack() {
  return (
    <div style={{ ...pageStyle, justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', borderLeft: '1px solid #ddd' }}>
      <div style={{ padding: 30, border: '1px solid #e0e0e0', borderRadius: 4 }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#444', fontStyle: 'italic', textAlign: 'center' }}>
          Explore the milestones that defined our legacy.
        </p>
      </div>
    </div>
  );
}

function LeftPage({ data, num }) {
  if (!data) return <div style={pageStyle} />;
  return (
    <div style={{ ...pageStyle, borderRight: '1px solid #e8e8e8' }}>
      {/* Page Number */}
      <div style={{ position: 'absolute', top: 24, left: 24, fontSize: '0.75rem', color: '#999', letterSpacing: '0.1em' }}>
        PAGE {num}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: '0.8rem', color: '#666', letterSpacing: '0.2em', marginBottom: 12, fontWeight: 500 }}>
          {data.year}
        </div>
        <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>
          {data.badge}
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 600, color: '#111', lineHeight: 1.2, marginBottom: 20 }}>
          {data.title}
        </h2>
        <div style={{ width: 40, height: 2, background: '#111', marginBottom: 20 }} />
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.8 }}>
          {data.shortStory}
        </p>
      </div>
    </div>
  );
}

function RightPage({ data, num }) {
  if (!data) return <div style={pageStyle} />;
  return (
    <div style={{ ...pageStyle, borderLeft: '1px solid #e8e8e8' }}>
      {/* Page Number */}
      <div style={{ position: 'absolute', top: 24, right: 24, fontSize: '0.75rem', color: '#999', letterSpacing: '0.1em' }}>
        PAGE {num}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 30 }}>
        
        {/* Detailed Explanation */}
        <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.8, marginBottom: 30, fontStyle: 'italic' }}>
          "{data.detailExplanation}"
        </p>

        {/* Image Placeholder */}
        <div style={{ 
          width: '100%', flex: 1, minHeight: 180, maxHeight: 220, 
          background: '#f0f0f0', borderRadius: 4,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          border: '1px dashed #ccc'
        }}>
          <span style={{ fontSize: '1.5rem', color: '#bbb', marginBottom: 8 }}>📷</span>
          <span style={{ fontSize: '0.75rem', color: '#999', letterSpacing: '0.1em' }}>PROJECT VISUAL</span>
        </div>
        
        {/* Caption */}
        <div style={{ fontSize: '0.7rem', color: '#888', textAlign: 'center', marginTop: 12, letterSpacing: '0.05em' }}>
           — Yantramanav Archives
        </div>

      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   CSS HIGHLIGHTS
   ════════════════════════════════════════════════════════════ */
const bookCss = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

  .book-bg-texture {
    background-color: #121212;
    background-image: radial-gradient(circle at center, rgba(30,30,30,0.8) 0%, rgba(10,10,10,1) 100%);
  }

  .bg-grid-pattern {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.3;
    background-size: 60px 60px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 40%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 100%);
    animation: bg-pan 30s linear infinite;
  }
  
  @keyframes bg-pan {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 100%; }
  }

  .cover-title-anim {
    animation: fadeSlideUp 1s ease-out forwards;
  }
  .cover-subtitle-anim {
    opacity: 0;
    animation: fadeSlideUp 1s ease-out 0.4s forwards;
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .page-flip-anim {
    transition: transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  /* Soft book shadow under the pages */
  .book-shadow {
    box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 15px 30px rgba(0,0,0,0.5);
  }

  /* Soft page lighting */
  .page-lighting {
    position: absolute; inset: 0; pointer-events: none; mix-blend-mode: overlay;
    background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.05) 100%);
  }

  .nav-btn {
    width: 50px; height: 50px; border-radius: 50%;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    color: #fff; display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.3s;
  }
  .nav-btn:hover:not(:disabled) {
    background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.3);
  }
  .nav-btn:disabled {
    opacity: 0.3; cursor: default;
  }

  @keyframes pulseRed {
    0% { transform: scale(1); box-shadow: 0 0 15px rgba(255, 0, 0, 0.4); }
    50% { transform: scale(1.05); box-shadow: 0 0 25px rgba(255, 0, 0, 0.7); }
    100% { transform: scale(1); box-shadow: 0 0 15px rgba(255, 0, 0, 0.4); }
  }
  .youtube-btn-pulse {
    animation: pulseRed 2s infinite ease-in-out;
  }
  .youtube-btn-pulse:hover {
    transform: scale(1.1) !important;
    animation: none;
    box-shadow: 0 0 35px rgba(255, 0, 0, 0.9) !important;
  }

  .glass-modal {
    background: rgba(5, 5, 5, 0.85);
    backdrop-filter: blur(20px);
    opacity: 0;
    animation: fadeInModal 0.4s ease-out forwards;
  }
  @keyframes fadeInModal {
    to { opacity: 1; }
  }
  @keyframes modalZoomIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  .modal-zoom {
    animation: modalZoomIn 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }
`;

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */
export default function AchievementsExperience({ onClose }) {
  const [phase, setPhase] = useState(0); 
  const [flippedCount, setFlippedCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scale, setScale] = useState(1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const touchRef = useRef(0);
  
  // Arrange Spreads: Left face (back of prev page) and Right face (front of next page)
  const spreads = useMemo(() => {
    return [
      { front: <CoverFront />, back: <CoverBack /> },
      { front: <LeftPage data={achievements[0]} num={1} />, back: <RightPage data={achievements[0]} num={2} /> },
      { front: <LeftPage data={achievements[1]} num={3} />, back: <RightPage data={achievements[1]} num={4} /> },
      { front: <LeftPage data={achievements[4]} num={5} />, back: <RightPage data={achievements[4]} num={6} /> },
      { front: <LeftPage data={achievements[8]} num={7} />, back: <RightPage data={achievements[8]} num={8} /> },
    ];
  }, []);

  // Mount animation & Responsive scaling
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    document.body.style.overflow = 'hidden';
    
    // Scale calculation to perfectly fit any device (Mobile/Tablet/Desktop)
    function handleResize() {
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const bookW = 1000;
      const bookH = 650;
      
      const paddingW = screenW < 600 ? 0.95 : 0.9;
      const paddingH = screenW < 600 ? 0.7 : 0.75;
      
      const scaleW = (screenW * paddingW) / bookW;
      const scaleH = (screenH * paddingH) / bookH;
      setScale(Math.min(scaleW, scaleH, 1));
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(t1); 
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') flipForward();
      else if (e.key === 'ArrowLeft') flipBackward();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const flipForward = useCallback(() => {
    if (flippedCount >= TOTAL_PAGES - 1 || isAnimating) return;
    setIsAnimating(true);
    setFlippedCount(c => c + 1);
    setTimeout(() => setIsAnimating(false), 900);
  }, [flippedCount, isAnimating]);

  const flipBackward = useCallback(() => {
    if (flippedCount <= 0 || isAnimating) return;
    setIsAnimating(true);
    setFlippedCount(c => c - 1);
    setTimeout(() => setIsAnimating(false), 900);
  }, [flippedCount, isAnimating]);

  const onTouchStart = (e) => { touchRef.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const d = touchRef.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) d > 0 ? flipForward() : flipBackward();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: phase >= 1 ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="book-bg-texture"
      style={{ position: 'fixed', inset: 0, zIndex: 100 }}
    >
      <style dangerouslySetInnerHTML={{ __html: bookCss }} />

      {/* Background Grid */}
      <div className="bg-grid-pattern"></div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        style={{
          position: 'absolute', top: 30, right: 30, zIndex: 60,
          background: 'none', border: 'none', color: '#fff', fontSize: '1rem',
          cursor: 'pointer', fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em',
          opacity: 0.6, transition: 'opacity 0.3s'
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = 1}
        onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
      >
        CLOSE ✕
      </button>

      {/* R3F Canvas for ambient depth & lighting (Optional, using DOM for actual book) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <MinimalBackground />
        </Canvas>
      </div>

      {/* Center Book Container */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
        
        <motion.div
          initial={{ scale: 0.8 * scale, y: 50, rotateX: 10 }}
          animate={{ scale: scale, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ 
             perspective: 2500, width: 1000, height: 600,
             transformOrigin: 'center center'
          }}
        >
          <div className="book-shadow" style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d', borderRadius: 4 }}>
            
            {/* Left Static Base (Back cover area) */}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '50%', height: '100%',
              background: '#f0f0f0', borderRadius: '4px 0 0 4px', zIndex: 0,
              boxShadow: 'inset -20px 0 30px rgba(0,0,0,0.06)'
            }}>
               <CoverBack />
            </div>

            {/* Right Static Base (End area) */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', width: '50%', height: '100%',
              background: '#f0f0f0', borderRadius: '0 4px 4px 0', zIndex: 0,
              boxShadow: 'inset 20px 0 30px rgba(0,0,0,0.06)'
            }}>
               <div style={{...pageStyle, justifyContent: 'center', alignItems: 'center', background: '#f5f5f5'}}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#444', fontStyle: 'italic' }}>
                    The end of one chapter.<br/>The beginning of another.
                  </p>
               </div>
            </div>

            {/* Center Spine */}
            <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 40, height: '100%', zIndex: 5, pointerEvents: 'none',
                background: 'linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.05) 100%)',
            }} />

            {/* Pages Stack (Right Edge Details) */}
            <div style={{ position: 'absolute', top: 4, right: -6, bottom: 4, width: 12, background: 'linear-gradient(to right, #ddd, #fcfcfc, #ccc)', borderRadius: '0 6px 6px 0', zIndex: -1, boxShadow: '4px 4px 15px rgba(0,0,0,0.4)' }} />
            <div style={{ position: 'absolute', top: 4, left: -6, bottom: 4, width: 12, background: 'linear-gradient(to left, #ddd, #fcfcfc, #ccc)', borderRadius: '6px 0 0 6px', zIndex: -1, boxShadow: '-4px 4px 15px rgba(0,0,0,0.4)' }} />

            {/* FLIPPING PAGES */}
            {spreads.map((spread, i) => {
              const isFlipped = i < flippedCount;
              const zIdx = isFlipped ? i + 1 : TOTAL_PAGES - i;
              
              return (
                <div key={i} className="page-flip-anim" style={{
                  position: 'absolute', top: 0, left: '50%', width: '50%', height: '100%',
                  transformOrigin: 'left center', transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                  zIndex: zIdx, cursor: 'pointer'
                }} onClick={() => isFlipped ? flipBackward() : flipForward()}>
                  
                  {/* FRONT (Right Page when unflipped) */}
                  <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                    background: '#fff', borderRadius: '0 4px 4px 0', overflow: 'hidden',
                    boxShadow: 'inset 15px 0 40px rgba(0,0,0,0.04), inset 2px 0 5px rgba(0,0,0,0.02), 5px 5px 15px rgba(0,0,0,0.15)',
                  }}>
                    {/* Shadow from next page bending slightly */}
                    <div style={{
                      position: 'absolute', inset: 0, pointerEvents: 'none',
                      background: 'linear-gradient(90deg, rgba(0,0,0,0.08) 0%, transparent 15%)',
                      opacity: isFlipped ? 0 : 1, transition: 'opacity 0.4s', zIndex: 10
                    }} />
                    <div className="page-lighting" />
                    {spread.front}
                  </div>

                  {/* BACK (Left Page when flipped) */}
                  <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: '#fafafa', borderRadius: '4px 0 0 4px', overflow: 'hidden',
                    boxShadow: 'inset -15px 0 40px rgba(0,0,0,0.04), inset -2px 0 5px rgba(0,0,0,0.02), -5px 5px 15px rgba(0,0,0,0.15)',
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0, pointerEvents: 'none',
                      background: 'linear-gradient(270deg, rgba(0,0,0,0.08) 0%, transparent 15%)',
                      opacity: isFlipped ? 1 : 0, transition: 'opacity 0.4s', zIndex: 10
                    }} />
                    <div className="page-lighting" />
                    {spread.back}
                  </div>

                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Navigation & Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: 40, left: 0, width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, zIndex: 40
        }}
      >
        <button className="nav-btn" onClick={flipBackward} disabled={flippedCount === 0 || isAnimating}>
           ←
        </button>

        {/* Minimal Progress */}
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#999', letterSpacing: '0.2em' }}>
          {flippedCount} / {TOTAL_PAGES - 1}
        </div>

        <button className="nav-btn" onClick={flipForward} disabled={flippedCount === TOTAL_PAGES - 1 || isAnimating}>
           →
        </button>
      </motion.div>

      {/* YouTube Floating Button */}
      {phase >= 1 && (
        <div 
          className="youtube-btn-pulse"
          onClick={() => setIsVideoModalOpen(true)}
          style={{
            position: 'absolute', bottom: 40, right: 40, zIndex: 90,
            width: 60, height: 60, borderRadius: '50%',
            background: 'rgba(20,20,20,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.3s',
            boxShadow: '0 0 15px rgba(255,0,0,0.5)',
            border: '1px solid rgba(255,50,50,0.3)'
          }}
        >
          <img src="https://image2url.com/r2/default/images/1775449429486-424f79c6-847e-4b4d-91e9-edad9a705556.png" alt="Play Video" style={{ width: 28, height: 28, objectFit: 'contain', transform: 'translateX(2px)' }} />
        </div>
      )}

      {/* YouTube Modal */}
      {isVideoModalOpen && (
        <div className="glass-modal" style={{
          position: 'fixed', inset: 0, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <button 
            onClick={() => setIsVideoModalOpen(false)}
            style={{
              position: 'absolute', top: 40, right: 40,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
              color: '#fff', fontSize: '1.2rem', width: 44, height: 44, borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s', zIndex: 210
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            ✕
          </button>
          
          <div className="modal-zoom" style={{
            width: '90%', maxWidth: 1000, aspectRatio: '16/9',
            background: '#000', borderRadius: 24, overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(255,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <iframe 
               width="100%" height="100%" 
               src="https://www.youtube.com/embed/l8ZEZqmC9HE?autoplay=1" 
               title="YouTube video player" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </motion.div>
  );
}
