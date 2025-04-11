FROM node:18-alpine

# Installe un petit serveur web
RUN npm install -g http-server

# Répertoire de travail (où se trouve index.html)
WORKDIR /app

# Copie UNIQUEMENT le dossier contenant tes fichiers web
COPY pageWeb/ .

# Expose le port
EXPOSE 8080

# Lance le serveur depuis /app (où index.html se trouve maintenant)
CMD ["http-server", ".", "-p", "8080"]

# Dockerfile
FROM node:20

WORKDIR /app
COPY serveur/package*.json ./
RUN npm install
COPY serveur .

EXPOSE 3000
CMD ["node", "serveur.js"]
