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
    return false; // silently fail if server not running
  }
}

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

  const fireHearts = useCallback(() => {
    setHeartTrigger((t) => t + 1);
  }, []);

  const handleAnswer = useCallback(
    (val) => {
      if (currentQuestion) {
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }));
      }
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
            saveAnswers(updatedAnswers); // 💾 save to MongoDB
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
        saveAnswers(answers); // 💾 save to MongoDB even when skipping last
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

  /* ── ADMIN/RESPONSES SCREEN ── */
  if (showAdmin) {
    return <ResponsesViewer onBack={() => setShowAdmin(false)} />;
  }

  /* ── WELCOME SCREEN ── */
  if (!started) {
    return (
      <div
        className="min-h-dvh flex flex-col items-center justify-center px-4"
        style={{
          background:
            "linear-gradient(135deg, #fdf4ff 0%, #fce4f3 40%, #e8f4ff 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div
            className="rounded-3xl px-7 py-10 text-center"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 8px 40px rgba(244,114,182,0.18)",
              border: "1.5px solid rgba(244,114,182,0.22)",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="text-6xl mb-4"
            >
              🦚
            </motion.div>
            <h1
              className="text-3xl font-900 mb-2"
              style={{
                fontFamily: "'Pacifico', cursive",
                background: "linear-gradient(135deg, #f472b6, #c084fc, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              For Mayilu
            </h1>
            <p className="text-gray-500 font-600 text-sm mb-8 leading-relaxed">
              A little quiz made with lots of love 💖
              <br />
              Answer honestly — no wrong answers here!
            </p>

            {/* Floating hearts decoration */}
            <div className="flex justify-center gap-2 mb-8 text-2xl">
              {["🌸", "💜", "✨", "💖", "🌺"].map((e, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2 + i * 0.3,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                >
                  {e}
                </motion.span>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.04 }}
              onClick={() => setStarted(true)}
              className="w-full font-800 text-base text-white rounded-2xl transition-all mb-3"
              style={{
                height: "52px",
                background:
                  "linear-gradient(135deg, #f472b6 0%, #c084fc 50%, #818cf8 100%)",
                boxShadow: "0 6px 20px rgba(244,114,182,0.4)",
              }}
            >
              Let's go! 🌟
            </motion.button>

            {/* Admin link */}
            <button
              onClick={() => setShowAdmin(true)}
              className="text-xs text-gray-300 font-600 underline mt-1"
            >
              View responses 📋
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── RESULT SCREEN ── */
  if (done) {
    return (
      <div
        className="min-h-dvh w-full flex flex-col items-center"
        style={{
          background:
            "linear-gradient(135deg, #fdf4ff 0%, #fce4f3 40%, #e8f4ff 100%)",
        }}
      >
        <div className="w-full max-w-md">
          <ResultScreen
            answers={answers}
            onRestart={handleRestart}
            onViewResponses={() => setShowAdmin(true)}
          />
        </div>
      </div>
    );
  }

  /* ── QUIZ SCREEN ── */
  return (
    <div
      className="min-h-dvh w-full flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #fdf4ff 0%, #fce4f3 40%, #e8f4ff 100%)",
      }}
    >
      <HeartBurst trigger={heartTrigger} />

      {/* Logo bar */}
      <div className="w-full max-w-md mx-auto px-4 pt-5">
        <p
          className="text-center text-base font-800"
          style={{
            fontFamily: "'Pacifico', cursive",
            background: "linear-gradient(135deg, #f472b6, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          For Mayilu 🦚
        </p>
      </div>

      {/* Progress */}
      <ProgressBar
        current={currentIndex + 1}
        total={visibleQuestions.length}
      />

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
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="w-full max-w-md mx-auto px-4 pb-6 text-center">
        <p className="text-xs text-pink-300 font-600">made with 💖 just for you</p>
      </div>
    </div>
  );
}
