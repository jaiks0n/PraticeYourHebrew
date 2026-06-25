import type {
  ArticleRule,
  Course,
  CourseExample,
  CourseSection,
  CourseSubsection,
  EtCase,
  EtRule,
} from '../data/course-types'

interface CourseViewProps {
  course: Course
}

function ExamplesList({ examples }: { examples: CourseExample[] }) {
  return (
    <ul className="course-examples">
      {examples.map((ex) => (
        <li key={`${ex.french}-${ex.hebrew}`} className="course-example">
          <span className="course-example-french">{ex.french}</span>
          <span className="course-example-hebrew" dir="rtl" lang="he">
            {ex.hebrew}
          </span>
          <span className="course-example-transcription">({ex.transcription})</span>
        </li>
      ))}
    </ul>
  )
}

function ArticleRulesTable({ rules }: { rules: ArticleRule[] }) {
  return (
    <table className="course-table course-table--articles">
      <thead>
        <tr>
          <th>Article / cas</th>
          <th>Type</th>
          <th>את ?</th>
        </tr>
      </thead>
      <tbody>
        {rules.map((rule) => (
          <tr key={rule.article}>
            <td>{rule.article}</td>
            <td>{rule.type}</td>
            <td>
              <span className={`course-badge course-badge--${rule.useEt ? 'yes' : 'no'}`}>
                {rule.useEt ? 'OUI' : 'NON'}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function EtRulesTable({ rules }: { rules: EtRule[] }) {
  return (
    <div className="course-rules">
      {rules.map((rule) => (
        <article key={rule.id} className="course-rule-card">
          <div className="course-rule-header">
            <h4 className="course-rule-situation">{rule.situation}</h4>
            <span className={`course-badge course-badge--${rule.useEt ? 'yes' : 'no'}`}>
              {rule.useEtLabel}
            </span>
          </div>
          <p className="course-rule-explanation">{rule.explanation}</p>
          <div className="course-rule-example">
            <span className="course-example-french">{rule.frenchExample}</span>
            <span className="course-example-hebrew" dir="rtl" lang="he">
              {rule.hebrewExample}
            </span>
            <span className="course-example-transcription">({rule.transcriptionExample})</span>
          </div>
        </article>
      ))}
    </div>
  )
}

function Subsection({ subsection }: { subsection: CourseSubsection }) {
  return (
    <div className="course-subsection">
      <h4 className="course-subsection-title">{subsection.title}</h4>
      <p className="course-text">{subsection.content}</p>
      {subsection.examples && <ExamplesList examples={subsection.examples} />}
      {subsection.rules && <ArticleRulesTable rules={subsection.rules} />}
      {subsection.note && <p className="course-note">{subsection.note}</p>}
    </div>
  )
}

function CaseBlock({ caseItem }: { caseItem: EtCase }) {
  return (
    <div className="course-case">
      <h4 className="course-subsection-title">{caseItem.title}</h4>
      <p className="course-text">{caseItem.content}</p>
      {caseItem.pronouns && (
        <table className="course-table course-table--pronouns">
          <thead>
            <tr>
              <th>Personne</th>
              <th>Hébreu</th>
              <th>Transcription</th>
              <th>Français</th>
            </tr>
          </thead>
          <tbody>
            {caseItem.pronouns.map((p) => (
              <tr key={p.hebrew}>
                <td>{p.person}</td>
                <td className="course-hebrew-cell" dir="rtl" lang="he">
                  {p.hebrew}
                </td>
                <td className="course-transcription-cell">{p.transcription}</td>
                <td>{p.french}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {caseItem.examples && <ExamplesList examples={caseItem.examples} />}
    </div>
  )
}

function Section({ section }: { section: CourseSection }) {
  const etRules = section.rules?.filter((r): r is EtRule => 'situation' in r)

  return (
    <section className="course-section" id={section.id}>
      <h3 className="course-section-title">{section.title}</h3>
      {section.content && <p className="course-text">{section.content}</p>}
      {section.subsections?.map((sub) => (
        <Subsection key={sub.id} subsection={sub} />
      ))}
      {etRules && etRules.length > 0 && <EtRulesTable rules={etRules} />}
      {section.cases?.map((c) => (
        <CaseBlock key={c.id} caseItem={c} />
      ))}
      {section.comparisons && (
        <div className="course-comparisons">
          {section.comparisons.map((pair) => (
            <div key={pair.indefinite.hebrew} className="course-comparison">
              <div className="course-comparison-col course-comparison-col--indef">
                <span className="course-comparison-label">Indéfini — pas de את</span>
                <span className="course-example-french">{pair.indefinite.french}</span>
                <span className="course-example-hebrew" dir="rtl" lang="he">
                  {pair.indefinite.hebrew}
                </span>
                <span className="course-example-transcription">({pair.indefinite.transcription})</span>
              </div>
              {pair.definite ? (
                <div className="course-comparison-col course-comparison-col--def">
                  <span className="course-comparison-label">Défini — avec את</span>
                  <span className="course-example-french">{pair.definite.french}</span>
                  <span className="course-example-hebrew" dir="rtl" lang="he">
                    {pair.definite.hebrew}
                  </span>
                  <span className="course-example-transcription">({pair.definite.transcription})</span>
                </div>
              ) : (
                <div className="course-comparison-col course-comparison-col--empty">
                  <span className="course-comparison-label">—</span>
                  <span className="course-comparison-na">Pas de paire (verbe intransitif)</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {section.summary && (
        <div className="course-summary">
          {section.summary.map((item) => (
            <div key={item.rule} className={`course-summary-card course-summary-card--${item.color}`}>
              <div className="course-summary-header">
                <span className="course-summary-rule">{item.rule}</span>
                <span className={`course-badge course-badge--${item.useEt ? 'yes' : 'no'}`}>
                  {item.useEt ? 'את OUI' : 'את NON'}
                </span>
              </div>
              <p className="course-summary-explanation">{item.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export function CourseView({ course }: CourseViewProps) {
  return (
    <article className="course">
      <h2 className="course-title">{course.title}</h2>
      <nav className="course-toc" aria-label="Sommaire">
        <p className="course-toc-label">Sommaire</p>
        <ol className="course-toc-list">
          {course.sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.title}</a>
            </li>
          ))}
        </ol>
      </nav>
      {course.sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </article>
  )
}
