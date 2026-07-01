import { useState } from 'react'
import { jasonVocabulary } from '../data/jason-vovabulary'
import { matchesFrenchSearch } from '../utils/matchesFrenchSearch'
import { SearchBar } from './SearchBar'

export function DevsideList() {
  const [query, setQuery] = useState('')
  const filtered = jasonVocabulary.filter((entry) => matchesFrenchSearch(query, entry.french))

  return (
    <div className="verb-list">
      <h2 className="exercise-title">Devside</h2>
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Rechercher un terme…"
      />
      {filtered.length === 0 ? (
        <p className="verb-list-empty">Aucun terme trouvé.</p>
      ) : (
        <table className="verb-list-table">
          <thead>
            <tr>
              <th scope="col">N°</th>
              <th scope="col">Français</th>
              <th scope="col">English</th>
              <th scope="col">Hébreu</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry) => (
              <tr key={entry.id}>
                <td className="verb-list-num">{entry.id}</td>
                <td className="verb-list-french">{entry.french}</td>
                <td className="verb-list-infinitive">{entry.english}</td>
                <td className="verb-list-infinitive">
                  <span className="verb-list-hebrew" dir="rtl">
                    {entry.hebrew}
                  </span>
                  <span className="verb-list-transcription">({entry.transcription})</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
