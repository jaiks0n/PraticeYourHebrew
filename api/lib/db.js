import mongoose from 'mongoose'

const cached = globalThis.__mongooseCache ?? { conn: null, promise: null }
globalThis.__mongooseCache = cached

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI manquant — ajoutez-le dans .env ou les variables Vercel.')
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB_NAME ?? 'practiceyourhebrew',
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

const conjugationCellSchema = new mongoose.Schema(
  {
    hebrew: { type: String, required: true },
    transcription: { type: String, required: true },
    french: String,
  },
  { _id: false },
)

const verbSchema = new mongoose.Schema(
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
      present: mongoose.Schema.Types.Mixed,
      past: mongoose.Schema.Types.Mixed,
      future: mongoose.Schema.Types.Mixed,
      imperative: mongoose.Schema.Types.Mixed,
      infinitive: conjugationCellSchema,
    },
  },
  { collection: 'verbs', versionKey: false },
)

export const Verb = mongoose.models.Verb ?? mongoose.model('Verb', verbSchema)

const fillBlankAnswerSchema = new mongoose.Schema(
  {
    hebrew: { type: String, required: true },
    transcription: { type: String, required: true },
  },
  { _id: false },
)

const fillBlankHintSchema = new mongoose.Schema(
  {
    infinitiveHebrew: { type: String, required: true },
    tense: { type: String, required: true },
    genderLabel: String,
  },
  { _id: false },
)

const fillBlankExerciseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    type: { type: String, required: true, default: 'verb_fill_blank' },
    category: String,
    difficulty: { type: String, default: 'beginner' },
    active: { type: Boolean, default: true },
    sentence: {
      beforeBlank: { type: String, required: true },
      afterBlank: { type: String, required: true },
    },
    hint: fillBlankHintSchema,
    french: { type: String, required: true },
    answer: fillBlankAnswerSchema,
    sentenceTranscription: { type: String, required: true },
  },
  { collection: 'fill_blank_exercises', versionKey: false },
)

export const FillBlankExercise =
  mongoose.models.FillBlankExercise ??
  mongoose.model('FillBlankExercise', fillBlankExerciseSchema)
