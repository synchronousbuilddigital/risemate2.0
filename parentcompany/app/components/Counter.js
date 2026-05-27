"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

export default function Counter({ value, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        const hasDecimal = value.toString().includes(".");
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: hasDecimal ? 1 : 0,
          maximumFractionDigits: hasDecimal ? 1 : 0,
        }).format(latest);
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
}
