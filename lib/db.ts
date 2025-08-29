// lib/db.ts
import { promises as fs } from 'fs'
import path from 'path'
import { EmissionEntry } from '@/models/emissions'
import { seedIfEmpty } from '@/lib/seed'

const DB_FILE = path.join(process.cwd(), 'data', 'entries.json')

export async function readEntries(): Promise<EmissionEntry[]> {
  await seedIfEmpty() // ensures file exists & has data
  const raw = await fs.readFile(DB_FILE, 'utf8')
  const parsed = JSON.parse(raw)
  return Array.isArray(parsed) ? parsed : []
}

export async function writeEntries(entries: EmissionEntry[]) {
  await fs.writeFile(DB_FILE, JSON.stringify(entries, null, 2), 'utf8')
}
