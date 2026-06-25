export interface CourseExample {
  french: string
  hebrew: string
  transcription: string
}

export interface ArticleRule {
  article: string
  type: string
  useEt: boolean
}

export interface EtRule {
  id: string
  situation: string
  useEt: boolean
  useEtLabel: string
  hebrewExample: string
  transcriptionExample: string
  frenchExample: string
  explanation: string
}

export interface PronounSuffix {
  person: string
  hebrew: string
  transcription: string
  french: string
}

export interface EtCase {
  id: string
  title: string
  content: string
  examples?: CourseExample[]
  pronouns?: PronounSuffix[]
}

export interface ComparisonPair {
  indefinite: CourseExample
  definite: CourseExample | null
}

export interface SummaryRule {
  rule: string
  useEt: boolean
  explanation: string
  color: 'red' | 'orange' | 'green'
}

export interface CourseSubsection {
  id: string
  title: string
  content: string
  examples?: CourseExample[]
  note?: string
  rules?: ArticleRule[]
}

export interface CourseSection {
  id: string
  title: string
  content?: string
  subsections?: CourseSubsection[]
  rules?: EtRule[] | ArticleRule[]
  cases?: EtCase[]
  comparisons?: ComparisonPair[]
  summary?: SummaryRule[]
}

export interface Course {
  id: string
  title: string
  language: string
  sections: CourseSection[]
}
