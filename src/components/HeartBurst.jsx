import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HEART_COLORS = ["#f472b6", "#fb7185", "#e879f9", "#f9a8d4", "#fca5a1"];

export default function HeartBurst({ trigger }) {
  const [hearts, setHearts] = useState([]);
  const counterRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    const newHearts = Array.from({ length: 7 }, (_, i) => ({
      id: `${counterRef.current++}-${i}`,
      x: Math.random() * 60 - 30,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      size: 14 + Math.random() * 14,
      delay: i * 0.06,
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    const t = setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((n) => n.id === h.id)));
    }, 1600);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: 0, x: `calc(50% + ${h.x}px)`, scale: 1 }}
            animate={{ opacity: 0, y: -120, scale: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: h.delay, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: "38%",
              fontSize: h.size,
              color: h.color,
            }}
          >
            ♥
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
