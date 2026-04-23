import { motion } from "framer-motion";

const VIBES = [
  { min: 0,  emoji: "🌸", label: "Soft & Sweet",      desc: "You're a gentle soul — like morning light and warm tea." },
  { min: 25, emoji: "🌺", label: "Bright & Bubbly",   desc: "Your energy is contagious! You light up every room." },
  { min: 50, emoji: "🦋", label: "Free Spirit",        desc: "You're curious, adventurous and beautifully unpredictable." },
  { min: 75, emoji: "🌙", label: "Mysterious & Cozy",  desc: "Deep thoughts, late nights, and a warm heart — that's you." },
];

function getVibe(answers) {
  const total = Object.keys(answers).length;
  const yesCount = Object.values(answers).filter((v) => v === true).length;
  const pct = total > 0 ? (yesCount / total) * 100 : 0;
  return VIBES.slice().reverse().find((v) => pct >= v.min) || VIBES[0];
}

export default function ResultScreen({ answers, onRestart, onViewResponses }) {
  const vibe = getVibe(answers);

  const highlights = Object.entries(answers)
    .filter(([, v]) => v !== null && v !== false && typeof v === "string")
    .slice(0, 6);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-md mx-auto px-4 pb-12"
    >
      {/* Header */}
      <motion.div variants={item} className="text-center mb-8 pt-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.2 }}
          className="text-7xl mb-3"
        >
          {vibe.emoji}
        </motion.div>
        <h1
          className="text-3xl font-900 mb-1"
          style={{
            fontFamily: "'Pacifico', cursive",
            background: "linear-gradient(135deg, #f472b6, #c084fc, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Mayilu's Vibe 💫
        </h1>
        <p className="text-fuchsia-500 font-700 text-lg">{vibe.label}</p>
      </motion.div>

      {/* Vibe card */}
      <motion.div
        variants={item}
        className="rounded-3xl px-6 py-6 mb-6 text-center"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(244,114,182,0.15)",
          border: "1.5px solid rgba(244,114,182,0.2)",
        }}
      >
        <p className="text-gray-600 text-base font-600 leading-relaxed">
          {vibe.desc}
        </p>
      </motion.div>

      {/* Highlights */}
      {highlights.length > 0 && (
        <motion.div variants={item}>
          <h2 className="text-sm font-800 uppercase tracking-wider text-pink-400 mb-3 px-1">
            💜 Your Favorites
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {highlights.map(([key, val]) => (
              <motion.div
                key={key}
                variants={item}
                className="rounded-2xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(12px)",
                  border: "1.5px solid rgba(244,114,182,0.15)",
                }}
              >
                <p className="text-xs text-pink-400 font-700 uppercase tracking-wide mb-0.5 capitalize">
                  {key.replace(/_/g, " ")}
                </p>
                <p className="text-gray-700 font-800 text-sm truncate">{val}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Thank you note */}
      <motion.div
        variants={item}
        className="rounded-3xl px-6 py-6 mb-8 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(244,114,182,0.12), rgba(192,132,252,0.12))",
          border: "1.5px solid rgba(244,114,182,0.2)",
        }}
      >
        <p className="text-2xl mb-2">🫶</p>
        <p className="text-gray-600 font-600 text-sm leading-relaxed">
          Thank you for answering, Mayilu! This little quiz was made with love,
          just to know you a little better. 💖
        </p>
      </motion.div>

      {/* Restart */}
      <motion.button
        variants={item}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={onRestart}
        className="w-full h-13 rounded-2xl font-800 text-base text-white transition-all"
        style={{
          background: "linear-gradient(135deg, #f472b6 0%, #c084fc 50%, #818cf8 100%)",
          boxShadow: "0 6px 20px rgba(244,114,182,0.4)",
          height: "52px",
        }}
      >
        Do it again! 🔁
      </motion.button>
    </motion.div>
  );
}
