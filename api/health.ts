import { connectDB } from './lib/connect'

export default async function handler(
  _req: unknown,
  res: { status: (code: number) => { json: (body: unknown) => void } },
) {
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
