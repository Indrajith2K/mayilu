import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { questions } from "./data/questions";
import ProgressBar from "./components/ProgressBar";
import QuestionCard from "./components/QuestionCard";
import HeartBurst from "./components/HeartBurst";
import ResultScreen from "./components/ResultScreen";
import ResponsesViewer from "./components/ResponsesViewer";

const API = "http://localhost:5000/api";

function getVisibleQuestions(answers) {
  return questions.filter((q) => {
    if (!q.showIf) return true;
    return q.showIf(answers);
  });
}

async function saveAnswers(answers) {
  try {
    const res = await fetch(`${API}/answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Deco doodles floating in background
const DOODLES = [
  { emoji: "🌸", top: "6%",  left: "6%",  delay: 0,   dur: 3.2 },
  { emoji: "✨", top: "12%", right: "9%", delay: 0.5, dur: 2.8 },
  { emoji: "💜", top: "78%", left: "4%",  delay: 0.8, dur: 3.5 },
  { emoji: "🌺", top: "72%", right: "7%", delay: 0.3, dur: 3.0 },
  { emoji: "⭐", top: "45%", right: "4%", delay: 1.1, dur: 2.6 },
  { emoji: "🍀", top: "55%", left: "6%",  delay: 0.6, dur: 3.8 },
];

export default function App() {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [heartTrigger, setHeartTrigger] = useState(0);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const visibleQuestions = getVisibleQuestions(answers);
  const currentQuestion = visibleQuestions[currentIndex];

  const fireHearts = useCallback(() => setHeartTrigger((t) => t + 1), []);

  const handleAnswer = useCallback(
    (val) => {
      if (currentQuestion) setAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }));
    },
    [currentQuestion]
  );

  const goNext = useCallback(
    (val) => {
      const updatedAnswers = {
        ...answers,
        [currentQuestion?.id]: val ?? answers[currentQuestion?.id],
      };
      if (currentQuestion) setAnswers(updatedAnswers);
      fireHearts();
      setDirection(1);
      setTimeout(() => {
        setCurrentIndex((idx) => {
          const nextIdx = idx + 1;
          const nextVisible = getVisibleQuestions(updatedAnswers);
          if (nextIdx >= nextVisible.length) {
            saveAnswers(updatedAnswers);
            setDone(true);
            return idx;
          }
          return nextIdx;
        });
      }, 50);
    },
    [answers, currentQuestion, fireHearts]
  );

  const handleSkip = useCallback(() => {
    fireHearts();
    setDirection(1);
    setCurrentIndex((idx) => {
      const nextIdx = idx + 1;
      if (nextIdx >= visibleQuestions.length) {
        saveAnswers(answers);
        setDone(true);
        return idx;
      }
      return nextIdx;
    });
  }, [fireHearts, visibleQuestions.length, answers]);

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setDone(false);
    setDirection(1);
    setStarted(false);
  };

  /* ── ADMIN SCREEN ── */
  if (showAdmin) {
    return <ResponsesViewer onBack={() => setShowAdmin(false)} />;
  }

  /* ── WELCOME SCREEN ── */
  if (!started) {
    return (
      <div
        className="min-h-dvh flex flex-col items-center justify-center px-4 py-10"
        style={{ background: "linear-gradient(155deg, #fff5f8 0%, #ffe8f2 50%, #f0e8ff 100%)" }}
      >
        {/* Background floating doodles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {DOODLES.map((d, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl select-none"
              style={{ top: d.top, bottom: d.bottom, left: d.left, right: d.right }}
              animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: d.dur, delay: d.delay, ease: "easeInOut" }}
            >
              {d.emoji}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Main welcome card */}
          <div
            className="tape-top relative rounded-[30px] px-7 py-9 text-center"
            style={{
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "2px solid rgba(240,82,125,0.14)",
              boxShadow:
                "0 5px 0 rgba(240,82,125,0.1), 0 14px 48px rgba(240,82,125,0.12)",
            }}
          >
            {/* Peacock */}
            <motion.div
              className="text-7xl mb-5 select-none"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              🦚
            </motion.div>

            {/* Greeting in handwriting font */}
            <h1
              className="font-hand text-5xl mb-2"
              style={{ color: "#f0527d" }}
            >
              hey, Mayilu!
            </h1>
            <p
              className="font-hand text-xl mb-6 leading-relaxed"
              style={{ color: "#9b68e8" }}
            >
              i made this tiny quiz just for you... <br />
              answer honestly — no wrong answers 🫣
            </p>

            {/* Floating emoji row */}
            <div className="flex justify-center gap-2 mb-7 text-xl">
              {["🌸", "💜", "✨", "💖", "🌺"].map((e, i) => (
                <motion.span
                  key={i}
                  className="select-none"
                  animate={{ y: [0, -7, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8 + i * 0.25,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                >
                  {e}
                </motion.span>
              ))}
            </div>

            {/* Start button */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.04 }}
              onClick={() => setStarted(true)}
              className="font-hand w-full text-2xl text-white rounded-2xl mb-3"
              style={{
                height: "58px",
                background:
                  "linear-gradient(135deg, #f0527d 0%, #c084fc 50%, #818cf8 100%)",
                boxShadow:
                  "0 5px 0 rgba(240,82,125,0.3), 0 8px 24px rgba(240,82,125,0.2)",
              }}
            >
              okay let's go! →
            </motion.button>

            {/* Admin link */}
            <button
              onClick={() => setShowAdmin(true)}
              className="font-hand text-base"
              style={{ color: "#ccc" }}
            >
              view responses 📋
            </button>
          </div>

          {/* Made by tag below card */}
          <p
            className="font-hand text-center text-lg mt-5"
            style={{ color: "rgba(240,82,125,0.45)" }}
          >
            made with 💕 by indrajith
          </p>
        </motion.div>
      </div>
    );
  }

  /* ── RESULT SCREEN ── */
  if (done) {
    return (
      <div
        className="min-h-dvh w-full flex flex-col items-center"
        style={{ background: "linear-gradient(155deg, #fff5f8 0%, #ffe8f2 50%, #f0e8ff 100%)" }}
      >
        <div className="w-full max-w-md">
          <ResultScreen answers={answers} onRestart={handleRestart} onViewResponses={() => setShowAdmin(true)} />
        </div>
      </div>
    );
  }

  /* ── QUIZ SCREEN ── */
  return (
    <div
      className="min-h-dvh w-full flex flex-col"
      style={{ background: "linear-gradient(155deg, #fff5f8 0%, #ffe8f2 50%, #f0e8ff 100%)" }}
    >
      <HeartBurst trigger={heartTrigger} />

      {/* Logo bar */}
      <div className="w-full max-w-md mx-auto px-4 pt-5">
        <p
          className="font-hand text-center text-2xl"
          style={{ color: "#f0527d" }}
        >
          for Mayilu 🦚
        </p>
      </div>

      {/* Progress */}
      <ProgressBar current={currentIndex + 1} total={visibleQuestions.length} />

      {/* Card area */}
      <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto overflow-hidden py-4">
        <AnimatePresence mode="wait" custom={direction}>
          {currentQuestion && (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              value={answers[currentQuestion.id]}
              onChange={handleAnswer}
              onNext={goNext}
              onSkip={handleSkip}
              direction={direction}
              isOptional={!!currentQuestion.optional}
              questionIndex={currentIndex}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="w-full max-w-md mx-auto px-4 pb-6 text-center">
        <p className="font-hand text-lg" style={{ color: "rgba(240,82,125,0.45)" }}>
          made with 💕 by indrajith
        </p>
      </div>
    </div>
  );
}
