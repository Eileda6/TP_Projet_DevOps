# 🧠 Jeu de Memory

Jeu de Memory est réalisé en **HTML**, **CSS** et **JavaScript**.  
Le but est de retrouver toutes les paires de cartes avec le moins de coups possible.

---

## 🎮 Fonctionnalités

- Grille de cartes cliquables
- Détection des paires
- Compteur de coups
- Écran de victoire avec score et bouton "Rejouer"
- Interface responsive
- lancement avec Docker
---

## 📁 Structure du projet

<pre>TP_Projet_DevOps/ 
├── pageWeb/ 
│ ├── index.html 
│ ├── style.css 
│ └── script.js
├── serveur/ 
│ ├── node-modules/
│ ├── package-lock.json
│ ├── package.json
│ ├── scores.json
│ ├── serveur.js
| └── test/
│       └── serveur.test.js
├── Dockerfile 
├── docker-compose.yml 
└── README.md</pre>
---
## 🚀 Lancer l'application


1. **Ouvrir un terminal** dans le dossier `TP_Projet_DevOps`
2. **Lancer le serveur Node.js** (backend) :
   - Va dans le dossier `serveur/` :
     ```bash
     cd serveur
     ```
   - Installe les dépendances :
     ```bash
     npm install
     ```
   - Lance le serveur :
     ```bash
     node serveur.js
     ```
   - Le serveur sera accessible sur http://localhost:3000
     
3. **Construire l’image Docker** :
   ```bash
   docker-compose build
4. **Lancer le jeu** :
   ```bash
   docker-compose up

Ouvrir le navigateur a l'adresse http://localhost:8080

5. **Arrêter le jeu** :
   ```bash
   docker-compose down
---
## 🛠️ Technologies utilisées

- HTML5
- CSS3
- JavaScript (Vanilla)
- Docker


