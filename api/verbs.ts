import type { VercelRequest, VercelResponse } from '@vercel/node'
import { connectDB } from '../server/db/connect'
import { Verb } from '../server/models/Verb'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    await connectDB()
    const verbs = await Verb.find({}).sort({ id: 1 }).lean()
    res.status(200).json(verbs)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur'
    res.status(500).json({ error: message })
  }
}
