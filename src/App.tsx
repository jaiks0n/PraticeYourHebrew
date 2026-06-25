import { useState } from 'react'
import { CoursEt } from './components/CoursEt'
import { NounList } from './components/NounList'
import { VerbList } from './components/VerbList'
import { FillBlankExercise } from './components/FillBlankExercise'
import { FlashcardExercise } from './components/FlashcardExercise'
import { GenderQuizExercise } from './components/GenderQuizExercise'
import { Layout } from './components/Layout'
import { fillBlankExercises } from './data/fill-blank-exercises'
import { vocabularyNoms } from './data/vocabulary-noms'
import { vocabulary } from './data/vocabulary-verbes'

type Page =
  | 'home'
  | 'cours-et'
  | 'flashcards-verbs'
  | 'flashcards-noms'
  | 'gender-quiz'
  | 'fill-blank'
  | 'verb-list'
  | 'noun-list'

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

const fillBlankMeta = {
  id: 'fill-blank' as const,
  icon: '✏️',
  name: 'Phrases à trous',
  countLabel: 'Quiz de 5 phrases',
  title: 'Phrases à trou',
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
            <h3 className="home-section-title">Cours</h3>
            <div className="exercise-list exercise-list--grid-2">
              <button
                type="button"
                className="exercise-card"
                onClick={() => setPage('cours-et')}
              >
                <span className="exercise-card-icon">📖</span>
                <span className="exercise-card-name">את (et)</span>
                <span className="exercise-card-count">7 sections</span>
              </button>
            </div>
          </section>

          <section className="home-section">
            <h3 className="home-section-title">Lexiques</h3>
            <div className="exercise-list exercise-list--grid-2">
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
              <button
                type="button"
                className="exercise-card"
                onClick={() => setPage('verb-list')}
              >
                <span className="exercise-card-icon">📋</span>
                <span className="exercise-card-name">Liste des verbes</span>
                <span className="exercise-card-count">{vocabulary.length} verbes</span>
              </button>
              <button
                type="button"
                className="exercise-card"
                onClick={() => setPage('noun-list')}
              >
                <span className="exercise-card-icon">📋</span>
                <span className="exercise-card-name">Liste des noms</span>
                <span className="exercise-card-count">{vocabularyNoms.length} noms</span>
              </button>
            </div>
          </section>

          <section className="home-section">
            <h3 className="home-section-title">Exercices</h3>
            <div className="exercise-list exercise-list--grid-2">
              <button
                type="button"
                className="exercise-card"
                onClick={() => setPage(genderQuizExercise.id)}
              >
                <span className="exercise-card-icon">{genderQuizExercise.icon}</span>
                <span className="exercise-card-name">{genderQuizExercise.name}</span>
                <span className="exercise-card-count">{genderQuizExercise.countLabel}</span>
              </button>
              <button
                type="button"
                className="exercise-card"
                onClick={() => setPage(fillBlankMeta.id)}
              >
                <span className="exercise-card-icon">{fillBlankMeta.icon}</span>
                <span className="exercise-card-name">{fillBlankMeta.name}</span>
                <span className="exercise-card-count">{fillBlankMeta.countLabel}</span>
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
      ) : page === 'fill-blank' ? (
        <FillBlankExercise
          key="fill-blank"
          exercises={fillBlankExercises}
          title={fillBlankMeta.title}
        />
      ) : page === 'cours-et' ? (
        <CoursEt key="cours-et" />
      ) : page === 'verb-list' ? (
        <VerbList key="verb-list" />
      ) : page === 'noun-list' ? (
        <NounList key="noun-list" />
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
