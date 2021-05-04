# Présentation

Ce projet conclut le module d'enseignement BigData dans l'optique d'en valider les acquis. Il s'agit d'une API node js faisant appel à l'API Sirène afin de consultater les informations des entreprises françaises. 
Les résultats des requêtes sont stockés dans un serveur Redis déployé avec docker-compose avec une instance master, deux slaves et trois sentinels.

## Installation

Les prérequis : 

Node.js, npm, Visual Studio, Docker, Docker-compose, Git, Postman

1. Télécharger le git : 

Créer un dossier pour l’application, faites y un git clone du git

2. Lancer les conteneurs Redis :

Dans un terminal de commande, dans le sous dossier redis, Faire :

```bash
docker compose up --build -d
```

3. Vérifier l’état des conteneurs, ils doivent tous être en état “Up” :

```bash
docker compose ps
```

Si les Sentinels sont en état "Exit 1", convertir les sauts de ligne en UNIX (LF) avec Notepadd++ sur les fichiers docker-compose.yml, sentinel.conf, sentinel-entrypoint.sh

4. Lancer l’application

Ouvrez le dossier de l’application dans Visual Studio

Dans le terminal de commande de Visual Studio, taper les commandes : 

```bash
npm install
node index.js
```

## Utilisation

Sur Postman, tester l’api avec la commande suivante :

http://localhost:3000/company?city=paris
