import { useState } from "react";
import { motion } from "framer-motion";

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.96 }),
};

export default function QuestionCard({
  question,
  value,
  onChange,
  onNext,
  onSkip,
  direction,
  isOptional,
  questionIndex = 0,
}) {
  const [localText, setLocalText] = useState(value ?? "");

  const tilt = questionIndex % 2 === 0 ? "-1.2deg" : "0.8deg";

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
        className="tape-top mx-4 px-6 py-8"
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderRadius: "26px",
          border: "2px solid rgba(240,82,125,0.14)",
          boxShadow:
            "0 4px 0 rgba(240,82,125,0.08), 0 12px 40px rgba(240,82,125,0.1)",
          transform: `rotate(${tilt})`,
        }}
      >
        {/* Optional badge */}
        {isOptional && (
          <span
            className="font-hand inline-block mb-3 text-base px-3 py-0.5 rounded-full"
            style={{
              background: "#fff0f9",
              border: "1.5px dashed rgba(240,82,125,0.35)",
              color: "#f0527d",
              transform: "rotate(-1deg)",
              display: "inline-block",
            }}
          >
            optional ✨
          </span>
        )}

        {/* Question text in handwriting font */}
        <p
          className="font-hand text-2xl leading-snug mb-7"
          style={{ color: "#333" }}
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
              placeholder="write here..."
              autoComplete="off"
              className="input-human"
            />
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.03 }}
                onClick={handleTextSubmit}
                disabled={!localText.trim() && !isOptional}
                className="font-hand flex-1 text-xl text-white rounded-2xl transition-all disabled:opacity-35"
                style={{
                  height: "50px",
                  background: "linear-gradient(135deg, #f0527d 0%, #c084fc 100%)",
                  boxShadow: "0 4px 0 rgba(240,82,125,0.3), 0 6px 16px rgba(240,82,125,0.2)",
                  letterSpacing: "0.02em",
                }}
              >
                next →
              </motion.button>
              {isOptional && (
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={onSkip}
                  className="font-hand text-lg px-5 rounded-2xl transition-all"
                  style={{
                    height: "50px",
                    background: "#fff0f9",
                    border: "1.5px dashed rgba(240,82,125,0.35)",
                    color: "#f0527d",
                  }}
                >
                  skip
                </motion.button>
              )}
            </div>
          </div>
        )}

        {/* BOOLEAN INPUT */}
        {question.type === "boolean" && (
          <div className="flex gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.06, rotate: "-2deg" }}
              onClick={() => handleBoolean(true)}
              className="font-hand flex-1 text-xl text-white rounded-2xl"
              style={{
                height: "58px",
                background: "linear-gradient(135deg, #4ade80 0%, #16a34a 100%)",
                boxShadow: "0 4px 0 rgba(22,163,74,0.3), 0 6px 16px rgba(74,222,128,0.2)",
              }}
            >
              yes!! 💚
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.06, rotate: "2deg" }}
              onClick={() => handleBoolean(false)}
              className="font-hand flex-1 text-xl text-white rounded-2xl"
              style={{
                height: "58px",
                background: "linear-gradient(135deg, #fb7185 0%, #e11d48 100%)",
                boxShadow: "0 4px 0 rgba(225,29,72,0.3), 0 6px 16px rgba(251,113,133,0.2)",
              }}
            >
              nope 🙈
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
