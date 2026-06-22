import { connectDB, Verb } from './lib/db.js'

export default async function handler(_req, res) {
  try {
    await connectDB()
    const verbs = await Verb.find({}).sort({ id: 1 }).lean()
    res.setHeader('Cache-Control', 'no-store')
    res.status(200).json(verbs)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur'
    res.status(500).json({ error: message })
  }
}
