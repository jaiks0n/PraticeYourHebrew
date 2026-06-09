# Practice Your Hebrew

Site d'exercices pour apprendre l'hébreu à l'oral : cartes à retourner (vocabulaire, entretien dev, conjugaison au présent).

**Site en ligne :** [https://praticeyourhebrew.vercel.app](https://praticeyourhebrew.vercel.app)

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

## Audio (prononciation)

Placez vos MP3 dans `public/audio/` :

- `public/audio/general/1.mp3` — id de la carte dans `vocabulary.ts`
- `public/audio/dev-interview/42.mp3` — id dans `vocabulary-dev-interview.ts`
- `public/audio/conjugation/5.mp3` — id dans `conjugation-present.ts`

Au verso de la carte, le bouton **Écouter** lit le fichier. Sans MP3 : message « Audio non disponible ».

## Structure des données

| Fichier | Contenu |
|---------|---------|
| `src/data/vocabulary.ts` | Vocabulaire général |
| `src/data/vocabulary-dev-interview.ts` | Entretien d'embauche dev |
| `src/data/conjugation-present.ts` | Conjugaison au présent |
