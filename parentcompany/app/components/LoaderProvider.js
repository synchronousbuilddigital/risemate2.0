"use client";

import { useState, useEffect } from "react";
import Loader from "./Loader";
import { motion } from "framer-motion";

export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
