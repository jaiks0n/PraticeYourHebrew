import { vocabulary } from '../data/vocabulary'

export function VerbList() {
  return (
    <div className="verb-list">
      <h2 className="exercise-title">Liste des verbes</h2>
      <table className="verb-list-table">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Français</th>
            <th scope="col">Infinitif</th>
          </tr>
        </thead>
        <tbody>
          {vocabulary.map((verb) => {
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
    </div>
  )
}
