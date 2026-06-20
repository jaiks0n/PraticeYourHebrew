import { connectDB } from './lib/db.js'

export default async function handler(_req, res) {
  try {
    await connectDB()
    res.status(200).json({
      ok: true,
      database: process.env.MONGODB_DB_NAME ?? 'practiceyourhebrew',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur de connexion'
    res.status(500).json({ ok: false, error: message })
  }
}
