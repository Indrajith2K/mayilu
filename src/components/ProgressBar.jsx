import { motion } from "framer-motion";

export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-5 pb-2">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-700 text-pink-400 tracking-wide uppercase">
          Question {current} of {total}
        </span>
        <span className="text-xs font-800 text-fuchsia-500">{pct}%</span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-pink-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #f472b6, #c084fc, #818cf8)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
