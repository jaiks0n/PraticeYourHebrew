import { connectDB, FillBlankExercise } from './lib/db.js'

export default async function handler(_req, res) {
  try {
    await connectDB()
    const exercises = await FillBlankExercise.find({ active: true }).sort({ id: 1 }).lean()
    res.status(200).json(exercises)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur'
    res.status(500).json({ error: message })
  }
}
