import type { VercelRequest, VercelResponse } from '@vercel/node'
import { connectDB } from '../server/db/connect'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
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
