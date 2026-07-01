import { useCallback, useMemo, useState } from 'react'
import type { FillBlankExercise as FillBlankExerciseType } from '../data/fill-blank-exercises'
import { shuffleArray } from '../utils/shuffleArray'
import shuffleIcon from '../assets/shuffle.svg'
import '../styles/fill-blank.css'

const QUIZ_SIZE = 5

interface FillBlankExerciseProps {
  exercises: FillBlankExerciseType[]
  title?: string
}

function pickQuizExercises(exercises: FillBlankExerciseType[], count: number): FillBlankExerciseType[] {
  return shuffleArray(exercises).slice(0, Math.min(count, exercises.length))
}

function normalizeHebrew(text: string): string {
  return text.trim()
}

function formatHint(exercise: FillBlankExerciseType): string {
  const parts = [exercise.hint.infinitiveHebrew, exercise.hint.tense]
  if (exercise.hint.genderLabel) {
    parts.push(exercise.hint.genderLabel)
  }
  return parts.join(', ')
}

export function FillBlankExercise({ exercises, title }: FillBlankExerciseProps) {
  const [quizKey, setQuizKey] = useState(0)
  const quizExercises = useMemo(
    () => pickQuizExercises(exercises, QUIZ_SIZE),
    [exercises, quizKey],
  )
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const exercise = quizExercises[index]
  const isLast = index >= quizExercises.length - 1

  const startNewQuiz = useCallback(() => {
    setQuizKey((key) => key + 1)
    setIndex(0)
    setInput('')
    setChecked(false)
    setIsCorrect(false)
    setScore(0)
    setIsFinished(false)
  }, [])

  const handleShuffle = useCallback(() => {
    startNewQuiz()
  }, [startNewQuiz])

  const handleConfirm = () => {
    if (!exercise || checked || !input.trim()) return
    const ok = normalizeHebrew(input) === normalizeHebrew(exercise.answer.hebrew)
    setIsCorrect(ok)
    setChecked(true)
    if (ok) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (index < quizExercises.length - 1) {
      setIndex((i) => i + 1)
      setInput('')
      setChecked(false)
      setIsCorrect(false)
    } else {
      setIsFinished(true)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !checked && input.trim()) {
      handleConfirm()
    }
  }

  if (exercises.length === 0) {
    return (
      <div className="fill-blank">
        {title && <h2 className="exercise-title">{title}</h2>}
        <p className="exercise-empty">Aucun exercice disponible.</p>
      </div>
    )
  }

  if (isFinished) {
    return (
      <div className="fill-blank">
        {title && <h2 className="exercise-title">{title}</h2>}
        <div className="fill-blank-card fill-blank-result">
          <p className="fill-blank-result-score">
            {score} / {quizExercises.length}
          </p>
          <p className="fill-blank-result-message">
            {score === quizExercises.length
              ? 'Parfait !'
              : score >= quizExercises.length / 2
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

  if (!exercise) {
    return null
  }

  return (
    <div className="fill-blank">
      {title && <h2 className="exercise-title">{title}</h2>}

      <div className="fill-blank-stats">
        <p className="fill-blank-stat">
          {index + 1} / {quizExercises.length}
        </p>
        <p className="fill-blank-stat">
          {score} bonne{score !== 1 ? 's' : ''} réponse{score !== 1 ? 's' : ''}
        </p>
      </div>

      <button
        type="button"
        className="btn btn-secondary btn-with-icon exercise-shuffle-btn"
        onClick={handleShuffle}
      >
        <img src={shuffleIcon} alt="" className="btn-icon" width={18} height={18} />
        Mélanger
      </button>

      <div
        className={`fill-blank-card${
          checked ? (isCorrect ? ' fill-blank-card--correct' : ' fill-blank-card--incorrect') : ''
        }`}
      >
        <p className="fill-blank-sentence" dir="rtl" lang="he">
          {exercise.sentence.beforeBlank}
          {checked ? (
            <span className="fill-blank-answer-word">{exercise.answer.hebrew}</span>
          ) : (
            <input
              type="text"
              className="fill-blank-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              dir="rtl"
              lang="he"
              autoComplete="off"
              spellCheck={false}
              aria-label="Compléter le verbe"
            />
          )}
          {exercise.sentence.afterBlank}
        </p>

        <p className="fill-blank-hint">({formatHint(exercise)})</p>
        <p className="fill-blank-french">{exercise.french}</p>

        {checked && isCorrect && (
          <p className="fill-blank-feedback fill-blank-feedback--correct">Bonne réponse !</p>
        )}

        {checked && !isCorrect && (
          <p className="fill-blank-feedback fill-blank-feedback--incorrect">
            Mauvaise réponse. La bonne réponse :{' '}
            <span dir="rtl" lang="he">{exercise.answer.hebrew}</span>
            {' '}({exercise.answer.transcription})
          </p>
        )}

        {checked && (
          <div className="fill-blank-transcription-block">
            <p className="fill-blank-transcription-label">Transcription de la phrase</p>
            <p className="fill-blank-sentence-transcription">
              {exercise.sentenceTranscription}
            </p>
          </div>
        )}
      </div>

      <div className="fill-blank-actions">
        {!checked ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={!input.trim()}
          >
            Confirmer
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={handleNext}>
            {isLast ? 'Voir le score' : 'Suivant'}
          </button>
        )}
      </div>
    </div>
  )
}
