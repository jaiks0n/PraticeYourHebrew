import { useState } from 'react'
import { vocabulary } from '../data/vocabulary-verbes'
import { matchesFrenchSearch } from '../utils/matchesFrenchSearch'
import { SearchBar } from './SearchBar'

export function VerbList() {
  const [query, setQuery] = useState('')
  const filtered = vocabulary.filter((verb) => matchesFrenchSearch(query, verb.french))

  return (
    <div className="verb-list">
      <h2 className="exercise-title">Liste des verbes</h2>
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Rechercher un verbe…"
      />
      {filtered.length === 0 ? (
        <p className="verb-list-empty">Aucun verbe trouvé.</p>
      ) : (
        <table className="verb-list-table">
          <thead>
            <tr>
              <th scope="col">N°</th>
              <th scope="col">Français</th>
              <th scope="col">Infinitif</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((verb) => {
              const infinitive = verb.conjugation?.infinitive
              const hebrew = infinitive?.hebrew ?? verb.hebrew
              const transcription = infinitive?.transcription ?? verb.transcription

              return (
                <tr key={verb.id}>
                  <td className="verb-list-num">{verb.id}</td>
                  <td className="verb-list-french">{verb.french}</td>
                  <td className="verb-list-infinitive">
                    <span className="verb-list-hebrew" dir="rtl">
                      {hebrew}
                    </span>
                    <span className="verb-list-transcription">({transcription})</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
