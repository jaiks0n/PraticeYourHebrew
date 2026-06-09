import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  onBack?: () => void
  showBack?: boolean
}

export function Layout({ children, onBack, showBack = false }: LayoutProps) {
  return (
    <div className="layout">
      <header className="header">
        {showBack && onBack ? (
          <button type="button" className="btn-back" onClick={onBack}>
            ← Accueil
          </button>
        ) : (
          <div />
        )}
        <h1 className="site-title">Practice Your Hebrew</h1>
        <p className="site-subtitle">Entraînez-vous à l'oral, une carte à la fois</p>
      </header>
      <main className="main">{children}</main>
    </div>
  )
}
