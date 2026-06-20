import { connectDB } from './lib/connect'
import { Verb } from './lib/Verb'

export default async function handler(
  _req: unknown,
  res: { status: (code: number) => { json: (body: unknown) => void } },
) {
  try {
    await connectDB()
    const verbs = await Verb.find({}).sort({ id: 1 }).lean()
    res.status(200).json(verbs)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur'
    res.status(500).json({ error: message })
  }
}
