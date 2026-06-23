# Practice Your Hebrew

Site d'exercices pour apprendre l'hébreu : flashcards verbes, noms, quiz de genre, phrases à trous.

**Site en ligne :** [https://praticeyourhebrew.vercel.app](https://praticeyourhebrew.vercel.app)

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173)

Les données (verbes, phrases à trous) sont lues directement depuis les fichiers dans `src/data/`.

## Build

```bash
npm run build
npm run preview
```

## Déploiement sur Vercel

```bash
git push
```

Vercel redéploie automatiquement si le projet est lié à GitHub.

## Structure des données

| Fichier | Contenu |
|---------|---------|
| `src/data/vocabulary.ts` | Verbes (flashcards) |
| `src/data/fill-blank-exercises.ts` | Phrases à trous |
| `src/data/vocabulaire/noms/` | Noms |

## MongoDB (optionnel)

Le dossier `api/` et les scripts `import:verbs` / `import:fill-blank` permettent de synchroniser les données vers MongoDB si besoin, mais l'application n'en dépend pas.
