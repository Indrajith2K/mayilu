import { motion } from "framer-motion";

export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-md mx-auto px-5 pt-4 pb-2">
      <div className="flex items-center justify-between mb-2">
        <span
          className="font-hand text-xl"
          style={{ color: "#f0527d" }}
        >
          question {current} of {total} ✏️
        </span>
        <span
          className="font-hand text-lg font-bold"
          style={{ color: "#9b68e8" }}
        >
          {pct}%
        </span>
      </div>

      {/* Bar track */}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          height: "10px",
          background: "rgba(240,82,125,0.12)",
          border: "1.5px solid rgba(240,82,125,0.18)",
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #f9a8d4, #f0527d, #c084fc, #818cf8)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2.5s linear infinite",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
