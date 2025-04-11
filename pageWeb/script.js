const symbols = ['🍎','🍌','🍇','🍓','🍉','🍒','🍍','🥝'];
let cards = [...symbols, ...symbols]; // 2x chaque symbole
let revealedCards = [];
let lockBoard = false;
let score = 0;


shuffle(cards);

const gameBoard = document.getElementById("gameBoard");

cards.forEach((symbol, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;
  card.dataset.index = index;
  card.addEventListener("click", handleCardClick);
  gameBoard.appendChild(card);
});

function handleCardClick(e) {
  const card = e.target;
  if (lockBoard || card.classList.contains("revealed")) return;

  revealCard(card);
  revealedCards.push(card);

  if (revealedCards.length === 2) {

    score++;
    document.getElementById("score").textContent = score;
    lockBoard = true;
    const [card1, card2] = revealedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
      revealedCards = [];
      lockBoard = false;
      if (document.querySelectorAll('.card.revealed').length === cards.length) {
        setTimeout(() => {
          document.getElementById("finalScore").textContent = score;
          document.getElementById("winScreen").classList.remove("hidden");
          const playerName = document.getElementById("playerName").value;
          
    if (playerName) {
      fetch("http://localhost:3000/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playerName,
          score: score,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ Score enregistré :", data);
        })
        .catch((err) => {
          console.error("❌ Erreur lors de l'envoi du score :", err);
        });
    } else {
      console.warn("⚠️ Aucun pseudo entré, score non envoyé !");
    }
        }, 500);
      }
    } else {
      setTimeout(() => {
        hideCard(card1);
        hideCard(card2);
        revealedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
  if (document.querySelectorAll('.card.revealed').length === cards.length) {
    setTimeout(() => {
      document.getElementById("winScreen").classList.remove("hidden");
    }, 500);
  }
  
}

function revealCard(card) {
  card.classList.add("revealed");
  card.textContent = card.dataset.symbol;
}

function hideCard(card) {
  card.classList.remove("revealed");
  card.textContent = '';
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function restartGame() {
    // Réinitialise l'écran
    document.getElementById("winScreen").classList.add("hidden");
    gameBoard.innerHTML = "";
    revealedCards = [];
    lockBoard = false;
    score = 0;
    document.getElementById("score").textContent = score;
    // Re-mélange et recrée les cartes
    shuffle(cards);
    cards.forEach((symbol, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.symbol = symbol;
      card.dataset.index = index;
      card.addEventListener("click", handleCardClick);
      gameBoard.appendChild(card);
    });
    
  }
  
  const playerName = document.getElementById("playerName").value;

fetch("http://localhost:3000/score", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: playerName,
    score: score,
  }),
})
.then(res => res.json())
.then(data => {
  console.log("Score enregistré :", data);
})
.catch(err => {
  console.error("Erreur lors de l'envoi du score :", err);
});
