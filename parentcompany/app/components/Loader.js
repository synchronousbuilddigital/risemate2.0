"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const canvasRef = useRef(null);

  // HTML5 Canvas for Drifting Gold Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 45;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height + height * 0.2, // start slightly lower
        radius: Math.random() * 1.8 + 0.4,
        color: `rgba(201, 168, 76, ${Math.random() * 0.4 + 0.15})`,
        vx: Math.random() * 0.3 - 0.15,
        vy: -(Math.random() * 0.7 + 0.3), // move upward
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#DFBA6B";
        ctx.shadowBlur = isExiting ? 0 : p.radius * 2;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isExiting]);

  // Lock body scroll and run progress counter
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const duration = 900; // 0.9 seconds loader
    const startTime = performance.now();

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(pct));

      if (pct < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        const timer = setTimeout(() => {
          setIsExiting(true);
        }, 150);
        return () => clearTimeout(timer);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = "";
    };
  }, []);

  // Coordinate the door sliding and final unmounting
  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        setIsDone(true);
        if (onComplete) onComplete();
      }, 700); // match door opening duration
      return () => clearTimeout(timer);
    }
  }, [isExiting, onComplete]);

  if (isDone) return null;

  // Calculate dynamic offsets for the four empires merging animation
  const progressRatio = progress / 100;
  const factor = 1 - progressRatio;
  const slideOffset = 25 * factor; // 25px max slide
  const rotAngle = 90 * factor;    // 90deg max rotation

  return (
    <div
      className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center pointer-events-none select-none"
      style={{ perspective: "1500px" }}
    >
      {/* Canvas for Particle Effect */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-1000 ${isExiting ? "opacity-0" : "opacity-100"}`}
      />

      {/* Left Door Panel */}
      <motion.div
        initial={{ x: 0, rotateY: 0, opacity: 1 }}
        animate={isExiting ? { x: "-100%", rotateY: -35, opacity: 0 } : { x: 0, rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#010611] border-r border-[#DFBA6B]/15 flex justify-end pointer-events-auto overflow-hidden"
        style={{
          transformOrigin: "left center",
          background: "radial-gradient(circle at 100% 50%, #08142b 0%, #010611 100%)",
          boxShadow: "30px 0 60px rgba(0,0,0,0.8)"
        }}
      >
        {/* Sleek metallic reflection line */}
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#DFBA6B]/30 to-transparent" />
      </motion.div>

      {/* Right Door Panel */}
      <motion.div
        initial={{ x: 0, rotateY: 0, opacity: 1 }}
        animate={isExiting ? { x: "100%", rotateY: 35, opacity: 0 } : { x: 0, rotateY: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#010611] border-l border-[#DFBA6B]/15 flex justify-start pointer-events-auto overflow-hidden"
        style={{
          transformOrigin: "right center",
          background: "radial-gradient(circle at 0% 50%, #08142b 0%, #010611 100%)",
          boxShadow: "-30px 0 60px rgba(0,0,0,0.8)"
        }}
      >
        {/* Sleek metallic reflection line */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#DFBA6B]/30 to-transparent" />
      </motion.div>

      {/* Vertical Meeting Line (Splits open) */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isExiting ? { opacity: 0, scaleY: 0 } : { scaleY: 1, opacity: 0.8 }}
        transition={{
          scaleY: { duration: 0.8, ease: "easeOut" },
          opacity: isExiting ? { duration: 0.4 } : { duration: 0.5 }
        }}
        className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#DFBA6B] to-transparent z-[2] drop-shadow-[0_0_8px_#DFBA6B]"
      />

      {/* Central Content Box */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(20px)",
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
            className="relative z-[3] flex flex-col items-center justify-center text-center px-4"
          >
            {/* SVG Logo convergence animation */}
            <div className="mb-8 relative w-32 h-32 flex items-center justify-center">
              {/* Golden circular shadow field */}
              <div
                className="absolute inset-2 rounded-full border border-[#DFBA6B]/15 blur-[8px]"
                style={{
                  boxShadow: "0 0 35px rgba(223, 186, 107, 0.12) inset, 0 0 35px rgba(223, 186, 107, 0.12)"
                }}
              />

              {/* Converging outer frame SVG */}
              <svg
                width="110"
                height="110"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 m-auto drop-shadow-[0_0_20px_rgba(223,186,107,0.35)] z-[2]"
              >
                {/* 1. Bworth corner bracket (Top-Left) */}
                <g style={{ transform: `translate(${-slideOffset}px, ${-slideOffset}px) rotate(${-rotAngle}deg)`, transformOrigin: "25px 25px" }}>
                  <path d="M 18 30 V 18 H 30" stroke="#DFBA6B" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* 2. VegaVrudhi corner bracket (Top-Right) */}
                <g style={{ transform: `translate(${slideOffset}px, ${-slideOffset}px) rotate(${rotAngle}deg)`, transformOrigin: "75px 25px" }}>
                  <path d="M 82 30 V 18 H 70" stroke="#DFBA6B" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* 3. RYM corner bracket (Bottom-Left) */}
                <g style={{ transform: `translate(${-slideOffset}px, ${slideOffset}px) rotate(${rotAngle}deg)`, transformOrigin: "25px 75px" }}>
                  <path d="M 18 70 V 82 H 30" stroke="#DFBA6B" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* 4. Synchronous Digital corner bracket (Bottom-Right) */}
                <g style={{ transform: `translate(${slideOffset}px, ${slideOffset}px) rotate(${-rotAngle}deg)`, transformOrigin: "75px 75px" }}>
                  <path d="M 82 70 V 82 H 70" stroke="#DFBA6B" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* Thin outer compass ticks */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#DFBA6B"
                  strokeWidth="0.75"
                  strokeDasharray="2 12"
                  className="opacity-45"
                />
              </svg>

              {/* Central Core: Logo Image - fades and scales in dynamically */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: progressRatio, scale: 0.6 + 0.4 * progressRatio }}
                transition={{ ease: "easeOut" }}
                className="absolute w-12 h-12 z-[3]"
              >
                <Image
                  src="/logo.png"
                  alt="RiseMates Ventures Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                  priority
                  unoptimized
                />
              </motion.div>
            </div>

            {/* Glowing Brand Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-primary tracking-[-0.03em] font-black text-white flex items-center mb-2.5">
              {"RiseMates".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
                >
                  {char}
                </motion.span>
              ))}
              <span
                className="font-light ml-2 flex"
                style={{
                  background: "linear-gradient(135deg, #DFBA6B 30%, #ffecb3 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                {"Ventures".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.32 + index * 0.04, ease: "easeOut" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Tagline with line drawing details */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-[1px] bg-gradient-to-r from-transparent to-[#DFBA6B]/50" />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-[10px] sm:text-xs font-secondary uppercase tracking-[0.3em] text-[#DFBA6B]"
              >
                One Vision. Four Empires.
              </motion.p>
              <div className="w-4 h-[1px] bg-gradient-to-l from-transparent to-[#DFBA6B]/50" />
            </div>

            {/* Premium Loading Progress Bar */}
            <div className="relative w-52 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-3.5">
              <div
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#DFBA6B]/60 via-[#ffeed0] to-[#DFBA6B]/60 transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Numerical Percentage Counter */}
            <div
              className="text-[11px] font-mono tracking-[0.25em] font-medium"
              style={{ color: "rgba(223, 186, 107, 0.85)", textShadow: "0 0 10px rgba(223, 186, 107, 0.4)" }}
            >
              {progress.toString().padStart(3, "0")} %
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
