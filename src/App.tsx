import { useEffect, useMemo, useState } from 'react'
import { FillBlankExercise } from './components/FillBlankExercise'
import { FlashcardExercise } from './components/FlashcardExercise'
import { GenderQuizExercise } from './components/GenderQuizExercise'
import { Layout } from './components/Layout'
import {
  fillBlankExercises as fillBlankLocal,
  type FillBlankExercise as FillBlankExerciseType,
} from './data/fill-blank-exercises'
import { vocabularyNoms } from './data/vocabulaire/noms'
import { vocabulary as vocabularyLocal } from './data/vocabulary'
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

function mergeFillBlankFromApi(apiExercises: FillBlankExerciseType[]): FillBlankExerciseType[] {
  const apiById = new Map(apiExercises.map((exercise) => [exercise.id, exercise]))
  return fillBlankLocal.map((local) => {
    const fromApi = apiById.get(local.id)
    if (!fromApi) return local
    return {
      ...fromApi,
      sentenceTranscription:
        fromApi.sentenceTranscription || local.sentenceTranscription,
    }
  })
}

function App() {
  const [page, setPage] = useState<Page>('home')
  const [verbs, setVerbs] = useState<VocabularyEntry[]>(vocabularyLocal)
  const [fillBlankExercises, setFillBlankExercises] =
    useState<FillBlankExerciseType[]>(fillBlankLocal)

  useEffect(() => {
    fetch('/api/verbs')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('API indisponible'))))
      .then((data: VocabularyEntry[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setVerbs(data)
        }
      })
      .catch(() => {
        // Fallback : lexique local tant que MongoDB n'est pas importé ou API hors ligne
      })
  }, [])

  useEffect(() => {
    fetch('/api/fill-blank-exercises')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('API indisponible'))))
      .then((data: FillBlankExerciseType[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setFillBlankExercises(mergeFillBlankFromApi(data))
        }
      })
      .catch(() => {
        // Fallback : exercices locaux
      })
  }, [])

  const flashcardLexiques = useMemo(
    () => [
      {
        id: 'flashcards-verbs' as const,
        icon: '🧑🏼‍🏫',
        name: 'Verbes',
        cards: verbs,
        title: 'Verbes',
      },
      {
        id: 'flashcards-noms' as const,
        icon: '📚',
        name: 'Noms',
        cards: vocabularyNoms,
        title: 'Noms',
      },
    ],
    [verbs],
  )

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
