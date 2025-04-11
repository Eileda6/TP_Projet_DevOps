const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SCORES_FILE = './scores.json';

app.use(cors());
app.use(express.json());

// Route pour la racine (utile pour vérifier que le serveur tourne)
app.get('/', (req, res) => {
  res.send('🚀 Serveur Memory Game en ligne !');
});

// Route pour ajouter un score
app.post('/score', (req, res) => {
  const { name, score } = req.body;

  if (!name || typeof score !== 'number') {
    return res.status(400).json({ message: 'Nom ou score invalide' });
  }

  let scores = [];
  if (fs.existsSync(SCORES_FILE)) {
    scores = JSON.parse(fs.readFileSync(SCORES_FILE));
  }

  scores.push({ name, score, date: new Date().toISOString() });
  scores.sort((a, b) => a.score - b.score);
  scores = scores.slice(0, 10);

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
