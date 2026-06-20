import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const conjugationCellSchema = new Schema(
  {
    hebrew: { type: String, required: true },
    transcription: { type: String, required: true },
    french: String,
  },
  { _id: false },
)

const verbSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    french: { type: String, required: true },
    hebrew: { type: String, required: true },
    transcription: { type: String, required: true },
    category: String,
    tense: String,
    person: String,
    verb: String,
    partOfSpeech: String,
    gender: String,
    binyan: String,
    root: String,
    conjugation: {
      present: Schema.Types.Mixed,
      past: Schema.Types.Mixed,
      future: Schema.Types.Mixed,
      imperative: Schema.Types.Mixed,
      infinitive: conjugationCellSchema,
    },
  },
  {
    collection: 'verbs',
    versionKey: false,
  },
)

export type VerbDocument = InferSchemaType<typeof verbSchema>

export const Verb =
  mongoose.models.Verb ?? mongoose.model('Verb', verbSchema)
