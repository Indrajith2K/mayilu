import { useState } from "react";
import { motion } from "framer-motion";

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.95,
  }),
};

export default function QuestionCard({
  question,
  value,
  onChange,
  onNext,
  onSkip,
  direction,
  isOptional,
}) {
  const [localText, setLocalText] = useState(value ?? "");

  const handleTextSubmit = () => {
    if (localText.trim() === "" && !isOptional) return;
    onChange(localText.trim() || null);
    onNext(localText.trim() || null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleTextSubmit();
  };

  const handleBoolean = (val) => {
    onChange(val);
    onNext(val);
  };

  return (
    <motion.div
      key={question.id}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full"
    >
      <div
        className="rounded-3xl px-6 py-8 mx-4"
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 8px 32px rgba(244,114,182,0.13), 0 1.5px 8px rgba(192,132,252,0.1)",
          border: "1.5px solid rgba(244,114,182,0.18)",
        }}
      >
        {/* Optional badge */}
        {isOptional && (
          <span className="inline-block mb-3 text-xs font-700 px-3 py-1 rounded-full bg-fuchsia-50 text-fuchsia-400 border border-fuchsia-200">
            Optional ✨
          </span>
        )}

        {/* Question text */}
        <p
          className="text-gray-700 text-lg font-800 leading-snug mb-7"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {question.question}
        </p>

        {/* TEXT INPUT */}
        {question.type === "text" && (
          <div className="flex flex-col gap-4">
            <input
              id={`input-${question.id}`}
              type="text"
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer…"
              autoComplete="off"
              className="input-glow w-full h-12 rounded-2xl border-2 border-pink-200 bg-white/60 px-4 text-base text-gray-700 placeholder-pink-300 font-600 transition-all focus:border-fuchsia-300"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            />
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={handleTextSubmit}
                disabled={!localText.trim() && !isOptional}
                className="flex-1 h-12 rounded-2xl font-800 text-base text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, #f472b6 0%, #c084fc 100%)",
                  boxShadow: "0 4px 15px rgba(244,114,182,0.35)",
                }}
              >
                Next →
              </motion.button>
              {isOptional && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={onSkip}
                  className="h-12 px-5 rounded-2xl font-700 text-sm text-fuchsia-400 border-2 border-fuchsia-200 bg-fuchsia-50 transition-all hover:bg-fuchsia-100"
                >
                  Skip
                </motion.button>
              )}
            </div>
          </div>
        )}

        {/* BOOLEAN INPUT */}
        {question.type === "boolean" && (
          <div className="flex gap-4">
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleBoolean(true)}
              className="flex-1 h-14 rounded-2xl font-800 text-base text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #34d399 0%, #059669 100%)",
                boxShadow: "0 4px 15px rgba(52,211,153,0.35)",
              }}
            >
              Yes! 💚
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleBoolean(false)}
              className="flex-1 h-14 rounded-2xl font-800 text-base text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #f87171 0%, #dc2626 100%)",
                boxShadow: "0 4px 15px rgba(248,113,113,0.35)",
              }}
            >
              Nope 🙈
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
