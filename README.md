# Qomit

Qomit est un projet qui utilise ReactJs en Front et NodeJs en back pour créer une application web. Il est utilise Docker pour containeriser l'application.

## Prérequis

- Node.js
- Docker
- Git

## Installation

1. Clonez le projet à l'aide de la commande suivante :
git clone https://github.com/Nobh/Qomit.git


2. Installez les dépendances pour le front-end en utilisant la commande suivante :
cd Qomit/frontend
npm install


3. Installez les dépendances pour le back-end en utilisant la commande suivante :
cd Qomit/backend
npm install


4. Construisez et lancez les images Docker en utilisant la commande suivante :
cd Qomit
docker-compose up


5. Accédez à l'URL http://localhost:3000 dans votre navigateur pour voir l'application en cours d'exécution.

## Commandes utiles

- Pour arrêter les containers Docker :
docker-compose down


- Pour voir les logs des containers :
docker-compose logs


- Pour voir les containers en cours d'exécution :
docker ps


## Contribuer

Si vous souhaitez contribuer à ce projet, vous pouvez créer une branche à partir de la branche master et effectuer vos modifications. Une fois que vous avez terminé, vous pouvez soumettre une demande de fusion pour que vos modifications soient examinées et intégrées au projet.

Remarques

Assurez-vous que les ports 3000 et 3001 ne sont pas utilisés par d'autres applications sur votre ordinateur avant de lancer les images Docker.
Assurez-vous que les routes sont correctement configurées pour que les requêtes de l'application front-end puissent être redirigées vers le backend correctement.
Assurez-vous que les URLs de base pour l'application front-end sont configurées correctement pour qu'elle puisse accéder correctement aux fonctionnalités du backend.
Licence
Ce projet est sous licence MIT

Ce fichier README donne une vue d'ensemble sur l'utilisation et l'exécution de votre projet Qomit, ainsi que les commandes utiles pour Docker et les étapes pour contribuer au projet. Il est important de fournir des instructions claires et détaillées pour que les utilisateurs puissent facilement utiliser et déployer votre projet.
