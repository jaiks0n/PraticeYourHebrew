import { useState } from 'react'
import { vocabularyPapa } from '../data/vocabulary-papa'
import { formatHebrewDisplay, formatTranscriptionDisplay } from '../utils/formatNounHebrew'
import { matchesFrenchSearch } from '../utils/matchesFrenchSearch'
import { SearchBar } from './SearchBar'

const GENDER_LABELS = {
  masculine: 'm.',
  feminine: 'f.',
} as const

export function PapaList() {
  const [query, setQuery] = useState('')
  const filtered = vocabularyPapa.filter((item) => matchesFrenchSearch(query, item.french))

  return (
    <div className="verb-list">
      <h2 className="exercise-title">Papa (aliments)</h2>
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Rechercher un aliment…"
      />
      {filtered.length === 0 ? (
        <p className="verb-list-empty">Aucun aliment trouvé.</p>
      ) : (
        <table className="verb-list-table">
          <thead>
            <tr>
              <th scope="col">N°</th>
              <th scope="col">Français</th>
              <th scope="col">Hébreu</th>
              <th scope="col">Genre</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td className="verb-list-num">{item.id}</td>
                <td className="verb-list-french">
                  {item.french}
                  {item.note && <span className="verb-list-note">{item.note}</span>}
                </td>
                <td className="verb-list-infinitive">
                  <span className="verb-list-hebrew" dir="rtl">
                    {formatHebrewDisplay(item)}
                  </span>
                  <span className="verb-list-transcription">({formatTranscriptionDisplay(item)})</span>
                </td>
                <td className="verb-list-gender">
                  {item.gender ? GENDER_LABELS[item.gender] : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
