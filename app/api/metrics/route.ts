import { NextResponse } from 'next/server'
import { readEntries, writeEntries } from '@/lib/db'
import type { EmissionEntry } from '@/models/emissions'
import { uid } from '@/lib/utils'

export async function GET() {
  const entries = await readEntries()
  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
  return NextResponse.json(sorted)
}

export async function POST(req: Request) {
  const body: EmissionEntry = await req.json()
  const entries = await readEntries()

  const newEntry: EmissionEntry = {
    ...body,
    id: uid(),
  }

  const updated = [...entries, newEntry]
  await writeEntries(updated)

  return NextResponse.json(newEntry, { status: 201 })
}
