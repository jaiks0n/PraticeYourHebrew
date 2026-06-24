import { vocabularyNoms } from '../data/vocabulary-noms'
import { formatHebrewDisplay, formatTranscriptionDisplay } from '../utils/formatNounHebrew'

const GENDER_LABELS = {
  masculine: 'm.',
  feminine: 'f.',
} as const

export function NounList() {
  return (
    <div className="verb-list">
      <h2 className="exercise-title">Liste des noms</h2>
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
          {vocabularyNoms.map((noun) => (
            <tr key={noun.id}>
              <td className="verb-list-num">{noun.id}</td>
              <td className="verb-list-french">
                {noun.french}
                {noun.note && <span className="verb-list-note">{noun.note}</span>}
              </td>
              <td className="verb-list-infinitive">
                <span className="verb-list-hebrew" dir="rtl">
                  {formatHebrewDisplay(noun)}
                </span>
                <span className="verb-list-transcription">({formatTranscriptionDisplay(noun)})</span>
              </td>
              <td className="verb-list-gender">
                {noun.gender ? GENDER_LABELS[noun.gender] : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
