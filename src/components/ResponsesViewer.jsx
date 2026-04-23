import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = "/api";

const QUESTION_LABELS = {
  icecream: "Fav Ice Cream 🍦",
  drink: "Fav Drink 🥤",
  chocolate: "Fav Chocolate 🍫",
  color: "Fav Color 🎨",
  yogurt: "Fav Yogurt 🍓",
  egg: "Likes Egg Puff? 🥚",
  egg_follow: "Best Egg Puff Shop 🏪",
  newfood: "Tries New Food? 🍜",
  newfood_follow: "Last New Food 🍽️",
  spicy: "Likes Spicy? 🌶️",
  teaCoffee: "Tea or Coffee ☕",
  hatefood: "Hates This Food 🤢",
  movie: "Fav Movie 🎬",
  song: "Fav Song 🎵",
  night: "Night Person? 🌙",
  travel: "Likes Traveling? ✈️",
  dreamplace: "Dream Place 🗺️",
  about1: "Thinks About Me 🤔",
  about2: "Likes About Me 💖",
  about3: "Doesn't Like 🙈",
  about4: "Should I Change? 🌱",
};

function formatValue(v) {
  if (v === null || v === undefined) return <span className="text-gray-300 italic">—</span>;
  if (v === true) return <span className="text-emerald-500 font-800">Yes 💚</span>;
  if (v === false) return <span className="text-rose-400 font-800">Nope 🙈</span>;
  return <span className="text-gray-700 font-700">{v}</span>;
}

function SubmissionCard({ doc, onDelete }) {
  const [open, setOpen] = useState(false);

  const date = new Date(doc.submittedAt);
  const timeStr = date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const answeredCount = Object.entries(doc)
    .filter(([k]) => k in QUESTION_LABELS && doc[k] !== null && doc[k] !== undefined)
    .length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-3xl overflow-hidden mb-4"
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 6px 24px rgba(244,114,182,0.12)",
        border: "1.5px solid rgba(244,114,182,0.18)",
      }}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div>
          <p className="text-xs text-pink-400 font-700 mb-0.5">{timeStr}</p>
          <p className="text-gray-600 text-sm font-600">
            {answeredCount} of {Object.keys(QUESTION_LABELS).length} answered
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-fuchsia-400 text-lg">{open ? "▲" : "▼"}</span>
        </div>
      </button>

      {/* Expandable answers */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 grid grid-cols-1 gap-2">
              {Object.entries(QUESTION_LABELS).map(([key, label]) => {
                const val = doc[key];
                if (val === null || val === undefined) return null;
                return (
                  <div
                    key={key}
                    className="flex justify-between items-start gap-2 py-2 border-b border-pink-50"
                  >
                    <span className="text-xs text-gray-400 font-600 flex-shrink-0 w-36">
                      {label}
                    </span>
                    <span className="text-right text-sm">{formatValue(val)}</span>
                  </div>
                );
              })}
            </div>
            {/* Delete */}
            <div className="px-5 pb-4">
              <button
                onClick={() => onDelete(doc._id)}
                className="text-xs text-rose-400 font-700 underline"
              >
                🗑 Delete this response
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ResponsesViewer({ onBack }) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResponses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/answers`);
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setResponses(data);
    } catch (e) {
      setError("Could not connect to server. Make sure the backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResponses(); }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/answers/${id}`, { method: "DELETE" });
      setResponses((r) => r.filter((d) => d._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div
      className="min-h-dvh w-full"
      style={{ background: "linear-gradient(135deg, #fdf4ff 0%, #fce4f3 40%, #e8f4ff 100%)" }}
    >
      <div className="w-full max-w-md mx-auto px-4 pt-6 pb-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="h-9 w-9 rounded-full flex items-center justify-center text-fuchsia-400 font-800 text-lg"
            style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(244,114,182,0.25)" }}
          >
            ←
          </button>
          <div>
            <h1
              className="text-xl font-900"
              style={{
                fontFamily: "'Pacifico', cursive",
                background: "linear-gradient(135deg, #f472b6, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Responses 📋
            </h1>
            <p className="text-xs text-pink-400 font-600">{responses.length} submission{responses.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={fetchResponses}
            className="ml-auto h-9 px-3 rounded-xl text-xs font-700 text-fuchsia-500"
            style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(192,132,252,0.3)" }}
          >
            Refresh 🔄
          </button>
        </div>

        {/* States */}
        {loading && (
          <div className="text-center py-16 text-pink-300 font-700">Loading… 🌸</div>
        )}
        {error && (
          <div
            className="rounded-2xl px-5 py-4 mb-4 text-sm text-rose-600 font-600"
            style={{ background: "rgba(255,228,230,0.7)", border: "1.5px solid rgba(251,113,133,0.3)" }}
          >
            ⚠️ {error}
          </div>
        )}
        {!loading && !error && responses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-5xl mb-3">🌸</p>
            <p className="text-gray-400 font-600">No responses yet!</p>
            <p className="text-gray-300 text-sm mt-1">Complete the quiz to see them here.</p>
          </div>
        )}

        {/* Cards */}
        <AnimatePresence>
          {responses.map((doc) => (
            <SubmissionCard key={doc._id} doc={doc} onDelete={handleDelete} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
