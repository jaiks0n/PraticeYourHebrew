import 'dotenv/config'
import mongoose from 'mongoose'
import { fillBlankExercises } from '../src/data/fill-blank-exercises.ts'
import { FillBlankExercise } from '../api/lib/db.js'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB_NAME ?? 'practiceyourhebrew'

if (!uri) {
  console.error('MONGODB_URI manquant — vérifiez votre fichier .env')
  process.exit(1)
}

try {
  await mongoose.connect(uri, { dbName, bufferCommands: false })

  let inserted = 0
  let updated = 0

  for (const exercise of fillBlankExercises) {
    const result = await FillBlankExercise.updateOne({ id: exercise.id }, exercise, { upsert: true })
    if (result.upsertedCount > 0) inserted++
    else if (result.modifiedCount > 0) updated++
  }

  const total = await FillBlankExercise.countDocuments()

  console.log(`Import terminé : ${fillBlankExercises.length} exercices traités`)
  console.log(`  ${inserted} insérés, ${updated} mis à jour`)
  console.log(`  Total dans "fill_blank_exercises" : ${total}`)
} catch (err) {
  console.error('Import failed:', err instanceof Error ? err.message : err)
  process.exit(1)
} finally {
  await mongoose.disconnect()
}
