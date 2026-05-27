"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

export default function Counter({ value, direction = "up" }) {
  const ref = useRef(null);
  // Remove the aggressive -100px margin so it triggers reliably on mobile viewports
  const isInView = useInView(ref, { once: true, margin: "-10px" });

  // Use a mutable ref to store the latest value prop, keeping the hook dependencies stable
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

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
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const hasDecimal = valueRef.current.toString().includes(".");
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: hasDecimal ? 1 : 0,
          maximumFractionDigits: hasDecimal ? 1 : 0,
        }).format(latest);
      }
    });
    return () => unsubscribe();
  }, [springValue]);

  // Render initial value so that it is never blank/empty before it scrolls into view
  const hasDecimal = value.toString().includes(".");
  const formattedInitial = Intl.NumberFormat("en-US", {
    minimumFractionDigits: hasDecimal ? 1 : 0,
    maximumFractionDigits: hasDecimal ? 1 : 0,
  }).format(direction === "down" ? value : 0);

  return <span ref={ref}>{formattedInitial}</span>;
}
