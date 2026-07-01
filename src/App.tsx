import { useState } from 'react'
import { CodeGate } from './components/CodeGate'
import { CoursEt } from './components/CoursEt'
import { DevsideFlashcardExercise } from './components/DevsideFlashcardExercise'
import { DevsideList } from './components/DevsideList'
import { EtChoiceExercise } from './components/EtChoiceExercise'
import { NounList } from './components/NounList'
import { PapaList } from './components/PapaList'
import { VerbList } from './components/VerbList'
import { FillBlankExercise } from './components/FillBlankExercise'
import { FlashcardExercise } from './components/FlashcardExercise'
import { GenderQuizExercise } from './components/GenderQuizExercise'
import { Layout } from './components/Layout'
import { jasonVocabulary } from './data/jason-vovabulary'
import { etChoiceExercises } from './data/et-choice-exercises'
import { fillBlankExercises } from './data/fill-blank-exercises'
import { vocabularyNoms } from './data/vocabulary-noms'
import { vocabularyPapa } from './data/vocabulary-papa'
import { vocabulary } from './data/vocabulary-verbes'
import { useDevsideAccess } from './hooks/useDevsideAccess'
import './styles/devside.css'

type Page =
  | 'home'
  | 'cours-et'
  | 'flashcards-verbs'
  | 'flashcards-noms'
  | 'gender-quiz'
  | 'et-choice'
  | 'fill-blank'
  | 'verb-list'
  | 'noun-list'
  | 'devside-flashcards'
  | 'devside-list'
  | 'flashcards-papa'
  | 'papa-list'

const lexiqueDecks = [
  {
    flashcard: {
      id: 'flashcards-verbs' as const,
      icon: '🧑🏼‍🏫',
      name: 'Verbes',
      cards: vocabulary,
      title: 'Verbes',
    },
    list: {
      id: 'verb-list' as const,
      name: 'Liste des verbes',
      countLabel: `${vocabulary.length} verbes`,
    },
  },
  {
    flashcard: {
      id: 'flashcards-noms' as const,
      icon: '📚',
      name: 'Noms',
      cards: vocabularyNoms,
      title: 'Noms',
    },
    list: {
      id: 'noun-list' as const,
      name: 'Liste des noms',
      countLabel: `${vocabularyNoms.length} noms`,
    },
  },
  {
    flashcard: {
      id: 'flashcards-papa' as const,
      icon: '🍎',
      name: 'Papa (aliments)',
      cards: vocabularyPapa,
      title: 'Papa (aliments)',
    },
    list: {
      id: 'papa-list' as const,
      name: 'Liste Papa (aliments)',
      countLabel: `${vocabularyPapa.length} aliments`,
    },
  },
]

const genderQuizExercise = {
  id: 'gender-quiz' as const,
  icon: '⚖️',
  name: 'Genre des noms',
  countLabel: `Quiz de 10 mots`,
  title: 'Genre des noms',
}

const etChoiceMeta = {
  id: 'et-choice' as const,
  icon: 'את',
  name: 'את ou rien',
  countLabel: `${etChoiceExercises.filter((ex) => ex.active).length} phrases`,
  title: 'את ou rien',
}

const fillBlankMeta = {
  id: 'fill-blank' as const,
  icon: '✏️',
  name: 'Phrases à trous',
  countLabel: 'Quiz de 5 phrases',
  title: 'Phrases à trou',
}

const devsideTitle = 'Devside'

function App() {
  const [page, setPage] = useState<Page>('home')
  const [showCodeModal, setShowCodeModal] = useState(false)
  const { isUnlocked, unlock } = useDevsideAccess()

  const activeFlashcardLexique = lexiqueDecks.find((deck) => deck.flashcard.id === page)?.flashcard
  const isDevsidePage = page === 'devside-flashcards' || page === 'devside-list'

  const renderDevsidePage = () => {
    if (!isUnlocked) {
      return <CodeGate onUnlock={unlock} />
    }

    if (page === 'devside-flashcards') {
      return <DevsideFlashcardExercise key="devside-flashcards" title={devsideTitle} />
    }

    return <DevsideList key="devside-list" />
  }

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
            <div className="lexique-decks">
              {lexiqueDecks.map((deck) => (
                <div key={deck.flashcard.id} className="lexique-deck-column">
                  <button
                    type="button"
                    className="exercise-card"
                    onClick={() => setPage(deck.flashcard.id)}
                  >
                    <span className="exercise-card-icon">{deck.flashcard.icon}</span>
                    <span className="exercise-card-name">{deck.flashcard.name}</span>
                    <span className="exercise-card-count">{deck.flashcard.cards.length} cartes</span>
                  </button>
                  <button
                    type="button"
                    className="exercise-card"
                    onClick={() => setPage(deck.list.id)}
                  >
                    <span className="exercise-card-icon">📋</span>
                    <span className="exercise-card-name">{deck.list.name}</span>
                    <span className="exercise-card-count">{deck.list.countLabel}</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {isUnlocked && (
            <section className="home-section">
              <h3 className="home-section-title">Devside</h3>
              <div className="lexique-decks">
                <div className="lexique-deck-column">
                  <button
                    type="button"
                    className="exercise-card"
                    onClick={() => setPage('devside-flashcards')}
                  >
                    <span className="exercise-card-icon">💻</span>
                    <span className="exercise-card-name">Lexique</span>
                    <span className="exercise-card-count">{jasonVocabulary.length} cartes</span>
                  </button>
                  <button
                    type="button"
                    className="exercise-card"
                    onClick={() => setPage('devside-list')}
                  >
                    <span className="exercise-card-icon">📋</span>
                    <span className="exercise-card-name">Liste</span>
                    <span className="exercise-card-count">{jasonVocabulary.length} termes</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          <section className="home-section">
            <h3 className="home-section-title">Exercices</h3>
            <div className="exercise-list exercise-list--grid-2">
              <button
                type="button"
                className="exercise-card"
                onClick={() => setPage(etChoiceMeta.id)}
              >
                <span className="exercise-card-icon">{etChoiceMeta.icon}</span>
                <span className="exercise-card-name">{etChoiceMeta.name}</span>
                <span className="exercise-card-count">{etChoiceMeta.countLabel}</span>
              </button>
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

          <button
            type="button"
            className="devside-entry"
            onClick={() => {
              if (isUnlocked) return
              setShowCodeModal(true)
            }}
          >
            Devside
          </button>

          {showCodeModal && !isUnlocked && (
            <CodeGate
              variant="modal"
              onUnlock={unlock}
              onClose={() => setShowCodeModal(false)}
            />
          )}
        </div>
      ) : page === 'gender-quiz' ? (
        <GenderQuizExercise
          key="gender-quiz"
          words={vocabularyNoms}
          title={genderQuizExercise.title}
        />
      ) : page === 'et-choice' ? (
        <EtChoiceExercise
          key="et-choice"
          exercises={etChoiceExercises}
          title={etChoiceMeta.title}
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
      ) : page === 'papa-list' ? (
        <PapaList key="papa-list" />
      ) : isDevsidePage ? (
        renderDevsidePage()
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
