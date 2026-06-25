import { useCallback, useMemo, useState } from 'react'
import type { EtChoiceAnswer, EtChoiceExercise as EtChoiceExerciseType } from '../data/et-choice-exercises'
import '../styles/et-choice.css'

const QUIZ_SIZE = 5

interface EtChoiceExerciseProps {
  exercises: EtChoiceExerciseType[]
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

function pickQuizExercises(exercises: EtChoiceExerciseType[], count: number): EtChoiceExerciseType[] {
  const active = exercises.filter((ex) => ex.active)
  return shuffleArray(active).slice(0, Math.min(count, active.length))
}

function blankDisplay(answer: EtChoiceAnswer | null, isAnswered: boolean): string {
  if (!isAnswered || answer === null) return '___'
  return answer === 'את' ? 'את' : ''
}

export function EtChoiceExercise({ exercises, title }: EtChoiceExerciseProps) {
  const [quizKey, setQuizKey] = useState(0)
  const quizItems = useMemo(() => pickQuizExercises(exercises, QUIZ_SIZE), [exercises, quizKey])
  const [index, setIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<EtChoiceAnswer | null>(null)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const current = quizItems[index]
  const isAnswered = selectedAnswer !== null
  const isLast = index >= quizItems.length - 1

  const startNewQuiz = useCallback(() => {
    setQuizKey((key) => key + 1)
    setIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setIsFinished(false)
  }, [])

  const handleAnswer = (choice: EtChoiceAnswer) => {
    if (isAnswered || !current) return
    setSelectedAnswer(choice)
    if (choice === current.answer) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (isLast) {
      setIsFinished(true)
    } else {
      setIndex((i) => i + 1)
      setSelectedAnswer(null)
    }
  }

  if (exercises.filter((ex) => ex.active).length === 0) {
    return (
      <div className="et-choice">
        {title && <h2 className="exercise-title">{title}</h2>}
        <p className="exercise-empty">Aucun exercice disponible.</p>
      </div>
    )
  }

  if (isFinished) {
    return (
      <div className="et-choice">
        {title && <h2 className="exercise-title">{title}</h2>}
        <div className="et-choice-card et-choice-result">
          <p className="et-choice-result-score">
            {score} / {quizItems.length}
          </p>
          <p className="et-choice-result-message">
            {score === quizItems.length
              ? 'Parfait !'
              : score >= quizItems.length / 2
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

  if (!current) return null

  const isCorrect = selectedAnswer === current.answer

  const getButtonClass = (choice: EtChoiceAnswer) => {
    const base = choice === 'את' ? 'et-choice-btn et-choice-btn--et' : 'et-choice-btn et-choice-btn--rien'
    if (!isAnswered) return base
    if (choice === current.answer) return `${base} correct`
    if (choice === selectedAnswer) return `${base} incorrect`
    return `${base} neutral-disabled`
  }

  const blankText = blankDisplay(selectedAnswer, isAnswered)
  const blankClass =
    blankText === '' && isAnswered
      ? 'et-choice-blank et-choice-blank--empty'
      : 'et-choice-blank'

  return (
    <div className="et-choice">
      {title && <h2 className="exercise-title">{title}</h2>}

      <div className="et-choice-stats">
        <p className="et-choice-stat">
          {index + 1} / {quizItems.length}
        </p>
        <p className="et-choice-stat">
          {score} bonne{score !== 1 ? 's' : ''} réponse{score !== 1 ? 's' : ''}
        </p>
      </div>

      <div
        className={`et-choice-card${
          isAnswered ? (isCorrect ? ' et-choice-card--correct' : ' et-choice-card--incorrect') : ''
        }`}
      >
        <p className="et-choice-instruction">{current.instruction}</p>

        <p className="et-choice-sentence" dir="rtl" lang="he">
          {current.sentence.before}{' '}
          <span className={blankClass}>{blankText || '\u00a0'}</span>
          {current.sentence.after ? ` ${current.sentence.after}` : ''}
        </p>

        <p className="et-choice-french">{current.french}</p>

        {isAnswered && (
          <>
            <p className={`et-choice-feedback ${isCorrect ? 'et-choice-feedback--correct' : 'et-choice-feedback--incorrect'}`}>
              {isCorrect ? 'Correct !' : `Incorrect — ${current.answer === 'את' ? 'את' : 'rien'}`}
            </p>
            <p className="et-choice-explanation">{current.explanation}</p>
          </>
        )}
      </div>

      <div className="et-choice-options">
        <button
          type="button"
          className={getButtonClass('את')}
          onClick={() => handleAnswer('את')}
          disabled={isAnswered}
        >
          את
        </button>
        <button
          type="button"
          className={getButtonClass('rien')}
          onClick={() => handleAnswer('rien')}
          disabled={isAnswered}
        >
          rien
        </button>
      </div>

      {isAnswered && (
        <div className="et-choice-nav">
          <button type="button" className="btn btn-primary" onClick={handleNext}>
            {isLast ? 'Voir le score' : 'Suivant →'}
          </button>
        </div>
      )}
    </div>
  )
}
