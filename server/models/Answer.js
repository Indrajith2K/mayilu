import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    // Each field is flexible (Mixed) since answers can be string, boolean, or null
    icecream:      { type: mongoose.Schema.Types.Mixed, default: null },
    drink:         { type: mongoose.Schema.Types.Mixed, default: null },
    chocolate:     { type: mongoose.Schema.Types.Mixed, default: null },
    color:         { type: mongoose.Schema.Types.Mixed, default: null },
    yogurt:        { type: mongoose.Schema.Types.Mixed, default: null },
    egg:           { type: mongoose.Schema.Types.Mixed, default: null },
    egg_follow:    { type: mongoose.Schema.Types.Mixed, default: null },
    newfood:       { type: mongoose.Schema.Types.Mixed, default: null },
    newfood_follow:{ type: mongoose.Schema.Types.Mixed, default: null },
    spicy:         { type: mongoose.Schema.Types.Mixed, default: null },
    teaCoffee:     { type: mongoose.Schema.Types.Mixed, default: null },
    hatefood:      { type: mongoose.Schema.Types.Mixed, default: null },
    movie:         { type: mongoose.Schema.Types.Mixed, default: null },
    song:          { type: mongoose.Schema.Types.Mixed, default: null },
    night:         { type: mongoose.Schema.Types.Mixed, default: null },
    travel:        { type: mongoose.Schema.Types.Mixed, default: null },
    dreamplace:    { type: mongoose.Schema.Types.Mixed, default: null },
    about1:        { type: mongoose.Schema.Types.Mixed, default: null },
    about2:        { type: mongoose.Schema.Types.Mixed, default: null },
    about3:        { type: mongoose.Schema.Types.Mixed, default: null },
    about4:        { type: mongoose.Schema.Types.Mixed, default: null },
    submittedAt:   { type: Date, default: Date.now },
  },
  { strict: false } // allow any extra keys too
);

export default mongoose.model("Answer", AnswerSchema);
