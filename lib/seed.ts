// lib/seed.ts
import { promises as fs } from 'fs'
import path from 'path'
import { EmissionEntry } from '@/models/emissions'
import { generateSeed } from '@/lib/generate-seed'

const DATA_DIR = path.join(process.cwd(), 'data')
const DB_FILE = path.join(DATA_DIR, 'entries.json')
const SEED_FILE = path.join(DATA_DIR, 'seed.json')

export async function seedIfEmpty() {
  await fs.mkdir(DATA_DIR, { recursive: true }).catch(() => {})

  // If file doesn’t exist or is empty/invalid → write seed
  let needsSeed = false
  try {
    const stat = await fs.stat(DB_FILE)
    if (stat.size === 0) needsSeed = true
  } catch {
    needsSeed = true
  }

  if (!needsSeed) {
    try {
      const raw = await fs.readFile(DB_FILE, 'utf8')
      const parsed = JSON.parse(raw) as unknown
      if (!Array.isArray(parsed) || parsed.length === 0) needsSeed = true
    } catch {
      needsSeed = true
    }
  }

  if (!needsSeed) return false

  // Prefer seed.json, otherwise generate
  try {
    const seed = await fs.readFile(SEED_FILE, 'utf8')
    await fs.writeFile(DB_FILE, seed, 'utf8')
  } catch {
    const year = new Date().getFullYear()
    const generated: EmissionEntry[] = generateSeed ? generateSeed(year) : []
    await fs.writeFile(DB_FILE, JSON.stringify(generated, null, 2), 'utf8')
  }
  return true
}
