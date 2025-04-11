const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Autorise les requêtes venant de ton jeu en local
const cors = require('cors');
app.use(cors());

// Pour lire les données JSON envoyées depuis le jeu
app.use(express.json());

// Chemin vers le fichier où on stocke les scores
const SCORES_FILE = './scores.json';

// Route pour ajouter un score
app.post('/score', (req, res) => {
  const { name, score } = req.body;

  if (!name || typeof score !== 'number') {
    return res.status(400).json({ message: 'Nom ou score invalide' });
  }

  // Lit les scores existants
  let scores = [];
  if (fs.existsSync(SCORES_FILE)) {
    scores = JSON.parse(fs.readFileSync(SCORES_FILE));
  }

  // Ajoute le nouveau score
  scores.push({ name, score, date: new Date().toISOString() });

  // Trie les scores (du plus petit score au plus grand)
  scores.sort((a, b) => a.score - b.score);

  // Garde les 10 meilleurs
  scores = scores.slice(0, 10);

  // Enregistre les scores
  fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));

  res.json({ message: 'Score ajouté !' });
});

// Route pour récupérer les scores
app.get('/scores', (req, res) => {
  if (fs.existsSync(SCORES_FILE)) {
    const scores = JSON.parse(fs.readFileSync(SCORES_FILE));
    res.json(scores);
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Serveur des scores lancé sur http://localhost:${PORT}`);
});

fetch("http://localhost:3000/score", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Alice", // à remplacer par un vrai pseudo
    score: 12
  })
})
.then(res => res.json())
.then(data => {
  console.log("Score enregistré :", data);
})
.catch(err => {
  console.error("Erreur lors de l'envoi du score :", err);
});
