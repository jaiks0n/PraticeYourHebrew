import { useCallback, useMemo, useState } from 'react'
import type { NounGender, NounGenderEntry } from '../data/types'
import '../styles/gender-quiz.css'

const QUIZ_SIZE = 10

interface GenderQuizExerciseProps {
  words: NounGenderEntry[]
  title?: string
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function pickQuizWords(words: NounGenderEntry[], count: number): NounGenderEntry[] {
  return shuffleArray(words).slice(0, Math.min(count, words.length))
}

const GENDER_LABELS: Record<NounGender, string> = {
  masculine: 'Masculin',
  feminine: 'Féminin',
}

export function GenderQuizExercise({ words, title }: GenderQuizExerciseProps) {
  const [quizKey, setQuizKey] = useState(0)
  const quizWords = useMemo(() => pickQuizWords(words, QUIZ_SIZE), [words, quizKey])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<NounGender | null>(null)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const currentWord = quizWords[currentIndex]
  const isAnswered = selectedAnswer !== null

  const startNewQuiz = useCallback(() => {
    setQuizKey((key) => key + 1)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setIsFinished(false)
  }, [])

  const handleAnswer = (gender: NounGender) => {
    if (isAnswered || !currentWord) return

    setSelectedAnswer(gender)
    if (gender === currentWord.gender) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < quizWords.length - 1) {
      setCurrentIndex((i) => i + 1)
      setSelectedAnswer(null)
    } else {
      setIsFinished(true)
    }
  }

  if (isFinished) {
    return (
      <div className="gender-quiz">
        {title && <h2 className="exercise-title">{title}</h2>}
        <div className="gender-quiz-card gender-quiz-result">
          <p className="gender-quiz-result-score">
            {score} / {quizWords.length}
          </p>
          <p className="gender-quiz-result-message">
            {score === quizWords.length
              ? 'Parfait !'
              : score >= quizWords.length / 2
                ? 'Bon travail !'
                : 'Continuez à vous entraîner !'}
          </p>
          <button type="button" className="btn btn-primary" onClick={startNewQuiz}>
            Nouveau quiz
          </button>
        </div>
      </div>
    )
  }

  if (!currentWord) return null

  const isCorrect = selectedAnswer === currentWord.gender

  const getButtonClass = (gender: NounGender) => {
    if (!isAnswered) {
      return gender === 'masculine' ? 'gender-btn gender-btn-masc' : 'gender-btn gender-btn-fem'
    }
    if (gender === currentWord.gender) return 'gender-btn correct'
    if (gender === selectedAnswer) return 'gender-btn incorrect'
    return 'gender-btn neutral-disabled'
  }

  return (
    <div className="gender-quiz">
      {title && <h2 className="exercise-title">{title}</h2>}

      <div className="gender-quiz-stats">
        <p className="gender-quiz-stat">
          {currentIndex + 1} / {quizWords.length}
        </p>
        <p className="gender-quiz-stat">{score} bonne{score !== 1 ? 's' : ''} réponse{score !== 1 ? 's' : ''}</p>
      </div>

      <div className="gender-quiz-card">
        <span className="flip-card-label">Hébreu</span>
        <p className="gender-quiz-hebrew" dir="rtl" lang="he">
          {currentWord.hebrew}
        </p>
        <p className="gender-quiz-transcription">{currentWord.transcription}</p>

        {isAnswered && (
          <>
            <p className="gender-quiz-french">{currentWord.french}</p>
            <p className={`gender-quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect
                ? 'Correct !'
                : `Incorrect — ${GENDER_LABELS[currentWord.gender]}`}
            </p>
          </>
        )}
      </div>

      <div className="gender-quiz-buttons">
        <button
          type="button"
          className={getButtonClass('masculine')}
          onClick={() => handleAnswer('masculine')}
          disabled={isAnswered}
        >
          Masculin
        </button>
        <button
          type="button"
          className={getButtonClass('feminine')}
          onClick={() => handleAnswer('feminine')}
          disabled={isAnswered}
        >
          Féminin
        </button>
      </div>

      {isAnswered && (
        <button type="button" className="btn btn-primary" onClick={handleNext}>
          {currentIndex < quizWords.length - 1 ? 'Suivant' : 'Voir le score'}
        </button>
      )}
    </div>
  )
}
