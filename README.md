# Projet League of Legends — Encyclopédie de Runeterra

Application web qui permet d'explorer l'univers de League of Legends : une carte interactive de Runeterra, les régions et leur histoire, les fiches des champions et un quiz pour tester ses connaissances.

## Contexte

Projet solo réalisé pendant ma formation de **Développeur Web et Web Mobile (DWWM)**, dans le cadre d'un exercice pour mettre en pratique React, le routing et la consommation d'une API externe.

## Stack technique

- **Framework** : React 19, Vite 7
- **Routing** : React Router DOM 7
- **Requêtes HTTP** : Axios
- **UI** : Bootstrap 5 / React-Bootstrap
- **Données** : API publique **Data Dragon** de Riot Games (champions, en français) + fichiers JSON locaux (régions, carte, quiz)
- **Qualité de code** : ESLint

## Fonctionnalités principales

- **Carte interactive de Runeterra** (page d'accueil) : les blasons des régions sont placés sur la carte et mènent à la page de chaque région, avec une modale d'accueil
- **Régions** : liste des 13 régions, puis page de détail avec illustration, légende de la région et champions qui en sont originaires
- **Champions** : liste de tous les champions récupérés depuis Data Dragon, puis fiche détaillée (titre, rôles, illustration, statistiques d'attaque / défense / magie / difficulté, histoire, conseils de jeu)
- **Quiz** : 10 questions sur l'univers du jeu, avec retour visuel immédiat (bonne / mauvaise réponse), calcul du score et possibilité de recommencer

## Architecture / choix techniques notables

- **Pages et composants séparés** : `Pages/` pour les vues associées aux routes, `Components/` pour les éléments réutilisables (`NavBar`, `ChampionsCard`, `RegionsCard`)
- **Un service par ressource** (`ChampionsService`, `RegionsService`, `mainPageService`, `quizzService`) qui regroupe les appels Axios, pour que les composants ne contiennent pas d'URL en dur
- **Routes dynamiques** (`/championDetails/:id`, `/regionDetails/:id`) avec `useParams` pour charger le bon champion ou la bonne région
- **Mélange de sources de données** : les champions viennent de l'API Data Dragon, tandis que les données absentes de l'API (régions, positions sur la carte, questions du quiz) sont stockées dans des fichiers JSON servis depuis `public/assets`
- **Réutilisation de `ChampionsCard`** à la fois dans la liste des champions et dans la page de détail d'une région
- **Carte positionnée en pourcentages** : chaque région a des coordonnées `top` / `left` en % dans `map.json`, ce qui garde les blasons à la bonne place quelle que soit la largeur de l'écran

## Installation et lancement en local

### Prérequis
- Node.js 18+

### Étapes

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

3. Ouvrir l'URL indiquée par Vite (par défaut `http://localhost:5173`).

Aucune clé d'API ni fichier `.env` n'est nécessaire : Data Dragon est une API publique.

## Structure du projet

```
src/
├── Components/   # NavBar, cartes champion et région
├── Pages/        # Accueil (carte), Régions, Champions, Quiz et pages de détail
├── Services/     # Appels Axios (Data Dragon et fichiers JSON locaux)
├── App.jsx       # Déclaration des routes
└── main.jsx
public/assets/    # Images, blasons et données JSON (régions, carte, quiz)
```

## Mentions

Projet non officiel réalisé dans un but d'apprentissage. League of Legends, Runeterra ainsi que les noms, images et textes associés sont la propriété de Riot Games.
