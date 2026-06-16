import { useState } from 'react'
import { FlashcardExercise } from './components/FlashcardExercise'
import { GenderQuizExercise } from './components/GenderQuizExercise'
import { Layout } from './components/Layout'
import { vocabularyNoms } from './data/vocabulaire/noms'
import { vocabulary } from './data/vocabulary'

type Page = 'home' | 'flashcards-verbs' | 'flashcards-noms' | 'gender-quiz'

const flashcardLexiques = [
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

const genderQuizExercise = {
  id: 'gender-quiz' as const,
  icon: '⚖️',
  name: 'Genre des noms',
  countLabel: `Quiz de 10 mots`,
  title: 'Genre des noms',
}

function App() {
  const [page, setPage] = useState<Page>('home')

  const activeFlashcardLexique = flashcardLexiques.find((lexique) => lexique.id === page)

  return (
    <Layout
      showBack={page !== 'home'}
      onBack={() => setPage('home')}
    >
      {page === 'home' ? (
        <div className="home">
          <h2 className="home-title">Choisissez un mode</h2>

          <section className="home-section">
            <h3 className="home-section-title">Lexiques</h3>
            <div className="exercise-list">
              {flashcardLexiques.map((lexique) => (
                <button
                  key={lexique.id}
                  type="button"
                  className="exercise-card"
                  onClick={() => setPage(lexique.id)}
                >
                  <span className="exercise-card-icon">{lexique.icon}</span>
                  <span className="exercise-card-name">{lexique.name}</span>
                  <span className="exercise-card-count">{lexique.cards.length} cartes</span>
                </button>
              ))}
            </div>
          </section>

          <section className="home-section">
            <h3 className="home-section-title">Exercices</h3>
            <div className="exercise-list">
              <button
                type="button"
                className="exercise-card"
                onClick={() => setPage(genderQuizExercise.id)}
              >
                <span className="exercise-card-icon">{genderQuizExercise.icon}</span>
                <span className="exercise-card-name">{genderQuizExercise.name}</span>
                <span className="exercise-card-count">{genderQuizExercise.countLabel}</span>
              </button>
            </div>
          </section>
        </div>
      ) : page === 'gender-quiz' ? (
        <GenderQuizExercise
          key="gender-quiz"
          words={vocabularyNoms}
          title={genderQuizExercise.title}
        />
      ) : activeFlashcardLexique ? (
        <FlashcardExercise
          key={activeFlashcardLexique.id}
          cards={activeFlashcardLexique.cards}
          title={activeFlashcardLexique.title}
        />
      ) : null}
    </Layout>
  )
}

export default App
