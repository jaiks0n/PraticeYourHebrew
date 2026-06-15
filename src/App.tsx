import { useState } from 'react'
import { FlashcardExercise } from './components/FlashcardExercise'
import { Layout } from './components/Layout'
import { vocabularyNoms } from './data/vocabulaire/noms'
import { vocabulary } from './data/vocabulary'

type Page = 'home' | 'flashcards-verbs' | 'flashcards-noms'

const flashcardExercises = [
  {
    id: 'flashcards-verbs' as const,
    icon: '🧑🏼‍🏫',
    name: 'Verbes',
    cards: vocabulary,
    title: 'Verbes',
  },
  {
    id: 'flashcards-noms' as const,
    icon: '📚',
    name: 'Noms',
    cards: vocabularyNoms,
    title: 'Noms',
  },
]

const homeExercises = flashcardExercises.map((ex) => ({
  id: ex.id,
  icon: ex.icon,
  name: ex.name,
  countLabel: `${ex.cards.length} cartes`,
}))

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
          <h2 className="home-title">Choisissez un lexique</h2>
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
                <span className="exercise-card-count">{exercise.countLabel}</span>
              </button>
            ))}
          </div>
        </div>
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
