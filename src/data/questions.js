export const questions = [
  { id: "icecream", question: "Favorite ice cream flavor? 🍦", type: "text" },
  { id: "drink", question: "Favorite drink? 🥤", type: "text" },
  { id: "chocolate", question: "Favorite chocolate? 🍫", type: "text" },
  { id: "color", question: "Favorite color? 🎨", type: "text" },
  { id: "yogurt", question: "Favorite fruit yogurt? 🍓", type: "text" },

  { id: "egg", question: "Do you like egg puff? 🥚", type: "boolean" },
  {
    id: "egg_follow",
    question: "Which shop has your favorite egg puff? 🏪",
    type: "text",
    showIf: (a) => a.egg === true,
  },

  { id: "newfood", question: "Do you like trying new food? 🍜", type: "boolean" },
  {
    id: "newfood_follow",
    question: "What's the last new food you tried? 🍽️",
    type: "text",
    showIf: (a) => a.newfood === true,
  },

  { id: "spicy", question: "Do you enjoy spicy food? 🌶️", type: "boolean" },
  { id: "teaCoffee", question: "Tea ☕ or coffee? ☕", type: "text" },
  { id: "hatefood", question: "Any food you absolutely hate? 🤢", type: "text" },

  { id: "movie", question: "Favorite movie? 🎬", type: "text" },
  { id: "song", question: "Favorite song right now? 🎵", type: "text" },

  { id: "night", question: "Are you a night person? 🌙", type: "boolean" },
  { id: "travel", question: "Do you like traveling? ✈️", type: "boolean" },
  {
    id: "dreamplace",
    question: "Dream place to visit? 🗺️",
    type: "text",
    showIf: (a) => a.travel === true,
  },

  {
    id: "about1",
    question: "What do you think about me? 🤔",
    type: "text",
    optional: true,
  },
  {
    id: "about2",
    question: "What do you like about me? 💖",
    type: "text",
    optional: true,
  },
  {
    id: "about3",
    question: "Is there anything I do that you don't like? 🙈",
    type: "text",
    optional: true,
  },
  {
    id: "about4",
    question: "Do you think I should change anything? 🌱",
    type: "text",
    optional: true,
  },
];
