import { connectDB } from './lib/connect'
import { Verb } from './lib/Verb'

export default async function handler() {
  try {
    await connectDB()
    const verbs = await Verb.find({}).sort({ id: 1 }).lean()
    return Response.json(verbs)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur'
    return Response.json({ error: message }, { status: 500 })
  }
}
