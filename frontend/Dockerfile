# Dockerfile pour le frontend
FROM node:14

WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances npm
RUN npm install 

# Installer les dépendances 
RUN npm install react-router-dom react-admin ra-data-json-server sass 

# Copier le reste des fichiers dans le conteneur
COPY . .

# Compiler le code source pour la production
RUN npm run build

# Commande pour démarrer le serveur web
CMD ["npm", "start"]