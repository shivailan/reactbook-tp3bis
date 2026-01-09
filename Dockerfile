# 1) Image de base
FROM node:22-alpine

# 2) Dossier de travail
WORKDIR /app

# 3) Installation des dépendances (optimisation du cache)
COPY package*.json ./
RUN npm install

# 4) Copie du reste du projet
COPY . .

# 5) Build de l'application
RUN npm run build

# 6) Exposition du port utilisé par Vite
EXPOSE 5173

# 7) Lancement de l'application en mode host pour Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]