"use client";

import { useState, useEffect } from "react";
import Loader from "./Loader";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function LoaderProvider({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const shouldSkipLoader = pathname?.startsWith("/blog") || pathname?.startsWith("/admin");
    if (shouldSkipLoader) {
      setLoading(false);
    }
    setMounted(true);

    // Session Tracking for live active users analytics
    let sessionId = sessionStorage.getItem("rmv_session_id");
    if (!sessionId) {
      sessionId = "sess_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      sessionStorage.setItem("rmv_session_id", sessionId);
    }

    const reportActivity = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
      } catch (err) {
        console.warn("Failed to update active visitor session:", err);
      }
    };

    // Report immediately and then every 2 minutes
    reportActivity();
    const interval = setInterval(reportActivity, 120000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="opacity-0">
        {children}
      </div>
    );
  }

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
        animate={loading ? { opacity: 0, scale: 0.98, filter: "blur(4px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="w-full min-h-screen origin-center"
      >
        {children}
      </motion.div>
    </>
  );
}
