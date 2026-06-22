import { useEffect, useMemo, useState } from 'react'
import { FillBlankExercise } from './components/FillBlankExercise'
import { FlashcardExercise } from './components/FlashcardExercise'
import { GenderQuizExercise } from './components/GenderQuizExercise'
import { Layout } from './components/Layout'
import type { FillBlankExercise as FillBlankExerciseType } from './data/fill-blank-exercises'
import { vocabularyNoms } from './data/vocabulaire/noms'
import type { VocabularyEntry } from './data/types'

type Page = 'home' | 'flashcards-verbs' | 'flashcards-noms' | 'gender-quiz' | 'fill-blank'

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
  title: 'Phrases à trous',
}

function DataMessage({ message, error }: { message: string; error?: boolean }) {
  return (
    <p className={error ? 'data-status data-status--error' : 'data-status'}>
      {message}
    </p>
  )
}

function App() {
  const [page, setPage] = useState<Page>('home')
  const [verbs, setVerbs] = useState<VocabularyEntry[]>([])
  const [verbsLoading, setVerbsLoading] = useState(true)
  const [verbsError, setVerbsError] = useState<string | null>(null)
  const [fillBlankExercises, setFillBlankExercises] = useState<FillBlankExerciseType[]>([])
  const [fillBlankLoading, setFillBlankLoading] = useState(true)
  const [fillBlankError, setFillBlankError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/verbs', { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('Impossible de charger les verbes')
        return res.json()
      })
      .then((data: VocabularyEntry[]) => {
        if (!Array.isArray(data)) throw new Error('Réponse invalide')
        setVerbs(data)
      })
      .catch((err) => {
        setVerbsError(err instanceof Error ? err.message : 'Erreur de chargement')
      })
      .finally(() => setVerbsLoading(false))
  }, [])

  useEffect(() => {
    fetch('/api/fill-blank-exercises', { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('Impossible de charger les phrases à trous')
        return res.json()
      })
      .then((data: FillBlankExerciseType[]) => {
        if (!Array.isArray(data)) throw new Error('Réponse invalide')
        setFillBlankExercises(data)
      })
      .catch((err) => {
        setFillBlankError(err instanceof Error ? err.message : 'Erreur de chargement')
      })
      .finally(() => setFillBlankLoading(false))
  }, [])

  const flashcardLexiques = useMemo(
    () => [
      {
        id: 'flashcards-verbs' as const,
        icon: '🧑🏼‍🏫',
        name: 'Verbes',
        cards: verbs,
        title: 'Verbes',
        loading: verbsLoading,
        error: verbsError,
      },
      {
        id: 'flashcards-noms' as const,
        icon: '📚',
        name: 'Noms',
        cards: vocabularyNoms,
        title: 'Noms',
        loading: false,
        error: null,
      },
    ],
    [verbs, verbsLoading, verbsError],
  )

  const activeFlashcardLexique = flashcardLexiques.find((lexique) => lexique.id === page)

  const fillBlankUnavailable = fillBlankLoading || fillBlankError !== null || fillBlankExercises.length === 0

  return (
    <Layout
      showBack={page !== 'home'}
      onBack={() => setPage('home')}
    >
      {page === 'home' ? (
        verbsLoading ? (
          <DataMessage message="Chargement…" />
        ) : (
        <div className="home">
          <h2 className="home-title">Choisissez un mode</h2>

          <section className="home-section">
            <h3 className="home-section-title">Lexiques</h3>
            <div className="exercise-list">
              {flashcardLexiques.map((lexique) => {
                const unavailable = lexique.loading || lexique.error !== null || lexique.cards.length === 0
                const countLabel = lexique.loading
                  ? 'Chargement…'
                  : lexique.error
                    ? 'Indisponible'
                    : `${lexique.cards.length} cartes`

                return (
                  <button
                    key={lexique.id}
                    type="button"
                    className={`exercise-card${unavailable ? ' exercise-card--disabled' : ''}`}
                    disabled={unavailable}
                    onClick={() => setPage(lexique.id)}
                  >
                    <span className="exercise-card-icon">{lexique.icon}</span>
                    <span className="exercise-card-name">{lexique.name}</span>
                    <span className="exercise-card-count">{countLabel}</span>
                  </button>
                )
              })}
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
              <button
                type="button"
                className={`exercise-card${fillBlankUnavailable ? ' exercise-card--disabled' : ''}`}
                disabled={fillBlankUnavailable}
                onClick={() => setPage(fillBlankMeta.id)}
              >
                <span className="exercise-card-icon">{fillBlankMeta.icon}</span>
                <span className="exercise-card-name">{fillBlankMeta.name}</span>
                <span className="exercise-card-count">
                  {fillBlankLoading
                    ? 'Chargement…'
                    : fillBlankError
                      ? 'Indisponible'
                      : fillBlankMeta.countLabel}
                </span>
              </button>
            </div>
          </section>
        </div>
        )
      ) : page === 'gender-quiz' ? (
        <GenderQuizExercise
          key="gender-quiz"
          words={vocabularyNoms}
          title={genderQuizExercise.title}
        />
      ) : page === 'fill-blank' ? (
        fillBlankLoading ? (
          <DataMessage message="Chargement des phrases à trous…" />
        ) : fillBlankError ? (
          <DataMessage message={fillBlankError} error />
        ) : (
          <FillBlankExercise
            key="fill-blank"
            exercises={fillBlankExercises}
            title={fillBlankMeta.title}
          />
        )
      ) : activeFlashcardLexique ? (
        activeFlashcardLexique.id === 'flashcards-verbs' && verbsLoading ? (
          <DataMessage message="Chargement des verbes…" />
        ) : activeFlashcardLexique.id === 'flashcards-verbs' && verbsError ? (
          <DataMessage message={verbsError} error />
        ) : (
          <FlashcardExercise
            key={activeFlashcardLexique.id}
            cards={activeFlashcardLexique.cards}
            title={activeFlashcardLexique.title}
          />
        )
      ) : null}
    </Layout>
  )
}

export default App
