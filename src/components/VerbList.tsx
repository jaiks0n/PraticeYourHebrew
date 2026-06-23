import { vocabulary } from '../data/vocabulary'

export function VerbList() {
  return (
    <div className="verb-list">
      <h2 className="exercise-title">Liste des verbes</h2>
      <ol>
        {vocabulary.map((verb) => (
          <li key={verb.id}>{verb.french}</li>
        ))}
      </ol>
    </div>
  )
}
