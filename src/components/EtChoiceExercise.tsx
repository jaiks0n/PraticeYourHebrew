import { useCallback, useMemo, useState } from 'react'
import type { EtChoiceAnswer, EtChoiceExercise as EtChoiceExerciseType } from '../data/et-choice-exercises'
import { shuffleArray } from '../utils/shuffleArray'
import shuffleIcon from '../assets/shuffle.svg'
import '../styles/et-choice.css'

interface EtChoiceExerciseProps {
  exercises: EtChoiceExerciseType[]
  title?: string
}

function getBlankState(
  selectedAnswer: EtChoiceAnswer | null,
  isAnswered: boolean,
): 'pending' | 'et' | 'hidden' {
  if (!isAnswered) return 'pending'
  return selectedAnswer === 'את' ? 'et' : 'hidden'
}

export function EtChoiceExercise({ exercises, title }: EtChoiceExerciseProps) {
  const [quizKey, setQuizKey] = useState(0)
  const quizItems = useMemo(
    () => shuffleArray(exercises.filter((ex) => ex.active)),
    [exercises, quizKey],
  )
  const [index, setIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<EtChoiceAnswer | null>(null)

  const handleShuffle = useCallback(() => {
    setQuizKey((key) => key + 1)
    setIndex(0)
    setSelectedAnswer(null)
  }, [])

  const current = quizItems[index]
  const isAnswered = selectedAnswer !== null
  const isLast = index >= quizItems.length - 1

  const handleAnswer = (choice: EtChoiceAnswer) => {
    if (isAnswered || !current) return
    setSelectedAnswer(choice)
  }

  const handleNext = () => {
    if (isLast) return
    setIndex((i) => i + 1)
    setSelectedAnswer(null)
  }

  if (quizItems.length === 0) {
    return (
      <div className="et-choice">
        {title && <h2 className="exercise-title">{title}</h2>}
        <p className="exercise-empty">Aucun exercice disponible.</p>
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

  const blankState = getBlankState(selectedAnswer, isAnswered)

  return (
    <div className="et-choice">
      {title && <h2 className="exercise-title">{title}</h2>}

      <p className="et-choice-stat">
        {index + 1} / {quizItems.length}
      </p>

      <button
        type="button"
        className="btn btn-secondary btn-with-icon exercise-shuffle-btn"
        onClick={handleShuffle}
      >
        <img src={shuffleIcon} alt="" className="btn-icon" width={18} height={18} />
        Mélanger
      </button>

      <div
        className={`et-choice-card${
          isAnswered ? (isCorrect ? ' et-choice-card--correct' : ' et-choice-card--incorrect') : ''
        }`}
      >
        <p className="et-choice-instruction">{current.instruction}</p>

        <p className="et-choice-sentence" dir="rtl" lang="he">
          {current.sentence.before}
          {blankState !== 'hidden' && (
            <>
              {' '}
              <span
                className={
                  blankState === 'pending'
                    ? 'et-choice-blank et-choice-blank--pending'
                    : 'et-choice-blank et-choice-blank--filled'
                }
              >
                {blankState === 'et' ? 'את' : ''}
              </span>
            </>
          )}
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

      {isAnswered && !isLast && (
        <div className="et-choice-nav">
          <button type="button" className="btn btn-primary" onClick={handleNext}>
            Suivant →
          </button>
        </div>
      )}
    </div>
  )
}
