import '../styles/cours-et.css'

interface Example {
  french: string
  hebrew: string
}

interface ArticleRule {
  article: string
  type: string
  useEt: boolean
}

interface EtRule {
  situation: string
  useEt: boolean
  useEtLabel: string
  hebrew: string
  french: string
  explanation: string
}

interface PronounRow {
  person: string
  hebrew: string
  french: string
}

interface ComparisonPair {
  indefinite: Example
  definite: Example
}

const transitiveExamples: Example[] = [
  { french: 'Je mange quoi ? → une pomme', hebrew: '?אני אוכל מה' },
  { french: 'Je vois qui ? → David', hebrew: '?אני רואה את מי' },
  { french: "J'aime quoi ? → la musique", hebrew: '?אני אוהב את מה' },
]

const intransitiveExamples: Example[] = [
  { french: 'Je cours (quoi ? → impossible)', hebrew: 'אני רץ' },
  { french: 'Il dort (quoi ? → impossible)', hebrew: 'הוא ישן'},
  { french: 'Elle pleure (quoi ? → impossible)', hebrew: 'היא בוכה' },
  { french: 'Nous arrivons (quoi ? → impossible)', hebrew: 'אנחנו מגיעים' },
]

const definiteExamples: Example[] = [
  { french: 'passe-moi la pomme (on sait laquelle)', hebrew: 'תן לי את התפוח' },
  { french: "j'ai vu le film (un film précis)", hebrew: 'ראיתי את הסרט'},
  { french: "j'aime David (une personne précise)", hebrew: 'אני אוהב את דוד' },
]

const indefiniteExamples: Example[] = [
  { french: "je mange une pomme (n'importe laquelle)", hebrew: 'אני אוכל תפוח' },
  { french: "j'ai vu un film (quelconque)", hebrew: 'ראיתי סרט' },
  { french: 'je cherche un appartement', hebrew: 'אני מחפש דירה' },
]

const articleRules: ArticleRule[] = [
  { article: 'un / une / des', type: 'Indéfini', useEt: false },
  { article: 'le / la / les', type: 'Défini', useEt: true },
  { article: 'Nom propre (David, Paris...)', type: 'Toujours défini', useEt: true },
  { article: 'Possessif (mon, ton, son...)', type: 'Toujours défini', useEt: true },
]

const fullRules: EtRule[] = [
  {
    situation: 'Verbe intransitif',
    useEt: false,
    useEtLabel: 'JAMAIS',
    hebrew: 'אני רץ',
    french: 'Je cours',
    explanation: "Pas d'objet direct possible",
  },
  {
    situation: 'Transitif + objet indéfini (un/une/des)',
    useEt: false,
    useEtLabel: 'NON',
    hebrew: 'אני אוכל תפוח',
    french: 'Je mange une pomme',
    explanation: "L'objet n'est pas précis",
  },
  {
    situation: 'Transitif + objet défini (le/la/les)',
    useEt: true,
    useEtLabel: 'OUI',
    hebrew: 'אני אוכל את התפוח',
    french: 'Je mange la pomme',
    explanation: "L'objet est précis, identifiable",
  },
  {
    situation: 'Transitif + nom propre',
    useEt: true,
    useEtLabel: 'OUI',
    hebrew: 'פגשתי את דוד',
    french: "J'ai rencontré David",
    explanation: 'Un nom propre est toujours défini',
  },
  {
    situation: 'Transitif + pronom (moi, toi, lui...)',
    useEt: true,
    useEtLabel: 'OUI (fusionné)',
    hebrew: 'אני אוהב אותך',
    french: "Je t'aime",
    explanation: 'את se fusionne avec le pronom',
  },
  {
    situation: 'Transitif + possessif (mon, ton, son...)',
    useEt: true,
    useEtLabel: 'OUI',
    hebrew: 'שכחתי את המפתחות שלי',
    french: "J'ai oublié mes clés",
    explanation: "Un possessif rend l'objet défini",
  },
]

const properNameExamples: Example[] = [
  { french: "J'ai rencontré David", hebrew: 'פגשתי את דוד' },
  { french: "J'aime Jérusalem", hebrew: 'אני אוהב את ירושלים' },
  { french: 'Elle connaît Sarah', hebrew: 'היא מכירה את שרה' },
]

const pronounTable: PronounRow[] = [
  { person: '1ère sg.', hebrew: 'אוֹתִי', french: 'me / moi' },
  { person: '2ème sg. m.', hebrew: 'אוֹתְךָ', french: 'te / toi (m.)' },
  { person: '2ème sg. f.', hebrew: 'אוֹתָךְ', french: 'te / toi (f.)' },
  { person: '3ème sg. m.', hebrew: 'אוֹתוֹ',  french: 'le / lui' },
  { person: '3ème sg. f.', hebrew: 'אוֹתָהּ',  french: 'la / elle' },
  { person: '1ère pl.', hebrew: 'אוֹתָנוּ',  french: 'nous' },
  { person: '2ème pl. m.', hebrew: 'אֶתְכֶם',  french: 'vous (m.)' },
  { person: '2ème pl. f.', hebrew: 'אֶתְכֶן',  french: 'vous (f.)' },
  { person: '3ème pl. m.', hebrew: 'אוֹתָם',  french: 'les / eux (m.)' },
  { person: '3ème pl. f.', hebrew: 'אוֹתָן',  french: 'les / elles (f.)' },
]

const pronounExamples: Example[] = [
  { french: "Je t'aime", hebrew: 'אני אוהב אותך' },
  { french: "Il m'a vu", hebrew: 'הוא ראה אותי' },
  { french: 'Elle les connaît', hebrew: 'היא מכירה אותם' },
]

const possessiveExamples: Example[] = [
  { french: "J'ai oublié mes clés", hebrew: 'שכחתי את המפתחות שלי' },
  { french: 'Il a pris mon livre', hebrew: 'הוא לקח את הספר שלי' },
]

const comparisons: ComparisonPair[] = [
  {
    indefinite: { french: 'Je lis UN livre', hebrew: 'אני קורא ספר' },
    definite: { french: 'Je lis LE livre', hebrew: 'אני קורא את הספר' },
  },
  {
    indefinite: { french: "J'ai acheté UNE voiture", hebrew: 'קניתי מכונית' },
    definite: { french: "J'ai acheté LA voiture", hebrew: 'קניתי את המכונית' },
  },
  {
    indefinite: { french: 'Je cherche UN travail', hebrew: 'אני מחפש עבודה' },
    definite: { french: 'Je cherche LE travail (précis)', hebrew: 'אני מחפש את העבודה' },
  },
  {
    indefinite: { french: 'Il mange DES pommes', hebrew: 'הוא אוכל תפוחים' },
    definite: { french: 'Il mange LES pommes', hebrew: 'הוא אוכל את התפוחים' },
  },
]

function ExamplesBlock({ examples }: { examples: Example[] }) {
  return (
    <div className="cours-et-examples">
      {examples.map((ex) => (
        <div key={`${ex.hebrew}-${ex.french}`} className="cours-et-example">
          <p className="cours-et-example-hebrew" dir="rtl" lang="he">
            {ex.hebrew}
          </p>
          <p className="cours-et-example-french">{ex.french}</p>
        </div>
      ))}
    </div>
  )
}

export function CoursEt() {
  return (
    <article className="cours-et">
      <h1 className="cours-et-title">
        Le marqueur d&apos;objet direct : <span className="cours-et-accent">את</span> 
      </h1>

      <section className="cours-et-section">
        <h2 className="cours-et-section-title">1. Qu&apos;est-ce que את ?</h2>
        <p className="cours-et-text">
          En hébreu, <strong className="cours-et-accent">את</strong> est un marqueur
          grammatical obligatoire qui se place devant l&apos;objet direct d&apos;un verbe, mais uniquement quand cet
          objet est <strong>défini</strong>. Il n&apos;a pas d&apos;équivalent direct en français, c&apos;est une
          particularité propre à l&apos;hébreu.
        </p>
      </section>

      <section className="cours-et-section">
        <h2 className="cours-et-section-title">2. Verbes transitifs vs intransitifs</h2>
        <p className="cours-et-text">
          Avant de comprendre quand utiliser את, il faut distinguer deux types de verbes.
        </p>

        <div className="cours-et-box cours-et-box--blue">
          <h3 className="cours-et-box-title">Verbes transitifs</h3>
          <p className="cours-et-box-text">
            Un verbe transitif a besoin d&apos;un objet direct. Tu peux toujours poser la question{' '}
            <strong>&quot;quoi ?&quot;</strong> ou <strong>&quot;qui ?&quot;</strong> après le verbe.
          </p>
          <ExamplesBlock examples={transitiveExamples} />
          <p className="cours-et-note">✓ Ces verbes peuvent avoir את devant leur objet si cet objet est défini.</p>
        </div>

        <div className="cours-et-box cours-et-box--red">
          <h3 className="cours-et-box-title">Verbes intransitifs</h3>
          <p className="cours-et-box-text">
            Un verbe intransitif n&apos;a pas d&apos;objet direct. La question &quot;quoi ?&quot; ou &quot;qui ?&quot; ne
            fonctionne pas.
          </p>
          <ExamplesBlock examples={intransitiveExamples} />
          <p className="cours-et-note">✗ Ces verbes n&apos;auront JAMAIS את en hébreu.</p>
        </div>
      </section>

      <section className="cours-et-section">
        <h2 className="cours-et-section-title">3. Défini vs Indéfini</h2>
        <p className="cours-et-text">
          Pour les verbes transitifs, on utilise <strong className="cours-et-accent">את</strong> uniquement si
          l&apos;objet est défini — et dans ce cas, on ajoute aussi la préposition{' '}
          <strong className="cours-et-accent">ה-</strong> devant l&apos;objet.
        </p>
        <div className="cours-et-box cours-et-box--gray cours-et-box--intro">
          <h3 className="cours-et-box-title">Règle du ה-</h3>
          <p className="cours-et-box-text cours-et-box-text--tight">
            <strong>ה-</strong> = &quot;le / la / les&quot; en français. Il se colle toujours au début du mot
            (ex. <span dir="rtl" lang="he">התפוח</span> = la pomme, <span dir="rtl" lang="he">הספר</span> = le livre).
          </p>
        </div>
        
        <div className="cours-et-box cours-et-box--green">
          <h3 className="cours-et-box-title">Qu&apos;est-ce qu&apos;un nom défini ?</h3>
          <p className="cours-et-box-text">
            Un nom est défini quand on sait exactement de quoi ou de qui on parle — quelque chose de précis,
            d&apos;identifiable.
          </p>
          <ExamplesBlock examples={definiteExamples} />
        </div>

        <div className="cours-et-box cours-et-box--orange">
          <h3 className="cours-et-box-title">Qu&apos;est-ce qu&apos;un nom indéfini ?</h3>
          <p className="cours-et-box-text">
            Un nom est indéfini quand on parle d&apos;une chose quelconque, pas précise, ou qu&apos;on l&apos;introduit
            pour la première fois.
          </p>
          <ExamplesBlock examples={indefiniteExamples} />
        </div>

        <div className="cours-et-box cours-et-box--gray">
          <h3 className="cours-et-box-title">L&apos;astuce en français</h3>
          <div className="cours-et-table-wrap">
            <table className="cours-et-table cours-et-table--articles">
              <thead>
                <tr>
                  <th>Article / cas</th>
                  <th>Type</th>
                  <th>את ?</th>
                </tr>
              </thead>
              <tbody>
                {articleRules.map((rule) => (
                  <tr key={rule.article}>
                    <td>{rule.article}</td>
                    <td>{rule.type}</td>
                    <td>
                      <span className={`cours-et-badge ${rule.useEt ? 'cours-et-badge--yes' : 'cours-et-badge--no'}`}>
                        {rule.useEt ? 'את ✓' : 'pas de את ✗'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="cours-et-section">
        <h2 className="cours-et-section-title">4. La règle complète</h2>
        <div className="cours-et-rule-cards">
          {fullRules.map((rule) => (
            <div
              key={rule.situation}
              className={`cours-et-rule-card ${rule.useEt ? 'cours-et-rule-card--yes' : 'cours-et-rule-card--no'}`}
            >
              <div className="cours-et-rule-card-header">
                <p className="cours-et-rule-card-situation">{rule.situation}</p>
                <span className="cours-et-rule-card-badge">{rule.useEtLabel}</span>
              </div>
              <p className="cours-et-example-hebrew" dir="rtl" lang="he">
                {rule.hebrew}
              </p>
              <p className="cours-et-example-french">{rule.french}</p>
              <p className="cours-et-rule-card-tip">💡 {rule.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cours-et-section">
        <h2 className="cours-et-section-title">5. Les 3 cas où את apparaît SANS ה-</h2>
        <p className="cours-et-text">
          En général, את accompagne le ה- (l&apos;article défini). Mais il y a 3 exceptions :
        </p>

        <div className="cours-et-box cours-et-box--gray">
          <h3 className="cours-et-box-title">Cas 1 : Noms propres</h3>
          <p className="cours-et-box-text">
            Les noms propres n&apos;ont pas besoin de ה- car ils sont naturellement définis.
          </p>
          <ExamplesBlock examples={properNameExamples} />
        </div>

        <div className="cours-et-box cours-et-box--gray">
          <h3 className="cours-et-box-title">Cas 2 : Pronoms suffixes (את fusionné)</h3>
          <p className="cours-et-box-text">
            Quand l&apos;objet est un pronom personnel, את se fusionne avec lui.
          </p>
          <div className="cours-et-table-wrap">
            <table className="cours-et-table">
              <thead>
                <tr>
                  <th>Personne</th>
                  <th>Hébreu</th>
                  <th>Français</th>
                </tr>
              </thead>
              <tbody>
                {pronounTable.map((p) => (
                  <tr key={p.hebrew}>
                    <td>{p.person}</td>
                    <td className="cours-et-table-hebrew" dir="rtl" lang="he">
                      {p.hebrew}
                    </td>
                    <td>{p.french}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ExamplesBlock examples={pronounExamples} />
        </div>

        <div className="cours-et-box cours-et-box--gray">
          <h3 className="cours-et-box-title">Cas 3 : Possessifs (שלי, שלך...)</h3>
          <p className="cours-et-box-text">
            Quand le nom est suivi d&apos;un possessif, il porte généralement ה- mais le possessif lui-même n&apos;en a
            pas besoin.
          </p>
          <ExamplesBlock examples={possessiveExamples} />
        </div>
      </section>

      <section className="cours-et-section">
        <h2 className="cours-et-section-title">6. Exemples comparatifs</h2>
        <div className="cours-et-comparisons">
          {comparisons.map((comp) => (
            <div key={comp.indefinite.hebrew} className="cours-et-comparison">
              <div className="cours-et-comparison-col cours-et-comparison-col--indef">
                <p className="cours-et-comparison-label">Indéfini — pas de את</p>
                <p className="cours-et-example-hebrew" dir="rtl" lang="he">
                  {comp.indefinite.hebrew}
                </p>
                <p className="cours-et-example-french">{comp.indefinite.french}</p>
              </div>
              <div className="cours-et-comparison-col cours-et-comparison-col--def">
                <p className="cours-et-comparison-label">Défini — avec את</p>
                <p className="cours-et-example-hebrew" dir="rtl" lang="he">
                  {comp.definite.hebrew}
                </p>
                <p className="cours-et-example-french">{comp.definite.french}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cours-et-section">
        <h2 className="cours-et-section-title">7. Résumé en 3 règles simples</h2>
        <div className="cours-et-summary">
          <div className="cours-et-summary-card cours-et-summary-card--red">
            <p className="cours-et-summary-title">❌ Verbe intransitif</p>
            <p className="cours-et-summary-text">Jamais de את — impossible d&apos;avoir un objet direct</p>
          </div>
          <div className="cours-et-summary-card cours-et-summary-card--orange">
            <p className="cours-et-summary-title">⚠️ Verbe transitif + objet indéfini (un/une/des)</p>
            <p className="cours-et-summary-text">Pas de את — le nom est seul, sans article</p>
          </div>
          <div className="cours-et-summary-card cours-et-summary-card--green">
            <p className="cours-et-summary-title">
              ✅ Verbe transitif + objet défini (le/la/les / nom propre / possessif / pronom)
            </p>
            <p className="cours-et-summary-text">את obligatoire</p>
          </div>
        </div>
      </section>
    </article>
  )
}
