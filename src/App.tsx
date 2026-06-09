import { useState } from 'react'
import { FlashcardExercise } from './components/FlashcardExercise'
import { Layout } from './components/Layout'
import { conjugationPresent } from './data/conjugation-present'
import { vocabulary } from './data/vocabulary'
import { devInterviewVocabulary } from './data/vocabulary-dev-interview'

type Page = 'home' | 'flashcards-general' | 'flashcards-dev-interview' | 'flashcards-conjugation'

const exercises = [
  {
    id: 'flashcards-general' as const,
    icon: '🃏',
    name: 'Vocabulaire général',
    description: 'Salutations, nombres, mots du quotidien',
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

function App() {
  const [page, setPage] = useState<Page>('home')

  const activeExercise = exercises.find((exercise) => exercise.id === page)

  return (
    <Layout
      showBack={page !== 'home'}
      onBack={() => setPage('home')}
    >
      {page === 'home' ? (
        <div className="home">
          <h2 className="home-title">Choisissez un exercice</h2>
          <div className="exercise-list">
            {exercises.map((exercise) => (
              <button
                key={exercise.id}
                type="button"
                className="exercise-card"
                onClick={() => setPage(exercise.id)}
              >
                <span className="exercise-card-icon">{exercise.icon}</span>
                <span className="exercise-card-name">{exercise.name}</span>
                <span className="exercise-card-desc">{exercise.description}</span>
                <span className="exercise-card-count">{exercise.cards.length} cartes</span>
              </button>
            ))}
          </div>
        </div>
      ) : activeExercise ? (
        <FlashcardExercise
          key={activeExercise.id}
          cards={activeExercise.cards}
          title={activeExercise.title}
        />
      ) : null}
    </Layout>
  )
}

export default App
