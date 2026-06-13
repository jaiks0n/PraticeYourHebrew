import { useEffect } from 'react'
import type { ConjugationTable } from '../data/types'
import { ConjugationTableView } from './ConjugationTableView'
import '../styles/conjugation-modal.css'

interface ConjugationModalProps {
  french: string
  hebrew: string
  conjugation: ConjugationTable
  onClose: () => void
}

export function ConjugationModal({ french, hebrew, conjugation, onClose }: ConjugationModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="conj-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="conj-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="conj-modal-title"
      >
        <header className="conj-modal-header">
          <div>
            <p className="conj-modal-label">Conjugaison</p>
            <h2 id="conj-modal-title" className="conj-modal-title">
              {french}
            </h2>
            <p className="conj-modal-hebrew" dir="rtl" lang="he">
              {hebrew}
            </p>
          </div>
          <button type="button" className="conj-modal-close" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </header>
        <div className="conj-modal-body">
          <ConjugationTableView conjugation={conjugation} variant="large" />
        </div>
      </div>
    </div>
  )
}
