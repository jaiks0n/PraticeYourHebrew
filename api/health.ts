import { connectDB } from './lib/connect'

export default async function handler() {
  try {
    await connectDB()
    return Response.json({
      ok: true,
      database: process.env.MONGODB_DB_NAME ?? 'practiceyourhebrew',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur de connexion'
    return Response.json({ ok: false, error: message }, { status: 500 })
  }
}
