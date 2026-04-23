import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Answer from "./models/Answer.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mayilu";

app.use(cors());
app.use(express.json());

// ── Connect to MongoDB ──────────────────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected →", MONGO_URI))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ── POST /api/answers  — save a completed quiz ──────────────────────
app.post("/api/answers", async (req, res) => {
  try {
    const doc = new Answer({ ...req.body, submittedAt: new Date() });
    await doc.save();
    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── GET /api/answers   — fetch all submissions ──────────────────────
app.get("/api/answers", async (req, res) => {
  try {
    const answers = await Answer.find().sort({ submittedAt: -1 });
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE /api/answers/:id — delete one submission ─────────────────
app.delete("/api/answers/:id", async (req, res) => {
  try {
    await Answer.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Health check ──────────────────────────────────────────────────────
app.get("/api/health", (_, res) => res.json({ status: "ok", db: mongoose.connection.readyState }));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
