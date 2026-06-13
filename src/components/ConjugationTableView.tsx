import type { ConjugationCell, ConjugationImperativeKey, ConjugationPersonKey, ConjugationTable } from '../data/types'
import '../styles/conjugation-table.css'

const IMPERATIVE_COLS: { key: ConjugationImperativeKey; label: string }[] = [
  { key: 'msg', label: 'm.' },
  { key: 'fsg', label: 'f.' },
  { key: 'mpl', label: 'm. pl.' },
  { key: 'fpl', label: 'f. pl.' },
]

function Cell({ cell }: { cell?: ConjugationCell }) {
  if (!cell) return <td className="conj-cell conj-cell--empty">—</td>
  return (
    <td className="conj-cell">
      <span className="conj-cell-hebrew" dir="rtl" lang="he">{cell.hebrew}</span>
      <span className="conj-cell-transcription">{cell.transcription}</span>
      {cell.french && <span className="conj-cell-french">{cell.french}</span>}
    </td>
  )
}

function FourColGrid({
  title,
  forms,
}: {
  title: string
  forms: Partial<Record<ConjugationImperativeKey, ConjugationCell>>
}) {
  const hasAny = IMPERATIVE_COLS.some(({ key }) => forms[key])
  if (!hasAny) return null

  return (
    <section className="conj-section">
      <h3 className="conj-section-title">{title}</h3>
      <table className="conj-table conj-table--imperative">
        <thead>
          <tr>
            {IMPERATIVE_COLS.map(({ key, label }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {IMPERATIVE_COLS.map(({ key }) => (
              <Cell key={key} cell={forms[key]} />
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  )
}
function TenseGrid({
  title,
  forms,
}: {
  title: string
  forms: Partial<Record<ConjugationPersonKey, ConjugationCell>>
}) {
  const row1Keys: ConjugationPersonKey[] = ['1sg']
  const row2Keys: ConjugationPersonKey[] = ['2msg', '2fsg', '2mpl', '2fpl']
  const row3Keys: ConjugationPersonKey[] = ['3msg', '3fsg', '3pl']

  const hasAny = [...row1Keys, ...row2Keys, ...row3Keys].some((k) => forms[k])
  if (!hasAny) return null

  return (
    <section className="conj-section">
      <h3 className="conj-section-title">{title}</h3>
      <table className="conj-table">
        <thead>
          <tr>
            <th className="conj-th-person" />
            <th colSpan={2}>Singulier</th>
            <th colSpan={2}>Pluriel</th>
          </tr>
          <tr>
            <th />
            <th>m.</th>
            <th>f.</th>
            <th>m.</th>
            <th>f.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="conj-th-person">1re</th>
            <Cell cell={forms['1sg']} />
            <td className="conj-cell conj-cell--empty" />
            <Cell cell={forms['1pl']} />
            <td className="conj-cell conj-cell--empty" />
          </tr>
          <tr>
            <th className="conj-th-person">2e</th>
            <Cell cell={forms['2msg']} />
            <Cell cell={forms['2fsg']} />
            <Cell cell={forms['2mpl']} />
            <Cell cell={forms['2fpl']} />
          </tr>
          <tr>
            <th className="conj-th-person">3e</th>
            <Cell cell={forms['3msg']} />
            <Cell cell={forms['3fsg']} />
            <Cell cell={forms['3pl'] ?? forms['3mpl']} />
            <Cell cell={forms['3fpl']} />
          </tr>
        </tbody>
      </table>
    </section>
  )
}

interface ConjugationTableViewProps {
  conjugation: ConjugationTable
  variant?: 'compact' | 'large'
}

export function ConjugationTableView({ conjugation, variant = 'compact' }: ConjugationTableViewProps) {
  return (
    <div className={`conj-table-view${variant === 'large' ? ' conj-table-view--large' : ''}`}>
      {conjugation.present && <FourColGrid title="Présent" forms={conjugation.present} />}
      {conjugation.past && <TenseGrid title="Passé" forms={conjugation.past} />}
      {conjugation.future && <TenseGrid title="Futur" forms={conjugation.future} />}
      {conjugation.imperative && <FourColGrid title="Impératif" forms={conjugation.imperative} />}
      {conjugation.infinitive && (
        <section className="conj-section conj-section--infinitive">
          <h3 className="conj-section-title">Infinitif</h3>
          <div className="conj-infinitive">
            <span className="conj-cell-hebrew" dir="rtl" lang="he">
              {conjugation.infinitive.hebrew}
            </span>
            <span className="conj-cell-transcription">{conjugation.infinitive.transcription}</span>
            {conjugation.infinitive.french && (
              <span className="conj-cell-french">{conjugation.infinitive.french}</span>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
