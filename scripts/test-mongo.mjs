import 'dotenv/config'
import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB_NAME ?? 'practiceyourhebrew'

if (!uri) {
  console.error('MONGODB_URI manquant — copiez .env.example vers .env et remplissez vos identifiants Atlas.')
  process.exit(1)
}

try {
  await mongoose.connect(uri, { dbName, bufferCommands: false })
  await mongoose.connection.db?.command({ ping: 1 })

  const collections = await mongoose.connection.db?.listCollections().toArray()
  const names = collections?.map((c) => c.name) ?? []

  console.log('Connected to MongoDB Atlas (Mongoose)')
  console.log(`Database: ${dbName}`)
  console.log(`Collections: ${names.length ? names.join(', ') : '(aucune — normal si la base est neuve)'}`)
} catch (err) {
  console.error('Connection failed:', err instanceof Error ? err.message : err)
  process.exit(1)
} finally {
  await mongoose.disconnect()
}
