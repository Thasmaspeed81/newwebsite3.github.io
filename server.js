import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const notes = {
  math: "Algebra, Calculus, Trigonometry basics...",
  science: "Physics laws, Chemistry reactions...",
  history: "Ancient, Medieval, Modern history..."
};

const quizzes = {
  math: [
    { q: "2 + 2 = ?", options: ["3", "4", "5"], answer: "4" },
    { q: "5 * 3 = ?", options: ["15", "10", "8"], answer: "15" }
  ],
  science: [
    { q: "Water formula?", options: ["H2O", "CO2"], answer: "H2O" }
  ]
};

app.get("/notes/:subject", (req, res) => {
  res.json({ data: notes[req.params.subject] || "No notes found" });
});

app.get("/quiz/:subject", (req, res) => {
  res.json({ data: quizzes[req.params.subject] || [] });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
