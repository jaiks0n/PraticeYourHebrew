import { useState } from 'react'
import { FlashcardExercise } from './components/FlashcardExercise'
import { GenderQuizExercise } from './components/GenderQuizExercise'
import { Layout } from './components/Layout'
import { conjugationPresent } from './data/conjugation-present'
import { nounGenderVocabulary } from './data/vocabulary-noun-gender'
import { vocabulary } from './data/vocabulary'
import { devInterviewVocabulary } from './data/vocabulary-dev-interview'

type Page =
  | 'home'
  | 'flashcards-general'
  | 'flashcards-dev-interview'
  | 'flashcards-conjugation'
  | 'gender-quiz'

const flashcardExercises = [
  {
    id: 'flashcards-general' as const,
    icon: '🃏',
    name: 'Vocabulaire général',
    description: 'Verbes hébreux sélectionnés',
    cards: vocabulary,
    title: 'Vocabulaire général',
  },
  {
    id: 'flashcards-dev-interview' as const,
    icon: '💼',
    name: 'Entretien d\'embauche — Développeur',
    description: 'Vocabulaire IT et questions d\'entretien en startup/tech',
    cards: devInterviewVocabulary,
    title: 'Entretien d\'embauche — Développeur',
  },
  {
    id: 'flashcards-conjugation' as const,
    icon: '📝',
    name: 'Conjugaison — Présent',
    description: 'Conjuguez à voix haute : je travaille, il parle, j\'ai...',
    cards: conjugationPresent,
    title: 'Conjugaison — Présent',
  },
]

const genderQuizExercise = {
  id: 'gender-quiz' as const,
  icon: '⚖️',
  name: 'Genre des noms — Quiz',
  description: '10 mots aléatoires : masculin ou féminin ?',
  wordCount: nounGenderVocabulary.length,
  title: 'Genre des noms — Quiz',
}

const homeExercises = [
  ...flashcardExercises.map((ex) => ({
    id: ex.id,
    icon: ex.icon,
    name: ex.name,
    description: ex.description,
    countLabel: `${ex.cards.length} cartes`,
  })),
  {
    id: genderQuizExercise.id,
    icon: genderQuizExercise.icon,
    name: genderQuizExercise.name,
    description: genderQuizExercise.description,
    countLabel: `Quiz de 10 · ${genderQuizExercise.wordCount} mots`,
  },
]

function App() {
  const [page, setPage] = useState<Page>('home')

  const activeFlashcard = flashcardExercises.find((exercise) => exercise.id === page)

  return (
    <Layout
      showBack={page !== 'home'}
      onBack={() => setPage('home')}
    >
      {page === 'home' ? (
        <div className="home">
          <h2 className="home-title">Choisissez un exercice</h2>
          <div className="exercise-list">
            {homeExercises.map((exercise) => (
              <button
                key={exercise.id}
                type="button"
                className="exercise-card"
                onClick={() => setPage(exercise.id)}
              >
                <span className="exercise-card-icon">{exercise.icon}</span>
                <span className="exercise-card-name">{exercise.name}</span>
                <span className="exercise-card-desc">{exercise.description}</span>
                <span className="exercise-card-count">{exercise.countLabel}</span>
              </button>
            ))}
          </div>
        </div>
      ) : page === 'gender-quiz' ? (
        <GenderQuizExercise
          key="gender-quiz"
          words={nounGenderVocabulary}
          title={genderQuizExercise.title}
        />
      ) : activeFlashcard ? (
        <FlashcardExercise
          key={activeFlashcard.id}
          cards={activeFlashcard.cards}
          title={activeFlashcard.title}
        />
      ) : null}
    </Layout>
  )
}

export default App
