# Ping Pong 3D 🎮🏓

Un simple jeu de ping-pong à deux joueurs dans un environnement 3D interactif, conçu avec **Three.js**, **JavaScript**, et **HTML**.  
Le jeu inclut des ombres, des murs rebondissants, et une dynamique de gameplay immersive. Le premier joueur à atteindre 5 points gagne la partie.

---

## 🚀 Fonctionnalités

- Jeu multijoueur en local.
- Environnement 3D réaliste avec gestion des ombres.
- Rebonds interactifs contre les murs.
- Gameplay fluide et intuitif.

---

## 🛠️ Technologies utilisées

- **Three.js** pour la gestion de la 3D.
- **JavaScript** pour la logique du jeu.
- **HTML** pour la structure.

---

## 📦 Installation et lancement

### Prérequis

Assurez-vous d'avoir installé [Node.js](https://nodejs.org/) sur votre machine.

### Étapes d'installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Joepok77/pingpong-3d.git
   ```

2. Accédez au dossier du projet :
   ```bash
   cd pingpong-3d
   ```

3. Installez les dépendances :
   ```bash
   npm install
   ```

4. Lancez le projet en mode développement :
   ```bash
   npm run dev
   ```

5. Ouvrez votre navigateur et accédez à :
   ```
   http://localhost:3000
   ```

### Autres commandes utiles

- **Construction pour la production** :
  ```bash
  npm run build
  ```

- **Prévisualisation de la production** :
  ```bash
  npm run preview
  ```

---

## 🎮 Commandes dans le jeu

- **Joueur 1** :
  - Déplacement vers le haut : `a`
  - Déplacement vers le bas : `d`

- **Joueur 2** :
  - Déplacement vers le haut : `Flèche gauche`
  - Déplacement vers le bas : `Flèche droite`

---

## 📂 Structure du projet

```
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
```

---

## 🏆 Objectif du jeu

Le but du jeu est simple : **atteindre 5 points avant votre adversaire** ! Défendez votre côté et attaquez l'autre joueur en utilisant votre raquette.

---

