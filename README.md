# Practice Your Hebrew

Site d'exercices pour apprendre l'hébreu à l'oral : cartes à retourner (vocabulaire, entretien dev, conjugaison au présent).

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Déploiement sur Vercel

### Première fois

1. **GitHub** (pousser le code) :
   ```bash
   gh auth login
   gh repo create PraticeYourHebrew --public --source=. --push
   ```

2. **Vercel via le site** (recommandé) :
   - [vercel.com](https://vercel.com) → connexion GitHub
   - **Add New Project** → importer `PraticeYourHebrew`
   - Build : `npm run build` — Output : `dist`
   - **Deploy**

3. **Vercel via CLI** (alternative) :
   ```bash
   npx vercel login
   npm run deploy
   ```

### Mises à jour

```bash
git add .
git commit -m "Votre message"
git push
```

Vercel redéploie automatiquement si le projet est lié à GitHub.

## Structure des données

| Fichier | Contenu |
|---------|---------|
| `src/data/vocabulary.ts` | Vocabulaire général |
| `src/data/vocabulary-dev-interview.ts` | Entretien d'embauche dev |
| `src/data/conjugation-present.ts` | Conjugaison au présent |
