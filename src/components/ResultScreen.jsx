import { motion } from "framer-motion";

const VIBES = [
  { min: 0,  emoji: "🌸", label: "soft & sweet",      desc: "you're gentle, warm, and kind — like morning light and a cup of tea ☕" },
  { min: 25, emoji: "🌺", label: "bright & bubbly",   desc: "your energy is contagious! the kind of person who makes every room better 🌟" },
  { min: 50, emoji: "🦋", label: "free spirit",        desc: "curious, unpredictable, beautifully yourself — i love that about you 🫶" },
  { min: 75, emoji: "🌙", label: "mysterious & cozy",  desc: "deep thinker, late nights, warm heart. a whole vibe honestly 💜" },
];

function getVibe(answers) {
  const total = Object.keys(answers).length;
  const yesCount = Object.values(answers).filter((v) => v === true).length;
  const pct = total > 0 ? (yesCount / total) * 100 : 0;
  return VIBES.slice().reverse().find((v) => pct >= v.min) || VIBES[0];
}

const LABEL_MAP = {
  icecream: "fav ice cream 🍦", drink: "fav drink 🥤", chocolate: "fav chocolate 🍫",
  color: "fav color 🎨", yogurt: "fav yogurt 🍓", egg_follow: "best egg puff 🥚",
  newfood_follow: "last new food 🍜", dreamplace: "dream place 🗺️",
  movie: "fav movie 🎬", song: "fav song 🎵", about1: "thinks about me 🤔",
  about2: "likes about me 💖", about3: "doesn't like 🙈", about4: "should i change 🌱",
};

export default function ResultScreen({ answers, onRestart }) {
  const vibe = getVibe(answers);

  const highlights = Object.entries(answers)
    .filter(([k, v]) => v !== null && v !== false && typeof v === "string" && LABEL_MAP[k])
    .slice(0, 6);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-md mx-auto px-4 pb-14"
    >
      {/* Big vibe emoji */}
      <motion.div variants={item} className="text-center pt-10 mb-6">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
          className="text-8xl mb-4 select-none"
        >
          {vibe.emoji}
        </motion.div>
        <h1
          className="font-hand text-4xl mb-1"
          style={{ color: "#f0527d" }}
        >
          you're done! 🎉
        </h1>
        <p className="font-hand text-2xl" style={{ color: "#9b68e8" }}>
          vibe: {vibe.label}
        </p>
      </motion.div>

      {/* Vibe description card */}
      <motion.div
        variants={item}
        className="tape-top relative rounded-3xl px-6 py-5 mb-5 text-center"
        style={{
          background: "rgba(255,255,255,0.88)",
          border: "2px solid rgba(240,82,125,0.14)",
          boxShadow: "0 4px 0 rgba(240,82,125,0.08), 0 10px 30px rgba(240,82,125,0.09)",
          transform: "rotate(-0.8deg)",
        }}
      >
        <p className="font-hand text-xl leading-relaxed" style={{ color: "#555" }}>
          {vibe.desc}
        </p>
      </motion.div>

      {/* Highlights — sticky note grid */}
      {highlights.length > 0 && (
        <motion.div variants={item} className="mb-5">
          <p className="font-hand text-xl mb-3 px-1" style={{ color: "#f0527d" }}>
            💜 your favorites
          </p>
          <div className="grid grid-cols-2 gap-3">
            {highlights.map(([key, val], i) => (
              <motion.div
                key={key}
                variants={item}
                className="rounded-2xl px-4 py-3"
                style={{
                  background: i % 2 === 0 ? "rgba(255,240,249,0.9)" : "rgba(243,240,255,0.9)",
                  border: "1.5px dashed rgba(240,82,125,0.22)",
                  transform: `rotate(${i % 3 === 0 ? "-1deg" : "0.8deg"})`,
                  boxShadow: "1px 3px 0 rgba(240,82,125,0.07)",
                }}
              >
                <p className="font-hand text-sm mb-0.5" style={{ color: "#f0527d" }}>
                  {LABEL_MAP[key] || key}
                </p>
                <p className="font-hand text-lg font-bold truncate" style={{ color: "#333" }}>
                  {val}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Personal thank you note */}
      <motion.div
        variants={item}
        className="rounded-3xl px-6 py-5 mb-7 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(240,82,125,0.08), rgba(155,104,232,0.08))",
          border: "1.5px dashed rgba(240,82,125,0.25)",
        }}
      >
        <p className="text-2xl mb-2">🫶</p>
        <p className="font-hand text-xl leading-relaxed" style={{ color: "#666" }}>
          thank you for answering, Mayilu! i made this little quiz just to know you
          a tiny bit better. hope you had fun filling it 💖
        </p>
        <p className="font-hand text-base mt-3" style={{ color: "#aaa" }}>
          — made with love by indrajith
        </p>
      </motion.div>

      {/* Restart */}
      <motion.button
        variants={item}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.03 }}
        onClick={onRestart}
        className="font-hand w-full text-2xl text-white rounded-2xl"
        style={{
          height: "56px",
          background: "linear-gradient(135deg, #f0527d 0%, #c084fc 50%, #818cf8 100%)",
          boxShadow: "0 5px 0 rgba(240,82,125,0.3), 0 8px 24px rgba(240,82,125,0.2)",
        }}
      >
        do it again? 🔁
      </motion.button>
    </motion.div>
  );
}
