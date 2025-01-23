Ping Pong 3D 🎮🏓
Un simple jeu de ping-pong à deux joueurs dans un environnement 3D interactif, conçu avec Three.js, JavaScript, et HTML. Le jeu inclut des ombres, des murs rebondissants, et une dynamique de gameplay immersive. Le premier joueur à atteindre 5 points gagne la partie.

🚀 Fonctionnalités
Jeu multijoueur en local.
Environnement 3D réaliste avec gestion des ombres.
Rebonds interactifs contre les murs.
Gameplay fluide et intuitif.
🛠️ Technologies utilisées
Three.js pour la gestion de la 3D.
JavaScript pour la logique du jeu.
HTML pour la structure.
📦 Installation et lancement
Prérequis
Assurez-vous d'avoir installé Node.js sur votre machine.

Étapes d'installation
Clonez le dépôt :

bash
Copier
Modifier
git clone https://github.com/votre-utilisateur/ping-pong-3d.git
Accédez au dossier du projet :

bash
Copier
Modifier
cd ping-pong-3d
Installez les dépendances :

bash
Copier
Modifier
npm install
Lancez le projet en mode développement :

bash
Copier
Modifier
npm run dev
Ouvrez votre navigateur et accédez à :

arduino
Copier
Modifier
http://localhost:3000
Autres commandes utiles
Construction pour la production :
bash
Copier
Modifier
npm run build
Prévisualisation de la production :
bash
Copier
Modifier
npm run preview
🎮 Commandes dans le jeu
Joueur 1 :

Déplacement vers le haut : W
Déplacement vers le bas : S
Joueur 2 :

Déplacement vers le haut : Flèche haut
Déplacement vers le bas : Flèche bas
📂 Structure du projet

projet-pong/
├── assets/
│   └── ping_pong_room/
│       ├── textures/
│       │   ├── lambert2_baseColor.png
│       │   ├── lambert3_baseColor.png
│       ├── license.txt
│       ├── scene.bin
│       └── scene.gltf
├── index.html           # Fichier HTML principal
├── main.js              # Fichier JavaScript principal
├── package-lock.json    # Gestionnaire de dépendances (verrouillé)
├── package.json         # Gestionnaire de dépendances

🏆 Objectif du jeu
Le but du jeu est simple : atteindre 5 points avant votre adversaire ! Défendez votre côté et attaquez l'autre joueur en utilisant votre raquette.

