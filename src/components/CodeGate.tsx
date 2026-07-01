import { useState, type FormEvent } from 'react'
import '../styles/devside.css'

interface CodeGateProps {
  onUnlock: (code: string) => boolean
  onClose?: () => void
  variant?: 'modal' | 'page'
}

export function CodeGate({ onUnlock, onClose, variant = 'page' }: CodeGateProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (onUnlock(code)) {
      setError(false)
      setCode('')
      onClose?.()
      return
    }
    setError(true)
  }

  const form = (
    <form className="code-gate-form" onSubmit={handleSubmit}>
      <h2 className="code-gate-title">Devside</h2>
      <p className="code-gate-desc">Entrez le code d&apos;accès pour continuer.</p>
      <input
        type="password"
        className={`code-gate-input${error ? ' code-gate-input--error' : ''}`}
        value={code}
        onChange={(event) => {
          setCode(event.target.value)
          setError(false)
        }}
        placeholder="Code"
        autoComplete="off"
        autoFocus
      />
      {error && <p className="code-gate-error">Code incorrect.</p>}
      <button type="submit" className="btn btn-primary code-gate-submit">
        Valider
      </button>
    </form>
  )

  if (variant === 'modal') {
    return (
      <div className="code-gate-overlay" onClick={onClose} role="presentation">
        <div
          className="code-gate-modal"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-labelledby="code-gate-title"
        >
          {onClose && (
            <button type="button" className="code-gate-close" onClick={onClose} aria-label="Fermer">
              ×
            </button>
          )}
          {form}
        </div>
      </div>
    )
  }

  return <div className="code-gate-page">{form}</div>
}
